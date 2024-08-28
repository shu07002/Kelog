import React, { useRef, useEffect, useState } from "react";
import "../../styles/post/post.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import MDEditor from "@uiw/react-md-editor";

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
  const titleRef = useRef();

  useEffect(() => {
    if (titleRef.current) {
      console.log(titleRef.current.offsetHeight);
    }

    const handleScroll = () => {
      if (leftSideRef.current) {
        if (
          -1 * titleRef.current.getBoundingClientRect().top >
          titleRef.current.offsetHeight
        ) {
          console.log("SDf", titleRef.current.getBoundingClientRect().top);
          leftSideRef.current.style.setProperty("position", "fixed");
          leftSideRef.current.style.setProperty("top", "95px");
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
    return <div>No post found.</div>;
  }

  return (
    <div className="posting">
      <div className="posting-info">
        <h1 ref={titleRef}>{post.title}</h1>

        <div className="top-user-info">
          <div>
            <span className="posting-writer">{post.authorId}</span>
            <span> · </span>
            <span className="posting-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="follow-btn">
            <button>팔로우</button>
          </div>
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
        {post.mainImage !== "" && (
          <div className="main-image">
            <img src={post.mainImage} alt="main_image" />
          </div>
        )}
      </div>

      <article>
        <MDEditor.Markdown source={post.content} />
      </article>

      <section className="userInfo">
        <div className="userImage">
          <img
            src="https://velcdn.com/images/user-thumbnail.png"
            alt="userImage"
          />
        </div>
        <div className="user">
          <h3>유저 닉네임</h3>
          <p>유저 자기소개</p>
        </div>
        <div className="follow-btn">
          <button>팔로우</button>
        </div>
      </section>
      <section>댓글 작성 영역</section>
      <section>댓글 조회 영역</section>
    </div>
  );
};

export default Post;
