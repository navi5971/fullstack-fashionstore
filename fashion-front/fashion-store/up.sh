#!/bin/bash
docker build -t frontend-image .
docker run -p 80:80 frontend-image
