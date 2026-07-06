from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Text Detection API is running!"

@app.route("/predict", methods=["POST"])
def detect():
    data = request.json
    text = data["text"]

    pred, prob = predict(text)

    label = "AI Generated" if pred == 1 else "Human Written"

    return jsonify({
        "prediction": label,
        "confidence": round(prob * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)