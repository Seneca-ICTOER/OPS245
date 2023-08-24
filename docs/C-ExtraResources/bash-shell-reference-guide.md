---
id: bash-shell-reference-guide
title: Bash Shell Reference Guide
sidebar_position: 4
description: TBD
---

# Bash Shell Reference Guide

## Variables

### Environment

  - System-wide or "global" variable
  - Usually appear in UPPERCASE letters
  - Can view with command: `set | more`
  - **$** in front to expand variable to value
  - Examples: **USER**, **PATH**, **HOME**, **SHELL**

### User-defined

  - Variable created by user (command line, scripting)
  - Examples:

       + `myVar="my value"; readonly myVar; export myVar`
       + `read -p "enter value: " myVar`

## Command Substitution

  - Useful method to expand output from a command to be used as an argument for another command.
  - Examples:

       + `file $(ls)`
       + `set $(ls);echo $#;echo $*`
       + `echo "hostname: $(hostname)"`

## if / elif / else statements

  - If a command runs (even pipeline command like to grep to match) will be true (0); otherwise, false (non-zero), thus can use with logic statements.
  - Example:

```bash
if echo $myVar | grep "match"
then
echo "Match"
fi
```

  - The **test** command is used to test conditions. Square brackets **\[ \]** is short-cut for test command (args contained inside with spaces). The **exit** command can be used to terminate the shell script with a false value.
  - Example:

```bash
if [ $USER = "root" ]
then
 echo "You must be root"
 exit1
fi
```

  - For numberic comparison, use the **test options**: **-gt,-ge, -lt, -le, -eq, -ne**
  - Example:

```bash
if [ $grade -gt 79 ]
then
 echo "You get Good Mark"
elif [ $grade -gt 49 ]
then
 echo "You pass"
else
 echo "You fail"
fi
```

  - For testing for file information, you can use **-d** to test if directory pathname exists, and **-f** if the file pathname exists. You can use **!** for negation.
  - Examples:

```bash
if [ -d directory-pathname ]
then
echo "directory exists"
fi

if [ ! - f file-pathname ]
then
echo "File does not exist"
fi
```
