import React from "react";
import "../../styles/post/post.scss";

const BottomUserInfo = ({ post, currentUser }) => {
  return (
    <section className="userInfo">
      <div className="userImage">
        {currentUser && currentUser.profile_image_url ? (
          <img src={`${currentUser.profile_image_url}`} alt="userImage" />
        ) : (
          <p>유저 이미지 없음</p>
        )}
      </div>
      <div className="user">
        <h2>{post.authorId}</h2>
      </div>
      <div className="follow-btn">
        <button>팔로우</button>
      </div>
    </section>
  );
};

export default BottomUserInfo;
