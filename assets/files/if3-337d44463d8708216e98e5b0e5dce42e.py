#!/usr/bin/env python3

'''
Purpose: if3.py
This is a simple python script demonstrating if statements with else

Author: Peter Callaghan
Date: 05 Feb. '21

'''

grade=50

if grade >= 80:
  print("Wow, ", grade, " is an A.")
  if grade >= 90:
    print("Even better, that is an A+.")
elif grade >= 75:
  print("That is a B+, pretty nice.")
elif grade >= 70:
  print("That is a B.  Still alright.")
else:
  print("We can do better.")

print("And this code runs regardless.")
