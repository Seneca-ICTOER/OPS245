---
id: lab2
title: Lab 2
sidebar_position: 2
description: Lab 2
---

# Lab 2: Creating and Using Virtual Machines

## Lab Preparation

### Purpose / Objectives of Lab 2

In this lab, you will create 3 remaining virtual machines using another virtualisation program called **KVM** that will run in your debhost VM. These VMs will be used throughout the remainder of this course to learn how to administer them (installing software, managing services, networking, etc).

While you are performing this lab, it is recommended to generally note the major differences in the different installation methods, and which method you prefer to use if you were a Linux system administrator in charge of installing many Linux distributions for an organization.

**Main Objectives**

- Installing additional Virtualisation Software on your **debhost** machine (**KVM**)
- Create 3 separate VMs (virtual machines) using different installation methods:

  - **deb1**: Network Debian Installation (**Graphical Desktop Environment**)
  - **deb2**: Network Debian Installation (minimal install - **CLI only**)
  - **deb3**: Network Debian Installation deployed using Ansible playbook file (**CLI only**)

- Manipulate virtual machines by CLI (**virsh**)
- Properly **backup VM images** and backup **VM configuration files**
- Create and run **Bash Shell scripts** to automatically backup our installed VM's

![Lab Environment](/img/labenv.png)

At the end of Lab 2, your VirtualBox application will contain **4 virtual machines** (**debhost** in your **VirtualBox** application, and **deb1, deb2, deb3 VMs** in your **KVM** application). You will now have the option to run one virtual machine at a time, or run all machines simultaneously to learn about networking (covered in later labs)

### Minimum Required Materials

1. **Solid State Drive**
2. **USB key** (for backups)
3. **Lab2 Log Book**
4. **Debian 12 netinst ISO**

### Linux Command Reference

**Virtualization:**

- [virt-manager](http://linux.die.net/man/1/virt-manager)
- [virsh](http://linux.die.net/man/1/virsh)

**Installation Guides:**

- [Installing & Using KVM on Debian](http://wiki.Debian.org/KVM)
- [Using KVM (tutorial)](http://www.dedoimedo.com/computers/kvm-intro.html)
- [virsh command reference](https://libvirt.org/sources/virshcmdref/html-single/)

**Miscellaneous**

| [gzip , gunzip](http://linuxcommand.org/lc3_man_pages/gzip1.html) | [ip](http://man7.org/linux/man-pages/man8/ip.8.html) | [grep](http://man7.org/linux/man-pages/man1/grep.1.html) | [wc](http://man7.org/linux/man-pages/man1/wc.1.html) | [pwd](http://man7.org/linux/man-pages/man1/pwd.1.html) | [ls](http://man7.org/linux/man-pages/man1/ls.1.html) | [more](http://man7.org/linux/man-pages/man1/more.1.html) | [file](http://man7.org/linux/man-pages/man1/file.1.html) | [wget](http://man7.org/linux/man-pages/man1/wget.1.html) | [chmod](http://man7.org/linux/man-pages/man1/chmod.1.html) | [vi](http://ss64.com/vi.html) |
| ----------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------- |

## Investigation 1: Setup For Nested Virtual Machines

### Part 1: Install KVM Virtualisation Application

We will now install the KVM package in order to create our remaining "nested" VMs. We will also be starting several services (including iptables) and disabling the firewalld service. We will learn more about managing firewalls using iptables in Lab 6.

**Perform the following steps:**

1. Log into your `debhost` machine.
2. perform a software update on your debhost VM by issuing the following command:

```bash
sudo apt update && sudo apt upgrade
```

3. Install the qemu-system libvirt-daemon-system, virtinst, and virt-manager packages

```bash
sudo apt install qemu-system libvirt-daemon-system virtinst virt-manager
```

**About KVM**

There are actually several key programs installed for virtualisation using KVM:

- **kvm/qemu** - the hypervisor and other hardware emulation systems.
- A system service named **libvirtd** that manages the VMs.
- A graphical tool for managing virtual machines (**virt-manager**) and the **virsh** command-line tool.

4. **Restart your debhost virtual machine**. If you fail to do this, you may experience virtualisation network problems.
5. Now we will confirm the status of the "libvirtd" virtualisation service:

```bash
sudo systemctl status libvirtd
```

![libvirtdstatus](/img/libvirtdstatus.png)

In the screenshot above you can see the first "enabled" indicates that this service will start automatically when the system starts.
The "preset: enabled" indicates that "enabled" is the default when this service is first installed by apt.
The "inactive (dead)" indicates that the service is not currently running.

We want the service to be "enabled" and "active":

**Make note of the following commands for working with services:**

```bash
# To enable a service
sudo systemctl enable <servicename>

# To start a service
sudo systemctl start <servicename>

# To enable and start a service at the same time
sudo systemctl enable --now <servicename>

# To disable a service
sudo systemctl disable <servicename>

# To stop a service
sudo systemctl stop <servicename>

# To restart a service
sudo systemctl restart <servicename>

# To see the status of a service
sudo systemctl status <servicename>
```

6. Issue the correct commands to make sure that the "libvirtd" service is both "active" (started) and "enabled" (will start automatically at boot)

   > ![caution](/img/caution.png)
   > The behaviour of the **libvirtd** service on Debian Linux is for the service to stop when not in use and restart when required.

   >

7. In order to manage VMs your user account needs to be added to the "libvirt" group

```bash
sudo usermod -aG libvirt <username>
```

8. Logout of the desktop and log back in again. (A reboot is NOT required)

9. Start the graphical `virt-manager` tool by clicking "Activities " and searching for "virt-manager".
10. Right click on the icon and "Pin to dash" and then run the application or by typing the command `virt-manager` (without sudo!)
11. Confirm that "debhost" is configured to allow nested virtualisation:

```bash
# If you have an Intel CPU the following should output "Y"
sudo cat /sys/module/kvm_intel/parameters/nested

# If you have an AMD CPU the following should output "1"
sudo cat /sys/module/kvm_amd/parameters/nested
```

You will be learning in the next investigations to perform 3 different types of Debian Linux installs.

## Investigation 2: Install Nested Virtual Machines (KVM)

> ![caution](/img/caution.jpg)**Keep the root password the same for Host and VMs**
>
> In order to simplify running the lab checking scripts in future labs, using the same root password for ALL machines (debhost and virtual machines). Also use the same username and passwords for all of your machines (debhost and virtual machines).

### Part 1: Setting up the Virtual Network

Once we have installed our 3 VM's we will want to configure them to be able to communicate on the same network.
KVM has setup a default virtual network for us to use but it is not configured to start automatically. We will also need to make sure the correct firewall and routing rules are added so that everything works.
Lets start by gathering information

1. Open a terminal window in debhost and run the following command to display the networks that debhost is connected to.

```bash
# List the networks connected and our IP address for each network interface
ip address
```

![ipaddr](/img/ipaddr.png)

2. Run the following command to list the current firewall/routing rules.

```bash
# List the iptables rules
sudo iptables -L
```

![iptables1](/img/iptables1.png)

3. Open virt-manager
4. Select the QEMU/KVM connection and then click on Edit --> Connection Details
5. Select the Virtual Networks tab
6. Check the "Autostart: On Boot" and then click Apply
7. Close virt-manager and reboot. You can use the command `sudo reboot` or the graphical option.
8. Open a terminal window and rerun the previous commands to list network addresses and iptables rules
   ![ipaddr2](/img/ipaddr2.png)
   ![iptables2](/img/iptables2.png)
   You can see that debhost has connected to the virtual network and iptables rules have been added to configure access to that network.

### Part 2 Installing deb1

**VM Details:**

- **VM Name (and hostname)**: deb1
- **Debian Network Install with Graphical Desktop Environment**:
- **VM Image Pathname**: /var/lib/libvirt/images/deb1.qcow2
- **Memory**: 2048MB
- **Disk space**: 15GB
- **CPUs**: 2

> ![caution](/img/caution.png) It would be best to download a local copy of the Debian "netinst" ISO
>
> [Download Debian](https://www.debian.org/download)

**Perform the following steps:**

1. Launch `virt-manager`.
2. Click the **Create a new VM icon** located near the top left-corner of the application window.
3. Select the **Local install media** option and click **Forward**.
4. Browse to the location of your ISO image. (probably ~/Downloads) and select the iso image
5. If the Operating System is not auto detected, uncheck the **"Automatically detect from the installation media"** and Choose **Debian 11**, and click **Forward**.

![vmsource](/img/vmsource.png)

6. If a **"search permissions"** dialog box opens, Check **"Don't ask about these directories again"** and click **yes**

![searchperms](/img/searchperms.png)

7. Set **Memory**: size to **2048** MB and **CPUs** to **2**, then click **Forward**.
   ![memcpu](/img/memcpu.png)

8. Set **Hard Disk** size to **15** GB and click **Forward**.
9. Enter the Name: **deb1**, AND then select the option: **Customize configuration before install**, and click **Finish**.
10. Another dialog will appear. Click **CPUs** (or "processors") and on right-side under Configuration select **Copy Host CPU Configuration**, click **Apply**, and then click **Begin Installation** at the top left-hand side.
11. When the installer starts select ""Graphical Install" and press enter

    > **NOTES**
    >
    > - To have the VM "capture" the keyboard and mouse input click on the viewer window
    > - To release the keyboard and mouse from the VM use **left-ctrl+left-alt**
    > - To make the VM easier to display, click on **View --> Scale Display --> Always** > ![scale](/img/scale.png)

12. Select **English** as the language
13. Select **Canada** as the location
14. Select **American English** as the keyboard
15. Enter a **Hostname** of **deb1**
16. Leave the **Domain name**: _blank_
17. **Do NOT set a root password**

    > ![caution](/img/caution.png) > **Remember to user the same username and password on all of your VM's**

18. Enter your **Full name**
19. Enter your **Username**
20. Enter your **password** twice.
21. Select the **Eastern** time zone
22. When asked for **Partitioning method**: choose **Guided - use entire disk and setup LVM**
23. Select **Virtual disk 1(vda)**
24. Select **All files in one partititon**
25. Select **yes** to **Write the changes to disk and configure LVM**
26. Accept the default **Amount of volume group to use for guided partitioning**
    ![deb1part](/img/deb1part.png)

27. Your storage should be configured as shown above. Select **Finish partitioning and write changes to disk**
28. Select **Yes** to **Write the changes to disks**
29. Select **No** to **Scan extra installation media**
30. Select **Canada** as your **Debian archive mirror country**
31. Select **deb.debian.org** as your **Debian archive mirror:**
32. Leave **HTTP proxy information** as _blank_
33. Select **No** to **Participate in the package survey**
34. On the **Software Selection Screen** uncheck **Gnome** and select **Cinnamon** instead. Also select **SSH Server**
    ![softsel](/img/softsel.png)

35. Select **Yes** to **Install the GRUB boot loader**
36. Select **/dev/vda** as the **Device for boot loader installation**
37. When the installation is complete **Reboot**
    > ![caution](/img/caution.png)
    > You may need to go into the VM details and remove the media from the **CDROM** device
38. Repeat the steps as you did in Lab 1 to **set the root account password**, **perform a system update**, and **disable AppArmor**.
39. Issue the following command to obtain the IPv4 address for your deb1 VM to record in your Lab 2 logbook:

```bash
ip address show
```

40. Explore the Cinnamon Desktop Environment.

### Part 3: Installing deb2 (Non-Graphical Install)

**VM Details:**

- **VM Name (and hostname)**: deb2
- **Debian Network Install with TTY (command line) Interface only**:
- **VM Image Pathname**: /var/lib/libvirt/images/deb2.qcow2
- **Memory**: 2048MB
- **Disk space**: 20GB
- **CPUs**: 1

**Perform the following steps:**

1. Create the VM (called **deb2**) as you did with the **deb1** VM.
2. Launch `virt-manager`.
3. Click the **Create a new VM icon** located near the top left-corner of the application window.
4. Select the **Local install media** option and click **Forward**.
5. Browse to the location of your ISO image. (probably ~/Downloads) and select the iso image
6. If the Operating System is not auto detected, uncheck the **"Automatically detect from the installation media"** and Choose **Debian 11**, and click **Forward**.
7. Set **Memory**: size to **2048** MB and **CPUs** to **1**, then click **Forward**.
8. Set **Hard Disk** size to **20** GB and click **Forward**.
9. Enter the Name: **deb2**, AND then select the option: **Customize configuration before install**, and click **Finish**.
10. Another dialog will appear. Click **CPUs** (or "processors") and on right-side under Configuration select **Copy Host CPU Configuration**, click **Apply**, and then click **Begin Installation** at the top left-hand side.
11. When the installer starts select ""Graphical Install" and press enter
12. Select **English** as the language
13. Select **Canada** as the location
14. Select **American English** as the keyboard
15. Enter a **Hostname** of **deb2**
16. Leave the **Domain name**: _blank_
17. **Do NOT set a root password**

    > ![caution](/img/caution.png) > **Remember to user the same username and password on all of your VM's**

18. Enter your **Full name**
19. Enter your **Username**
20. Enter your **password** twice.
21. Select the **Eastern** time zone
22. When asked for **Partitioning method**: choose **Guided - use entire disk and setup LVM**
23. Select **Virtual disk 1(vda)**
24. Select **Separate /home partititon**
25. Select **yes** to **Write the changes to disk and configure LVM**
26. Accept the default **Amount of volume group to use for guided partitioning**
    ![deb2part](/img/deb2part.png)
27. Select **Yes** to **Write the changes to disks**
28. Select **No** to **Scan extra installation media**
29. Select **No** to **Participate in the package survey**
30. On the **Software Selection Screen** uncheck **Debian desktop environment** and **Gnome**. Also add the selection **SSH Server**
    ![softsel2](/img/softsel2.png)

31. Select **Yes** to **Install the GRUB boot loader**
32. Select **/dev/vda** as the **Device for boot loader installation**
33. When the installation is complete **Reboot**
    > ![caution](/img/caution.png)
    > You may need to go into the VM details and remove the media from the **CDROM** device
34. Repeat the steps as you did in Lab 1 to **set the root account password**, **perform a system update**, and **disable AppArmor**.
35. Issue the following command to obtain the IPv4 address for your **deb2** VM to record in your Lab 2 logbook:

```bash
ip address show
```

### Part 4: Installing deb3 using Ansible

## Investigation 3: Managing Virtual Machines (KVM)

**Root Privileges**

As part of this investigation you will learn how to switch over to the root account in order to run several privileged commands in sequence. It can be tempting to just use this technique all the time, and never have to worry about sudo, but do **not** do so. It undermines the security of your system. Use it only when you need it.

### Part 1: Backing Up Virtual Machines

> ![caution](/img/caution.png)
> Taking the time to backup the image of the Virtual Machines filesystem allows the user to return to a "**restoration point**" using the **gunzip** command.
>
> This allows us to recover in case something bad occurs during a Lab!
>
> Failure to take the time to make and confirm backups can result in loss of lab work for the student!
>
> There are three general steps to back up your Virtual Machines:

- Shutdown the VM
- Create a compressed copy of your **Disk Images** using the **gzip** command.
- Backup the VM xml configuration using the **virsh** shell command.

> The `virsh` command is a command line tool/shell for managing VM's
> We use it to connect to the hypervisor and then interact with our VM's
>
> In order to use the **virsh** command as a regular user to connect to our VM's we must configure an ENVIRONMENT variable.
>
> Edit the file `~/.bashrc` as your regular user on `debhost`
>
> Add the following to the file
>
> ```bash
> # virsh connection variable
> export LIBVIRT_DEFAULT_URI='qemu:///system'
> ```
>
> Logout and login again to `debhost`
>
> The following example `virsh` commands will be useful
>
> ```bash
> # List all running (active) VM's
> virsh list
>
> # List all inactive VM's
> virsh list --inactive
>
> # List all VM's (active or not)
> virsh list --all
>
> # Start a VM
> virsh start <vmname>
>
> # Shutdown a VM
> virsh shutdown <vmname>
>
> # Force off a VM (if shutdown fails)
> virsh destroy <vmname>
>
> # Display the xml data that defines the VM configuration
> virsh dumpxml <vmname>
>
> ```
>
> To view the VM in a window without using `virt-manager`
>
> ```bash
> # Open VM in viewer window
> virt-viewer <vmname> &
>
> ```

**Perform the following steps:**

1. Login to a terminal on `debhost` as your regular user
2. Shut down your **deb1**, **deb2**, and **deb3** VMs.
   > ![caution](/img/caution.png)
   > You can shutdown the VM's from the user interface, (For _deb2_ and _deb3_, which are CLI-only, you can issue the following command to shutdown: `sudo poweroff`, or you can use the `virsh` command.
   > Please be patient, the VMs will shut down!
3. Create a directory for your backups. `mkdir ~/backups`
4. Enter the command `virsh dumpxml deb1`

   This command will output the xml data that is used to define (create) this VM
   If we save this output we could use that xml data to recreate the VM

5. Enter the command `virsh dumpxml deb1 > ~/backups/deb1.xml` to save a copy of the output.
6. Enter 2 more commands to save the xml data for `deb2` and `deb3`

   Backing up the xml data only has to be done when the VM is created, or if the configuration is modified.

7. We will need to use elevated privileges to backup our disk image files from the default location of `/var/lib/libvirt/images/`
8. Use the command `sudo -i` and enter your password if prompted.

> `sudo -i` will start a new shell as the root user, you can run a number of commands and then type `exit` to return to your previous shell.

9. Change to the images directory: `cd /var/lib/libvirt/images/`. Note that you did not need to use sudo, as you are already using elevated permissions.
10. Type `ls -l` to see the contents
11. To make a compressed copy of your **deb1.qcow2**, **deb2.qcow2**, and **deb3.qcow2** files we will use the `gzip` command.

    The `gzip` command will compress the file in place and rename the file with a `.gz` extension.
    However, this will make the file unusable and doesn't create a copy. We will use STDIN and STDOUT redirection to overcome this.

12. Issue the commands:

```bash
gzip < deb1.qcow2 > ~YourRegularUsername/backups/deb1.qcow2.gz

gzip < deb2.qcow2 > ~YourRegularUsername/backups/deb2.qcow2.gz

gzip < deb3.qcow2 > ~YourRegularUsername/backups/deb3.qcow2.gz
```

**NOTE**: Make certain to use the redirection signs "<" and "\>" properly in the command!

> ![caution](/img/caution.png)**Please be patient**
>
> It may look like the command prompt is stuck but it could take a while for gzip to compress an entire operating system.
>
> **NOTE**: Do **NOT** press `<ctrl>c` to cancel this process. If you do, your archive will become incomplete and your recovery will be corrupt.

13. Compare the size of the compressed and original files (hint: use `ls -lh`). If file is very large (like 15GB), you didn't compress it and you need to remove that file and perform the previous step until you get it right!
14. Once you are **sure you have all three VM disk images backed up**, use the `exit` command to revert back to your normal user.

### Part 2: Testing the backup

1. Start the **deb3** VM and login.
   > ![caution](/img/caution.png) **THIS WILL DESTROY YOUR SYSTEM**
   >
   > **Make certain that you are in your `deb3` VM and not in `debhost`!**
1. Type this command inside the deb3 virtual machine: `sudo rm -rf /*` (ignore error messages).
1. Type the command `sudo poweroff`, try other commands.
1. Force the VM to poweroff and restart
1. When the machine restarts it will not boot since all system files have been removed!
1. Use the **Force Off** option to turn deb3 back off.
1. Run `virt-manager` right click on the `deb3` VM and select **Delete** make sure that **Delete associated storage file** is selected and **Delete**

   `deb3` is now completely gone. Time to test the backup!

1. To restore the VM configuration:

```bash
# List all VM's
virsh list --all

# Define a VM from xml data
virsh define ~/backups/deb3.xml

# List all VM's
virsh list --all
```

8. To restore the `deb3` disk image file:

```bash
# Start a sudo shell
sudo -i

# Change to images directory
cd /var/lib/libvirt/images

# Restore file
gunzip < ~YourRegularUserName/backups/deb3.qcow2.gz > deb3.qcow2

# Return to previous shell
exit

```

9. Start the `deb3` VM and login to make sure it was successfully restored

### Part 3: Restoring Virtual Machines

1. We will now download a compressed image file and XML configuration file and add it as a VM to the Virtual Machine Manager menu.
2. Issue the following commands:

```bash
# Change to ~/backups
cd ~/backups

# Download disk image
wget https://matrix.senecacollege.ca/~ops245/centos4.qcow2.gz

# Download xml data
wget https://matrix.senecacollege.ca/~ops245/centos4.xml
```

3. Use the same procedure as above in Part 2, use `gunzip` with elevated privileges to decompress the qcow2 image file into the **/var/lib/libvirt/images** directory, and define a VM from the xml file.

4. What happened in the `virt-manager` window?
5. In order to remove a VM entry in the Virtual Manager window, simply issue the command `virsh undefine <vmname>` without the **.xml** file extension
6. Start up your `centos4` VM.
7. Click on the user _OPS245_, and login with the password **ops245**.

> ![caution](/img/caution.png)**Shutting Down the Host while Virtual Machines are Running**
>
> If you shut down your host system while virtual machines are running, they will be suspended, and will resume the next time you boot your host system. Note that it is better to shut down the VMs prior to shutting down the host

8. For the remainder of these labs, it is assumed that you will backup **both** the images and XML configuration files for **all** Virtual machines, when asked to backup your virtual machines. It is also highly recommended to backup these files to an external storage device (eg. USB key) in case the host machine gets "wiped" and you need to rebuild your HOST machine and then restore your Virtual Machines...
9. Answer this question in your log book:

   - In order to fully back up a virtual machine, what information should be saved in addition to the virtual machine image?

10. You can now safely remove the `centos4` VM and it's disk image. They are no longer needed.

**Answer INVESTIGATION 3 observations / questions in your lab log book.**

## Investigation 4: Using Python To Automate Managing Virtual Machines

This week you have added some significant capabilities to your python scripting. The ability to run loops and make decisions makes your scripts much more powerful. In this investigation you will write a python script that backs up the deb1, deb2, and deb3 VMs, or lets the user specify which VMs they want backed up.

**Please take a look at these [Python Scripting Tips](/C-ExtraResources/python-scripting-tips.md) before continuing with the steps below**

1. In your **bin** directory, create the file **backupVM.py**, and populate with our standard beginning

```python
#!/usr/bin/env python3
# backupVM.py
# Purpose: Backs up virtual machines
#
# USAGE: ./backupVM.py
#
# Author: *** INSERT YOUR NAME ***
# Date: *** CURRENT DATE ***
import os
currentuser = os.popen('whoami')
if currentuser.read() != 'root':
  print("You must be root")
  exit()
else:
  print('Backing up deb1')
  os.system('gzip < /var/lib/libvirt/images/deb1.qcow2 > ~YourRegularUsername/backups/deb1.qcow2.gz')
  print('Backing up deb2')
  os.system('gzip < /var/lib/libvirt/images/deb2.qcow2 > ~YourRegularUsername/backups/deb2.qcow2.gz')
  print('Backing up deb3')
  os.system('gzip < /var/lib/libvirt/images/deb3.qcow2 > ~YourRegularUsername/backups/deb3.qcow2.gz')
```

2. Try to run that script. You'll notice it does not work. No matter what you do, it always says you are not root.
3. Modify the print statement that tells the user they must be root to also include the current username, then run the program again.
4. It should print out root, but with an extra new-line. You may have noticed this in your other python scripts so far: the data we get from os.popen() has an extra new-line on the end. We will need to modify the string(s) it gives us a bit. See the side-bar for hints on how to do so.
5. Modify the if statement so it is just getting the current username, not the username and a newline. You can do this using several steps and several variables, but it can also be done in a single line.
6. Test your script to make sure it works. If it doesn't, go back and fix it. **Do not continue until it successfully makes backups of your VMs**.
7. There is a weakness to this script as written. Every time you run it, it will make a backup of all three VMs. But what if you only made a change to one of them? Do we really need to wait through a full backup cycle for two machines that didn't change? As the script is currently written, we do. But we can make it better. We've provided the scripts with some comments below.

8.

```python
#!/usr/bin/env python3
# backupVM.py
# Purpose: Backs up virtual machines
#
# USAGE: ./backupVM.py
#
# Author: *** INSERT YOUR NAME ***
# Date: *** CURRENT DATE ***
import os

#Make sure script is being run with elevated permissions
currentuser = os.popen('whoami').read().strip()
if currentuser != 'root':
  print("You must be root")
  exit()
else

#The rest of this script identifies steps with comments 'Step <something>'.
#This is not a normal standard for commenting, it has been done here to link the script
# to the instructions on the wiki.

#Step A: Find out if user wants to back up all VMs
#Step B-1:use the existing loop to back up all the VMs
  print('Backing up deb1')
  os.system('gzip < /var/lib/libvirt/images/deb1.qcow2 > ~YourRegularUsername/backups/deb1.qcow2.gz')
  print('Backing up deb2')
  os.system('gzip < /var/lib/libvirt/images/deb2.qcow2 > ~YourRegularUsername/backups/deb2.qcow2.gz')
  print('Backing up deb3')
  os.system('gzip < /var/lib/libvirt/images/deb3.qcow2 > ~YourRegularUsername/backups/deb3.qcow2.gz')
#Step B-2: They don't want to back up all VMs, prompt them for which VM they want to back up
#Step C: Prompt the user for the name of the VM they want to back up
#Step C-1: If the user chose deb1, back up that machine.
#Step C-2: If the user chose deb2, back up that machine.
#Step C-3: If the user chose deb3, back up that machine.
```

9. Before the block that backs up each machine add a prompt to ask the user if they want to back up all machines. Use an if statement to check if they said yes (See comment 'Step A').

   - if they did say yes, back up all the VMs using your existing block (Comment step B-1).
   - If they didn't say yes, do nothing for now (you could even use python's pass statement).

10. Test your script to make sure it works. Check what happens if you say 'yes' to the prompt, and check what happens if you say things other than 'yes'.
11. Now we have a script that asks the user if they want to back up all VMS, and if they say they do, it does. But if they don't want to back up every VM, it currently does nothing.
12. Add an else statement at comment Step B-2 to handle the user not wanting to back up every VM. Inside that else clause (Comment step C) ask the user which VM they would like to back up (you can even give them the names of available VMs (deb1, deb2, deb3).
13. Now nest an if statement inside that else (Comments C-1, C-2, and C-3) so that your script can handle what your user just responded with. If they asked for deb1, back up deb1. If they want to back up deb2, only back up deb2, etc. Hint: You might want to use elif for this.
14. Test your script again. You should now have a script that:

    - Makes sure the user is running the script with elevated permissions.
    - Asks the user if they want to back up every VM.
    - If they want to back up every VM, it backs up every VM.
    - If the user does not want to back up every VM, the script asks them which VM they do want to back up.
    - If the user selected a single VM, the script will back up that one VM.
    - Now you may notice another issue with the script: The gzip lines are almost identical. The only difference in them is the name of the VM file being backed up. In the portion of code where you back up each machine individually (comment steps C-1, C-2, and C-3) try replacing the machine name in the gzip command with a string variable that holds the machine's name instead. Note that you will have to make us of string concatenation for this to work correctly.

## Lab 2 Sign-Off (Show Instructor)

Follow the submission instructions for lab 2 on Blackboard.

**Backup ALL of your VMs!**

If you have successfully completed this lab, make a new backup of all of your virtual machines onto your USB Key.

**Perform the Following Steps:**

1. Use the **virsh start** command to launch all the VMs (**deb1**, **deb2**, and **deb3**).
2. Inside each virtual machine, run `ip a` on the command line. Open a Terminal window in deb1 to do so. You'll need the IP address of each machine for the next steps.
3. Switch to your **debhost** VM, open a terminal, login as root, and change directory to **/root/bin**.
4. Issue the Linux command:

```bash
wget https://raw.githubusercontent.com/OPS245/labs/main/lab2-check.bash
```

5. Give the **lab2-check.bash** file execute permissions (for the file owner).
6. Run the shell script and if any warnings, make fixes and re-run shell script until you receive "congratulations" message.
7. Arrange proof of the following on the screen:

- [x] **All VMs**:

  - All 4 nested VMs **created** and **running**
  - Proof of **yum updates** on ALL VMs (i.e. results from **yum update** command)

- [x] **debhost VM:**

  - Run the **lab2-check.bash** script in front of your instructor (must have all `OK` messages)

- [x] Lab2 logbook notes completed.

8. Upload a screenshot of the proof listed above, the output file generated by the lab2-check.bash script, your log book, and your backupVM.py to blackboard.

## Practice For Quizzes, Tests, Midterm & Final Exam

1. What is the name of the Debian installation program?
2. What is the name of the file created by the Debian installation program?
3. Which type of installation works best for confirming compatibility with hardware before installation? Why?
4. Which type of installation works best for installing large numbers of computers? Why?
5. How can you reduce the number of software updates required immediately after installation?
6. How do you start and stop virtual machines?
7. How do you SSH into your virtual machines?
8. List the steps to install a VM from:

   - Downloaded iso file
   - Network install (without kickstart file)
   - Network install (with kickstart file)

9. What is the purpose of the virsh command?
10. How to start and stop VMs using the virsh command?
11. List the steps to correctly backup your VMs to a USB disk
12. List the steps to correctly restore your VMs from a USB disk to your debhost VM.
13. How can you prompt the user for data and store into a variable?
14. Show a few examples how loops can be used to error-check when prompting the user for data.
15. What does the command **rpm -qi Debian-release** do and why is it important?
16. What is the difference between **rpm -q Debian-release** and **uname -a**?
