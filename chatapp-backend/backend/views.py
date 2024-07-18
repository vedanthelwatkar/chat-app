from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Message

@csrf_exempt
def home(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            user_from_db = User.objects.get(username=data['username'])
            if user_from_db is not None:
                return JsonResponse({
                    "message": "Home page",
                    "loggedIn": 1,
                    "username": user_from_db.username,
                    "email": user_from_db.email
                })
        except User.DoesNotExist:
            return JsonResponse({"message": "User not found in database"}, status=404)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

def chat_page(request, *args, **kwargs):
    context = {}
    return JsonResponse({"message": "User authenticated and authorized to view chat pages", "loggedIn": 1})

@csrf_exempt
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
                return JsonResponse({
                    "message": "Login successful",
                    "loggedIn": 1,
                    "username": request.user.username,
                    "email": request.user.email
                })
            else:
                return JsonResponse({"msg": "Invalid username/password"}, status=401)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)

@csrf_exempt
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
                try:
                    existing_user = User.objects.get(username=un)
                    if existing_user is not None:
                        return JsonResponse({"msg": "User already exists"}, status=400)
                except User.DoesNotExist:
                    usr = User.objects.create_user(username=un, email=em, password=pw1)
                    usr.save()
                    return JsonResponse({"message": "User creation successful", "userCreated": 1})
            else:
                return JsonResponse({"msg": "Passwords do not match"}, status=400)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)

@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({"message": "User logged out"})

@csrf_exempt
def get_all_users(request):
    users = User.objects.all()
    usernames = [user.username for user in users]
    return JsonResponse({"usernames": usernames})

@csrf_exempt
def store_message(request):
    if request.method == "POST":
        data = json.loads(request.body)
        sender = data.get('sender')
        receiver = data.get('receiver')
        message_text = data.get('message')

        try:
            message = Message.objects.create(
                sender=sender,
                receiver=receiver,
                message=message_text
            )
            return JsonResponse({
                "message": "Message stored successfully",
                "sender": message.sender,
                "receiver": message.receiver,
                "message": message.message,
                "timestamp": message.timestamp.isoformat()
            })
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)
