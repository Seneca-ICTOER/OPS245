#!/usr/bin/env python3

'''
Purpose: countup.py
This is a simple python script demonstrating reversing a condition
Note that the loop could be done with counter != 10
This is just done this way to demonstrate how comparing a condition to a boolean can work.

Author: Peter Callaghan
Date: 05 Feb. '21

'''

counter=0

while (counter == 10) == False:
  counter+=1
  print(counter)

counter=0
while counter != 10:
  counter+=1
  print(counter)
