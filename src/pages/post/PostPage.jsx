import React from "react";
import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  return <Post postId={postId} />;
};

export default PostPage;
