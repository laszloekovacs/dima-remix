#!/bin/bash
# chmod +x start-kiosk.sh after copying over

# set a colored background
xsetroot -solid "#1e90ff"  # DodgerBlue

# change to project directory
cd ~/dima-remix

#start the server, store the PID
npm run dev &
SERVER_PID=$!

# give the server a headstart, though it probably needs more time
sleep 5

#start firefox in kiosk mode
exec firefox --kiosk --profile ~/dima-remix/scripts/user.js http://localhost:3000

#when firefox closes, kill the server
kill $SERVER_PID