import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/header/header.scss";
import LoginModal from "../components/Login/LoginModal";
import { LoginModalPortal } from "../portal/LoginModalPortal";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MainHeader from "./MainHeader";
import ExpandingHeader from "./ExpandingHeader";

const Header = () => {
  const scrollRef = useRef(136);
  const headerRef = useRef(null);
  const closeMenuRef = useRef();
  const menuRef = useRef();

  const [expand, setExpand] = useState(false);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  const clickOutside = (e) => {
    if (
      closeMenuRef.current &&
      !closeMenuRef.current.contains(e.target) &&
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setOpenMenu1(false);
      setOpenMenu2(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);

    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY >= scrollRef.current) {
          headerRef.current.style.setProperty("transform", "translateY(-200%)");
          headerRef.current.style.setProperty("transition", "transform 0.15s");
        } else {
          headerRef.current.style.removeProperty("transform");
        }
        if (window.scrollY > 80) {
          scrollRef.current = window.scrollY;
        }

        if (window.scrollY > 136) setExpand(true);
        else setExpand(false);
      }
    };
    console.log(isLoggedIn);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const onClickMenu = (type) => {
    if ((openMenu1 && type === 2) || (openMenu2 && type === 1)) {
      setOpenMenu1(!openMenu1);
      setOpenMenu2(!openMenu2);
    }

    if (type === 1) {
      setOpenMenu1(!openMenu1);
    } else if (type === 2) {
      setOpenMenu2(!openMenu2);
    }
  };

  return (
    <div className="header-layout">
      <MainHeader
        isLoggedIn={isLoggedIn}
        location={location}
        onClickMenu={onClickMenu}
        closeMenuRef={closeMenuRef}
        openMenu1={openMenu1}
        menuRef={menuRef}
      />

      <ExpandingHeader
        location={location}
        isLoggedIn={isLoggedIn}
        onClickMenu={onClickMenu}
        openMenu2={openMenu2}
        menuRef={menuRef}
        headerRef={headerRef}
        expand={expand}
      />
    </div>
  );
};

export default Header;
