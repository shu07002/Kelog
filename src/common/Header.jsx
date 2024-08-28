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
  const [expand, setExpand] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
    };
  }, []);

  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="header-layout">
      <header>
        <h1 className="header-logo" onClick={onClickLogo}>
          {location.pathname.startsWith("/posting") ? (
            <div className="logo-and-nickname">
              <div className="logo-box">K</div>
              <div>
                {
                  JSON.parse(window.localStorage.getItem("CURRENT_USER"))
                    .nickname
                }
              </div>
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

          {isLoggedIn ? (
            <div className="loggedInDiv">
              <button onClick={() => navigate("/write")}>새 글 작성</button>
              <button onClick={onLogout}>로그아웃</button>
              <div className="detail" onClick={() => setOpenMenu(!openMenu)}>
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

              {openMenu && (
                <div className="menu">
                  <div>
                    <a>
                      <div>내 블로그</div>
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
                      <div>로그아웃</div>
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
      <div className="header-expander" ref={headerRef}>
        <header className={`${expand ? "expand-header" : "normal-header"}`}>
          <h1 className="header-logo" onClick={onClickLogo}>
            {location.pathname.startsWith("/posting") ? (
              <div className="logo-and-nickname">
                <div className="logo-box">K</div>
                <div>
                  {
                    JSON.parse(window.localStorage.getItem("CURRENT_USER"))
                      .nickname
                  }
                </div>
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

            {isLoggedIn ? (
              <div className="loggedInDiv">
                <button onClick={() => (window.location.href = "/write")}>
                  새 글 작성
                </button>
                <button onClick={onLogout}>로그아웃</button>
                <div className="detail" onClick={() => setOpenMenu(!openMenu)}>
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

                {openMenu && (
                  <div className="menu">
                    <div>
                      <a>
                        <div>내 블로그</div>
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
                        <div>로그아웃</div>
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
    </div>
  );
};

export default Header;
