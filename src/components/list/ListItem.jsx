import React from "react";
import "../../styles/list/listItem.scss";

const ListItem = () => {
  return (
    <li className="postcard">
      <div>
        <img
          className="postcard-image"
          src="https://picsum.photos/1000/700"
          alt="랜덤이미지"
        />
      </div>
      <div className="postcard-content">
        <a href="#" className="postcard-aTag">
          <h4 className="postcard-title">
            김경우는 지금 가짜 데이터로 UI 구현중입니다.
          </h4>
          <p className="postcard-summary">
            아무노래나 일단 틀어 아무거나 신나는 걸로 아무렇게나 춤 춰 아무렇지
            않아 보이게
          </p>
        </a>
        <div className="postcard-timeAndComment">
          <span>약 6시간 전</span>
          <span> · </span>
          <span>27개의 댓글</span>
        </div>
      </div>
      <div className="postcard-info">
        <div>
          <span className="postcard-info-by">by </span> <b>작성자</b>
        </div>
        <div className="postcard-info-likes">
          <img src="icons/heart-solid.svg" alt="하트" />
          <span className="postcard-info-likes-count">50</span>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
