#!/usr/bin/env python3
import os

users=os.popen('grep home /etc/passwd')
for user in users.readlines():
	print("Current user is: " + user)
	cutup = user.split(':')
	name = cutup[4]
	uid=cutup[2]
	print(name + ' has UID ' + uid)
