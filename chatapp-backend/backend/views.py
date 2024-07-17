import os
import json
import pymongo
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import certifi
ca = certifi.where()


uri = "mongodb+srv://vedanthelwatkar:vedant@clusterchatapp.vigxcwz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterChatApp"
client = MongoClient(uri,tlsCAFile=ca, server_api=ServerApi('1'))
db = client['ClusterChatApp']
users_collection = db['users']


def chat_page(request, *args, **kwargs):
    context = {}
    return JsonResponse({"message": "User authenticated and authorized to view chat page", "loggedIn": 1})

def home(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            return JsonResponse({
                "message": "home page",
                "loggedIn": 1,
                "username": request.user.username,
                "email": request.user.email
            })
        else:
            return JsonResponse({
                "message": "home page not authenticated",
                "loggedIn": 0
            })
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

def login_user(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": "Logged in already", "loggedIn": 1})
    else:
        if request.method == "POST":
            data = json.loads(request.body)
            un = data.get("un")
            pw = data.get("pw")
            user = authenticate(username=un, password=pw)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login successful", "loggedIn": 1,"username": request.user.username,
                "email": request.user.email})
            else:
                return JsonResponse({"msg": "Invalid username/password"}, status=401)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)
        
def get_user_passwords(request):
    if request.method == "GET":

            # Fetch all users from MongoDB
            all_users = users_collection.find({}, {"_id": 0, "username": 1, "password": 1})

            # Prepare a list of usernames and hashed passwords
            user_passwords = []
            for user in all_users:
                user_passwords.append({
                    "username": user["username"],
                    "password": user["password"]
                })

            return JsonResponse({"userPasswords": user_passwords})
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

def signup_user(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": "Logged in already", "loggedIn": 1})
    else:
        if request.method == "POST":
            data = json.loads(request.body)
            un = data.get("un")
            em = data.get("em")
            pw1 = data.get("pw1")
            pw2 = data.get("pw2")
            if pw1 == pw2:
                if users_collection.find_one({"username": un, "email": em}):
                    return JsonResponse({"msg": "User already exists"}, status=400)
                else:
                    hashed_pw = make_password(pw1)
                    users_collection.insert_one({"username": un, "email": em, "password": hashed_pw})
                    return JsonResponse({"message": "User creation successful", "userCreated": 1})
            else:
                return JsonResponse({"msg": "Passwords do not match"}, status=400)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)

def logout_user(request):
    logout(request)
    return JsonResponse({"message": "User logged out"})
