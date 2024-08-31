import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { database } from "../../firebase";

const WritingComment = ({ post, commentList, setCommentList }) => {
  const [writeComment, setWriteComment] = useState("");
  const commentRef = useRef();

  const onChangeCommentWindow = (e) => {
    setWriteComment(e.target.value);
    commentRef.current.style.height = "auto";
    commentRef.current.style.height = commentRef.current.scrollHeight + "px";
  };

  const onSubmit = async (e) => {
    if (writeComment === "") return;
    setWriteComment("");
    e.preventDefault();

    const CURRENT_USER = JSON.parse(
      window.localStorage.getItem("CURRENT_USER")
    );

    const COMMENTER = {
      authorId: CURRENT_USER.nickname,
      content: writeComment,
      createdAt: new Date().getTime(),
      profile_image_url: CURRENT_USER.profile_image_url,
      depth: 1,
      parrentCommentId: post.id,
      postId: post.id,
    };

    try {
      const newCommentRef = await addDoc(
        collection(database, "comments"),
        COMMENTER
      );

      await updateDoc(newCommentRef, { id: newCommentRef.id });

      setCommentList([...commentList, { ...COMMENTER, id: newCommentRef.id }]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="comment-section">
      <h4>{post.comments.length}개의 댓글</h4>
      <textarea
        rows={1}
        ref={commentRef}
        value={writeComment}
        className="comment-input-window inner-comment"
        onChange={onChangeCommentWindow}
        placeholder="댓글을 작성하세요"
      ></textarea>
      <div className="write-comment">
        <button onClick={onSubmit}>댓글 작성</button>
      </div>
    </section>
  );
};

export default WritingComment;
