# Avtomat Д.И.М.А - A S.T.A.L.K.E.R  Escape Room Game Prop


TODO
- boot screen and lock screen
- lockdown on 3 bad passes
- document screen with copy to pendrive
- more sovietpunk asthetics

documentation for packages used:

https://www.npmjs.com/package/react-hotkeys-hook/v/4.0.7

Sequence of pages:
login -> boot -> drive select -> download seq -> completion -> login
|
-> lockdown -> login

passcode for the game will be 86426,
 the default passcode is 5435:


### System compatibility
This program is thested on lubuntu 25 and an Athlon 64 x2 machine with 2gb of ram. the program requres a 64 bit cpu and PATA interface for floppy drives, atholn 64 fits this role perfectly.

### running
clone the source code with `git clone https://path-to-code` 
to pull the latest code, go to the project directory and run ```git pull```



to enable root account to be able to mount
```sudo passwrd root```

install node using **node version manager - nvm** as described on nodejs website


### mounting without root privileges 
add new line to `/etc/fstab` and use vfat filesystem. vfat has no permission controll, appartently dos can read it 
`/dev/fd0  /mnt/floppy  vfat  noauto,user,rw 0  0`

### pc speaker beep module

 before using beep, load kernel module if not loaded at boot
```sudo modprobe pcspkr```

to load kernel module on boot, add 
`/etc/modules-load.d/pcspkr.conf` add this line: `pcspkr` and reboot

to test run: 
`beep -f 200`