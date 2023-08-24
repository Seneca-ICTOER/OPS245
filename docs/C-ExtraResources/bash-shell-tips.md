---
id: bash-shell-tips
title: Bash Shell Tips
sidebar_position: 3
description: TBD
---

# Bash Shell Tips

## For Lab 2 - Investigation 3 Part 3

### Data Input

  - A shell can obtain data from a number of methods: **reading input files**, using **arguments when issuing command** (positional parameters), or **prompting for data to store in a variable**. The later method can be accomplished by using the **read** command.
  - Example:

```bash
read -p "Enter your name: " userName.
```

### Mathematical Expressions

  - In the bash shell, data is stored in variable as text, not other data types (ints, floats, chars, etc) like in compiled programs like C or Java. In order to have a shell perform **mathematical operations**, number or variable need to be surrounded by two sets of parenthesis **((..))** in order to convert a number stored as text to a binary number.
  - Examples

```bash
var1=5;var2=10
echo "$var1 + $var2 = $((var1+var2))"
```

**Note**: shell does not perform floating point calculations (like **5/10**). Instead, other commands like **awk** or **bc** would be required for floating point calculations (decimals)

## For Lab 3 - Investigation 3 Part 3

### Using sed to Manipulate Text

  - The Linux command **sed** stands for **S**treaming **Ed**itor which is an effective way to manipulate a text file, output sent from a command, or from within a "here document". This command can manipulate matching text on a variety of criteria (such as **line number(s)**, **regular expression match**, etc). Commands can then be used for manipulation such as **omitting, printing, substituting, adding**, and **inserting** text.
  - The sed option **-n** suppresses display of text so the print (**p**) command can be used; otherwise, the text will be displayed (with edits via the sed command instructions).
  - Results of text manipulation with sed can be stored in a variable using command substitution, or redirected to a file. **NEVER redirect the stdout from a sed command to the same input file (or the input file will be destroyed)!**
  - **Examples**

```bash
sed 's/|/ /g' <<+
I|like|weekends!
+
```

```bash
sed 's/$/\n/g' <<+
This text
should be
double-spaced!
+
```
