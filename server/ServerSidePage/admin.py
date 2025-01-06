from django.contrib import admin
from .models import User_loginCred
# Register your models here.

@admin.register(User_loginCred)
class Useradmin(admin.ModelAdmin):
    list_display = ['id','email','name']
