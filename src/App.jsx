import React from "react";
import Header from "./common/Header";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
