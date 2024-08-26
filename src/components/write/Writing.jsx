import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { database } from "../../firebase";
import "../../styles/write/write.scss";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import WriteDetail from "./WriteDetail";

const Writing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editorHeight, setEditorHeight] = useState(window.innerHeight - 230);
  const [showWriteDetail, setShowWriteDetail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEditorHeight = () => {
      setEditorHeight(window.innerHeight - 230);
    };

    window.addEventListener("resize", handleEditorHeight);

    return () => window.removeEventListener("resize", handleEditorHeight);
  }, []);

  return (
    <div className="writing-component">
      <input
        className="title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MDEditor
        height={editorHeight}
        className="editor"
        value={content}
        onChange={setContent}
        theme="light"
      />

      <div className="buttons">
        <button className="out">
          <a href="/">나가기</a>
        </button>
        <button className="post" onClick={() => setShowWriteDetail(true)}>
          출간하기
        </button>
      </div>

      <div className={`showupdown ${showWriteDetail ? "up" : "down"}`}>
        <WriteDetail
          title={title}
          content={content}
          showWriteDetail={showWriteDetail}
          setShowWriteDetail={setShowWriteDetail}
        />
      </div>
    </div>
  );
};

export default Writing;
