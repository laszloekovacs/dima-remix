#!/bin/sh

xrandr --output VGA-1 --mode 800x600

# hide mouse
unclutter -idle 5 -root &

xterm &

exect twm