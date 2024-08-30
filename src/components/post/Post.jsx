import React, { useRef, useEffect, useState } from "react";
import "../../styles/post/post.scss";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../../firebase";
import MDEditor from "@uiw/react-md-editor";
import TopUserInfo from "./TopUserInfo";
import AsideBar from "./AsideBar";
import BottomUserInfo from "./BottomUserInfo";
import OtherPost from "./OtherPost";
import WritingComment from "./WritingComment";
import CommentItem from "./CommentItem";

const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [commentList, setCommentList] = useState([]);

  const leftSideRef = useRef();
  const titleRef = useRef();
  const [isLiked, setIsLiked] = useState(false);
  const [likeseCount, setLikesCount] = useState(0);

  const onClickHeart = async () => {
    const likedRef = doc(database, "posts", post.id);
    console.log(post.likes);

    if (!isLiked) {
      await updateDoc(likedRef, { likes: arrayUnion(CURRENT_USER.uid) });
      setLikesCount(likeseCount + 1);
    } else {
      await updateDoc(likedRef, { likes: arrayRemove(CURRENT_USER.uid) });
      setLikesCount(likeseCount - 1);
    }

    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (post?.likes.some((like) => like === CURRENT_USER.uid)) setIsLiked(true);
  }, [post]);

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
          setLikesCount(postData.likes.length);

          const commentQuery = query(
            collection(database, "comments"),
            where("parrentCommentId", "==", postData.id)
          );

          const userQuery = query(
            collection(database, "users"),
            where("nickname", "==", postData.authorId)
          );

          const userSnapshot = await getDocs(userQuery);

          console.log(userSnapshot.docs[0]);
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
        <TopUserInfo
          onClickHeart={onClickHeart}
          post={post}
          likeseCount={likeseCount}
          isLiked={isLiked}
        />

        <AsideBar
          post={post}
          leftSideRef={leftSideRef}
          likeseCount={likeseCount}
          isLiked={isLiked}
          onClickHeart={onClickHeart}
        />
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
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </ul>
    </div>
  );
};

export default Post;
