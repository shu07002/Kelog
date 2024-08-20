import React, { useRef } from "react";
import "../styles/header/header.scss";

const Header = () => {
  let lastScrollY = 0;
  const headerRef = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      headerRef.current.style.setProperty("transform", "translateY(-200%)");
      headerRef.current.style.setProperty("transition", "0.15s");
    } else {
      headerRef.current.style.removeProperty("transform");
    }

    lastScrollY = window.scrollY;
  });
  return (
    <header ref={headerRef}>
      <h1 className="header-logo">Blog</h1>
      <div className="header-buttons">
        <div>
          <img
            className="header-icons"
            src="icons/bell-regular.svg"
            alt="bell"
          />
        </div>
        <div>
          <img
            className="header-icons"
            src="icons/magnifying-glass-solid.svg"
            alt="magnifying-glass"
          />
        </div>

        <button className="header-login-button">로그인</button>
      </div>
    </header>
  );
};

export default Header;
