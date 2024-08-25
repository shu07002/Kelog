import React from "react";
import "../../styles/list/listItem.scss";

const ListItem = ({ post }) => {
  return (
    <li className="postcard">
      <div className="postcard-image-div">
        <a href={`/posting/${post.id}`}>
          <img
            className="postcard-image"
            src="https://picsum.photos/1000/700"
            alt="랜덤이미지"
          />
        </a>
      </div>
      <div className="postcard-content">
        <a href={`/posting/${post.id}`} className="postcard-aTag">
          <h4 className="postcard-title">{post.title}</h4>
          <p className="postcard-summary">{post.summary}</p>
        </a>
        <div className="postcard-timeAndComment">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span> · </span>
          <span>{post.comments.length}개의 댓글</span>
        </div>
      </div>
      <div className="postcard-info">
        <div>
          <span className="postcard-info-by">by </span> <b>{post.authorId}</b>
        </div>
        <div className="postcard-info-likes">
          <img src="icons/heart-solid.svg" alt="하트" />
          <span className="postcard-info-likes-count">{post.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
