import React, { useEffect, useRef, useState } from "react";
import "../../styles/post/post.scss";
import "../../styles/my/my.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import MyPost from "./MyPost";

const My = ({ nickname, isFollowed, followersCount, user, onClickFollow }) => {
  //console.log(nickname);
  // nickname 값은 @ 붙은 값

  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));

  const textRef = useRef(null);

  const onMouseOver = () => {
    if (isFollowed) {
      setText("언팔로우");
      textRef.current.classList.add("red");
    }
  };

  const onMouseOut = () => {
    if (isFollowed) {
      setText("팔로잉");
      textRef.current.classList.remove("red");
    }
  };

  useEffect(() => {
    if (textRef.current) {
      if (isFollowed) {
        setText("팔로잉");
        textRef.current.classList.remove("green");
        textRef.current.classList.add("black");
      } else {
        setText("팔로우");
        textRef.current.classList.remove("black");
        textRef.current.classList.add("green");
      }
    }
  }, [isFollowed]);

  useEffect(() => {
    if (user === null) return;
    const fetchData = async () => {
      const postQuery = query(
        collection(database, "posts"),
        where("uid", "==", user.uid)
      );

      const postQuerySnapshot = await getDocs(postQuery);
      const postsData = postQuerySnapshot.docs.map((post) => post.data());
      if (postsData) {
        setPosts(postsData);
      }
    };

    fetchData();
  }, [user]);

  return (
    <section className="mypageUser">
      <div className="userInfo ">
        {user !== null && (
          <div className="userImage">
            <img src={`${user.profile_image_url}`} alt="userImage" />
          </div>
        )}

        <div className="user">
          <h2>{nickname.split("@")[1]}</h2>
        </div>
      </div>

      <div className="userInfoBottom">
        <div>
          <b>{followersCount}</b> 팔로워
        </div>
        <div>
          <b>{user?.following.length}</b> 팔로잉
        </div>
      </div>
      {user?.nickname !== CURRENT_USER.nickname && (
        <div
          className="follow-btn"
          onClick={onClickFollow}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <button ref={textRef} className={isFollowed ? "black" : "green"}>
            {text}
          </button>
        </div>
      )}

      <div className="postBlock">
        {posts.map((post) => (
          <div key={post.id} className="postItem">
            {post.mainImage !== "" && (
              <div className="mainImageBlock">
                <a href={`/posting/${post.id}`}>
                  <img className="mainImage" src={`${post.mainImage}`} />
                </a>
              </div>
            )}
            <MyPost post={post} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default My;
