import React, { useEffect, useRef, useState } from "react";
import "../../styles/post/post.scss";

const TopUserInfo = ({
  post,
  likeseCount,
  isLiked,
  onClickHeart,
  onClickFollow,
  isFollowed,
}) => {
  const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));

  const [text, setText] = useState("");
  const textRef = useRef(null);

  const onMouseOver = () => {
    if (isFollowed) {
      setText("언팔로우");
      textRef.current.classList.add("red");
    }
  };

  const onMouseOut = () => {
    if (isFollowed) {
      setText("팔로잉");
      textRef.current.classList.remove("red");
    }
  };

  useEffect(() => {
    if (isFollowed) {
      setText("팔로잉");
      textRef.current.classList.remove("green");
      textRef.current.classList.add("black");
    } else {
      setText("팔로우");
      textRef.current.classList.remove("black");
      textRef.current.classList.add("green");
    }
  }, [isFollowed]);

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
        {CURRENT_USER.nickname !== post.authorId && (
          <div
            className="follow-btn"
            onClick={onClickFollow}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            <button ref={textRef} className={isFollowed ? "black" : "green"}>
              {text}
            </button>
          </div>
        )}

        <div
          className={isLiked ? "pushed-like" : "like-div"}
          onClick={onClickHeart}
        >
          <button className="like-btn">
            <svg className="small-like-svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
              ></path>
            </svg>
            <span>{likeseCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUserInfo;
