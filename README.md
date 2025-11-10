# Avtomat Д.И.М.А - A S.T.A.L.K.E.R Escape Room Game Prop

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
This program is tested on Lubuntu 25 and an Athlon 64 x2 machine with 2GB of RAM. The program requires a 64-bit CPU and PATA interface for floppy drives. The Athlon 64 fits this role perfectly.

## Setup Instructions

### Basic Setup
1. Clone the repository:
```bash
git clone https://path-to-code
```

2. Update to latest code:
```bash
cd project-directory
git pull
```

3. Enable root account for mounting:
```bash
sudo passwd root
```

4. Install Node.js using Node Version Manager (nvm) as described on the Node.js website

### Floppy Drive Setup
To mount without root privileges, add this line to `/etc/fstab`:
```
/dev/fd0  /mnt/floppy  vfat  noauto,user,rw  0  0
```
Note: vfat filesystem is used as it has no permission control and can be read by DOS.

### PC Speaker Setup
1. Load the kernel module if not loaded at boot:
```bash
sudo modprobe pcspkr
```

2. To load kernel module on boot:
   - Create/edit `/etc/modules-load.d/pcspkr.conf`
   - Add this line: `pcspkr`
   - Reboot

3. Test the speaker:
```bash
beep -f 200
```