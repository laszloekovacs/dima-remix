#!/bin/sh

# Set up basic environment
export PATH=$HOME/bin:$PATH
export XDG_CURRENT_DESKTOP=openbox

# Start the development environment
xterm -hold -e ~/start-kiosk.sh