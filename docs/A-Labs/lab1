---
id: lab1
title: Lab 1
sidebar_position: 1
description: Lab 1
---

# Lab 1: Installing Debian 12

## Lab Preparation

### Purpose of Lab 1

In order to save money and resources when learning to install, to manage, and to connect Linux machines to form networks, we will be using a combination of a local install and **Virtual Machines** for this course. :

- **Lab 1**: Create a **Debian 12 Host** install (called **debhost**) on your Solid State External Drive (SSD) which will be bootable on your lab class computers.
- **Lab 2**: Install a **Virtualization program package** on your **Debian 12** called **KVM** which will be used to create 3 Virtual Machines (VMs) that you will use to learn about Linux system administration for the remainder of this course.

The virtualization software will allow you to create and administer **3 different virtual machines** (**VMs**) on your Debian host (debhost) computer system.
![labenv.png](/img/debian-lab1-network-diagram-updated.png)

It is ESSENTIAL to have a **Solid State Drive (SSD) with a minimum storage capacity of 240 GB** or **240 GB available on your own computer** for you to perform the lab work and provide storage for your Debian 12 host and VMs that you will create in Lab 2. **Due to space requirements, you are NOT permitted to share this SSD drive with any other course material than our OPS245 course.**

> **NOTE: It is feasible to use a notebook computer with sufficient hard disk capacity to perform these labs (as you would for an SSD drive)**. It would require that your notebook computer can connect to the Internet (including in Seneca's computer labs). You would be required to follow the same instructions for this lab (SSD). **If you are planning to do these labs on your own personal laptop, please see your professor before you start the installation process to ensure you have appropriate hardware.**

### Main Objectives

- Create a bootable USB drive of Debian 12 using Rufus.
- **Correctly install Debian 12 (debhost)** on your SSD and check that it boots correctly.
- Note common Linux commands and record them in your lab logbook.
- Use **scripts** to generate a post-install report for your Debian 12 host.
- **Disable Linux Kernel security enhancements** to allow for more experimentation.

### Minimum Required Materials

1. **Solid State Drive** Minimum Size: 240GB
2. **SATA-to-USB Connector** to connect your SSD to the Seneca Lab computer 
3. **USB Flash drive** to install Debian 12 installation image 
4. **Lab Logbook** [(Click Here to Download)](/files/OPS245-Logbook-Online.doc)

### Linux Command Reference

**Package Management**

- [apt](https://linux.die.net/man/8/apt)
- [dpkg](https://man7.org/linux/man-pages/man1/dpkg.1.html)

**System Information**

- [hostname](http://man7.org/linux/man-pages/man1/hostname.1.html)
- [uname](http://man7.org/linux/man-pages/man1/uname.1.html)
- [ps](http://man7.org/linux/man-pages/man1/ps.1.html)
- [lsblk](http://man7.org/linux/man-pages/man8/lsblk.8.html)

**Networking**

- [ip](https://man7.org/linux/man-pages/man8/ip.8.html)
- [nslookup](http://linux.math.tifr.res.in/manuals/man/nslookup.html)

**Miscellaneous**

| [grep](http://man7.org/linux/man-pages/man1/grep.1.html) | [wc](http://man7.org/linux/man-pages/man1/wc.1.html) | [pwd](http://man7.org/linux/man-pages/man1/pwd.1.html) | [ls](http://man7.org/linux/man-pages/man1/ls.1.html) | [more](http://man7.org/linux/man-pages/man1/more.1.html) | [file](http://man7.org/linux/man-pages/man1/file.1.html) | [wget](http://man7.org/linux/man-pages/man1/wget.1.html) | [chmod](http://man7.org/linux/man-pages/man1/chmod.1.html) | [vi](https://ss64.com/vi.html) |
| -------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------ |

**Matrix on-line tutorials**

- Linux Basics: **/home/ops235/linux-basics**
- Using the vi Text Editor: **/home/ops235/vi-tutorial**
- Shell Scripting - Part I (Scripting Basics): **/home/ops235/scripting-1**

In this lab, you will learn how to install **Debian 12** to your SSD for use in the Seneca boot labs.
**Please note that at this time the Seneca boot labs are in C2030, C2034, and C2036. You will only be able to boot to your SSDs in these labs.**

**debhost system details:**

- **Name**: debhost
- **Boot media / Installation**: Bootable USB flash drive with Debian 12 Net Installer image on it

  - [Download netinst image](https://www.debian.org/download)

- **Disk space**: 240GB minimum

**The Debian Web Site**

Open up <https://www.debian.org/> in your browser. To get the latest copy of the Debian 12 netinstaller ISO click on the "Download" button.
While you are on the site lets explore...

One of the most important skills you should graduate with is the ability to teach yourself something new. You will not always have the luxury of attending a training course to learn something new, so we must be prepared to learn independently. This often means reading official documentation. Official documentation is also one of the primary sources of information you should use when troubleshooting or configuring a system. Along with user forums and wiki's. Google searches can often produce results that are not specific to your Linux distribution or version, so they can produce inaccurate results.

Reading documentation, like any skill, requires practice. Reading `man` pages for example is often very confusing for new users as it hard to understand all of the terminology. However, the more time you spend reading the documentation the easier it will become.

Click on the "User Support" link. Take a look at some of the support options available. Find the links to the documentation and forums. Take a look around. Bookmark the page. (The Debian website is well known for being difficult to navigate.)

## Investigation 1: Create a bootable installation drive using Rufus and the latest Debian 12 image
**Note:** The steps in investigation 1 to create your install drive must be completed on your own personal computer and should be completed prior to class

- Download the Debian 12 image from the [Debian Website](https://www.debian.org/download)
- Download Rufus from the [Rufus Website](https://rufus.ie/en)
> ![Rufus Download](/img/rufusdownload.jpg)
- You should now have both the Rufus executable and the Debian 12 image on your personal computer
> ![Rufus and Debian](/img/rufusanddebian.jpg)
- Run Rufus and you will see the Rufus dialogue box appear.
- Select the Debian 12 image as your boot selection
> ![Rufus Select Image](/img/rufusselectimage.jpg)
- Double check that your flash drive is selected for the "Device" field, your Debian image has been selected for the boot selection, and that all other settings are the same as the image below.
> ![Rufus Ready](/img/rufusready1.jpg)
- Click "START" and Rufus will begin to create your installation image on your flash drive
- **Note: If Rufus asks you to select the mode that you wish to use to write the image, select "Write in ISO image mode".**
- Once the process has completed you will have your installation flash drive ready. 

## Investigation 2: Install Your host Debian 12 system onto your external SSD (debhost)
**Note:** From this step onward, you will be completing these tasks on the Seneca Lab computer. It is highly recommended that you complete this in the first lab class of the semester.

1. Plug your installation USB flash drive and your SSD external hard drive into the Seneca lab computer
2. Turn on the Seneca lab computer. You will need to hit the F12 key as soon as you turn it on until you see the following screen:
> ![Bootable devices](/img/bootmenu1.jpg)
3. **IT IS VERY IMPORTANT THAT YOU PERFORM THESE NEXT STEPS CAREFULLY!!** Notice that there are multiple boot options available to you. You should have 3 options at first. The Windows Boot Manager is built into the Seneca lab computer and is used for the built-in image that Seneca uses. **DO NOT TOUCH THE WINDOWS BOOT MANAGER**. The UEFI 2550Micron 512GB device is the built-in hard drive on the Seneca computers. We can tell it is the built-in hard drive because of the symbol to its left. Depending on the computer you are using, it's exact label may be different from what you see but the symbol will be the same. **DO NOT TOUCH THE INTERNAL HARD DRIVE**. Altering either of these may break the system and it is the student's responsibility to ensure that no damage comes to the Seneca computers. **YOU HAVE BEEN WARNED!**
4. The other device you will see is your installation USB flash drive. The image above shows it labeled as "UEFI Kingston DataTraveler" but yours will be something different. Select your USB installation drive. 
5. Upon selecting your installation USB flash drive you will be asked for an admin password. Provide the password and press "OK". **Note** Your professor will give you the password on the first day of class.
6. If you created your installation USB flash drive correctly, the Seneca Lab computer will boot to it and eventually you will see the following screen:
> ![advanced options](/img/boot-select-advanced.jpg)
7. Select "Advanced Options".
8. Select "Graphical Expert Install".
9. Select "Choose Language", select "English", and click "Continue".
10. Set your location as "Canada" and click "Continue".
11. Set your base default locale to "Canada en_CA.UTF-8".
12. Leave the "Additional Locales" screen blank and click "Continue".
13. Select "Configure Keyboard" and click "Continue".
14. Select "American English" and click "Continue".
15. Select "Detect and Mount Installation Media" and click "Continue". Your media will then be detected. Click "Continue".
16. Select "Load installer components from installation media" and click "Continue".
17. On the next screen leave everything unselected and click "Continue".
18. Select "Detect network hardware" and click "Continue".
19. Select "Configure network" and click "Continue".
20. For "Auto-configure networking" select "Yes" and click "Continue".
21. Leave the "Waiting time for link detection" as the default value and click "Continue".
22. Give your system the hostname "debhost" and click "Continue".
23. Leave the domain name blank and click "Continue".
24. Select "Set up users and passwords" and click "Continue".
25. For "Allow login as root", select "No" and click "Continue".
26. Provide your full name on the next screen (first and last name) and click "Continue".
27. On the next screen provide your username for your user account and click "Continue". This will be the same username you have for your myseneca email address. (eg. if the email address is cdendias@myseneca.ca then the username would be "cdendias".) **Note** Your username MUST match your myseneca username. If it does not match, you will be asked to re-install.
28. On the next screen, provide a password for your user account. You will need to input it twice. **Make note of your password! If you forget, you will have to re-install!**
29. Select "Configure the clock" and click "Continue."
30. For "Set the clock using NTP" select "Yes" and click "Continue".
31. On the next screen, leave the default NTP server and click "Continue".
32. For the timezone, select the Eastern timezone and click "Continue".
33. Next, select "Detect disks" and click "Continue".
34. Select, "Partition disks" and click "Continue".
35. For "Partition Method" select "Guided - Use entire disk".
36. You will now see the following screen:
> ![Disk selection](/img/partman-auto_select_disk_0.png)
37. You should see 3 disks listed here - The lab computer's internal disk, your external SSD, and your installation USB flash drive. Note that the internal disk will have the label "/dev/nvme0n1" (or something similar) while your external SSD label should begin with "SCSI". **WARNING!! DO NOT SELECT THE LAB COMPUTER'S INTERNAL DISK. THIS WILL RENDER THE LAB COMPUTER UNUSABLE AND YOU WILL BE HELD RESPONSIBLE. YOU HAVE BEEN WARNED!** Select your external SSD and click "Continue". If you are uncertain about which disk to select, refer back to step 4 to double check which item on the list is your SSD. You can also double check with your professor.
38. For the "Partition scheme" select "All files in one partition" and click "Continue".
39. The next screen will show you a preview of the changes that will be made to the selected disk. Double and triple check that you have selected the correct disk. You should see something like this for your SCSI labeled external SSD:
> ![partition final check](/img/partman_choose_partition_0.png)
40. When you are confident that you have selected the correct disk, select "Finish partitioning and write changes to disk" and click "Continue".
41. On the next screen, under "Write changes to disk?" select "Yes" and click "Continue".
42. Next, select "Install the base system" and click "Continue".
43. For "Kernel to install", use the default value and click "Continue".
44. For "Drivers to include in the initrd" use the default "generic" drivers and click "Continue".
45. Next, select "Configure the package manager" and click "Continue".
46. For "Use a network mirror" select "Yes" and click "Continue".
47. For "Protocols for file downloads" select "http" and click "Continue".
48. For "Debian archive mirror country" select "Canada" and click "Continue".
49. For "Debian archive mirror" leave the default selection - "deb.debian.org" - and click "Continue".
50. Leave the "HTTP proxy information" blank and click "Continue".
51. For "Use non-free firmware" select "Yes" and click "Continue".
52. For "Use non-free software" select "No" and click "Continue".
53. For "Use contrib software" select "No" and click "Continue".
54. For "Enable source repositories in APT" select "No" and click "Continue".
55. For "Services to use" leave the default selections and click "Continue".
56. Select "Select and install software" and click "Continue".
57. For "Updates management on this system" select "No automatic updates" and click "Continue". (We will be updating our systems manually)
58. For "Participate in the package usage survey" select "No" and click "Continue".
59. On the next screen you will select what software to install with the base install. There are 4 items we need, 3 of which should already be selected. Check the "SSH server" box and you should have all 4 you need as shown below:
> ![softwareselection](/img/tasksel_first_0.png)
60. Double check that you have all 4 selected - Debian desktop environment, GNOME, SSH server, and standard system utilities. Click "Continue".
61. Select "Install GRUB boot loader" and click "Continue".
62. For "Force GRUB installation to the EFI removable media path" select "Yes" and click "Continue". **NOTE** This is very important! You will be unable to boot to your external hard drive from the Seneca lab computers if this is not set correctly.
63. For "Update NVRAM variables to automatically boot into Debian" select "No" and click "Continue". **NOTE** This is also very important! We must not alter the existing NVRAM settings on the Seneca lab computers!
64. For "Run os-prober automatically to detect and boot other OSes" select "No" and click "Continue".
65. Select "Finish the Installation" and click "Continue".
66. For "Is the system clock set to UTC?" select "Yes" and click "Continue".
67. Your system will now complete the installation and ask to reboot. Click "Continue" to reboot.

When it reboots, be prepared to bring up the boot menu again, just like you did in step 2. Now your boot menu should have 4 items:
> ![bootmenuafterinstall](/img/bootmenu2.jpg)

Because you installed Debian to your external SSD, it now shows up as a bootable item on this boot menu. 

**Note:** In the image above, the installation USB flash drive is labeled as "UEFI Kingston DataTraveler". The external SSD in the image above is labeled as "SABRENT". This is not the SSD itself, rather it is the label for the SATA-to-USB connector that you are using. If you are unsure of which one is your SSD, check your physical SATA-to-USB connector that connects your SSD to the Seneca lab computer. You will likely see its brand name somewhere on the connector. Look for that name in the boot list. Now you know which item is your external SSD.

Now, select your external SSD from the list of bootable drives. Put in the admin password when prompted and your new Debian install will load up.

When the system boots up you will be presented with a graphical login screen. Select your username enter your password

Then you will be presented with the "Welcome" application
- "Next" for English
- "Next" keyboard layout
- Turn off Location services and then "Next"
- "Skip" connecting your online accounts
- Click "Start Using Debian GNU/Linux"

You can now remove your bootable installation USB flash drive from the computer. If you only have one USB flash drive, you can reformat your flash drive for other uses later in this course. However, it is likely that some students will need to do a re-install of their host system at some point during the semester, so if you can it would be a good idea to keep this one as a bootable installer and use another flash drive for general storage. (Which will become important in Lab 2!)

## Investigation 3: Common Post-Installation Tasks

### **Enable the root account**

During the installation process, we left the "root" account disabled. Lets now enable that account.
All that is required is to set a password for the "root" account.

- Click on "Activities" or press the "Windows Key" to search for applications.
- Search for "terminal", right click on the terminal application and select "pin to dash"
- Open the terminal application to gain access to the bash shell.

To change the root password we need to use elevated or administrative permissions.

Our account has been given "sudo" access which means we can run a command with root permissions simply by preceding the command with `sudo`

- Type `sudo passwd` to run the passwd command as root. Then enter roots new password twice. (You will be required to enter your password to "unlock" sudo)

To test the account we can use the `su` command.
su is short for "switch user" and we can use it to start a new bash shell as another user. (Default: root)

- Type `su -`, you will be prompted for the root account password.
- Type `whoami` to confirm the switch and then `exit` to return to the previous shell.
- Type `whoami`
- Type `sudo whoami`, We now see there are two methods of accessing root permissions:
  - Using the `sudo` command at the beginning of our command line to run it as root. We are prompted for our own password to unlock sudo
  - Using the `su` command to start a new shell as root. We are prompted for the root account password.

We will use `sudo` to temporarily gain root privileges in order to run a command, but still be our normal user.
This method of obtaining elevated privileges has several advantages over logging in as root:

- First, it only requires each administrator to know their own password.
- Second, we can control exactly which commands a user is allowed to run as root (We will learn how to do this later in the course), instead of giving them access to everything.
- Third, the system will log any command that is run using sudo, so that it can be audited later in case something goes awry.

Because it is configurable to a fine degree, and because it provides for better security logging/accountability for System Admins, the preferred method of accessing root permissions is `sudo` . There are some circumstances where using the actual root account may be required.

> ![Caution](/img/caution.png)**Keep the root password and your regular user account password the same on this system and all of the VM's that you create in the labs.**
>
> In order to simplify running the lab checking scripts in future labs, using the same root password for ALL machines (debhost and virtual machines). Also use the same regular username and passwords for all of your machines (debhost and virtual machines).

> Do not do this in a production environment!

### **Changing Locked Screen-saver Power Settings**

Your system automatically enables a screen-saver application which is a useful security tool to prevent unauthorized viewing of information on a terminal after a certain amount of inactivity. Turning-off the locked screen-saver for this course however is more useful.

To Disable the Locked Screen-saver, Perform the following steps:

- Click on the power button at the top right-hand corner of the window.
- Click the Settings icon
- Click on Privacy
- Click on Screen and set "Blank Screen Delay" to Never
- Turn off "Automatic Screen Lock"

### **Test your internet connection**

- Open "Firefox" in debhost and test your Internet connection.
- Add Firefox bookmarks for the course web page and schedule.
- Add bookmarks for Blackboard and Outlook as well.

### **Perform a system update**

The primary source of software and programs that we can install in Debian is the online "repositories".

These repositories are online databases of different available software organized into "Packages".

The repositories and packages are maintained by Debian and they are maintained separately for each release.
We should check for updated packages frequently (at the beginning of each lab) as they often contain security updates and bug fixes.

To interact with the repositories and manage our software packages, we will use the `apt` command.

`apt` is the command line package management tool used by Debian and many other distributions of Linux.

To check for and install updated packages we need to use 2 separate `apt` commands:

- `apt update` will update the local copy of the repository database
- `apt upgrade` will check the database for packages that need to be updated, download them and install them along with any required dependencies.
- To make changes to the software on the system requires root privileges, so we will need to add `sudo` to the beginning of the command.
  We can also run both commands on a single command line.
- Type `sudo apt update && sudo apt upgrade`

Using && as a separator between the 2 commands will cause the 2nd command to execute only if the first command is successful.

>

> ![caution](/img/caution.png)**If the update results in an updated Linux Kernel then you will want to restart the system**

### **Safe Shutdown and Restart, and safely removing the external SSD**

> ![caution](/img/caution.png)**It is ABSOLUTELY ESSENTIAL that you do NOT remove your SSD drive during your Debian 12 session.**
>
> You are required to correctly shutdown your Debian 12 host as you would with any operating system.
>
> **FAILURE TO DO THIS MAY DAMAGE YOUR HOST AND NOT ALLOW IT TO BOOT PROPERLY (YOU HAVE BEEN WARNED).**
>
> - Click on the power icon in the top right corner of the display and then click on the power icon again
> - Click on Restart or Shutdown

### **What was installed?**

An installation log file called `/var/log/installer/status` has been created to record the installation of your debhost machine. This file is an ASCII text file which can be viewed with the `less` command.

- Type the command `less /var/log/installer/status` and browse the list of packages installed
- Type the command `man apt`
- Read the man page for the apt utility and figure out a command to list only the installed packages.
- How many packages were installed?

### **Customizing your desktop/shell**

- Explore the Appearance tab in the Settings app to personalize your desktop.
- Search for an App called "Tweaks" and use it to customize your Gnome Desktop
- Read and edit your `~/.bashrc` file and add an alias called `update` that will run the command line `sudo apt update && sudo apt upgrade`
- Both `nano` and `vi` are installed by default. You could/should also install `vim`
  - Type `sudo apt install vim`

### **Turning off AppArmor**

> ![caution](/img/caution.png)**Never disable AppArmor in the real world!!**
>
> It is highly discouraged and unsafe to disable AppArmor on a public-facing server.
> AppArmor is a Mandatory Access Control framework.
> When enabled, AppArmor confines programs according to a set of rules that specify what files a given program can access.
> This goes beyond the traditional protection of file system permissions and helps protect the system against both known and unknown vulnerabilities.
>
> Some of the tasks we will be doing may require additional and tedious steps to configure AppArmor to not prevent our changes.
> So for the purposes of this course we will disable AppArmor. It is quite safe to do so because we are operating in a VM so our host is not visible to the public Internet.

- Run the following commands to disable AppArmor:
  - `sudo systemctl stop apparmor`
  - `sudo systemctl disable apparmor`
- We will learn more about these commands later

## Investigation 4: Using Shell Commands to Generate System Information

It is very common for system administrators to keep records regarding their installed computer systems. For example, it is necessary to have a record of all the hardware information for each machine in order to help fix computer hardware problems, and to assist when purchasing additional consistent computer hardware.

Therefore, it makes sense to also have a record of the installed software and important system configurations as well. This can contain information regarding the Linux operating system, installed software, and network connectivity information.

**Perform the Following Steps:**

1. Refer to the table below for common system information utilities and explanations for each.
2. Run each of these commands, taking the time to _understand_ what each command's output means.
3. **Record the output** from these commands (except for the **ps -ef** output) in your lab logbook.

The [Bash Shell Reference Guide](/C-ExtraResources/bash-shell-reference-guide.md) is available to refresh your memory of last semester's ULI101.

**Linux/Unix System Information Utilities**

| **Command(s)**                                                                        | **Purpose**                                                                                                                                                    |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uname -rv`, `hostname`, `ps -ef`                                                     | Basic Linux OS information such as **kernel** version, **host-name** of Linux server, and all **processes** that are running on the system after installation. |
| `ip address show`, `ip route show`, `nslookup` (at prompt, enter command: **server**) | Obtain network connectivity confirmation including: **IP ADDRESS, Netmask, routing** (default gateway), and the default **Domain Name Server**.                |
| `date +'%A %B %d, %Y (%I:%M %p)'`                                                     | Get the current date and time according to the system. (If the date or time do not match your timezone, fix this in system settings for debhost!)              |

3. Note that when you are done, you should have recorded the following information in your Lab Logbook:

   - Current Date (according to debhost)
   - Hostname (ie. debhost)
   - Kernel version
   - IPv4 address
   - Subnet mask
   - Broadcast address
   - Default gateway address
   - DNS address

4. Review what you just wrote in your Lab Logbook. You should be able to understand them because you just put that content there, but what would this look like if you look at it several months from now? Make sure it's clear to future-you!

**Answer Investigation 4 observations (all parts and questions) in your lab log book.**

## Investigation 5: Using BASH Scripting to Generate System Information Reports

You may have learned about creating and running Bash Shell Scripts in your ULI101 course. Shell scripts help Linux users and system administrators to automate repetitive tasks to become more efficient and to help them save time. We can take what we have learned from the commands above and put them into a bash script to generate information reports for your newly-installed Linux host machine.

1. Create a new directory called "bin" in your home directory (~/bin) and then create a new file in your **~/bin** directory called **myreport.bash**
2. Populate the beginning of the file with sh-bang line and block comment describing what this script does:

```bash
#!/usr/bin/bash
# Author: *** INSERT YOUR NAME ***
# Date:   *** CURRENT DATE ***

# Purpose: Creates system info report
# USAGE: ./myreport.bash
```

3. Add a line that will print out the heading **System Report**

```
echo 'System Report'
```

4. Save your script and run it. Does it work?
5. You'll notice that the script is currently sending its output to your terminal (STDOUT). We can just use output redirection on the command line when you run the script to send the output to **~/bin/sysreport.txt**.
6. Open your script in a text editor (like vim) again, and add the following lines below the echo statement:

```
# Print a heading for the date command output
date=$(date +'%A %B %d, %Y (%I:%M %p)')
echo "Report Date:  $date"
```

7. Save your script and run it again. Observe the output?
8. Based on the previous investigation and output, add the extra commands for your script to also output (with appropriate headings):

   - The hostname of the machine.
   - The kernel version.
   - The IP address
   - The list of all installed packages.

9. Run your script to make sure it works. Note that the output does not need to match investigation 3 exactly, but it should be very close.
10. What other commands and information could we document? Perhaps a list of storage devices, partitions and mount points?

## Lab 1 Sign-Off

It is extremely important that you complete Lab 1 correctly as this Debian install will be the platform on which the rest of the course will be completed.

When you have completed Lab 1, ask your instructor to come and check your installation. **This must be done in class.** They will ask you to complete a set of tasks/commands. If everything has been completed correctly, your instructor will mark your Lab 1 as complete. 

## Practice For Quizzes, Tests, Midterm & Final Exam

1. List the major screens (steps) in the installation of Debian 12.
2. List the steps for updating the Debian software.
3. What is the **home** directory for the user "root"?
4. How do you determine the host name of your GNU/Linux workstation?
5. What command can display the NIC MAC address?
6. What command is used to get a list of running processes on your newly-installed system?
7. Write the Linux command to download the on-line file: http://linux.server.org/package.tar.gz
