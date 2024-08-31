import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import PostPage from "./pages/post/PostPage";
import WritePage from "./pages/write/WritePage";
import MyPage from "./pages/my/MyPage";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />}></Route>
      <Route path="/posting/:postId" element={<PostPage />}></Route>
      <Route path="/write" element={<WritePage />}></Route>
      <Route path="/:nickname" element={<MyPage />}></Route>
    </Routes>
  );
};

export default Router;
