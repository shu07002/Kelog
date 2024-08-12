import React from "react";
import Header from "./common/Header";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
