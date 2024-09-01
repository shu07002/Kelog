import React, { useEffect, useRef, useState } from "react";
import "../../styles/post/post.scss";
import "../../styles/my/my.scss";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { database } from "../../firebase";
import MyPost from "./MyPost";

const My = ({ nickname, isFollowed, followersCount, user, onClickFollow }) => {
  const [text, setText] = useState("팔로우");
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // loading 상태 추가
  const lastVisibleRef = useRef(null);
  const loadRef = useRef();

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

  const fetchPosts = async () => {
    if (loading || !user) return; // 이미 로딩 중이거나 user가 없으면 함수 종료

    setLoading(true); // 로딩 시작

    try {
      let postQuery = query(
        collection(database, "posts"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      if (lastVisibleRef.current) {
        postQuery = query(
          collection(database, "posts"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc"),
          startAfter(lastVisibleRef.current),
          limit(3)
        );
      }

      const postQuerySnapshot = await getDocs(postQuery);
      const postsData = postQuerySnapshot.docs.map((post) => post.data());

      const lastPost =
        postQuerySnapshot.docs[postQuerySnapshot.docs.length - 1];
      lastVisibleRef.current = lastPost;

      if (postQuerySnapshot.docs.length < 3) {
        setHasMore(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...postsData]);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    setPosts([]);
    lastVisibleRef.current = null;
    setHasMore(true);
    fetchPosts();
  }, [user]);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore && !loading) {
      fetchPosts();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) {
        observer.unobserve(loadRef.current);
      }
    };
  }, [hasMore, loading]); // hasMore와 loading 상태를 종속성으로 추가

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
      {user?.nickname !== CURRENT_USER?.nickname && (
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
        {hasMore && <div ref={loadRef}></div>}
      </div>
    </section>
  );
};

export default My;
