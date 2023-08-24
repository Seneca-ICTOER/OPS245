---
id: tips
title: Tips
sidebar_position: 1
description: Tips for OPS245
---

# Tips

## Important Information

### Follow Lab Instructions from the Menu Bar on the Left

Do NOT use a Net-search to get to the OPS245 notes. You might be sent to an older OPS245 lab that is outdated and will NOT be accepted for lab sign-off!

All lab instructions used for OPS245 are the pages in the **Labs** folder on the left side menu

### Read, Read, Read!

The majority of problems that students face with performing these labs are not following steps in the correct order. If in doubt, it is recommended to ask for assistance to confirm prior to proceeding.

### Can't Graphically Login to Host Machine

If you get a message about the gnome-power-manager configuration at the login screen, you may have run out of disk space. Switch to a character-mode virtual terminal (for example, switch to VT2 by pressing Ctrl-Alt-F2). Login and take a look at the available space (with the command: `df -h`). If the `/` filesystem is full, delete some files (such as unused VM images in `/var/lib/libvirt/images`) and then reboot the system.

### Bring all of these supplies to each class.

Even after installation, the Live CD and Installation DVD may be required.

### Place your Full Name and Contact Information on the hard disk tray cover and directly on the disk drive.

Use an adhesive label and permanent marker, or a white marker on the black cover. No label - no marks for your labs.

### Always "double-check" that you have removed your hard disk tray prior to exiting the lab room.

You may have your hard drive tray stolen which will result in lost work!

### Do not share your OPS245 disk drive with another course.

The work you do in other courses may damage the Linux parts on your drive.

### Earlier labs become the foundation for later labs.

Seemingly "small errors", or "skipping instructions" in earlier labs can have negative consequences when performing other dependent labs. Make backups when requested at the end of labs for "restoration points" in case something goes wrong while performing a lab.

### Always shut down your system under software control, rather than using the reset or power buttons.

You can shutdown using the GUI or with the `poweroff`, `reboot`, `init`, or `shutdown` commands. Shut down your virtual machines before shutting down your main system.

## Failure to Listen to these Tips

Failure to listen to lab "suggestions" by this resource could result in loss of work... (see your reaction below)

![Desk Flip Rage](/img/Desk_flip.png)
