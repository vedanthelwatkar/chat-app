#!/bin/bash

cd /home/chatappvedant/chatapp-backend
source /home/chatappvedant/.virtualenvs/vedant/bin/activate
exec daphne -b 0.0.0.0 -p 8000 chatappbackend.asgi:application
