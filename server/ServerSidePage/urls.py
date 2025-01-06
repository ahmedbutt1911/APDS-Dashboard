from django.urls import path
from .views import prediction, Home, logout_view

urlpatterns = [
    path("", Home, name="Home"),
    path("logout_view", logout_view, name="logout_view"),
    path("prediction", prediction, name="prediction"),
    
]