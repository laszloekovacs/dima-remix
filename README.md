# DIMA - A Stalker Escape Room Prop

TODO
- boot screen and lock screen
- lockdown on 3 bad passes
- document screen with copy to pendrive
- more sovietpunk asthetics

https://www.npmjs.com/package/react-hotkeys-hook/v/4.0.7

Sequence of pages:
login -> boot -> drive select -> download seq -> completion -> login
|
-> lockdown -> login

code will be:
86426


# before using beep, load kernel module
```sudo modprobe pcspkr```


# disable automounting volumes
```
gsettings set org.gnome.desktop.media-handling automount false
gsettings set org.gnome.desktop.media-handling automount-open false
gsettings set org.gnome.desktop.media-handling volume-monitor-enabled false
```

## update code on the Athlon 64 machine
to pull the latest code, go to the project directory and run ```git pull```

## pnpm can be installed with
```curl -fsSL https://get.pnpm.io/install.sh | sh -```

## enable root account to be able to mount
```sudo passwrd root```

## get older lubutu image
```https://cdimage.ubuntu.com/lubuntu/releases/18.04/release/```

install node globally
```curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s 24```
then 
```sudo apt install  -y nodejs```
check version
```node -v npm -v```