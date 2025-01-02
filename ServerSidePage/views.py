from django.shortcuts import render,redirect, HttpResponse
from django.views import View
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# import h5py
# import re
# import nltk
# from nltk.stem import PorterStemmer 
# from nltk.corpus import stopwords
# from sklearn.model_selection import train_test_split
# nltk.download('stopwords')
# ps=PorterStemmer()
# sw=stopwords.words('english')



loaded_model = load_model("D:/University/FYP/new_app_Django/APDS/DeepLearningModel/lstm_model.h5")


# Create your views here.

def preprocessing(Email_content):
    tokenizer = Tokenizer(num_words=100)
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
            result = "spam" if prediction_result[0] > 0.5 else "Legitimate Email"
    return render(request,"Input.html", {'result':result})
