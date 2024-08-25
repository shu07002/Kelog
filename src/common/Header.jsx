import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/header/header.scss";
import LoginModal from "../components/Login/LoginModal";
import { LoginModalPortal } from "../portal/LoginModalPortal";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const scrollRef = useRef(136);
  const headerRef = useRef(null);

  const [loginModal, setLoginModal] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  const onClickLogin = () => {
    setLoginModal(!loginModal);
  };

  const onLogout = async () => {
    try {
      await auth.signOut();
      window.localStorage.removeItem("CURRENT_USER");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY >= scrollRef.current) {
          headerRef.current.style.setProperty("transform", "translateY(-200%)");
          headerRef.current.style.setProperty("transition", "0.15s");
        } else {
          headerRef.current.style.removeProperty("transform");
        }
        if (window.scrollY > 136) scrollRef.current = window.scrollY;
      }
    };
    console.log(isLoggedIn);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClickLogo = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header ref={headerRef}>
      <h1 className="header-logo" onClick={onClickLogo}>
        {location.pathname === "/" ? "Blog" : <a href="/">Blog</a>}
      </h1>

      <div className="header-buttons">
        <div className="alarm">
          <img
            className="header-icons"
            src="../../icons/bell-regular.svg"
            alt="bell"
          />
        </div>

        {isLoggedIn ? (
          <div className="loggedInDiv">
            <button onClick={() => (window.location.href = "/write")}>
              새 글 작성
            </button>
            <button onClick={onLogout}>로그아웃</button>
            <div>
              <img
                src="https://velcdn.com/images/user-thumbnail.png"
                alt="user-image"
              />
            </div>
          </div>
        ) : (
          <button className="header-login-button" onClick={onClickLogin}>
            로그인
          </button>
        )}
      </div>

      {loginModal && (
        <LoginModalPortal>
          <LoginModal onClickLogin={onClickLogin} />
        </LoginModalPortal>
      )}
    </header>
  );
};

export default Header;
