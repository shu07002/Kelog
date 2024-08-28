import React, { useRef, useEffect, useState } from "react";
import "../../styles/post/post.scss";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import MDEditor from "@uiw/react-md-editor";
import TopUserInfo from "./TopUserInfo";
import AsideBar from "./AsideBar";
import BottomUserInfo from "./BottomUserInfo";
import OtherPost from "./OtherPost";

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {}, []);

  const leftSideRef = useRef();
  const titleRef = useRef();
  const commentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postQuery = query(
          collection(database, "posts"),
          where("id", "==", postId)
        );
        const postSnapshot = await getDocs(postQuery);
        const postData = postSnapshot.docs[0]?.data();

        if (postData) {
          setPost(postData);

          const userQuery = query(
            collection(database, "users"),
            where("nickname", "==", postData.authorId)
          );
          const userSnapshot = await getDocs(userQuery);
          setCurrentUser(userSnapshot.docs[0]?.data());
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const handleScroll = () => {
      if (leftSideRef.current) {
        if (window.scrollY > titleRef.current.offsetHeight + 54) {
          console.log("SDf", titleRef.current.clientHeight);
          leftSideRef.current.style.setProperty("position", "fixed");
          leftSideRef.current.style.setProperty("top", "112px");
        } else {
          leftSideRef.current.style.setProperty("position", "relative");
          leftSideRef.current.style.setProperty("top", "3rem");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onChangeCommentWindow = (e) => {
    setComment(e.target.value);
    commentRef.current.style.height = "auto";
    commentRef.current.style.height = commentRef.current.scrollHeight + "px";
  };

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div className="posting">
      <div ref={titleRef}>
        <div className="for-size-bar">
          <h1>{post.title}</h1>
        </div>
      </div>

      <div className="posting-info">
        <TopUserInfo post={post} />

        <AsideBar post={post} leftSideRef={leftSideRef} />
        {post.mainImage !== "" && (
          <div className="main-image">
            <img src={post.mainImage} alt="main_image" />
          </div>
        )}
      </div>

      <article>
        <MDEditor.Markdown source={post.content} />
      </article>

      <BottomUserInfo post={post} currentUser={currentUser} />

      <OtherPost />

      <section className="comment-section">
        <h4>{post.comments.length}개의 댓글</h4>
        <textarea
          rows={1}
          ref={commentRef}
          className="comment-input-window"
          onChange={onChangeCommentWindow}
          placeholder="댓글을 작성하세요"
        ></textarea>
        <div className="write-comment">
          <button>댓글 작성</button>
        </div>
      </section>
      <section>댓글 조회 영역</section>
    </div>
  );
};

export default Post;
