#!/bin/bash
#cd /backend
#node server.js
docker build -t backend-image .
docker run -p 5000:8080 backend-image
