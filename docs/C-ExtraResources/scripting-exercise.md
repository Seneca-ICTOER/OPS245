---
id: scripting-exercise
title: Scripting Exercise
sidebar_position: 2
description: Scripting Exercise
---

# Scripting Exercises

## Things on this page

### Terminal vs script file

A shell script is nothing more than a sequence of shell commands. Any command you put in a shell script can be executed just as well in a terminal. In fact no matter how complex your script is - you can run the entire thing from a terminal window without executing the script.

### Runnning a command

  + How to run a command in the current directory or another directory or a directory in the $PATH
  + That programs you run need to have execute permission
  + What your $PWD is, pwd command
  + Check the return code from a command by examining $?

### Variables

  + How to create a variable and set a value in it
  + How to get the value from a variable
  + Differences in how bash and python handle variables

### Getting input from the user

  + The read command in bash
  + the input() function in python

### Quotes

  + Why use single or double quotes
  + The difference between single and double quotes
  + Backquotes

### Redirecting output

  + How to redirect output from a command to a file
  + How to pipe output from one command to another command

### Basic commands

  + cat
  + grep
  + cut

### Conditional statements

**Bash**

  - if
  - test, \[

**Python**

  - Python has conditional statements, we just haven't covered them yet.

## Exercises

You can do these exercises in any order, and change them in any way you like.

  - Create a bash script that will print Hello, then list the contents of the / directory, then print Good Bye.

       - Create a python script that does the same thing.

  - Create a bash script that will run your other script twice.

       - Run this new script from different locations, and see if it always works. Fix it if it doesn't.

  - Create a bash script to display the contents of /etc/sysconfig/network-scripts/ifcfg-ens33

       - Pipe the output to cat
         + Pipe that output to cat. See if you understand why that doesn't seem to do anything

  - Create a bash script which will use cat and grep to find the line with BOOTPROTO in /etc/sysconfig/network-scripts/ifcfg-ens33

       - Modify that script so that it doesn't need cat anymore.

  - Create a bash script in which you will create a variable called BP.

       + Assign to that variable the value BOOTPROTO="dhcp" (the equal sign and quotes are part of the value).
       + Use the cut command to retrieve the part between the double-quotes (in this case that's: dhcp).
       + Save the result in a variable, and print that variable.

  - Combine the two scripts above into one. The script should tell you what the value of BOOTPROTO from /etc/sysconfig/network-scripts/ifcfg-ens33 is.
  - Create a python script that will prompt the user for the name of the interface they want to search (e.g. ens33), then prompt them for the parameter they wish to see.

       + Store the responses from the user in variables and use them to grep the appropriate file for the parameter the user asked for. Display it's current value.
       + Note: As we have not covered conditional statements or loops in python yet, you can assume the user always provides usable responses.

  - Use the ls and wc commands to find how many log files there are in /var/log/

       + Add a grep command to find how many of a certain type of log file there are (e.g. vmware-network log files)

  - Use the history and grep commands to find any command you ran in the past that contained a certain keyword (like .sh or cat)
  - Write a bash script which will use the whoami, hostname, date, and lvs commands to create a report.txt file containing all that information.

       + Set it up so that the date (in YYYY-MM-DD format) is in the filename of the report, e.g. report-YYYY-MM-DD.txt

  - Write a bash script that will ask the user for a process name, will check whether that process is running, and if it is: it will print "The process is running". If it isn't: it will print "The process is not running".

       + Modify that script to include the number of processes with that name that are running.

  - Write a script that will use a for loop and the cut command to get a list of usernames from the /etc/passwd file and print one username perline.

       + For each user: using an if statement check whether the directory /home/thatusername exists and then each line will look like: "user1: home directory does not exist" or "user2: home directory exists".
       + Instead of checking for /home/thatusername check for the home directory in the passwd file line for that user.
