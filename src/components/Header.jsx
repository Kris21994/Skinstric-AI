import React from "react";
import ParenLeft from "../images/Rectangle left.svg";
import ParenRight from "../images/Rectangle right.svg";

const Header = () => (
  <nav className="navbar">
    <div className="brand">
      <span className="brand__name">Skinstric</span>
      <span className="brand__meta">
        <img src={ParenLeft} alt="(" className="brand__paren" />
        Intro
        <img src={ParenRight} alt=")" className="brand__paren" />
      </span>
    </div>
    <button className="btn btn--code">Enter Code</button>
  </nav>
);

export default Header;
