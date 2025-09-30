import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../images/back-button.svg";
import CameraIcon from "../images/camera.svg";
import GalleryIcon from "../images/gallery.svg";
import Proceed from "../images/proceed button.svg"; // optional button image
import "./ShortcutPage.css";

const ShortcutPage = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Camera button flow (already working)
  const handleScanClick = () => setShowPermissionModal(true);
  const handleDeny = () => setShowPermissionModal(false);
  const handleAllow = () => {
    setShowPermissionModal(false);
    navigate("/scan");
  };

  // Gallery upload
  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1]; // strip prefix
      setGalleryImage(base64);
      localStorage.setItem("uploadedImage", base64);
      localStorage.setItem("imageSource", "gallery");
    };
    reader.readAsDataURL(file);
  };

  // Send to API when user clicks Proceed
  const handleProceed = async () => {
    if (!galleryImage) return;
    setIsProcessing(true);

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: galleryImage }),
        }
      );

      const result = await response.json();
      if (result.data) {
        navigate("/select", {
          state: {
            race: result.data.race,
            age: result.data.age,
            gender: result.data.gender,
          },
        });
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="shortcut-page">
      <h2 className="shortcut-title">TO START ANALYSIS</h2>

      <div className="diamond-options">
        {/* Camera Button */}
        <button className="diamond-btn" onClick={handleScanClick}>
          <img src={CameraIcon} alt="Scan Face" />
        </button>

        {/* Gallery Button */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="galleryInput"
          onChange={handleGalleryUpload}
        />
        <label htmlFor="galleryInput" className="diamond-btn">
          <img src={GalleryIcon} alt="Access Gallery" />
        </label>
      </div>

      {/* Preview & Proceed */}
      {galleryImage && (
        <div className="image-preview">
          <img
            src={`data:image/jpeg;base64,${galleryImage}`}
            alt="Uploaded Preview"
            style={{ maxWidth: "200px", marginBottom: "1rem" }}
          />
          <button
            className="shortcut-proceed"
            onClick={handleProceed}
            disabled={isProcessing}
          >
            <img src={Proceed} alt="Proceed" />
          </button>
        </div>
      )}

      {showPermissionModal && (
        <div className="camera-modal-box">
          <div className="camera-modal-content">
            <p className="camera-modal-text">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </p>
            <div className="camera-modal-divider"></div>
            <div className="camera-modal-buttons">
              <button className="deny-btn" onClick={handleDeny}>
                DENY
              </button>
              <button className="allow-btn" onClick={handleAllow}>
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/test")}>
        <img src={BackIcon} alt="Back" />
      </button>
    </div>
  );
};

export default ShortcutPage;
