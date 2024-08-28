import React from "react";
import "../../styles/post/post.scss";

const TopUserInfo = ({ post }) => {
  return (
    <div className="top-user-info">
      <div>
        <span className="posting-writer">{post.authorId}</span>
        <span> · </span>
        <span className="posting-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="follow-like-btn">
        <div className="follow-btn">
          <button>팔로우</button>
        </div>
        <div className="like-div">
          <button className="like-btn">
            <svg className="small-like-svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
              ></path>
            </svg>
            <span>{post.likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUserInfo;
