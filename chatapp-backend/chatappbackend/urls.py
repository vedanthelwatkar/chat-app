from django.contrib import admin
from django.urls import path, include
from backend.views import home, login_user, signup_user, logout_user,get_all_users,send_invite,accept_invite,get_invitations,check_invitation_status

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('login', login_user, name='login_user'),
    path('signup', signup_user, name='signup_user'),
    path('logout', logout_user, name='logout_user'),
    path('chat', include('backend.urls')),
    path('users',get_all_users,name="get_all_users"),
    path('invite',send_invite,name="send_invite"),
    path('accept-invite',accept_invite,name="accept_invite"),
    path('get-invitations',get_invitations,name="get_invitations"),
    path('status',check_invitation_status,name="check_invitation_status")
]
