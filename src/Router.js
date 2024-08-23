import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import Post from "./post/Post";
import Writing from "./write/Writing";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />}></Route>
      <Route path="/posting/:postId" element={<Post />}></Route>
      <Route path="/write" element={<Writing />}></Route>
    </Routes>
  );
};

export default Router;
