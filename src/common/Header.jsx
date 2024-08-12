import React from "react";
import "../styles/header/header.scss";

const Header = () => {
  return (
    <header>
      <p className="header-logo">Blog</p>
      <div className="header-buttons">
        <img className="header-icons" src="icons/bell-regular.svg" alt="bell" />
        <img
          className="header-icons"
          src="icons/magnifying-glass-solid.svg"
          alt="magnifying-glass"
        />
        <button className="header-login-button">로그인</button>
      </div>
    </header>
  );
};

export default Header;
