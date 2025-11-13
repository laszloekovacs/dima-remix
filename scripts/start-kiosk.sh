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

# check with netcat if the socket is open
# waits till the server is up
# install netcat
until nc -z -w 1 localhost 3000; do
    echo "szerver indul, kis turelem..."
    sleep 1
done

#start firefox in kiosk mode
falkon --kiosk http://localhost:3000

#when firefox closes, kill the server
trap "kill $SERVER_PID" EXIT