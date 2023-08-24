---
id: python-scripting-tips
title: Python Scripting Tips
sidebar_position: 5
description: TBD
---

# Python Scripting Tips

## String Methods

  - The string data type has a number of methods that we can use on it to get a modified version of the data a string variable holds.
  - Note that these don't change the existing string, just return a copy of it with some change. You can store this updated copy in a variable, or use it in a command.
  - Some examples include:

       + find() - locates a value (e.g. another string) if it is in this string.
       + lower() - convert the entire string to lower-case
       + replace() - finds a value in the string, and replaces it with a different value.
       + split() - breaks the string up on a value, and returns a list.
       + strip() - removes leading and trailing whitespace
       + upper() - convert the entire string to upper-case

  - There are [many more options](https://www.w3schools.com/python/python_ref_string.asp) than this, but you will get a lot of utility out of these.

## Methods in General

  - Python is an object oriented programming language. In this course, that won't actually affect us much, but it does change how you run some commands.
  - In bash, every command ran on its own (while you might provide the command some arguments, or pipe different data into it). In python, the modules we import, and the types of variables we use can (will) have commands built into them. For example: converting all letters in a string to UPPER CASE).
  - While you could write a command in bash that would do that and pass it a variable holding a series of letters as an argument, in python that behaviour (and more) is built into the string type of variable.
  - The actions that are built into types are called **methods**. To use a method on a variable just add .methodname() to the end of the variable. Instead of getting back the value, you'll get something else (based on what that method does). Suppose we had a variable called course that currently had the value 'ops245'. Course codes are usually written in ALL-CAPS, so instead of just saying print(course), we could say print(course.upper())
