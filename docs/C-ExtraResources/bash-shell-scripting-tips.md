---
id: bash-shell-scripting-tips
title: Bash Shell Scripting Tips
sidebar_position: 6
description: Bash Shell Scripting Tips
---

# Bash Shell Scripting Tips

## For Lab 5 Investigation 1 Part 2

### Using awk to Manipulate Text

  - Very useful command for report generation, text file repair, or text and floating-point decimal manipulation. The command mimics a C program, with braces **{ }** that surround the action to perform based on records from a database file matching either test conditions, regular expressions, etc. Fields appear as numbers with $.
  - Examples:

```bash
awk '{print}' data-file.txt
awk -F";" '{print $5,$3}' data-file.txt
awk -F"," '$4 >= 10000 {print $1, $2}' salary.txt
```

### Crontab (Chronograph Tables)

  - Used to automatically run (as opposed to manually run) scripts, programs, or commands. There are many tables (files), but the main one is: **/etc/cron**. The **crontab** command can be used to _list_, _create_, _modify_ or _remove_ scheduled jobs in the file.
  - Examples:

```bash
crontab -e -u user # create/modify
crontab -r -u user-name # remove specific user's crontab
crontab -l -u username #List current schedules
```
