import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingIcon from "../images/011.svg";
import Demo from "../images/Demographics.svg";
import Skin from "../images/Skin Type Details.svg";
import Weather from "../images/weather.svg";
import Cosmetic from "../images/Cosmetic concerns.svg";
import SelectRumbuids from "../images/rombuses.svg";
import "./Select.css";

function Select() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const raceData = state?.race;
  const ageData = state?.age;
  const genderData = state?.gender;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Select page loading finished");
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="select-page">
      {isLoading ? (
        <div className="select-loading-screen">
          <img
            src={LoadingIcon}
            alt="Loading"
            className="select-loading-icon"
          />
        </div>
      ) : (
        <div className="select-wrapper">
          <h1 className="title">SKINOTYPE</h1>
          <h2 className="subtitle">A.I. ANALYSIS</h2>
          <p className="instruction">
            A.I. HAS ESTIMATED THE FOLLOWING. ENTER INFORMATION IF NEEDED.
          </p>

          <div className="diamond-grid">
            <div className="diamond-frame">
              <img src={SelectRumbuids} alt="" />
            </div>

            <div
              className="diamond top"
              onClick={() =>
                navigate("/summary", {
                  state: {
                    race: raceData,
                    age: ageData,
                    gender: genderData,
                  },
                })
              }
            >
              <img src={Demo} alt="" />
            </div>
            <div className="diamond left disabled">
              <img src={Skin} alt="" />
            </div>
            <div className="diamond right disabled">
              <img src={Cosmetic} alt="" />
            </div>
            <div className="diamond bottom disabled">
              <img src={Weather} alt="" />
            </div>
          </div>

          <div className="nav-buttons">
            <button className="back-btn" onClick={() => navigate(-1)}>
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
