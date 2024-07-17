import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from backend import routing
from chatappbackend.consumers import ChatConsumer  # adjust import as per your project structure

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChatApp.settings')

# Django ASGI application
django_asgi_app = get_asgi_application()

# WebSocket URL patterns
websocket_urlpatterns = [
    path('ws/chat', ChatConsumer.as_asgi()),
]

# ProtocolTypeRouter for HTTP and WebSocket
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": 
        URLRouter(
            websocket_urlpatterns
        
    ),
})
