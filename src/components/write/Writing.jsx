import React, { useContext, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { POST_COLLECTION } from "../../firebase";
import "../../styles/write/write.scss";
import { doc } from "firebase/firestore";

const Writing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editorHeight, setEditorHeight] = useState(window.innerHeight - 230);

  useEffect(() => {
    const handleEditorHeight = () => {
      setEditorHeight(window.innerHeight - 230);
    };

    window.addEventListener("resize", handleEditorHeight);

    return () => window.removeEventListener("resize", handleEditorHeight);
  }, []);

  const onSubmit = () => {
    try {
      const postDoc = doc(POST_COLLECTION);
    } catch (error) {
      console.log(error);
    }
  };

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
        <button className="post" onClick={onSubmit}>
          출간하기
        </button>
      </div>
    </div>
  );
};

export default Writing;
