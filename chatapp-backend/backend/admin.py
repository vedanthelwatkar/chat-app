from django.contrib import admin
from .models import Message, Invitation

class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'message', 'timestamp')
    search_fields = ('sender', 'receiver', 'message')

class InvitationAdmin(admin.ModelAdmin):
    list_display = ('requester', 'receiver', 'accepted')
    list_filter = ('accepted',)
    search_fields = ('requester__username', 'receiver__username')

admin.site.register(Message, MessageAdmin)
admin.site.register(Invitation, InvitationAdmin)
