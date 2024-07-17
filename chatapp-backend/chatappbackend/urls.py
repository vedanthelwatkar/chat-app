from django.contrib import admin
from django.urls import path, include
from backend.views import home, login_user, signup_user, logout_user,get_user_passwords

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('login', login_user, name='login_user'),
    path('signup', signup_user, name='signup_user'),
    path('logout', logout_user, name='logout_user'),
    path('chat', include('backend.urls')),
    path('users',get_user_passwords,name="get_user_passwords")
]
