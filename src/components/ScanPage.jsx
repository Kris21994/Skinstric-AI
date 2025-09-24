import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraIcon from "../images/take-pic.svg";
import Group from "../images/Group 39763.svg";
import Back from "../images/back-button-camera.svg";
import Procced from "../images/procced-button-camera.svg";
import "./ScanPage.css";

const ScanPage = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptured, setIsCaptured] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Loading finished");
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const waitForVideo = setTimeout(() => {
        if (videoRef.current) {
          console.log("Activating camera...");
          activateCamera();
        } else {
          console.warn("Video element still not ready");
        }
      }, 100);

      return () => clearTimeout(waitForVideo);
    }
  }, [isLoading]);

  const sendImageToAPI = async () => {
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData }),
        }
      );

      const result = await response.json();
      console.log("Level 2 API result:", result);

      if (result.data) {
        navigate("/select", {
          state: {
            race: result.data.race,
            age: result.data.age,
            gender: result.data.gender,
          },
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const activateCamera = () => {
    const video = videoRef.current;
    if (!video) {
      console.warn("Video element not ready");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          console.log("Camera is ready:", video.videoWidth, video.videoHeight);
        };
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setCameraError(true);
      });
  };

  const takePhoto = () => {
    const video = videoRef.current;

    if (!video || video.readyState < 2) {
      console.warn("Video not ready yet");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];
    setImageData(base64);
    localStorage.setItem("capturedImage", base64);
    setIsCaptured(true);
  };

  return (
    <div className="scan-page">
      {isLoading ? (
        <div className="loading-screen">
          <div className="camera-icon" />
          <p className="loading-text">SETTING UP CAMERA...</p>
        </div>
      ) : cameraError ? (
        <p>Unable to access camera. Please check permissions.</p>
      ) : (
        <div className="scan-wrapper">
          {/* BACK BUTTON - always visible */}
          <button className="scan-back-btn" onClick={() => navigate(-1)}>
            <img src={Back} alt="Back" />
          </button>

          {/* CAMERA or CAPTURED IMAGE */}
          {!isCaptured ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-feed"
            />
          ) : (
            <img
              src={`data:image/jpeg;base64,${imageData}`}
              alt="Captured"
              className="captured-frame"
            />
          )}

          {/* OVERLAY UI */}
          <div className="overlay">
            <div className="guidance-line">
              <img src={Group} alt="" />
              {isCaptured && <p className="great-shot">Great shot!</p>}
            </div>

            {/* TAKE PICTURE BUTTON - only before capture */}
            {!isCaptured && (
              <button
                className="take-photo-btn"
                onClick={() => {
                  console.log("Take Picture clicked");
                  takePhoto();
                }}
              >
                <img src={CameraIcon} alt="Take Picture" />
              </button>
            )}

            {/* PROCEED BUTTON - only after capture */}
            {isCaptured && (
              <button className="scan-proceed-btn" onClick={sendImageToAPI}>
                <img src={Procced} alt="Proceed" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
