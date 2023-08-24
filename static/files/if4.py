#!/usr/bin/env python3

magic=42
guess = input("Guess the magic number: ")
intguess =int(guess)
if magic == intguess:
  print(guess + " is correct!!")
else:
  print("Sorry, " + guess + " is not correct.")
  diff=magic - intguess
  if diff > -5 and diff < 5:
    print("Close though...")
  else:
    print("Not even close.")
