import React, { useRef, useEffect, useState } from "react";
import "../../styles/post/post.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);

  const getPost = async () => {
    const q = query(collection(database, "posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(q);
    setPost(querySnapshot.docs[0].data());
  };

  useEffect(() => {
    getPost();
  }, []);

  const leftSideRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (leftSideRef.current) {
        if (window.scrollY > 285) {
          leftSideRef.current.style.setProperty("position", "fixed");
          leftSideRef.current.style.setProperty("top", "90px");
        } else {
          leftSideRef.current.style.setProperty("position", "relative");
          leftSideRef.current.style.setProperty("top", "2rem");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!post) {
    return <div>No post found.</div>; // 포스트가 없을 때 표시할 내용
  }

  return (
    <div className="posting">
      <div className="posting-info">
        <h1>{post.title}</h1>

        <div>
          <span className="posting-writer">{post.writer}</span>
          <span> · </span>
          <span className="posting-date">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>

        <aside ref={leftSideRef} className="like-share-box">
          <div>
            <div className="heart">
              <img src="../icons/heart-solid.svg" alt="heart" />
            </div>
            <div className="like-count">
              <p>{post.likes.length}</p>
            </div>
            <div className="share">
              <img src="../icons/share-nodes-solid.svg" alt="share" />
            </div>
          </div>
        </aside>
        <div className="main-image">
          <img src={`https://picsum.photos/1000/700`} alt="main_image" />
        </div>
      </div>

      <article>
        <p>{post.content}</p>
      </article>

      <section>사용자 정보 영역</section>
      <section>댓글 작성 영역</section>
      <section>댓글 조회 영역</section>
    </div>
  );
};

export default Post;
