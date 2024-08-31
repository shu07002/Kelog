import React, { useEffect, useState } from "react";
import "../../styles/list/listItem.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";

const ListItem = ({ post }) => {
  const [writer, setWriter] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(database, "users"),
        where("uid", "==", post.uid)
      );

      const querySnapshot = await getDocs(q);
      const writerData = querySnapshot.docs[0]?.data();
      setWriter(writerData);
    };

    fetchData();
  }, []);

  return (
    <li className="postcard">
      <div
        className={`postcard-image-div ${
          post.mainImage === "" && "no-display"
        }`}
      >
        <a href={`/posting/${post.id}`}>
          {post.mainImage !== "" && (
            <img
              className="postcard-image"
              src={post.mainImage}
              alt="랜덤이미지"
            />
          )}
        </a>
      </div>
      <div className="postcard-content">
        <a href={`/posting/${post.id}`} className="postcard-aTag">
          <h4 className="postcard-title">{post.title}</h4>
          <p
            className={`postcard-summary ${post.mainImage !== "" && "reduced"}`}
          >
            {post.summary}
          </p>
        </a>
        <div className="postcard-timeAndComment">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span> · </span>
          <span>{post.comments.length}개의 댓글</span>
        </div>
      </div>
      <div className="postcard-info">
        <div>
          <a href={`/@${post.authorId}`}>
            <img src={`${writer?.profile_image_url}`} alt="writer_image" />
            <span className="postcard-info-by">by </span> <b>{post.authorId}</b>
          </a>
        </div>
        <div className="postcard-info-likes">
          <img src="icons/heart-solid.svg" alt="하트" />
          <span className="postcard-info-likes-count">{post.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
