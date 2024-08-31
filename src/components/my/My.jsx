import React, { useEffect, useRef, useState } from "react";
import "../../styles/post/post.scss";
import "../../styles/my/my.scss";
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

const My = ({ nickname }) => {
  //console.log(nickname);
  // nickname 값은 @ 붙은 값

  const [user, setUser] = useState(null);
  const [text, setText] = useState("");

  const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));

  const textRef = useRef(null);

  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const onClickFollow = async () => {
    const followingRef = doc(database, "users", CURRENT_USER.uid);
    const followerRef = doc(database, "users", user.uid);

    if (!isFollowed) {
      await updateDoc(followingRef, {
        following: arrayUnion(user.uid),
      });
      await updateDoc(followerRef, { follower: arrayUnion(CURRENT_USER.uid) });
      setFollowersCount(followersCount + 1);
    } else {
      await updateDoc(followingRef, {
        following: arrayRemove(user.uid),
      });
      await updateDoc(followerRef, { follower: arrayRemove(CURRENT_USER.uid) });
      setFollowersCount(followersCount - 1);
    }

    setIsFollowed(!isFollowed);
  };

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
    const fetchData = async () => {
      try {
        const userQuery = query(
          collection(database, "users"),
          where("nickname", "==", nickname.split("@")[1])
        );

        console.log(nickname.split("@"));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0]?.data();

        if (userData) setUser(userData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
    if (user?.follower.some((userId) => userId === CURRENT_USER.uid))
      setIsFollowed(true);
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
    </section>
  );
};

export default My;
