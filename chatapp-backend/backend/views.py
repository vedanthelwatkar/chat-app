from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Invitation
import djongo
from bson import ObjectId

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
def send_invite(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            current_user_username = data.get("username")
            invited_receiver_name = data.get("receiver")

            try:
                current_user = User.objects.get(username=current_user_username)
                invited_receiver = User.objects.get(username=invited_receiver_name)
            except User.DoesNotExist:
                return JsonResponse({"message": "User not found"}, status=404)

            if current_user == invited_receiver:
                return JsonResponse({"message": "Cannot invite yourself"}, status=400)

            existing_invitation = Invitation.objects.filter(
                requester=current_user,
                receiver=invited_receiver
            ).exists()

            if existing_invitation:
                return JsonResponse({"message": "Invitation already sent"}, status=400)

            new_invitation = Invitation(requester=current_user, receiver=invited_receiver)
            new_invitation.save()

            invitation_id = str(new_invitation._id)

            return JsonResponse({"message": "Invitation sent successfully", "invitation_id": invitation_id})
        
        except Exception as e:
            return JsonResponse({"message": "Error processing request", "error": str(e)}, status=500)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

@csrf_exempt
def accept_invite(request):
    if request.method == "POST":
        data = json.loads(request.body)
        invitation_id_str = data.get("invitation_id")
        accept = data.get("accept")
        
        try:
            invitation_id = ObjectId(invitation_id_str)
            invitation = Invitation.objects.get(_id=invitation_id)
        except Invitation.DoesNotExist:
            return JsonResponse({"message": f"Invitation with _id {invitation_id_str} not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": f"Error retrieving invitation: {str(e)}"}, status=500)
                
        if accept is not None:
            if accept:
                invitation.accepted = True
                invitation.save()
                return JsonResponse({"message": "Invitation accepted successfully"})
            else:
                invitation.delete()
                return JsonResponse({"message": "Invitation rejected and removed"})
        else:
            return JsonResponse({"message": "Invalid 'accept' flag provided"}, status=400)
    
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

@csrf_exempt
def get_invitations(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            current_user_username = data.get("username")

            current_user = User.objects.get(username=current_user_username)

            all_invitations = Invitation.objects.all()
            chat_users = set()
            response_data = []

            for invitation in all_invitations:
                if (invitation.receiver == current_user or invitation.requester == current_user) and invitation.accepted:
                    chat_users.add(invitation.requester.username if invitation.receiver == current_user else invitation.receiver.username)

                if invitation.receiver == current_user:
                    response_data.append({
                        "sender_username": invitation.requester.username,
                        "invitation_id": str(invitation._id),
                        "accepted": invitation.accepted
                    })

            return JsonResponse({
                "invitations": response_data,
                "can_chat_with": list(chat_users)
            })

        except Exception as e:
            print(f"Unhandled Error: {e}")
            return JsonResponse({"message": "Error processing request", "error": str(e)}, status=500)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)


@csrf_exempt
def check_invitation_status(request):
    if request.method == "POST":
        data = json.loads(request.body)
        current_user_username = data.get("username")
        receiver_username = data.get("receiver")

        if not current_user_username or not receiver_username:
            return JsonResponse({"message": "Invalid data"}, status=400)

        current_user = User.objects.get(username=current_user_username)
        receiver = User.objects.get(username=receiver_username)

        invitations = Invitation.objects.all()

        for invitation in invitations:
            if (invitation.requester == current_user and invitation.receiver == receiver) or \
               (invitation.requester == receiver and invitation.receiver == current_user):
                if invitation.accepted:
                    return JsonResponse({"message": "Invitation accepted. You can chat."})

        return JsonResponse({"message": "Invitation not accepted. Cannot chat yet."})

    return JsonResponse({"message": "Invalid request method"}, status=405)



def chat_page(request, *args, **kwargs):
    context = {}
    return JsonResponse({"message": "User authenticated and authorized to view chat pages", "loggedIn": 1})