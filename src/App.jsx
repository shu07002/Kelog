import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Router from "./Router";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.scss";
import NavigationBar from "./common/NavigationBar";
import { DateFilterContext } from "./context/DateFilterContext";
import { AuthContext } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [dateFilter, setDateFilter] = useState("이번 주");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn }}>
        <DateFilterContext.Provider value={{ dateFilter, setDateFilter }}>
          <Content />
        </DateFilterContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

const Content = () => {
  const location = useLocation();

  return (
    <div className="App">
      <div className="layout">
        {(location.pathname === "/" ||
          location.pathname.startsWith("/posting")) && <Header />}
        {location.pathname === "/" && <NavigationBar />}
      </div>
      <div className="layout">
        <Router />
      </div>
    </div>
  );
};

export default App;
