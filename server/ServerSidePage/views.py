from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import logout
from django.views import View
import pandas as pd
from rest_framework.views import APIView
# import numpy as np
# from django.contrib import messages
# from django.contrib.auth import authenticate, login
# from django.contrib.auth.decorators import login_required
# from django.contrib.a
# uth.models import User
# from .models import *
# import matplotlib.pyplot as plt
# import seaborn as sns
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import os, json

dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(dir, 'model_files/lstm_model.h5')
tokenizer_dir = os.path.join(dir, 'model_files/tokenizer.json')
try:
    # print(model_path)
    loaded_model = load_model(model_path)
    print(loaded_model)
except Exception as e:
    print(e,"error is ")
tokenizer = Tokenizer(num_words=100)

with open(tokenizer_dir, 'r') as json_file:
    tokenizer_json = json.load(json_file)

# tokenizer = tokenizer_from_json(tokenizer_json)
print("Model path:", model_path)
print("Tokenizer path:", tokenizer_dir)



# Create your views here.

def preprocessing(Email_content):
    test_sequences = tokenizer.texts_to_sequences([Email_content])
    a=pad_sequences(test_sequences,padding='post',maxlen=100)
    return a
def prediction(request):
    print(hello)
    result = None
    classification = None
    if request.method=="POST":
        mail_content = request.POST.get('email_content')
        print(mail_content)
        if mail_content:
            processed_content = preprocessing(mail_content)
            print(processed_content)
            prediction_result = loaded_model.predict(processed_content)
            result = "Spam Email" if prediction_result[0] > 0.5 else "Legitimate Email"
    return render(request,"Input.html", {'result':result})
def Home(request):
    # if request.user.is_authenticated:
    #     return render(request,"Input.html")
    # else:
        return render (request,"LandingPage.html")
def logout_view(request):
    logout(request)
    return render("/")
# def Login(request):
#     if request.mathod == "POST":
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         if not User.objects.filter(email=email).exists():
#             messages.error(request,'Invalid email')
#             return render (request,"/login/")
#         user = authenticate(email=email,password=password)
#         if user is None:
#             messages.error(request,'Invalid Password')
#         else:
#             login(request,user)
#             return redirect('/home/')
#     return render(request,'login.html')
# def Registration(request):
#     if request.method == 'POST':
#         Firstname = request.POST.get('firstname')
#         lastname = request.POST.get('lastname')
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         user = User.objects.filter(email=email)
#         if user.exists():
#             messages.info(request,"User already exits")
#             return redirect('/register/')
#         user = User.objects.create(
#             Firstname = Firstname,
#             lastname = lastname
#             email = email
#         )
#         user.set_password(password)
#         user.save()
#         messages.info(request,"Account Created Successfully")
#         return redirect('/register/')
#     return render(request,'Regiatration.html')

