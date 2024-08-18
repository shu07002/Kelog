import React, { useState } from "react";
import "../styles/navigationBar/navigationBar.scss";

const NavigationBar = () => {
  const [dateFilter, setDateFilter] = useState("이번 주");

  const options = [
    { value: 1, label: "오늘" },
    { value: 2, label: "이번 주" },
    { value: 3, label: "이번 달" },
    { value: 4, label: "올해" },
  ];

  return (
    <nav>
      <section className="nav-section">
        <div className="nav-section-category">
          <h4>트렌딩</h4>
          <h4>최신</h4>
          <h4>피드</h4>
        </div>
      </section>
      <section>
        <div className="nav-option">
          <select
            onChange={(e) => setDateFilter(e.target.value)}
            value={dateFilter}
          >
            {options.map((option) => (
              <option key={option.value} defaultValue={"이번 주"}>
                {option.label}
              </option>
            ))}
          </select>
          <img
            className="nav-bars-icon"
            src="icons/bars-solid.svg"
            alt="menu"
          />
        </div>
      </section>
    </nav>
  );
};

export default NavigationBar;
