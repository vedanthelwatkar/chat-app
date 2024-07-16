# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.roomGroupName = "group_chat_gfg"
        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        receiver = text_data_json["receiver"]

        await self.send(text_data=json.dumps({
                    'message': message,
                    'username': username,
                    'receiver': receiver
                }))

    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]

        # Send message back to the client
        await self.send(text_data=json.dumps({
            "message": message,
            "username": username
        }))
