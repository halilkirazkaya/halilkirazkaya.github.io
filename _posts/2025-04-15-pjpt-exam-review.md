---
layout: post
title: "PJPT Exam Review: Preparation, Methodology and the Reporting Process"
date: 2025-04-15
tags: [PJPT, TCM Security, Active Directory, Penetration Testing]
excerpt: "My PJPT preparation process, the breaking points I experienced during the exam, and my reporting methodology."
---

It has been almost a year since I passed the PJPT (Practical Junior Penetration Tester) exam. Due to my busy schedule back then, I am only now getting the chance to write about this experience. However, despite the time that has passed, the lessons I learned during the exam and my understanding of the Active Directory (AD) world remain highly relevant.

In this article, I want to share my PJPT preparation process, the breaking points I experienced during the exam, and my reporting methodology to guide those who want to step into the cybersecurity field.

## Why PJPT? (Comparison with eJPT)

When I decided to take the exam, my background was mostly in solving Web and Network labs, and I had no professional work experience yet. While eJPT is the first certification that comes to mind for entry-level candidates, I definitively set my course for PJPT. Why?

To be honest, PJPT is a far better and much more realistic exam than eJPT. eJPT does not include Active Directory (AD), has no reporting requirement, and feels more like a basic CTF (Capture the Flag) environment. PJPT, on the other hand, offers a hands-on lab environment and requires you to compile your findings into a professional report at the end. For a Junior candidate looking to stand out in the industry, this reporting experience is invaluable.

## Preparation Process and Timeline

I spread my preparation over a longer period due to my personal pace. However, I believe that someone who can study regularly with the right resources can be completely ready for this exam within **2 to 3 months**.

I built my preparation on two main pillars:

**TCM Security — PEH (Practical Ethical Hacking) Course:** I watched the entire course with great attention and took structured notes. I can comfortably say that the exam environment is perfectly aligned with the PEH curriculum.

**Hack The Box (HTB) — Active Directory Enumeration & Attacks Module:** I didn't just stop at watching videos. This module on HTB Academy was incredibly helpful in putting my theoretical knowledge into practice.

## Tool Stack

The most important philosophy I adopted during my preparation was: **Do not condition yourself entirely on tools, but do not be tool-less either.** Mastering the core tools shown in the TCM PEH course is enough to pass the exam.

In addition to these, I also used **NetExec** for enumeration and lateral movement, as it streamlined several common Active Directory tasks without changing the underlying methodology.

## My Exam Experience

TCM Security's exam environment was very stable. On Friday evening when I started the exam, everything was going according to plan. I dominated the network and successfully compromised 2 client machines before midnight. However, I couldn't find the path to the Domain Controller (DC) at the very top of the target. I felt stuck, so I closed the screen and decided to sleep.

Even though I sat at the computer refreshed on Saturday morning, I was still missing that one detail right in front of my eyes. Realizing I had fallen into a "rabbit hole," I got up from the screen and went outside.

> **The Golden Rule:** The moment you feel stuck in the exam, step away from the screen. I went out for just a 20-minute walk and got some fresh air. When I returned to the computer, it took me exactly 2 minutes to compromise the Domain Controller. Sometimes the solution isn't looking harder at the screen, but resetting the mind.

## The Reporting Phase: Evidence Collection and Documentation

In penetration testing, how you convey your findings is just as important as your technical success. TCM Security is quite strict about this and expects reporting at real-world standards. My methodology during the reporting process was as follows:

**Taking Continuous Screenshots:** From the beginning to the end of the exam, I documented every successful step and access I gained with real-time screenshots.

**Using the Template:** I didn't waste time designing a report from scratch. I used the Word report template provided by TCM Security.

**Detail and Volume:** I thoroughly explained the vulnerabilities I found, their business impact, and remediation steps. When my report was complete, it was a satisfying and professional penetration test report of about **40–50 pages**.

## Conclusion and Future Goals

After completing my report and uploading it to the system, the waiting period was quite short. Within just 1–2 days, I received that exciting email from the TCM Security team stating that my report was accepted and I successfully passed the exam. This certification was not just a technical achievement; it was also proof that I could infiltrate a real corporate network and report it professionally.

After building this strong foundation with PJPT, I have now set my sights on a more challenging target. I am currently studying intensely for the **HTB CPTS** (Certified Penetration Testing Specialist) exam. I hope to write a review for this challenging exam in the future as well.

Good luck to everyone in advance!
