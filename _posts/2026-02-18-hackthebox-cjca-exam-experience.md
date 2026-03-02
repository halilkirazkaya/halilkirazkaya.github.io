---
layout: post
title: "My HackTheBox CJCA Exam Experience"
date: 2026-02-18
tags: [CJCA, HackTheBox, Blue Team, Red Team, Certification]
excerpt: "My preparation process, how I managed the CJCA exam while working full-time, and what you should focus on technically."
---

I have added a new stop to the certification journey in my cybersecurity career: the HTB Certified Junior Cybersecurity Associate (CJCA).

In this post, I will transparently share my preparation process, how I managed the exam while working full-time, what you should focus on technically, and the most common mistakes to avoid.

## Why CJCA?

First, let me share the story behind taking this certification. My main goal was actually the **CPTS** (Certified Penetration Testing Specialist) certification. To achieve that, I purchased an annual Silver membership from Hack The Box, which included the CJCA certification voucher as part of the package.

To give an honest assessment:

**For Beginners:** If you are just stepping into cybersecurity (starting from "zero"), the CJCA is definitely worth taking as a first certification. It teaches the fundamentals of entering both the Red (Offensive) and Blue (Defensive) sides very well.

**For Experienced Pros:** If you have already made progress in the industry, I'm not sure if it's worth paying ~$100 separately unless it comes as a gift in a bundle. However, if you have it in a package like I did, it's useful for getting used to the Hack The Box exam format.

## Preparation

To take the exam, you need to complete the learning path. While some parts were a review for me, since I didn't have much knowledge on the Blue side, it added significant value to my skillset there. I was already solving machines regularly, so I didn't do anything specific just for the CJCA.

I wouldn't recommend underestimating the exam, but don't overcomplicate it in your head either. Focus on studying basic **Initial Access** and **Privilege Escalation**.

## My Exam Timeline

I didn't have a clear idea about the difficulty level of the CJCA. I made inferences from the path topics and started the exam after coming home from work on a Thursday evening. Here is how I managed the process:

- **Thursday — Friday:** I worked on the exam after work hours. By Friday evening, I had reached 60 points.
- **Saturday — Sunday:** I dedicated the weekend more intensively to the Blue Team section and reporting.
- **Monday:** I collected another 20 points, bringing my total to 80. I added these to the report and made the final edits. Honestly, rather than pushing for the remaining 20 points (to reach 100), I decided to focus entirely on perfecting my report.

I submitted my report around February 1–2. The evaluation process took a bit longer than I expected; results were announced on February 18. So, be prepared for a wait of about **2.5 weeks** after submitting the report.

## What Should You Study?

While HTB's education path is successful, just applying the training and taking the exam can be risky.

**Solve Machines (Linux & Windows):** Don't just finish the path and jump directly into the exam. Practice by solving both Linux and Windows machines at 'Easy' and 'Mid' levels on HTB.

**Master Kibana:** For the Blue Team side, you must study the Kibana modules in the learning path very well. Your filtering ability during log analysis will save you a massive amount of time.

## Exam Structure and Content

The part I liked most about the exam was the scenario setup. The goal is to be able to see the traces of the operations you perform on the Red Team side within the Blue Team side.

**Red Team (Offensive):** There are 5 machines in total. You are expected to get User and Root flags on each machine. Each flag is worth 10 points. You need to gather a minimum of 80 points to pass.

**Blue Team (Defensive):** About 40 alerts await you. You are asked to analyze approximately 27 of them. You must mark these alerts as FP (False Positive) or TP (True Positive) and explain the reason.

## Reporting

Even if you get a full 100 points technically, you can fail if your report isn't good enough. **The report is not a formality; it is the exam itself.**

- **Use SysReptor:** Install SysReptor before the exam and have a CJCA report template ready.
- **Save Time:** It is very difficult to collect code outputs and screenshots one by one under exam stress. If your template is ready, you can place your findings instantly.
- **Provide Proof:** Add clear screenshots and reproducible steps for every finding.

## Conclusion

The CJCA is an excellent educational process for entry-level professionals, especially with its vision of uniting the two sides of cybersecurity (Red and Blue). It provides a solid foundation for newcomers and a refreshing practice run for those experienced with the HTB ecosystem.
