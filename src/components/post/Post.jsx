import React, { useRef, useEffect, useState } from "react";
import "../../styles/post/post.scss";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import MDEditor from "@uiw/react-md-editor";

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
        <div className="top-user-info">
          <div>
            <span className="posting-writer">{post.authorId}</span>
            <span> · </span>
            <span className="posting-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="follow-like-btn">
            <div className="follow-btn">
              <button>팔로우</button>
            </div>
            <div className="like-div">
              <button className="like-btn">
                <svg className="small-like-svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
                  ></path>
                </svg>
                <span>{post.likes.length}</span>
              </button>
            </div>
          </div>
        </div>

        <aside ref={leftSideRef} className="like-share-box">
          <div>
            <div className="heart">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
                ></path>
              </svg>
            </div>
            <div className="like-count">
              <p>{post.likes.length}</p>
            </div>
            <div className="share">
              <svg width="24" height="24" viewBox="0 0 24 24" class="share-svg">
                <path
                  fill="currentColor"
                  d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"
                ></path>
              </svg>
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
          {currentUser && currentUser.profile_image_url ? (
            <img src={`${currentUser.profile_image_url}`} alt="userImage" />
          ) : (
            <p>유저 이미지 없음</p>
          )}
        </div>
        <div className="user">
          <h2>{post.authorId}</h2>
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
