import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import Post from "./post/Post";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />}></Route>
      <Route path="/posting/:postId" element={<Post />}></Route>
    </Routes>
  );
};

export default Router;
