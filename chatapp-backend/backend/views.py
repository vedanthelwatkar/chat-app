import json
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User

def home(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print('data: ', data)
        try:
            user_from_db = User.objects.get(username=data['username'])
            return JsonResponse({
                "message": "home page",
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
    return JsonResponse({"message": "User authenticated and authorized to view chat pagesss", "loggedIn": 1})

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


def signup_user(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": "Logged in already"}, {"loggedIn": 1})
    else:
        if request.method == "POST":
            data = json.loads(request.body)
            un = data.get("un")
            em = data.get("em")
            pw1 = data.get("pw1")
            pw2 = data.get("pw2")
            if pw1 == pw2:
                try:
                    usr = User.objects.get(username=un,email=em)
                    return JsonResponse({"msg": "User already exists"}, status=400)
                except User.DoesNotExist:
                    usr = User.objects.create_user(username=un,email=em, password=pw1)
                    usr.save()
                    return JsonResponse({"message": "User creation successful","userCreated":1})
            else:
                return JsonResponse({"msg": "Passwords do not match"}, status=400)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)

def logout_user(request):
    logout(request)
    return JsonResponse({"message": "User logged out"})
