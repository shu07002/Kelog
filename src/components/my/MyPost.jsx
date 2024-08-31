import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import "../../styles/my/my.scss";

const MyPost = ({ post }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const commentQuery = query(
        collection(database, "comments"),
        where("postId", "==", post.id)
      );

      const commentQuerySnapshot = await getDocs(commentQuery);
      const commentData = commentQuerySnapshot.docs.map((comment) =>
        comment.data()
      );

      setComments(commentData);
    };

    fetchData();
  }, []);

  return (
    <div className="postInfo">
      <a href={`/posting/${post.id}`}>
        <h2 className="title">{post.title}</h2>
      </a>

      <p>{post.summary}</p>
      <div className="postDetail">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{comments.length}개의 댓글</span>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m18 1-6 4-6-4-6 5v7l12 10 12-10V6z"
          ></path>
        </svg>
        <span>{post.likes.length}</span>
      </div>

      <div className="separate"></div>
    </div>
  );
};

export default MyPost;
