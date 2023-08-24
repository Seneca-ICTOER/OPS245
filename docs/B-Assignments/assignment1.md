---
id: assignment1
title: Assignment 1
sidebar_position: 1
description: TBD
---

# Assignment 1

The purpose of OPS245 assignments is to showcase your abilities in the course thus far, and conduct a bit of independent research. Some of what you'll be asked to complete will be familiar to you, while other parts will require you to think a bit and do some light Googling. It's expected you won't have all the answers right away, but you can find them. **As a result, unlike labs, your professor cannot provide any help or troubleshooting for your assignment.**

This assignment will be completed inside your local c7host virtual machine using additional KVM/QEMU nested VMs.

**Weight**: 15% of your overall grade

**Due Date**: Refer to your section's Blackboard announcements.

## Create a new virtual machine

1. Install a new CentOS Minimal VM. (Do **not** install the GUI version.)
2. The virtual machine name and the internal hostname for the machine must be your Seneca username. (Example: cjohnson30)
3. The regular user created during installation must also be your Seneca username.
4. Ensure LVM is used in your installation partitioning.

The rest of this assignment should be done after the installation is completed successfully.

## Package Management

Research the `rpm` and `yum` commands to:

1. Verify the integrity of a package using `rpm` to see if any of its files have been altered since installation. (you will be asked to demonstrate this when your assignment is marked, it doesn't matter which package you choose)
2. Demonstrate the install, run, and removal of any rpm package. This means during the demonstration you will show the download, install, and run of any rpm-based package, after doing so show the removal of that package proving that previously installed rpm package is no longer available after removal.
3. Add the [EPEL](https://fedoraproject.org/wiki/EPEL) repository to the yum configuration.

## Alternate Software Installation

Review the `yum group*` commands and use them to:

1. Find and install the Cinnamon desktop environment. Feel free to use the power of Google.
2. Do the rest of the assignment (including the assignment submission) while running Cinnamon. (Hint: Think about default targets.)

[Lab 3](/A-Labs/lab3.md) contains practice in compiling source code. It is recommended you refer to these procedures for compiling and installing software from source code and use them to:

1. Download and extract the source code for ISO Master.
2. Compile and install it (you will need gtk2-devel installed).
3. Run it and have a look at the _Help/About_ dialog box. **You will have to change the contents of that box**.
4. Edit the file about.c in the source you use earlier, and change "An application for editing ISO9660 images based on the bkisofs access library and the GTK2 GUI toolkit." to "An application used by YOURNAME for OPS245 Assignment 1".
5. Compile and install the application again, exactly the same way you did the first time. Your change should be simple enough that complicated bugs are unlikely.
6. Check that your changes appear in the application.

## Install a Second Linux Distribution as a Virtual Machine

- Create another virtual machine.
- The virtual machine name and the hostname for the machine must be your learn user ID followed by **-mint**. For example asmith15-mint
- Install **Linux Mint** as the OS for the new virtual machine (VMWare).

## Submission

Submit screenshots that show you've completed the work.

## Rubric

| Task |	Maximum mark |	Actual mark |
| --- | --- | --- |
| New CentOS VM installed (Seneca username) |	1	| |
| Correct hostname (Seneca username) |	1	| |
| Using LVM (run lsblk to check) |	1	| |
| Add, run, and removal of a rpm package |	1	| |
| Adding EPEL to list of available repositories |	1	| |
| RPM integrity verification command |	2	| |
| Command to display repository information |	2	| |
| Using Cinnamon |	2	| |
| Modified ISO Master about dialog box |	2	| |
| Second VM installed and running Linux Mint |	2	| |
| Second VM using proper hostname |	1	| |
| Screenshots clearly show you've completed the work |	4	| |
| **Total** |	20	| |
