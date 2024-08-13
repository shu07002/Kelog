import React from "react";
import "../../styles/list/listItem.scss";

const ListItem = () => {
  return (
    <li className="postcard">
      <div className="postcard-image">이미지</div>
      <div>
        <h4>제목</h4>
        <div>
          <p>내용</p>
        </div>
      </div>
      <div>
        <span>작성시간</span>
        <span> · </span>
        <span>댓글 수</span>
      </div>
      <div>
        <div>작성자</div>
        <div>하트</div>
      </div>
    </li>
  );
};

export default ListItem;
