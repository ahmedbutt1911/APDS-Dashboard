from rest_framework import serializers
from .models import User_loginCred
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_loginCred
        fields = ['id','username','name','email']
