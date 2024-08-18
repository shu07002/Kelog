import React, { useState } from "react";
import Header from "./common/Header";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import NavigationBar from "./common/NavigationBar";
import { DateFilterContext } from "./context/DateFilterContext";

const App = () => {
  const [dateFilter, setDateFilter] = useState("이번 주");
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <DateFilterContext.Provider value={{ dateFilter, setDateFilter }}>
          <NavigationBar />
          <Router />
        </DateFilterContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
