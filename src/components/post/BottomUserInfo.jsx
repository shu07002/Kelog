import React, { useEffect, useRef, useState } from "react";
import "../../styles/post/post.scss";

const BottomUserInfo = ({ post, writer, onClickFollow, isFollowed }) => {
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
    if (textRef.current) {
      if (isFollowed) {
        setText("팔로잉");
        textRef.current.classList.remove("green");
        textRef.current.classList.add("black");
      } else {
        setText("팔로우");
        textRef.current.classList.remove("black");
        textRef.current.classList.add("green");
      }
    }
  }, [isFollowed]);
  return (
    <section className="userInfo">
      <div className="userImage">
        {writer && writer.profile_image_url ? (
          <img src={`${writer.profile_image_url}`} alt="userImage" />
        ) : (
          <p>유저 이미지 없음</p>
        )}
      </div>
      <div className="user">
        <h2>{post.authorId}</h2>
      </div>
      <div className="follow-btn">
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
      </div>
    </section>
  );
};

export default BottomUserInfo;
