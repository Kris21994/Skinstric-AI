import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import IconLeft from "../images/button-icon-text-shrunk (1).svg";
import IconRight from "../images/button-icon-text-shrunk.svg";
import IconLeft1 from "../images/Rectangle left1.svg";
import IconRight1 from "../images/Rectangle right1.svg";

const Hero = () => {
  const [hoverSide, setHoverSide] = useState(null); // 'left' or 'right'
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Corner Frames */}
      <div
        className={`corner-frame corner-frame--left ${
          hoverSide === "right" ? "hidden" : ""
        }`}
      >
        <img src={IconLeft1} alt="" />
      </div>
      <div
        className={`corner-frame corner-frame--right ${
          hoverSide === "left" ? "hidden" : ""
        }`}
      >
        <img src={IconRight1} alt="" />
      </div>

      {/* Buttons */}
      {hoverSide !== "right" && (
        <button
          className="hero-btn hero-btn--left"
          onMouseEnter={() => setHoverSide("left")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <img src={IconRight} alt="Discover AI" />
        </button>
      )}
      {hoverSide !== "left" && (
        <button
          className="hero-btn hero-btn--right"
          onMouseEnter={() => setHoverSide("right")}
          onMouseLeave={() => setHoverSide(null)}
          onClick={() => navigate("/test")}

        >
          <img src={IconLeft} alt="Take a Photo" />
        </button>
      )}

      {/* Title */}
      <h1
        className={`hero__title ${
          hoverSide === "left"
            ? "slide-right"
            : hoverSide === "right"
            ? "slide-left"
            : ""
        }`}
      >
        <span className="hero__title--sophisticated">Sophisticated</span>
        <span className="hero__title--skincare">Skincare</span>
      </h1>

      {/* Footnote */}
      <p className="hero__footnote">
        Skinstric developed an A.I. that creates a highly-personalised routine
        tailored to what your skin needs.
      </p>
    </section>
  );
};

export default Hero;
