#!/usr/bin/env python3

magic=42
guess = input("Guess the magic number: ")
intguess = int(guess)

if magic == intguess:
	print(guess + " is correct!!")
if magic != intguess:
	print("Sorry, " + guess + " is not correct.")
