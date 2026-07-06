import joblib

model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def predict(text):

    vec = vectorizer.transform([text])

    pred = model.predict(vec)[0]

    prob = model.predict_proba(vec).max()

    return pred, prob