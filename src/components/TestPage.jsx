import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../images/back-button.svg";
import Rumbuses from "../images/rombuses.svg";
import Proceed from "../images/proceed button.svg";
import "../components/TestPage.css";

const TestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const validateText = (text) => /^[a-zA-Z\s]+$/.test(text.trim());

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (step === 1 && validateText(name)) {
        setStep(2);
      } else if (step === 2 && validateText(location)) {
        setStep(3);
        triggerProcessing();
        await sendToAPI(name, location);
      }
    }
  };

  const sendToAPI = async (name, location) => {
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, location }),
        }
      );
      const result = await response.json();
      console.log("API Response:", result);

      localStorage.setItem("userName", name);
      localStorage.setItem("userLocation", location);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  const triggerProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 3500);
  };

  const handleProceed = () => {
    navigate("/shortcut");
  };

  return (
    <div className="test-page">
      {/* Header */}
      <header className="page-header">
        <h2 className="page-title">To start analysis</h2>
      </header>

      {/* Main Content */}
      <main className="page-main">
        <div className="diamond-wrapper">
          <div className="diamond-content">
            {step < 3 && (
              <>
                <label className="intro-label">
                  {step === 1 || step === 2 ? "Click to type" : ""}
                </label>
                <input
                  type="text"
                  className="intro-input"
                  placeholder={
                    step === 1 ? "Introduce yourself" : "Where are you from?"
                  }
                  value={step === 1 ? name : location}
                  onChange={(e) =>
                    step === 1
                      ? setName(e.target.value)
                      : setLocation(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />
                <img src={Rumbuses} alt="" className="rumbuses" />
              </>
            )}

            {isProcessing && (
              <div className="loading-message">Analyzing... Please wait</div>
            )}

            {isDone && (
              <div className="done-message">
                Processing done. Please proceed forward.
              </div>
            )}
          </div>
        </div>
      </main>

        <button className="test-back-btn" onClick={handleBack}>
          <img src={BackButton} alt="Back" />
        </button>

        {isDone && (
          <button className="test-proceed-btn" onClick={handleProceed}>
            <img src={Proceed} alt="Proceed" />
          </button>
        )}
    </div>
  );
};

export default TestPage;
