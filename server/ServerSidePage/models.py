from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission

class User_loginCred(AbstractUser): 

    email = models.EmailField(unique=True, max_length=255)
    name = models.CharField(max_length=255, unique=True, default="default_user")
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_loginCred_set', 
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_loginCred_permissions_set', 
        blank=True
    )
