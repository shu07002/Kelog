import React, { useContext, useRef } from "react";
import "../styles/header/header.scss";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import CommonHeader from "./CommonHeader";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const headerRef = useRef(null);

  const location = useLocation();

  return (
    <div className="header-layout">
      <div>
        <CommonHeader isLoggedIn={isLoggedIn} location={location} />
      </div>
      <div>
        <CommonHeader
          location={location}
          isLoggedIn={isLoggedIn}
          headerRef={headerRef}
        />
      </div>
    </div>
  );
};

export default Header;
