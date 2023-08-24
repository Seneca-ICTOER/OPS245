#!/usr/bin/env python3

magic=42
guess = input("Guess the magic number: ")
intguess = int(guess)
diff=magic - intguess

if magic == intguess:
  print(guess + " is correct!!")
elif diff > -5 and diff < 5:
  print("Close though...")
else:
  print("Not even close.")
