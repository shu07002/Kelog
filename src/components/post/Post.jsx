import React, { useRef, useEffect, useState } from "react";
import "../../styles/post/post.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import MDEditor from "@uiw/react-md-editor";
import TopUserInfo from "./TopUserInfo";
import AsideBar from "./AsideBar";
import BottomUserInfo from "./BottomUserInfo";
import OtherPost from "./OtherPost";
import WritingComment from "./WritingComment";
import CommentItem from "./CommentItem";

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {}, []);

  const leftSideRef = useRef();
  const titleRef = useRef();

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

          const commentQuery = query(
            collection(database, "comments"),
            where("postId", "==", postData.id)
          );

          const userQuery = query(
            collection(database, "users"),
            where("nickname", "==", postData.authorId)
          );

          const userSnapshot = await getDocs(userQuery);
          setCurrentUser(userSnapshot.docs[0]?.data());

          const commentSnapshot = await getDocs(commentQuery);
          const commentList = commentSnapshot.docs.map((doc) => doc.data());
          setCommentList(commentList);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const handleScroll = () => {
      if (leftSideRef.current) {
        if (window.scrollY > titleRef.current.offsetHeight + 54) {
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

      <OtherPost post={post} />

      <WritingComment
        post={post}
        commentList={commentList}
        setCommentList={setCommentList}
      />

      <ul className="comment-list">
        {commentList.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} post={post} />;
        })}
      </ul>
    </div>
  );
};

export default Post;
