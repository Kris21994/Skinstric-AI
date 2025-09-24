import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Summary.css";

function Summary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("age");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    if (!state || !state.race || !state.age || !state.gender) {
      navigate("/scan");
    } else {
      const sortDescending = (obj) =>
        Object.entries(obj).sort((a, b) => b[1] - a[1]);

      setSelectedRace(sortDescending(state.race)[0][0]);
      setSelectedAge(sortDescending(state.age)[0][0]);
      setSelectedGender(sortDescending(state.gender)[0][0]);
    }
  }, [state, navigate]);

  if (!state || !state.race || !state.age || !state.gender) {
    return null;
  }

  const sortDescending = (obj) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]);

  const options =
    activeFilter === "race"
      ? sortDescending(state.race)
      : activeFilter === "age"
      ? sortDescending(state.age)
      : sortDescending(state.gender);

  const selectedValue =
    activeFilter === "race"
      ? selectedRace
      : activeFilter === "age"
      ? selectedAge
      : selectedGender;

  const selectedScore =
    activeFilter === "race"
      ? state.race[selectedRace]
      : activeFilter === "age"
      ? state.age[selectedAge]
      : state.gender[selectedGender];

  return (
    <div className="container">
      <header>
        <h1>A.I. Analysis</h1>
        <h2>DEMOGRAPHICS</h2>
        <p>Predicted Race & Age</p>
      </header>

      <div className="content">
        {/* Left sidebar */}
        <aside className="sidebar-left">
          <button
            className={`filter-btn ${activeFilter === "race" ? "active" : ""}`}
            onClick={() => setActiveFilter("race")}
          >
            RACE
          </button>
          <button
            className={`filter-btn ${activeFilter === "age" ? "active" : ""}`}
            onClick={() => setActiveFilter("age")}
          >
            AGE
          </button>
          <button
            className={`filter-btn ${activeFilter === "gender" ? "active" : ""}`}
            onClick={() => setActiveFilter("gender")}
          >
            SEX
          </button>
        </aside>

        {/* Center */}
        <main className="main">
          <h3 className="selection-label">{selectedValue}</h3>
          <div className="circle">
            {selectedScore ? `${(selectedScore * 100).toFixed(0)}%` : "--"}
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="sidebar-right">
          <div className="right-header">{activeFilter.toUpperCase()}</div>
          <div className="options-list">
            {options.map(([label, score]) => {
              const isActive = label === selectedValue;
              return (
                <div
                  key={label}
                  className={`option-row ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (activeFilter === "race") setSelectedRace(label);
                    if (activeFilter === "age") setSelectedAge(label);
                    if (activeFilter === "gender") setSelectedGender(label);
                  }}
                >
                  <div className="label">
                    <span className="text>">{label}</span>
                  </div>
                  <span className="percent">{(score * 100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      <footer>
        <p className="helper">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="actions">
          <button className="reset">RESET</button>
          <button className="confirm">CONFIRM</button>
        </div>
      </footer>
    </div>
  );
}

export default Summary;