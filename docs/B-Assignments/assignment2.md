---
id: assignment2
title: Assignment 2
sidebar_position: 2
description: TBD
---

# Assignment 2 

## Instructions

You will have received your instructions by email. If you have not done so, contact your professor immediately.

### Due Date

This assignment is due by midnight on April 12th.

### Submission

Run [this script](https://ict.senecacollege.ca/~peter.callaghan/ops245/labs/checka2.bash) on your c7host machine. It will generate output for you to upload to blackboard. Make sure you also upload your script.

### Marking

Shortly before the due date, a rubric will be posted here. The assignment is worth 15% of your final mark.

### Questions & Clarifications

1. You must install the system-storage-manager package on your assignment VM.
2. The root user on your c7host must also be able to ssh to your assignment VM.
3. Seneca's email server might add extra text to any ip addresses in your instructions. It starts with https://protect-us.mimecast.com/, then a string of random characters, then /domain=. Ignore that, and only use the ip addresses.
4. Your c7host must be able to ssh to your assignment machine.
5. If your assignment VM does not have the interface name given in the assignment instructions, use the interface you have.
6. Your iptables rules must persist past the machine rebooting.
7. Hint: The vgextend command can only add physical volumes to a pre-existing volume group. You need a different command to create a new volume group.
