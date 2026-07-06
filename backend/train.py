import pandas as pd
import string
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

from nltk.corpus import stopwords
import nltk

nltk.download("stopwords")

stop_words = set(stopwords.words("english"))

df = pd.read_csv("../dataset/balanced_ai_human_prompts.csv")

def clean_text(text):

    text = text.lower()

    text = "".join(
        ch for ch in text if ch not in string.punctuation
    )

    words = text.split()

    words = [
        w for w in words
        if w not in stop_words
    ]

    return " ".join(words)

df["clean"] = df["text"].apply(clean_text)

X = df["clean"]
y = df["generated"]

vectorizer = TfidfVectorizer(max_features=5000)

X = vectorizer.fit_transform(X)

X_train,X_test,y_train,y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression()

model.fit(X_train,y_train)

pred = model.predict(X_test)

print("Accuracy :",accuracy_score(y_test,pred))

joblib.dump(model,"model.pkl")
joblib.dump(vectorizer,"vectorizer.pkl")