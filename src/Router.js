import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>
  );
};

export default Router;
