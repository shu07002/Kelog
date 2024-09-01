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

const Post = ({ postId }) => {
  const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));
  const [post, setPost] = useState(null);
  const [writer, setWriter] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const leftSideRef = useRef();
  const titleRef = useRef();

  const [isLiked, setIsLiked] = useState(false);
  const [likeseCount, setLikesCount] = useState(0);

  const [isFollowed, setIsFollowed] = useState(false);

  const onClickHeart = async () => {
    if (!CURRENT_USER) {
      alert("로그인이 필요합니다.");
      return;
    }
    const likedRef = doc(database, "posts", post.id);

    if (!isLiked) {
      await updateDoc(likedRef, { likes: arrayUnion() });
      setLikesCount(likeseCount + 1);
    } else {
      await updateDoc(likedRef, { likes: arrayRemove() });
      setLikesCount(likeseCount - 1);
    }

    setIsLiked(!isLiked);
  };

  const onClickFollow = async () => {
    if (!CURRENT_USER) {
      alert("로그인이 필요합니다.");
      return;
    }
    const followingRef = doc(database, "users", currentUser.uid);
    const followerRef = doc(database, "users", post.uid);

    if (!isFollowed) {
      await updateDoc(followingRef, { following: arrayUnion(post.uid) });
      await updateDoc(followerRef, { follower: arrayUnion(currentUser.uid) });
    } else {
      await updateDoc(followingRef, { following: arrayRemove(post.uid) });
      await updateDoc(followerRef, { follower: arrayRemove(currentUser.uid) });
    }

    setIsFollowed(!isFollowed);
  };

  useEffect(() => {
    if (post?.likes.some((like) => like === CURRENT_USER.uid)) setIsLiked(true);
  }, [post]);

  useEffect(() => {
    if (currentUser?.following.some((userId) => userId === post?.uid))
      setIsFollowed(true);
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postQuery = query(
          collection(database, "posts"),
          where("id", "==", postId)
        );
        const postSnapshot = await getDocs(postQuery);
        const postData = postSnapshot.docs[0]?.data();

        if (CURRENT_USER) {
          const currentUserQuery = query(
            collection(database, "users"),
            where("nickname", "==", CURRENT_USER.nickname)
          );
          const currentUserSnapshot = await getDocs(currentUserQuery);
          const currentUserData = currentUserSnapshot.docs[0]?.data();
          setCurrentUser(currentUserData);
        }

        if (postData) {
          setPost(postData);

          setLikesCount(postData.likes.length);

          const commentQuery = query(
            collection(database, "comments"),
            where("parrentCommentId", "==", postData.id)
          );

          const writerQuery = query(
            collection(database, "users"),
            where("nickname", "==", postData.authorId)
          );

          const writerSnapshot = await getDocs(writerQuery);
          setWriter(writerSnapshot.docs[0]?.data());

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
    return <div></div>;
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
          onClickFollow={onClickFollow}
          post={post}
          likeseCount={likeseCount}
          isLiked={isLiked}
          isFollowed={isFollowed}
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

      <BottomUserInfo
        post={post}
        writer={writer}
        isFollowed={isFollowed}
        onClickFollow={onClickFollow}
      />

      <OtherPost post={post} />

      <WritingComment
        post={post}
        commentList={commentList}
        setCommentList={setCommentList}
      />

      <ul className="comment-list">
        {commentList.map((comment) => {
          return (
            <CommentItem key={comment.id} comment={comment} postId={post.id} />
          );
        })}
      </ul>
    </div>
  );
};

export default Post;
