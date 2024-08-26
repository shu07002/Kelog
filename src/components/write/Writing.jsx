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

  const onSubmit = async (e) => {
    e.preventDefault();

    const CURRENT_USER = JSON.parse(
      window.localStorage.getItem("CURRENT_USER")
    );

    try {
      const newPostRef = await addDoc(collection(database, "posts"), {
        title: title,
        content: content,
        authorId: CURRENT_USER.nickname,
        summary: content.split(".")[0] + ".",
        createdAt: new Date().getTime(),
        likes: [],
        comments: [],
        mainImage: "",
      });

      await updateDoc(newPostRef, {
        id: newPostRef.id,
      });

      console.log("성공!!!!");
      alert("포스팅 했습니다.");
      navigate("/");
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
        <button className="post" onClick={() => setShowWriteDetail(true)}>
          출간하기
        </button>
      </div>

      <div className={`showupdown ${showWriteDetail ? "up" : "down"}`}>
        <WriteDetail
          showWriteDetail={showWriteDetail}
          setShowWriteDetail={setShowWriteDetail}
        />
      </div>
    </div>
  );
};

export default Writing;
