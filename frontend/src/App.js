import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        text: text,
      });

      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (error) {
      alert("Backend is not running!");
      console.log(error);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setText("");
    setPrediction("");
    setConfidence(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "900px",
          background: "#1e293b",
          padding: "35px",
          borderRadius: "15px",
          color: "white",
          boxShadow: "0px 0px 25px rgba(0,0,0,.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🤖 AI Generated Text Detector
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Text Classification using NLP & Machine Learning
        </p>

        <textarea
          rows="12"
          value={text}
          placeholder="Paste your text here..."
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            borderRadius: "10px",
            padding: "15px",
            fontSize: "16px",
            resize: "none",
            outline: "none",
            border: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handlePredict}
            style={{
              flex: 1,
              padding: "15px",
              fontSize: "18px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>

          <button
            onClick={resetForm}
            style={{
              width: "150px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {prediction && (
          <div
            style={{
              marginTop: "35px",
              background: "#0f172a",
              borderRadius: "10px",
              padding: "25px",
            }}
          >
            <h2>Prediction Result</h2>

            <h1
              style={{
                color:
                  prediction === "AI Generated"
                    ? "#ef4444"
                    : "#22c55e",
              }}
            >
              {prediction}
            </h1>

            <h3>Confidence</h3>

            <div
              style={{
                width: "100%",
                height: "25px",
                background: "#334155",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${confidence}%`,
                  height: "100%",
                  background:
                    prediction === "AI Generated"
                      ? "#ef4444"
                      : "#22c55e",
                  transition: "0.5s",
                }}
              ></div>
            </div>

            <p
              style={{
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              {confidence}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;