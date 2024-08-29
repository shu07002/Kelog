import React, { useState } from "react";
import { LoginModalPortal } from "../portal/LoginModalPortal";
import LoginModal from "../components/Login/LoginModal";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const ExpandingHeader = ({
  location,
  isLoggedIn,
  onClickMenu,
  openMenu2,
  menuRef,
  headerRef,
  expand,
}) => {
  const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  const onLogout = async (e) => {
    e.stopPropagation();
    try {
      await auth.signOut();
      window.localStorage.removeItem("CURRENT_USER");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLogin = () => {
    setLoginModal(!loginModal);
  };

  return (
    <div className="header-expander" ref={headerRef}>
      <header className={`${expand ? "expand-header" : "normal-header"}`}>
        <h1 className="header-logo" onClick={onClickLogo}>
          {location.pathname.startsWith("/posting") ? (
            <div className="logo-and-nickname">
              <div className="logo-box">K</div>
              <div>{CURRENT_USER?.nickname}</div>
            </div>
          ) : (
            "Kelog"
          )}
        </h1>

        <div className="header-buttons">
          <div className="alarm">
            <img
              className="header-icons"
              src="../../icons/bell-regular.svg"
              alt="bell"
            />
          </div>

          {isLoggedIn && CURRENT_USER ? (
            <div className="loggedInDiv">
              <button
                className="write"
                onClick={() => (window.location.href = "/write")}
              >
                새 글 작성
              </button>
              <div className="detail" onClick={() => onClickMenu(2)}>
                <img
                  src="https://velcdn.com/images/user-thumbnail.png"
                  alt="user-image"
                />
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </div>

              {openMenu2 && (
                <div className="menu" ref={menuRef}>
                  <div>
                    <a>
                      <div>내 블로그</div>
                    </a>
                    <a className="responsive-write">
                      <div>새 글 작성</div>
                    </a>
                    <a>
                      <div>임시 글</div>
                    </a>
                    <a>
                      <div>읽기 목록</div>
                    </a>
                    <a>
                      <div>설정</div>
                    </a>
                    <a>
                      <div onClick={onLogout}>로그아웃</div>
                    </a>
                  </div>
                </div>
              )}
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
    </div>
  );
};

export default ExpandingHeader;
