import React from "react";
import Header from "./common/Header";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import NavigationBar from "./common/NavigationBar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <NavigationBar />
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
