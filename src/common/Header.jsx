import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/header/header.scss";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import MainHeader from "./MainHeader";
import ExpandingHeader from "./ExpandingHeader";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const headerRef = useRef(null);

  const location = useLocation();

  return (
    <div className="header-layout">
      <div>
        <MainHeader isLoggedIn={isLoggedIn} location={location} />
      </div>
      <div>
        <ExpandingHeader
          location={location}
          isLoggedIn={isLoggedIn}
          headerRef={headerRef}
        />
      </div>
    </div>
  );
};

export default Header;
