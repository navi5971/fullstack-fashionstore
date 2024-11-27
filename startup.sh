#!/bin/bash
# Start the frontend and backend containers
./fashion-front/fashion-store/up.sh &
./backend/up.sh &
wait
