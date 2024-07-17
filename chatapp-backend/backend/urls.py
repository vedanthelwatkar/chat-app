from django.urls import path
from backend import views as chat_views
from django.contrib.auth.views import LoginView, LogoutView


urlpatterns = [
    path("", chat_views.chat_page, name="chat-page"),
]