import React from "react";
import { useParams } from "react-router-dom";
import "../styles/post/post.scss";

const Post = () => {
  const { postId } = useParams();
  return <div className="posting">{postId}</div>;
};

export default Post;
