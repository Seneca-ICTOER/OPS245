#!/usr/bin/env python3
import os

print("To help us direct your call, please select a department:")

print("For accounting, press 1.")
print("For human resources, press 2.")
print("For public relations, press 3.")
print("For collections, press 4.")
print("For complaints, press 5.")

ans = input('')

print("You pressed " + ans + ".")
os.system('sleep 3')
print("We're sorry, no one from that department is available to take your call.")
os.system('sleep 3')
print("Please call again. Good-bye")
