import React, { useState } from "react";
import "../../styles/post/post.scss";

const CommentItem = ({ comment }) => {
  const [OpenRecomment, setOpenRecomment] = useState(false);
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
          <span>답글 버튼</span>
        </div>

        {OpenRecomment && (
          <div className="write-recomment-box">
            <textarea
              placeholder="댓글을 작성하세요"
              className="comment-input-window"
            ></textarea>
            <div className="write-comment">
              <button>댓글 작성</button>
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

export default CommentItem;
