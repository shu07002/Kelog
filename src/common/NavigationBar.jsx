import React, { useContext, useRef, useEffect } from "react";
import "../styles/navigationBar/navigationBar.scss";
import { DateFilterContext } from "../context/DateFilterContext";

const NavigationBar = () => {
  const options = [
    { value: 1, label: "오늘" },
    { value: 2, label: "이번 주" },
    { value: 3, label: "이번 달" },
    { value: 4, label: "올해" },
  ];

  const { dateFilter, setDateFilter } = useContext(DateFilterContext);

  let lastScrollY = 136;
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= lastScrollY) {
          navRef.current.style.setProperty("transform", "translateY(-200%)");
          navRef.current.style.setProperty("transition", "0.15s");
        } else {
          navRef.current.style.removeProperty("transform");
        }
        if (window.scrollY > 136) lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav ref={navRef}>
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
