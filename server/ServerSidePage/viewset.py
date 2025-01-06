from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .Serializer import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User_loginCred
from rest_framework.response import Response



class UserViewSet(viewsets.ModelViewSet):
    queryset= User_loginCred.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    def list(self, request, *args, **kwargs):
        users = self.queryset.all()  # Fetch all users
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)