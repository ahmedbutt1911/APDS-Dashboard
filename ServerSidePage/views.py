from django.shortcuts import render,redirect, HttpResponse
from django.views import View
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import os, json

dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(dir, 'model_files/lstm_model.h5')
tokenizer_dir = os.path.join(dir, 'model_files/tokenizer.json')
# print(model_path)
loaded_model = load_model(model_path)

tokenizer = Tokenizer(num_words=100)

with open(tokenizer_dir, 'r') as json_file:
    tokenizer_json = json.load(json_file)

tokenizer = tokenizer_from_json(tokenizer_json)


# Create your views here.

def preprocessing(Email_content):
    test_sequences = tokenizer.texts_to_sequences([Email_content])
    a=pad_sequences(test_sequences,padding='post',maxlen=100)
    return a
def prediction(request):
    result = None
    if request.method=="POST":
        mail_content = request.POST.get('email_content')
        print(mail_content)
        if mail_content:
            processed_content = preprocessing(mail_content)
            print(processed_content)
            prediction_result = loaded_model.predict(processed_content)
            result = "Spam Email" if prediction_result[0] > 0.5 else "Legitimate Email"
    return render(request,"Input.html", {'result':result})
