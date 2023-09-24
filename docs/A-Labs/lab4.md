---
id: lab4
title: Lab 4
sidebar_position: 5
description: Lab 4
---

# Lab 4: Users, Groups and Services

## Lab Preparation

### Purpose / Objectives of Lab 4

There are many other tasks that a Linux system administrator must perform other than installing Linux and installing software.

User account management is a very important task that a Linux sysadmin does on an continual basis. The sysadmin not only needs to add or remove user accounts by issuing commands, but may need to automate user account creations for a large number or batch of accounts at once.

There are many user account attributes that can be managed using the various commands including: specification of a home directory, type of shell used, name, password and time-limit (referred to as "aging") for a new user account.

Removing user accounts is also discussed.

> ![caution](/img/caution.png) Account management is a serious function and may be closely related to other parts of your organization and it's policies. e.g. In the event of an employee being terminated for "wrong doing"", there may be reasons for data and log files to be retained for investigation purposes

Another important operation for a Linux sysadmin is to manage services (eg. starting, restarting, stopping, disabling, enabling system services). Many students may think that the following topic is small and "not a big deal". Those students may say, "**How hard is running and stopping services**?"

The process may not be hard, but knowing how to stop, start, restart and check the status of services is absolutely critical to a Linux server administration. **Aside from learning to trouble-shoot problems** by checking the status of running services, **understanding how to manage services is critical to help protect a Linux server from penetration** (this term is referred to as "**Hardening a system**"). One key element in hardening a computer system is to disable non essential networking services to allow IDSs (**Intrusion Detection Systems**) to focus on a narrower range of policy violations.

There are a variety of tools available for linux systems that allows sysadmins and security professionals to identify vulnerabilities in their computer systems, and thus improve (harden) their systems against penetration.

**Main Objectives:**

- Administer (**add, remove, modify**) **users** on a Linux system.
- Save time while adding new users using a template of **start-up files**.
- Create and manage **groups** on a Linux system.
- **Start, Restart and Stop services** on a Linux system.
- **Enable and Disable services** on a Linux system.
- Display the **status of running services** on a Linux system.
- Create a bash shell script to **generate multiple user accounts** from a text user database file

### Minimum Required Materials

- **Solid State Drive**
- **USB key** (for backups)
- **Lab4 Log Book**

### Linux Command Reference

**User Management**

| [useradd](https://www.systutorials.com/docs/linux/man/8-useradd/) | [userdel](https://www.systutorials.com/docs/linux/man/8-userdel/) | [usermod](https://www.systutorials.com/docs/linux/man/8-usermod/) | [groupadd](https://www.systutorials.com/docs/linux/man/8-groupadd/) | [groupdel](https://www.systutorials.com/docs/linux/man/8-groupdel/) | [chage](http://www.agr.unideb.hu/~agocs/informatics/11_e_unix/unixhelp/unixhelp.ed.ac.uk/CGI/man-cgied74.html?chage) |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |

**Managing Services**

- [systemctl](http://www.dsm.fordham.edu/cgi-bin/man-cgi.pl?topic=systemctl)

**Miscellaneous**

| [/etc/passwd](http://man7.org/linux/man-pages/man5/passwd.5.html) | [/etc/group](http://man7.org/linux/man-pages/man5/group.5.html) | [/etc/shadow](http://man7.org/linux/man-pages/man5/shadow.5.html) | [/etc/skel](http://archive.linuxfromscratch.org/blfs-museum/1.0/BLFS-1.0/postlfs/skel.html) | [init vs systemd](http://zenit.senecac.on.ca/wiki/index.php/Init_vs_systemd) |
| ----------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |

## Investigation 1: User/Group Management

In your ULI101 course, you learned to change permissions for directories and files relating to user/owner, same group members, and other users. In this course, since you are the sysadmin with root privileges, you can create or remove users and groups as well as change the ownership of directories and files! We will now learn to perform key user account management operations in this section.

### Part 1: Studying the /etc/passwd file

The /etc/passwd file is a datafile that stores user account information, for both system accounts and regular users. Since we will be learning to create, modify and remove users on our Linux system, we should study this file in order to understand how the user account management commands will affect this file.

**Perform the following steps:**

1. Launch your **debhost** and **deb1** VMs.
2. Switch to your **deb1** VM.
3. Open a shell terminal.
4. Look at the `/etc/passwd` file.
5. Make note of the contents of that file.
6. Read about the file: [/etc/passwd](http://man7.org/linux/man-pages/man5/passwd.5.html)
7. Make sure you know what information each field contains.
8. Why do you think there are so many users?
9. Look at the names of the users. What do you think these user names represent? Are they all people?
10. What is the numeric user ID (UID) of the **root** user?
11. What is the numeric user ID (UID) and default shell of the users **sshd** & **mail**?
12. What is the UID, Comment, and default shell of your regular user account?

- UID 0 is reserved for the **root** user. In fact it is the UID that gives root its power. Not the account name.
- The user IDs of **system** accounts are typically below 1000. System accounts are used internally and are usually associated with services. The default shell of **/usr/sbin/nologin** means they can't be used to login interactively.
- Regular user accounts are usually assigned UID's above 1000 and are allowed to login interactively.
- When new regular user accounts they are by default assigned the next available UID above 1000.
- The **Comment** field typically holds the Full name of a regular user.

![Passwd File](/img/Passwd-file.png)

The /etc/passwd file contains records for users (system accounts and regular-user accounts). There are several fields including: **Username**, **password link** ("x" indicates hashed password stored in /etc/shadow file only accessible by root), **user-id, primary group-id, comment** (eg. Full Name), **default home directory**, and **default shell**.

### Part 2: Adding, Removing, and Modifying Users

In this section, we will now learn how to properly add user accounts, remove user accounts, and modify existing user account information.

**Perform the following steps:**

1. Remain in your **deb1** VM for this section.
2. Read the man page for the `useradd` command.
3. Create a new user called **ops245_1** by:

```bash
# Launch an interactive shell
sudo -i

# Create a user account using defaults
useradd ops245_1

# Check the contents of /etc/passwd
grep "ops245_1" /etc/passwd

# Check for a home directory
ls -l /home
```

4. Was the account created?
5. What were the values for the **UID**, **GID**, **Comment**, **HOMEDIR**, and **SHELL**?
6. Was a home directory created?
7. Check the man page for **useradd**, what are the options to force a home directory to be created, add a full name, and assign **bash** as the default shell?
8. Create a new user called **ops245_2** using those options:

```bash
# Create a user account using options
useradd -m -c "OPS245 Account 2" -s "/usr/bin/bash" ops245_2

# Check the contents of /etc/passwd
grep "ops245" /etc/passwd

# Check for a home directory
ls -l /home
```

9. What were the values for the **UID**, **GID**, **Comment**, **HOMEDIR**, and **SHELL**?
10. Was a home directory created?

![deb1users1](/img/deb1users1.png)

11. Read the man page for **useradd** and scroll down to the **FILES** section
12. What is the file you can edit to change your default values for account creation?
13. Edit the file **/etc/default/useradd**, change the value of **SHELL** (You may wish to install **vim** or use **vi**)

```bash
SHELL=/usr/bin/bash
```

14. Create a new user called **ops245_3**:

```bash
# Create a user account using options
useradd -m -c "OPS245 Account 3" ops245_3

# Check the contents of /etc/passwd
grep "ops245" /etc/passwd

# Check for a home directory
ls -l /home
```

14. Was the home directory created?
15. Was the shell set correctly?

![deb1users2](/img/deb1users2.png)

We have not given the accounts passwords. The passwords are not stored in **/etc/passwd**. A long time ago with the Unix operating system, passwords were stored in **/etc/passwd** but they were removed from the file and put into the file **/etc/shadow**. That is because all users require read access to **/etc/passwd** for the purpose of logging in. Passwords even in hashed form should NOT be visible to all users. If look at the image above you can see an **x** in the old password field as a place holder.

16. View the contents of **/etc/shadow**
17. The format of the file is similar to **/etc/passwd**, one line per account with fields separated by **:** .
18. Scroll to the bottom of the file to see the regular user accounts

![deb1shadow1](/img/deb1shadow1.png)

19. You can see that your regular user account has a hashed password in the file, but your new ops245 accounts have only a **!** . This means the password has not been set, and until it is this account can't be used to login interactively
20. Set the password for the user **ops245_1** and **ops245_2** using the commands:

```bash
# Set a users password
passwd ops245_1
passwd ops245_2
```

21. View the contents of **/etc/shadow** to see the changes.

We can also modify a user after the fact using the **usermod** command. Remember that the account **ops245_1** was created with out a **Full Name** and the incorrect **Shell**

22. View the man page for the **usermod** command
23. You can see that the command options are pretty similar to the **useradd** command
24. Modify the **ops245_1** account using the following:

```bash
# Modify the user account
usermod -c "OPS245 Account 1" -s "/usr/bin/bash" ops245_1
```

25. Confirm the changes are made in **/etc/passwd**

When we created the **ops245_1** account we didn't create a home directory. We should do that manually.

26. List the contents of **/home** `ls -l /home`
    ![deb1home1](/img/deb1home1.png)
27. You can see that each users home directory is owned by the user and the group assigned is the primary group of that user.
28. You can also see that permissions have been given to that user. (our ops245 users home directory are visible to other users)
29. Issue the following commands to create a home directory for **ops245_1** and give ownership to the user

```bash
# Create a home directory
mkdir /home/ops245_1

# Change the owner and group
# Example chown user:group /home/dir
chown ops245_1:ops245_1 /home/ops245_1
```

30. Confirm the creation of the home directory
31. Set the permissions of the home directory so that only the owner has access

```bash
# Set permissions for ops245 users home directories
chmod 700 /home/ops245*
```

32. List the entire contents of the home directories for **ops245_1** and **ops245_2**, including hidden files
    ![deb1home2](/img/deb1home2.png)
33. You can see the **ops245_2** home directory contains some files that **ops245_1** does not have. Where did they come from?
34. List the entire contents, including hidden files, of **/etc/skel**
    ![deb1skel1](/img/deb1skel1.png)

**/etc/skel/** is a "template" for new home directories. Any files and directories in that directory will be copied into any new users home directory when they are created.

35. Create a file called **foobar.txt** in **/etc/skel**

```bash
# Add a file to /etc/skel
echo "this is a test file" > /etc/skel/foobar.txt
```

36. Create a new user called **ops245_4** using the correct option to create a home directory and setting the shell to **bash**
37. Check the contents of **ops245_4**'s home directory. Did they receive the file **foobar.txt**

We should confirm that our accounts work. By testing a login to the Desktop Environment.

38. Exit from the interactive **sudo** shell: `exit`
39. Exit the terminal and logout of the desktop
40. Login to the desktop as the user ops245_2
41. Logout and login back in as your regular user account

![deb1login](/img/deb1login.png)

The next step is to remove a user account. Using the **userdel** command.

> ![caution](/img/caution.png)
> Considerations when removing accounts:
>
> - Should the account be removed or just disabled?
> - Should the home directory be deleted with all of the files?
>
> Sometimes it is better to disable an account rather than delete it.
>
> The files in home directory may need to be passed over to a new employee or retained for investigative purposes

42. Read the man page for the **userdel** command
43. What is the option to remove a users home directory?
44. Use the following commands to remove the **ops245_1** and **ops245_4** accounts. Do not remove the **ops245_4** home directory

```bash
# Start interactive sudo shell
sudo -i

# Remove ops245_1 account and home directory
userdel -r ops245_1

# Remove ops245_4 account
userdel ops245_4
```

45. List the contents of **/home** including file ownership

![deb1home3](/img/deb1home3.png)

Notice the User and Group field for **ops245_4** is shown numerically. That is because the filesystem records ownership using UID and GID numbers. When we are shown a listing it resolves those numeric values to names. As the user has been removed it can't be resolved.

Notice the **-n** option for **ls** shows ownership numerically.

**Disabling an Account**

There are 2 ways to disable an account, **lock** the accounts password, and **expire** the account.

1. Read the man page for **usermod**
2. Read about the **"-L, --lock"**, **"-U, --unlock"**, and **"-e, --expiredate""** options
3. Try the following commands, check the changes made to **/etc/shadow** after each command (account expiry is the 2nd last field)

```bash
# Lock the password for ops245_2
usermod -L ops245_2

# Unlock the password for ops245_2
usermod -U ops245_2

# Expire the ops245_2 account immediately
usermod -e 1 ops245_2

# Unexpire the ops245_2 account
usermod -e -1 ops245_2

# Expire the account of ops245_1 at the end of 2028
usermod -e 2028-12-31 ops245_2
```

4. Exit the interactive **sudo** shell

Be sure to record your observations in your lab notes.

### Part 3: Managing Groups

In this section, we will learn how to create, remove and modify groups in our Linux VM. You learned in ULI101 how to change permissions with the **chmod** command, but you didn't have admin privileges to **create groups** to allow directory and regular file sharing. Since you now have admin privileges with your VM, you can now create groups, and add users to this group to allow file-sharing among users.

**Perform the following steps:**

1. Make certain that you are still in a terminal as your regular user account on the **deb1** VM.
2. Type the command `groups`
3. The output of this command is the list of your group memberships.
   ![deb1groups1](/img/deb1groups1.png)
   Every user account is assigned a **primary** group. On most Linux distributions when a new user account is created a new group is also created with the same name, that group is then assigned as the primary group for that user. However, not all Linux systems are configured that way. On the host matrix.senecacollege.ca your user account is assigned to a primary group called **users**.
4. Close all application windows, and switch user accounts (within your deb1 VM) by clicking on the **logout** icon and clicking on the **Switch User button, and then login as the user **ops245_2\*\*.
5. Open a terminal.
6. Create a file called **information.txt** in the home directory of that user.
7. Issue the following commands:

```bash
# Create a file
touch information.txt

# List the details of the file
ls -l information.txt

# List the details numerically
ls -ln
```

8. Who owns that file? What primary group does that file belong to?

![deb1groups2](/img/deb1groups2.png)

When a user creates a file or directory they are assigned as the owner of the file and the primary group of that user account is assigned as the group to the file

9. Issue the following command to create a group called **welcome**:

```bash
# Create a group
sudo groupadd welcome
```

10. You'll notice that sudo does not work for this user, because we haven't given them permissions to run any commands with elevated privileges.
11. Log out, and log back in as your normal user.
12. Now re-issue the command to create the **welcome** group. This time, sudo should work.
13. Issue the commands:

```bash
# Show recent groups
tail -5 /etc/group

# Show recent users
tail -5 /etc/passwd
```

![deb1groups3](/img/deb1groups3.png)

You can see that your account and the 2 **ops245** accounts have been assigned a **GID** (4th field in /etc/passwd) that refers to the group in the /etc/group file. You can also see that the group **welcome** was created and given the next available GID number. Because future user accounts will have the UID and GID that are out of sync, we could change the GID of **Welcome**

14. Read the man page for the **groupmod** command.
15. Change the **GID** of the **Welcome** group:

```bash
# Modify the GID
sudo groupmod -g 1500 welcome
```

16. Read the man page for **usermod** and look for the **-a, --append**, **-g, --gid**, and **-G, --group** options.
17. What is the difference between the **-g** and **-G** options?
18. Issue two separate **usermod** commands to add both **ops245_2** and **ops245_3** to the newly-created **welcome** group, as a supplemental group:

```bash
# Add users to the welcome group
sudo usermod -aG welcome ops245_2
sudo usermod -aG welcome ops245_3
```

19. Verify that both **ops245_2** and **ops245_3** now belong to the **welcome** group.

When a file is created it is assigned an owner and a default (primary) group. The Linux system administrator can not only change a file's ownership, but also change the default group that a file belongs to. In addition, the sysadmin can also add other users to a supplementary group that they have created via the **usermod** command. This is useful in setting group permissions via the **chmod** command.

20. We can use the **chgrp** command to change the group assigned to the file **information.txt** if you have root permissions

```bash
# Change group assigned to a file
sudo chgrp welcome ~ops245_2/information.txt

# List the file details
sudo ls -l ~ops245_2/information.txt
```

21. Open a terminal and list the details for the **information.txt** file

Groups provide a method for us to assign permissions to multiple user accounts easily.

### Practical Example

Management has sent you (the Linux sysadmin) that a "new" employee has been hired and will be on on probation for 3 months. As the Linux system administrator, they want you to perform the following steps:

1. Remain in your **deb1** VM for this section.
2. Use the **useradd** command to create a user account called: **noobie** to expire in 3 months from this date as part of the security policy of this organization (issue man useradd to determine correct option to set expiry date).
3. Set an appropriate password for this user account.
4. Add this newly-created user to the newly-created **welcome** group.
5. Examine `/etc/group` to verify that you made the correct operations.
6. Use the **usermod** command to set the full name of the user account **noobie** to "**Really Green**". Examine the result of running that command in the `/etc/passwd` file. What has changed?

Unfortunately, you were later informed that this "**noobie**" employee was caught stealing from the company. They want you to perform the following operations:

7. Remove this account, but keep "noobie's" home directory for police investigation purposes.
8. Verify that you correctly issued the correct commands.

**Answer INVESTIGATION 1 observations / questions in your lab log book.**

## Investigation 2: Controlling Sudo Elevated Privileges

When you installed Debian on deb1 and deb2, you didn't set a **root** password. This caused the installer to give your first regular user account the ability to use the **sudo** command to run commands with root privileges instead of enabling the **root** account. Which raises some questions.

- How would we allow other users to run commands with **sudo**?
- Can we control access to **sudo** by limiting the commands available?

**sudo** provides a system of giving elevated permissions to specific users and to specific commands. This allows us to distribute administrative workload amongst multiple employees without giving all of them **full** administrative access to the system. For example, we could allow Help Desk staff access to the **passwd** command so they can perform password resets.

### Part 1: Finding out why Your First User can do Anything

You've already observed that your first user can use **sudo** to execute any command, but what about their account actually makes that possible?

1. View (but do not edit) the contents of the **sudo** config file **/etc/sudoers**.
2. Read the comments at the top of the file.
3. Search the file for your user account name. You won't find it.
4. Check the contents of **/etc/passwd** and **/etc/group** for entries with your account name.

```bash
# Check for username
grep "username" /etc/passwd /etc/group
```

![deb1groups5](/img/deb1groups5.png)

You can see that your account is a member of the **sudo group**

5. View the file **/etc/sudoers** again.
6. Look for the line that allows members of the **sudo** group to execute any command. (Read the comments)

![deb1sudo1](/img/deb1sudo1.png)

This line allows any user who is part of that group can run _any_ command, as _any user_. Effectively, they can use sudo to be root.
So why not just give those admins the root password?

7. Check the system journal (log files) for entries that mention **sudo**

```bash
# Show journal entries for sudo
sudo journalctl | grep "sudo"
```

![deb1journal](/img/deb1journal.png)

You can see that all **sudo** activity is recorded in the system log. Including:

- Unsuccessful attempts to use **sudo**
- When **sudo** was used
- Who used **sudo**
- What did they do with **sudo**

Requiring the use of **sudo** to access elevated permissions means that there is accountability built in to the system.

> ![caution](/img/caution.png)
> Not all Linux distributions use the same group name to configure **sudo** access.
> RedHat based distributions for example typically use a group called **wheel**

8. Start your **deb3** VM
9. Create a regular user account on **deb3**, using the same username and password as **deb1** and **deb2**
10. Add your user to the **sudo** group as a secondary group.
11. Test that **sudo** works for that user

### Part 2: Adding Limited Sudo Capabilities to Other Users

The **sudo** group is very useful for senior admins who should be able to run any command, but what about admins who haven't demonstrated the responsibility necessary to wield that power yet? We can use the **sudo** config files to give them privileges to run some commands, but not all. Note: While this could be done in the main **/etc/sudoers** file, the better practice is to create supplemental config files. Supplemental config files are stored in the **/etc/sudoers.d** directory.

1. Login as to **deb1** as your **ops245_2** account. Try to run the command

```bash
sudo systemctl restart ssh
```

If successful, that command would restart the ssh service on that machine, but that user does not have permission to do that.

2. Try running that command again, this time with **sudo**.
3. It still won't work, because this user does not have permission to use **sudo** for anything.
4. Log out from **ops245_2** and log back in as your normal user.
5. Create a file called **10-ops245_users** in **/etc/sudoers.d**. Add the following line to it:

```bash
ops245_2 ALL=(ALL) /usr/bin/systemctl
```

- This indicates this user can use sudo to run systemctl commands as if they were any account (root is the important one).
- It is important to notice that commands need to be added with an absolute path to the executable

6. Log out from your normal user and log back in as **ops245_2**.
7. Try restarting sshd again. This time it should work.
8. Change to your **ops245_3** account, and try restarting sshd (with and without sudo).

   - That account still can't. Sudo entries only affect the users and groups listed.

9. We don't want **ops245_3** to manage services, that's a job for **ops245_2**, but we do want them to manage user accounts. So log back in as your regular user and create a sudoers file for **ops245_3** called **11-acct_mgmt** and add entries to it so **ops245_3** can run the useradd, usermod, userdel, groupadd, groupmod, and groupdel commands with **sudo**.

```bash
ops245_3 ALL=(ALL) /usr/sbin/useradd
ops245_3 ALL=(ALL) /usr/sbin/usermod
ops245_3 ALL=(ALL) /usr/sbin/userdel
ops245_3 ALL=(ALL) /usr/sbin/groupadd
ops245_3 ALL=(ALL) /usr/sbin/groupmod
ops245_3 ALL=(ALL) /usr/sbin/groupdel
```

10. Test the commands as **ops245_3** to make sure it works.

## Investigation 3: Managing System Services and Targets (Run-levels)

### Part 1: How do we Manage System Services?

At the beginning of this lab we mentioned that running unneeded **packages can be a security risk** due to the unnecessary increase in the complexity of your system. Similarly, it is also unnecessarily hazardous, and even more so, to leave unneeded services running. In this investigation, we will learn how to **control services, and turn off those services that we think are not necessary, to help reduce security risks.**

On most Linux distributions the first process started (PID #1) is called **systemd**. The **systemd** process is responsible for managing, stopping, and starting system services. (As well as other important tasks). The command `ps -ef | head -4` will show the first few processes currently running.
![deb1init1](/img/deb1init1.png)

In the output above we see that the **PID 1** process is called **init** not **systemd**

![deb1systemd](/img/deb1systemd.png)

But if we examine the listing for **/sbin/init** we can see that it is a symbolic link to **systemd**.

> ![caution](/img/caution.png)
> Note: this yet another example of how there are differences between different Linux Distributions. When researching about Linux on the Internet, make sure your searches are Distribution specific.

In order to control **systemd** we will use the **systemctl** command.

> ![caution](/img/caution.png)
> Although there is a command called: **service** that may appear to manage services on your Linux system, it is considered **deprecated** (i.e. "obsolete"). It has been replaced by with the **systemctl** command.

**Perform the following steps:**

1. Remain in your **deb1** VM for this section.
2. To verify the status of your **ssh** service, issue the following command:

```bash
# Show status of a service (sudo not required)
systemctl status ssh
```

3. Use the commands you used in Lab2 to **stop** and **disable** the **ssh** service.
4. Issue a command to verify you **disabled** and **stopped** the **ssh** service.

   - **Note**: There is a major difference between stopping a service and disabling a service: If a service is stopped but enabled, the service will start upon reboot. Therefore to prevent it being started upon boot-up, the service will need to be disabled as well!

5. Issue the commands to **start** and **enable** the **ssh** service, and **verify** that it is started and enabled.

   - **Note**: If you performed the commands correctly, the **ssh** service should be running, and will automatically run upon your Linux machine start-up.

![deb1status](/img/deb1status.png)

It is important for a Linux system administrator to be able to start/stop, enable/disable and check the status of services on their Linux server. Students will be commonly performing these operations in their OPS345 course when configuring and troubleshooting network services.

### Part 2: How do we Manage Targets (formerly known as runlevels)?

Running Linux servers in graphical mode can make the server vulnerable to penetration (i.e. a potential break-in to the server from unauthorized intruders). The X-windows framework can be vulnerable to attacks when these servers are connected to the Internet. This is why when you install Linux **servers**, they only permit remote terminal connections (via ssh ) or local tty logins. Which are both text-based interfaces only. **Desktop** versions of Linux are typically installed on workstations with one of a number graphical desktop environments.

A **systemd** **"target"** is essentially a predefined state of the system that the we can "boot" or "switch" the system to. They are similar to an older concept called a "runlevel". The term "runlevel" is specific to the older SystemV init system.

**List of Common Targets and Equivalent Runlevels**
|Systemd Target|SystemV Runlevel|
|--------------|----------------|
|poweroff.target| 0 |
|rescue.target| 1 |
|multi-user.target| 3 |
|graphical.target| 5 |
|reboot.target| 6 |

The Linux sysadmin can also change the default target of a Linux system so that we control the target (or state) the system boots to.

Consider the following commands:

```bash
# Display the default target (boot target)
systemctl get-default

# Change the default target to text based only
sudo systemctl set-default multi-user.target

# Change the default target to graphical
sudo systemctl set-default graphical.target

# Change the current target to support only text based interfaces
sudo systemctl isolate multi-user.target

# Reboot the system
sudo systemctl isolate reboot.target

# Shutdown the system
sudo systemctl isolate poweroff.target

# Switch to single user or rescue mode
sudo systemctl isolate rescue.target
```

Note: The last example command has the same effect as the procedure we followed in Lab 3 when we edited the grub boot parameters to boot into **single** user mode.

The purpose of **Linux servers** is to run or provide network-based services (i.e. they "**serve**" the users that operating in that Linux/Unix system). It is common that Linux servers are separated, for security purposes, based on the services they are providing. Generally Linux Servers do not have graphical desktops installed so they are **available in Command-Line mode only** (multi-user.target). Running these Linux/Unix servers with a **Graphical Mode will make them more vulnerable to penetration from hackers, etc**. Therefore, it is common that the Linux servers are CLI only, but the Workstations that connect to them within the network are GUI. Therefore, it is important that a Linux/Unix system administrator understand to switch to these different "targets".

**Perform the following steps:**

1. Remain in your **deb1** VM for this section.
2. Issue the following Linux command:

```bash
systemctl get-default
```

- **Note**: The output should read **graphical.target**

1. Try the same command on your **deb3** VM and observe how the output differs. Go back to your **deb1** VM.
2. You can use the **systemctl isolate** command to change the current target. See a list of targets [here](https://wiki.debian.org/systemd/CheatSheet).
3. Change the current target in **deb1** to **multi-user.target**
4. What did you notice?

> ![caution](/img/caution.png)
> Debian runs the Graphical Desktop on TTY7.
>
> When we switch to multi-user TTY7 doesn't display anything.
> To see the text based login we need to switch to TTY1.
> If **deb1** was installed directly on physical hardware we would switch to TTY1 with the key combination **CTRL-ALT-F1**. Because we are running as a VM we will use the VM Viewer.
> Click on **Send Key** --> **CTRL-ALT-F1**
>
> ![deb1tty](/img/deb1tty.png)

5. Login as your regular user and reboot your **deb1** VM. It should return to the graphical login screen.

You should notice at this point that the command **systemctl isolate** did not change the default target the system will boot to.
It just changed or switched the current target.

6. Issue the command to change the default target to **multi-user.target**, then reboot **deb1**. What do you notice?
7. Login and change the current run-level to **graphical.target**

8. Try to do the same thing to your **deb3** VM. Did it work? Why or why not?
9. Set the default target on your **deb1** VM back to graphical.target before continuing.

**Answer INVESTIGATION 3 observations / questions in your lab log book.**

## Investigation 4: User Management with a bash scripting

**Before proceeding with Investigation 4, please review the [Bash Shell Scripting Tips here](/C-ExtraResources/bash-shell-scripting-tips.md)**

### Using getopts Function & case statement

We will now use shell scripting to help automate the task for a Linux administrator to create regular user accounts.

**Perform the following steps:**

1. You will be using your **debhost** machine for this section.
2. Open a shell terminal, as your regular user.
3. Change to the **~/bin** directory.
4. Download, study, and run the following shell script. Issue the command:

```bash
wget https://raw.githubusercontent.com/OPS245/debian-labs/main/user-create.bash
```

5. Try to understand what this bash script does, and then run the script using **sudo** to create just one user called **test**. After running the shell script, view the contents of the **/home** directory to confirm.

Although the **zenity** command is a "user-friendly" way to run shell scripts, Linux administrators usually create shell scripts that resemble common Linux commands. In this lab, you will learn to create a shell script using the getopts function to make your shell script behave more like actual Linux commands (including the use of options). Refer to the notes section on the right-hand-side for reference about the **case** statement and the **getopts** function.

6. Change to the **~/bin** directory.
7. Use the wget command to download the input file called user-data.txt by issuing the command:

```bash
wget https://raw.githubusercontent.com/OPS245/debian-labs/main/user-data.txt
```

9. View the contents on the user-data.txt file to confirm there are 3 fields (username, fullname, and e-mail address)which are separated by the colon **:** symbol.
10. Use a text editor to create a bash script called: **createUsers.bash**` in the ~/bin directory.
11. Enter the following text content into your text-editing session:

```bash
#!/bin/bash

# createUsers.bash
# Purpose: Generates a batch of user accounts from a text file
#
# USAGE: sudo ./createUsers.bash [-i {input-path}]
#
# Author: *** INSERT YOUR NAME ***
# Date: *** CURRENT DATE ***

# Test for sudo
user=$(whoami)
if [ $user != "root" ]
then
    echo "You must run this script with root privileges. Please use sudo" >&2
    exit 1
fi

# Test for argument
if [ "$#" -eq 0 ] # if no arguments after command
then
 echo "You must enter an argument" >&2
 echo "USAGE: $0 [-i {input-path}]" >&2
 exit 2
fi
```

12. Save your editing session, but remain in the text editor.
13. The code displayed below uses the getopt function to set the input file pathname or check for invalid options or missing option text. Add the following code

```bash
outputFlag="n"
while getopts i: name
do
 case $name in
   i) inputFile=$OPTARG ;;
   :) echo "Error: You need text after options requiring text"
       exit 3 ;;
   \?) echo "Error: Incorrect option"
        exit 3 ;;
 esac
done
```

14. Save your editing session, but remain in the text editor.
15. The code displayed below uses logic to exit the script if the input file does not exist. Command substitution is used to store each line of the input file as a positional parameter. There is one subtle problem here: The full names of the users contain spaces which can create havoc when trying to set each line as a separate positional parameter. In this case the sed command is used to convert spaces to plus signs (+), which will be converted back later. Finally, a **for** loop is used to create each account (**useradd**) and display their account information. Add the following code:

```bash
# Test for inputFile
if [ ! -f $inputFile ]
then
  echo "The file pathname \"$inputFile\" is empty or does not exist" >&2
  exit 4
fi

# Temporarily convert spaces to + for storing lines as positional parameters
set $(sed 's/ /+/g' $inputFile)

for x
do
    userPassWd=$(date | md5sum | cut -d" " -f1)
    useradd -m \
        -c "$(echo $x | cut -d":" -f2 | sed 's/+/ /g')" \
        -s "/bin/bash" \
        -p $userPassWd \
        $(echo $x | cut -d":" -f1)

    cat <<+
    Server Account Information
    Here is your server account information:
    servername: myserver.senecacollege.ca
    username: $(echo $x | cut -d":" -f1)
    password: $userPassWd
    email: $(echo $x | cut -d":" -f3)

+
done

echo -e "\n\nAccounts have been created\n\n"
exit 0
```

16. Save, set permissions, and then run that shell script for the input text file **user-data.txt**. Did it work? Try running the script without an argument - What did it do?
17. You have completed lab4. Proceed to Completing The Lab, and follow the instructions for "lab sign-off".

**Answer INVESTIGATION 4 observations / questions in your lab log book.**

## Lab 4 Sign-Off (Show Instructor)

Follow your Professors submission instructions for lab 4 on Blackboard.

**Time for a new backup!:** If you have successfully completed this lab, make a new backup of your virtual machines as well as your host machine.

**Perform the Following Steps:**

1. Make certain that your **debhost**, **deb1** VM are running.
2. Switch to your **debhost** VM.
3. Open a shell terminal, and change to the **~/bin** directory.
4. Issue the Linux command:

```bash
wget https://raw.githubusercontent.com/OPS245/debian-labs/main/lab4-check.bash
```

5. Give the **lab4-check.bash** file execute permissions (for the file owner).
6. Run the shell script using **sudo** and if any warnings, make fixes and re-run shell script until you receive "congratulations" message.
7. Follow your Professors instrtuctions for submitting the lab

## Practice For Quizzes, Tests, Midterm & Final Exam

1. Describe all of the fields in `/etc/passwd`
2. What is the command to create a user? What option to create a home directory for that user?
3. What is the command to change the full name of an already-created user?
4. What is the command to delete a user account? What option allows for the user's home directory to be removed as well?
5. What is the command to create a group? What is the command (or steps) to include a user in a newly-created group?
6. What is the purpose of `/etc/shadow`?
7. What is the purpose of `/etc/skel`?
8. What does the term target mean?
9. How to set the target of a Linux system to text-based only? How to set to graphical mode?
10. What is the command to view the status of running services?
11. What is the command to start a service (like httpd, or sshd)?
12. What is the command to stop a service (like httpd, or sshd)?
13. What is the difference between **starting** a service and **enabling** a service?
14. Can a service be stopped and started by issuing just one command?
