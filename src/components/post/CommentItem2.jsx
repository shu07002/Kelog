import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import CommentItem3 from "./CommentItem3";

const CommentItem2 = ({ comment }) => {
  const [OpenRecomment, setOpenRecomment] = useState(false);
  const [writeComment3, setWriteComment3] = useState("");
  const [commentList3, setCommentList3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentQuery = query(
          collection(database, "comments"),
          where("parrentCommentId", "==", comment.id)
        );

        const commentSnapShot = await getDocs(commentQuery);
        const commentList3 = commentSnapShot.docs.map((doc) => doc.data());
        setCommentList3(commentList3);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    if (writeComment3 === "") return;
    setWriteComment3("");
    e.preventDefault("");

    const CURRENT_USER = JSON.parse(
      window.localStorage.getItem("CURRENT_USER")
    );

    const COMMENTER4 = {
      authorId: CURRENT_USER.nickname,
      content: writeComment3,
      createdAt: new Date().getTime(),
      profile_image_url: CURRENT_USER.profile_image_url,
      depth: 2,
      parrentCommentId: comment.id,
    };

    try {
      const newCommentRef = await addDoc(
        collection(database, "comments"),
        COMMENTER4
      );

      await updateDoc(newCommentRef, { id: newCommentRef.id });

      setCommentList3([
        ...commentList3,
        { ...COMMENTER4, id: newCommentRef.id },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="comment-box">
      <div className="comment-info">
        <div className="user-image">
          <a>
            <img src={`${comment.profile_image_url}`} alt="user-image" />
          </a>
        </div>
        <div className="username-write-date">
          <div className="username">{comment.authorId}</div>
          <div className="write-date">
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="comment-content">{comment.content}</div>

      <div className="re-comment">
        <div
          className="re-comment-btn"
          onClick={() => setOpenRecomment(!OpenRecomment)}
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path
              fill="currentColor"
              d="M5.5 2.5h1v3h3v1h-3v3h-1v-3h-3v-1h3v-3z"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm10 1H1v10h10V1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>
            {OpenRecomment
              ? "숨기기"
              : `${
                  commentList3.length === 0
                    ? "답글 달기"
                    : `${commentList3.length}개의 답글`
                }`}
          </span>
        </div>

        {OpenRecomment && (
          <div className="write-recomment-box">
            <ul>
              {commentList3.map((comment3) => {
                return <CommentItem3 key={comment3.id} comment={comment3} />;
              })}
            </ul>
            <textarea
              value={writeComment3}
              onChange={(e) => setWriteComment3(e.target.value)}
              placeholder="댓글을 작성하세요"
              className="comment-input-window"
            ></textarea>

            <div className="write-comment">
              <button onClick={onSubmit}>댓글 작성</button>
              <button
                className="cancle"
                onClick={() => setOpenRecomment(!OpenRecomment)}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem2;
