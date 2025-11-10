#!/bin/bash
# chmod +x start-kiosk.sh after copying over

# set a colored background
# xsetroot -solid "#1e90ff"  # DodgerBlue

# set background image from the project
feh --bg-scale ~/dima-remix/public/splash.jpg &

# start window manager
openbox-session &

# change to project directory
cd ~/dima-remix

#start the server, store the PID
npm run dev &
SERVER_PID=$!

# give the server a headstart, though it probably needs more time
sleep 5

#start firefox in kiosk mode
firefox --kiosk http://localhost:3000

#when firefox closes, kill the server
kill $SERVER_PID