import React from "react";

const CommentItem3 = ({ comment }) => {
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
    </div>
  );
};

export default CommentItem3;
