import React from "react";
import "../../styles/list/listItem.scss";
import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
  return (
    <li className="postcard">
      <div>
        <Link to={`/posting/${item.id}`}>
          <img
            className="postcard-image"
            src="https://picsum.photos/1000/700"
            alt="랜덤이미지"
          />
        </Link>
      </div>
      <div className="postcard-content">
        <Link to={`/posting/${item.id}`} className="postcard-aTag">
          <h4 className="postcard-title">{item.title}</h4>
          <p className="postcard-summary">{item.summary}</p>
        </Link>
        <div className="postcard-timeAndComment">
          <span>{item.date.toLocaleDateString()}</span>
          <span> · </span>
          <span>{item.comment_count}개의 댓글</span>
        </div>
      </div>
      <div className="postcard-info">
        <div>
          <span className="postcard-info-by">by </span>{" "}
          <b>
            {item.writer},{item.id}
          </b>
        </div>
        <div className="postcard-info-likes">
          <img src="icons/heart-solid.svg" alt="하트" />
          <span className="postcard-info-likes-count">{item.like_count}</span>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
