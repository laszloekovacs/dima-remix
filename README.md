# автомат Д.И.М.А ★ A S.T.A.L.K.E.R Themed Escape Room Game Prop

## Features Todo
- Boot screen and lock screen
- Lockdown on 3 bad passes
- Document screen with copy to pendrive
- More sovietpunk aesthetics

## Game Flow
Sequence of pages:
```
login -> boot -> drive select -> download seq -> completion -> login
|
-> lockdown -> login
```

## Game Settings
- Game passcode: 86426
- Default passcode: 5435

## Documentation
Package references:
- [react-hotkeys-hook v4.0.7](https://www.npmjs.com/package/react-hotkeys-hook/v/4.0.7)

## System Requirements



The program is tested with Lubuntu 24 on an Athlon 64 x2 with 2gb of ram. The program requires a Amd64 system and PATA interface for floppy drives

required hardvare:
- floppy drive
- printer

## Setup Instructions and notes

### Post lubuntu install
1. for the latest packages, update and upgrade the system
```bash
sudo apt update && sudo apt upgrade -y
```

### Basic Setup
1. Clone the repository after installing git:
```bash
git clone https://path-to-code
```

2. To update to latest code:
```bash
cd project-directory
git pull
```


1. Install latest Node.js using Node Version Manager (nvm) as described on the Node.js website. the project was tested with Node version 24

### Floppy Drive Setup
1. Mount the floppy manually
```
    sudo mkdir /mnt/floppy
    sudo mount /dev/fd0 /mnt/floppy
```

2. To mount without root privileges, add this line to `/etc/fstab`:
```
/dev/fd0  /mnt/floppy  vfat  noauto,user,rw  0  0
```
Note: vfat filesystem is used as it has no permission control and can be read by DOS.


### PC Speaker Setup
1. Load the kernel module if not loaded at boot and test with:
```bash
sudo modprobe pcspkr

beep -f 200
```

if blocked, check what config blocks it and comment it out
```bash
grep -r pcspkr /etc/modprobe.d/
```


2. To load kernel module on boot:
   - Create/edit `/etc/modules-load.d/pcspkr.conf`
   - Add this line: `pcspkr`
   - Reboot

### printer setup
```
TODO
```


### replacing window manager, kiosk mode
```
TODO
``` 