import React from "react";
import "../styles/navigationBar/navigationBar.scss";

const NavigationBar = () => {
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
          <select name="timeline">
            <option>오늘</option>
            <option defaultValue>이번 주</option>
            <option>이번 달</option>
            <option>올해</option>
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
