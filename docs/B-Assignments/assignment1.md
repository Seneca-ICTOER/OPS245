---
id: assignment1
title: Assignment 1
sidebar_position: 1
description: TBD
---

# Assignment 1

> ![caution](/img/caution.png)
>
> ***Do NOT start working on this assignment unless specifically told to do so by your professor!***
>
> - Your professor may choose to use a different assignment.
> - Currently, this assignment is *only* for the following sections: **NFF** and **NGG**

## Assignment Preparation

### Purpose of Assignments

The purpose of OPS245 assignments is to showcase your abilities in the course thus far and conduct a bit of independent research. Some of what you'll be asked to complete will be familiar to you, while other parts will require you to think a bit and do some light online research. It's expected you won't have all the answers right away, but you *can* find them.

**As a result, unlike labs, your professor cannot provide any help or troubleshooting for your assignment.**

### Assignment 1 Overview

This assignment will be completed inside your local debhost virtual machine using additional KVM/QEMU nested VMs.

**Weight**: 15% of your overall grade

**Due Date**: Refer to your section's Blackboard announcements.

## Task 1: Create A New Virtual Machine (Ubuntu)

Create a new Ubuntu 22.04 Desktop VM (Normal installation) as a nested VM in **KVM**, using the specifications below. You may refer to your lab instructions, logbook and google for any of the steps. The installation process is the similar to **deb1** in **Lab 2**. When asked for partition information, use the defaults.

1. Install a new VM *inside* debhost using KVM.
1. Specifications: 
    > **OS:** Ubuntu 22.04 LTS - Minimal Installation (No GUI)

    > **Memory:** 2048 MB

    > **Disk space:** 15 GB

    > **CPUs:** 2
1. The virtual machine name in Virtual Machine Manager and the internal hostname inside the VM's OS must include your Seneca username in the following format (example: jmcarman-ubuntu)
1. The regular user created during installation must also be your Seneca username (example: jmcarman).
1. Ensure LVM is used in your installation partitioning.
1. Use your existing virtual network
1. Select **Minimal Installation** on the **Updates and other software** screen
1. Use the default selections on the **Installation type** screen.

The rest of this assignment should be done after the installation is completed successfully.

## Task 2: Post-Installation Tasks (Ubuntu)

You will complete the rest of the assignment (including submission) while running the Cinnamon desktop environment.

Use `apt` to accomplish the following:

1. Find and install the Cinnamon desktop environment: `apt install cinnamon`
1. Update the system.
1. Use systemctl to confirm the default firewall is running. (Hint: the default firewall in Ubuntu is **ufw**)
1. Use `apt` to install `Chromium`.  You may need to use Google to accomplish this.

## Task 3: Adding Users With A Modified Default Home Directory Structure

Look at the `useradd` man page to figure out how to create a default home directory structure for new users (hint: look at the -m & -k options). You will need to uncomment the *skel* variable in the useradd default values file.

1. Create the following default home directory structure for new users:
![Default Home Dir](/img/userhomea1.png)

1. Create the following users their associated full names. Don't forget to assign each a default password for security purposes.

    | Username | Full Name |
    | :--------- | :----------- |
    | tstark | Tony Stark |
    | bbanner | Bruce Banner |
    | thor | Thor Odinson |
    | srogers | Steve Rogers |
    | nromanoff | Natasha Romanoff |

1. Create the group `avengers` and add the users you created to the `avengers` group.

### Issue the following commands and take screenshots of the output for your submission:

```bash
sudo tail -6 /etc/passwd
```

```bash
sudo tail -6 /etc/group
```

## Task 4: Install a Second Linux Distribution as a Virtual Machine
Create a new Linux Mint VM (Cinnamon Edition) in **KVM** as a nested virtual machine inside debhost, using the following information. Use the default partitioning and installation options.

1. Install a new VM *inside* debhost using KVM.
1. Specifications: 

    > **OS:** Linux Mint 21.3 - Cinnamon Edition
    
    > **VM name &amp; Hostname:** youruser-mint (Example: jmcarman-mint)

    > **Username:** Your Seneca Username
  
    > **Memory:** 2048 MB
  
    > **Disk space:** 20 GB
  
    > **CPUs:** 2

1. Use the defaults for anything not specified.

## Task 5: Post-Installation Tasks (Mint)
1. Update the system using `apt`.
1. Use `apt` to install `Chromium`.  You may need to do some light Internet research to accomplish this.

## Submission

Submit the following screenshots on Blackboard to demonstrate you've completed the work.

### Ubuntu VM
1. Ubuntu VM installed.
1. Output of the hostname command.
1. Cinnamon desktop installed and in use.
1. Chromium installed.
1. Users and group created, users added to the `avengers` group.

### Linux Mint VM
1. Linux Mint VM installed.
1. Output of the hostname command.
1. Chromium installed.

## Rubric

| Task |	Maximum mark |	Actual mark |
| --- | --- | --- |
| Ubuntu VM: Newly installed (Seneca username) |	5	| |
| Ubuntu VM: Correct hostname (Seneca username) |	2	| |
| Ubuntu VM: Using Cinnamon |	2	| |
| Ubuntu VM: Chromium installed |	2	| |
| Ubuntu VM: Users created and added to the `avengers` group | 5 | |
| Mint VM: Newly installed (Seneca username) |	5	| |
| Mint VM: Correct hostname (Seneca username) | 2 | |
| Mint VM: Chromium installed |	2	| |
| **Total** |	25	| |

## Resources
- [Ubuntu](https://ubuntu.com)
- [Linux Mint](https://linuxmint.com)
