import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../images/back-button.svg";
import CameraIcon from "../images/camera.svg";
import GalleryIcon from "../images/gallery.svg";
import "./ShortcutPage.css";

const ShortcutPage = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const navigate = useNavigate();

  const handleScanClick = () => {
    setShowPermissionModal(true);
  };

  const handleDeny = () => {
    setShowPermissionModal(false);
  };

  const handleAllow = () => {
    setShowPermissionModal(false);
    navigate("/scan");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result.split(",")[1]); // Base64 without prefix
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="shortcut-page">
      <h2 className="shortcut-title">TO START ANALYSIS</h2>

      <div className="diamond-options">
        <button className="diamond-btn" onClick={handleScanClick}>
          <img src={CameraIcon} alt="Scan Face" />
        </button>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="galleryInput"
          onChange={handleImageUpload}
        />
        <label htmlFor="galleryInput" className="diamond-btn">
          <img src={GalleryIcon} alt="Access Gallery" />
        </label>
      </div>

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