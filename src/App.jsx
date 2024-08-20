import React, { useState } from "react";
import Header from "./common/Header";
import Router from "./Router";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.scss";
import NavigationBar from "./common/NavigationBar";
import { DateFilterContext } from "./context/DateFilterContext";

const App = () => {
  const [dateFilter, setDateFilter] = useState("이번 주");

  return (
    <BrowserRouter>
      <DateFilterContext.Provider value={{ dateFilter, setDateFilter }}>
        <Content />
      </DateFilterContext.Provider>
    </BrowserRouter>
  );
};

const Content = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      {location.pathname === "/" && <NavigationBar />}
      <Router />
    </div>
  );
};

export default App;
