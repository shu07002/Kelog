import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../styles/write/write.scss";

const Writing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="writing-component">
      <input
        className="title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MDEditor
        height={500}
        className="editor"
        value={content}
        onChange={setContent}
        theme="light"
      />

      <div className="buttons">
        <button className="out">
          <a href="/">나가기</a>
        </button>
        <button className="post">출간하기</button>
      </div>
    </div>
  );
};

export default Writing;
