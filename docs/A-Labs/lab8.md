---
id: lab8
title: Lab 8
sidebar_position: 9
description: TBD
---

# Lab 8: Setup and Configure a DHCP Server

## Lab Preparation

**DO NOT START THIS LAB BEFORE SUCCESSFULLY SUBMITTING LABS 1-7: This lab will change some system values that make previous lab checks fail. For best results, confirm with your professor before proceeding.**

### Overview

There are different ways in which computers can be networked together. Some computer networks (such as computer labs) configure their workstations for **static IP addresses for security and to provide other interesting features such as WOL** (Wake Up on Lan) which allows a signal from a computer system to remotely start all or specified workstations within the lab.

![DHCP Pic](/img/Dhcp-pic.png)

**Hot-spots (such as cafes or airport lounges) offer the ability for users to connect to the Internet (via** DHCP) f**rom their mobile devices (notebooks, netbooks, tablets, or smart phones). Finally, there are** hybrid **solutions that may offer both fixed IP address (computer workstations) and allow for wireless connections (via DHCP) to a mobile devices (like at your Seneca computer labs).**

In lab6, you learned to connect your VMs to a network using a fixed IP Address. In this final lab, you will learn to set-up a **DHCP server** to automatically assign IP Addresses upon connection requests.

**Main Objectives**

  - To install, configure, and test Internet Systems Consortium's (**ISC**'s) DHCP Server.
  - To obtain log information from DHCP server including lease address information.
  - To lease the same IP address every-time from VM boot-up (instead of having DHCP server randomly assign IP address).

### Minimum Required Materials

  - **Solid State Drive**
  - **USB key** (for backups)
  - **Lab8 Log Book**

### Linux Command Reference

**Networking Utilities**

- [dhcpd](http://linux.die.net/man/8/dhcpd)

**Managing Services**

- [systemctl](http://www.dsm.fordham.edu/cgi-bin/man-cgi.pl?topic=systemctl)

**Additional Utilities**

- [tail](http://man7.org/linux/man-pages/man1/tail.1.html)

**Configuration Files**

- [dhcpd.conf](https://www.freebsd.org/cgi/man.cgi?query=dhcpd.conf&sektion=5&apropos=0&manpath=FreeBSD+9.0-RELEASE+and+Ports)
- [dhcpd-options](http://linux.die.net/man/5/dhcp-options)
- [dhcpd.leases](http://linux.die.net/man/5/dhcpd.leases)
- [Configuring a DHCP Server](http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-dhcp-configuring-server.html)

## Investigation 1: Install And Configure A DHCP Server

This lab will demonstrate setting up a DHCP server. The term **DHCP** stands for **Dynamic Host Configuration Protocol**. DHCP allows computers (eg. workstations, notebooks, smart-phones) to be automatically configured so that they can communicate over a network. This automatic configuration has gained popularity over the years, especially as the need for detecting and configuring portable computer devices increases. DHCP configuration allows for various setups including: **Dynamic**, **Automatic**, and **Static** allocation.

![DORA](/img/Dora.png)

The term **DORA** best describes how DHCP Works:

| Term | Usage |
| --- | --- |
| **D**iscovery | The client broadcasts a **message** (IP lease request) on a sub-network to **discover** available DHCP servers. |
| **O**ffer | The DHCP server receives the request from the client, **reserves an IP ADDRESS** for the client and sends a **DHCPOFFER** to the client. |
| **R**equest | After receiving a **DHCPOFFER**, the DHCP client broadcasts a message **request for acceptance** (**DHCPREQUEST**) to all DHCP servers and, in doing so, the DHCP client notifies all DHCP servers which DHCP server this DHCP client is requesting acceptance from. |
| **A**cknowledgement | The DHCP server identified in the **DHCPREQUEST** sends a **message of acceptance to the client** and the client then receives from that DHCP server a **packet of information** containing the lease duration and other configuration information. |

### Part 1: Installation of a DHCP

**VM Backups and Yum Updates**

Before proceeding with this lab make certain that you have backed-up from lab7, and then perform a **yum update** on all machines (including your VMs)

**Perform the following steps:**

  1. Launch your c7host machine and your centos3 VM.
  2. Switch to your **centos3** VM.

        - The version of DHCP server that comes with CentOS is maintained and distributed by the **Internet Software Consortium** (https://www.isc.org/). The source package that you can download from ISC includes not only the DHCP server, but also a DHCP client and a DHCP relay agent. CentOS separates it into two RPM packages: the DHCP client package and the DHCP server package. The DHCP client package is installed by default by the workstation installation.

  3. To check that you have **dhcp** installed, enter the command:

```bash
rpm -qa dhcp
```

  4. If there are no files displayed, then issue the following command to install the dhcp server package:

```bash
sudo yum install -y dhcp
```

  5. Again, enter the command to list all the files installed from the DHCP server package by issuing the command:

```bash
rpm -qla dhcp
```

  6. Which file appears to be a sample (example) **configuration file for dhcpd.conf**?
  7. While you could copy the **dhcpd.conf.example** file to the **/etc/dhcp/dhcpd.conf**, it is recommended that you start a new **/etc/dhcp/dhcpd.conf** from scratch.

### Part 2: Configuring the DHCP Server

**Perform the following steps:**

  1. Remain in your **centos3** VM for this section.
  2. Click on the following link to access the online manual page for the following DHCP items to gain an understanding:

       - [dhcpd](http://linux.die.net/man/8/dhcpd)
       - [dhcpd.conf](https://www.freebsd.org/cgi/man.cgi?query=dhcpd.conf&sektion=5&apropos=0&manpath=FreeBSD+9.0-RELEASE+and+Ports)
       - [dhcpd-options](http://linux.die.net/man/5/dhcp-options)
       - [dhcpd.leases](http://linux.die.net/man/5/dhcpd.leases)

  3. Study the sample **dhcpd.conf** file to see examples of how these options are used.
  4. Review the contents of **/etc/dhcp/dhcpd.conf** file (see the picture) and examine the top section of the file.
  5. Be advised: "**option** definitions common to all supported networks". Change the existing global options with the newer values shown below, if the **dhcpd.conf** file is empty, add them manually:

```bash
option domain-name "ops245.org";
option domain-name-servers 192.168.245.1;
default-lease-time 1200;
max-lease-time 3600;
```

   - **Note**: Any values for time are stated in seconds.

  6. View your editing sessions for typos (check for missing semicolons), then save and exit your editing session.

![DHCP Config](/img/Dhcp-config.png)

The **dhcpd.config** file allows the Linux system administrator to customize the DCHP server. Generally in this file are **global settings** (options that apply throughout entire network) and **subnet declarations** (options that apply only to that subnet). Whenever changes are made to this file, the **DCHP service needs to be restarted** to allow new settings to take effect.

**NOTE: Any errors in this file (such as typos or missing semi-colons) can cause the DHCP server not to restart!**

### Part 3: Configuring DHCP Server for Static IP Addresses

**Recall Secure SSH Connection Method from Lab7**

Do not forget that you made ssh more secure in the previous lab. Therefore, you will need to use the same command in lab7 to securely connect to your VM.

**Perform the following steps:**

  1. Remain in your **centos3** VM for this section.
  2. Edit **/etc/dhcp/dhcpd.conf** for a second time.
  3. View this file for existing subnet declarations. Note the syntax and the directive for **range** and the option for **routers** (gateway).
  4. Now, add a new subnet declaration for your virtual network:

      - The network address is: **192.168.245.0/255.255.255.0**
      - range of host addresses should be from: **51 to 60**
      - default gateway (routers) for the virtual network is: **192.168.245.1**

  5. Save your editing session, and exit the text editor.
  6. Open another terminal window (**Tip**: **ssh** into your **centos3** VM from your **c7host** as **root**) and issue the following command:

```bash
tail -f /var/log/messages
```

   - (This will show you the last lines of **/var/log/messages** continue to display new lines as they are added to the log for confirmation and troubleshooting.)

  7. In your **centos3** terminal, attempt to start the **dhcpd** service.
  8. You should see new lines being added to the messages file.
  9. If the **dhcpd** service fails to start any error messages will be logged in the messages file. Read the errors and attempt to fix your configuration file.
  10. If the **dhcpd** service starts successfully you should see success messages in the log.
  11. If your **dhcpd** service starts successfully, try to generate errors by editing the configuration file and introduce an error by removing a semicolon or closing curly bracket.
  12. Restart your **dhcpd** service and observe the error messages generated. This is good practice to learn how to trouble-shoot and solve dhcpd errors.
  13. Make certain that you have corrected those errors, and that your dhcpd service works properly.
  14. Once the dhcpd service has is running, use the **systemctl** command to see if the dhcpd service is enabled (Hint: use a pipeline command using **grep** to detect the pattern: **enabled**). If it is not enabled, use the **systemctl** command to enable the dhcpd service so it started automatically upon boot-up.

**Troubleshooting Tip:**

Troubleshooting produces the best results when you are methodical in your approach. Try to fix the first error mentioned before fixing subsequent errors. Often the first error may cause multiple error messages as the configuration file is parsed. When you think you have fixed the first error try to start your service and if it fails check the log again. Fix one error at a time.

### Part 4: How do I test my dhcpd service on my virtual network?

**Identifying DHCP Lease Transaction Information**

These messages record the DHCP lease transaction that consists of 4 broadcast packets, DISCOVER, OFFER, REQUEST and ACKNOWLEDGE. Try researching on the internet how this transaction differs from a DHCP lease renewal.

**Perform the following steps:**

  1. Use your **centos1** and **centos3** VMs for this section.
  2. On your **centos3** terminal window (via ssh from your c7hsot machine) make sure that the command below is running

```bash
tail -f /var/log/messages
```

  3. On your **centos1** VM, Graphically change the configuration of **eth0** (or your interface name) to receive dynamic address configuration (i.e. via graphical application, for IVP4 tab, change _Address_ from **Manual** to **DHCP**, and **Apply** settings) ([Refer to Lab6, Investigation1, Part2](/A-Labs/lab6.md#part-2-configuring-network-for-centos1-vm)).

       - Note: if you are configuring via command line, make certain to restart the network for centos1.

  4. Logout and restart your **centos1** VM.
  5. Observe the messages that get logged from the tail -f command as your centos1 VM starts. You should see output similar to the following:

```bash
Mar 22 02:09:49 centos3 dhcpd: DHCPDISCOVER from 52:54:00:7c:85:13 via eth0
Mar 22 02:09:50 centos3 dhcpd: DHCPOFFER on 192.168.245.51 to 52:54:00:7c:85:13 (centos1) via eth0
Mar 22 02:09:50 centos3 dhcpd: DHCPREQUEST for 192.168.245.51 (192.168.245.13) from 52:54:00:7c:85:13 (centos1) via eth0
Mar 22 02:09:50 centos3 dhcpd: DHCPACK on 192.168.245.51 to 52:54:00:7c:85:13 (centos1) via eth0
```

  6. On your **centos1** VM, open a terminal, andconfirm the IP address assignment using

```bash
ip address show
```

  7. Has the IP Address changed? If so, how has the IP Address been assigned according to the **dhcpd.conf** file settings?

**Answer INVESTIGATION 1 observations / questions in your lab log book.**

## Investigation 2: Obtaining Lease and Lease Permanent IP Address Information

### Part 1: Obtaining Leased Address Infomation

**Purpose of dhcpd.leases File**

dhcpd records address leases in this file. If the service is restarted it reads in the file to know which addresses are currently leased and for how long.

**Perform the following steps:**

  1. Remain in your **centos1** and **centos3** VMs for this section.
  2. If your **centos3** DHCP server successfully issued the proper IP address configuration values to **centos1**, check the file called: **/var/lib/dhcpd/dhcpd.leases** in your **centos3** VM. You should get the similar contents:

```bash
lease 192.168.245.51 {
   starts 1 2021/03/22 01:07:00;
   ends 1 2021/03/22 01:27:00;
   cltt 1 2021/03/22 01:07:00;
   binding state active;
   next binding state free;
   rewind binding state free;
   hardware ethernet 52:54:00:ba:75:a8;
}
```

  3. On the client **centos1** check the contents of the **/var/lib/dhclient** directory. The files in this directory is where the dhclient stores its record of leases.

        - **NOTE**: If there are no files, then in a shell in your **centos1** VM issue the command: `sudo dhclient eth0`
        - Then check to see if there is file containing lease information in that directory. You should get the similar contents:

```bash
lease {
   interface "eth0";
   fixed-address 192.168.245.52;
   option subnet-mask 255.255.255.0;
   option routers 192.168.245.1;
   option dhcp-lease-time 1200;
   option dhcp-message-type 5;
   option domain-name-servers 192.168.245.1;
   option dhcp-server-identifier 192.168.245.13;
   option domain-name "ops245.org";
   renew 2 2021/03/22 02:23:06;
   rebind 2 2021/03/22 02:31:52;
   expire 2 2021/03/22 02:34:22;
}
```

**Answer Part 1 observations / questions in your lab log book.**

### Part 2: Configuring DHCP server to Continually Lease Same IP Address

**Reserving IP Addresses with DHCP**

Even though DHCP gives out IP address dynamically, it also has the ability to reserve an IP address for a certain computer. In this sense it's almost as if the client computer has a static IP even though it uses DHCP to get it. This is useful if you want to be able to put entries in your /etc/hosts file and not have to worry about the entry becoming invalid over time. In Linux we refer to this as supplying a fixed address to a host. Microsoft calls it a reservation.

**Perform the following steps:**

  1. Remain in your **centos1** and **cento3** VMs for this section.
  2. Make certain that you are located in your **centos3** virtual machine.
  3. Edit the dchpd.conf file and make the following changes:

       - Create a **host** declaration with the name: **centos1** (tip: search for the key-word "**host**" in the text editor to see an example, if it is empty, do a little research on the Internet).
       - Set the **hardware ethernet** option for the MAC address of the eth0 on your **centos1** VM.
       - Set the **fixed-address** option to the ip address: **192.168.245.42**
       - **Note**: When supplying fixed-address it is important that the address assigned is exclusive of any ranges that have been declared. Otherwise it may be possible for 2 different hosts to receive the same address.

  4. Restart the dhcpd service and test the address assignment by releasing your current address on **centos1** and then requesting a new address. Use the following commands on **centos1**:

```bash
ifdown eth0
```

```bash
ifup eth0
```

  5. Confirm that you received the fixed address you were supposed to.

**Answer INVESTIGATION 2 observations / questions in your lab log book.**

## Lab 8 Sign-Off (Show Instructor)

Follow the submission instructions for lab 8 on Blackboard.

**Time for a new backup!**

If you have successfully completed this lab, make a new backup of your virtual machines as well as your host machine.

**Perform the Following Steps:**

  1. Make certain ALL of your **centos1** and **centos3** VMs are running.
  2. Switch to your **c7host** VM and change to your user's **bin** directory.
  3. Issue the Linux command:

```bash
wget https://raw.githubusercontent.com/OPS245/labs/main/lab8-check.bash
```

  4. Give the **lab8-check.bash** file execute permissions (for the file owner).
  5. Run the shell script and if any warnings, make fixes and re-run shell script until you receive "congratulations" message.
  6. Arrange proof of the following on the screen:

- [x] **centos1** VM:

    + **ip address show** shows IP address **192.168.245.42**
    + DHCP client lease file

- [x] **centos3** VM:

    + DHCP server log file showing a lease occuring
    + DHCP server configuration file showing subnet and host declaration
    + DHCP server lease file

- [x] **Lab8** log-book filled out.

7. Upload a screenshot of the proof from the previous step along with your logbook, and the file generated by **lab8-check.bash**.

## Practice For Quizzes, Tests, Midterm, and Final Exam

1. What protocol and port does dhcp use?
2. What file is used to configure dhcpd?
3. Can a dhcp server also be a dhcp client?
4. What is the difference between max-lease-time and default-lease-time?
5. What unit of measurement does default-lease-time require?
6. What dhcp option is used for configuring a default gateway?
7. What is the parameter range in the DHCP server configuration file used for?
8. What is the purpose of a dhcp relay agent?
9. Why might a dhcp relay agent be required?
