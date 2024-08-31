import React, { useEffect, useState } from "react";
import My from "../../components/my/My";
import { useParams } from "react-router-dom";
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

const MyPage = () => {
  const { nickname } = useParams();
  const [user, setUser] = useState(null);
  const CURRENT_USER = JSON.parse(window.localStorage.getItem("CURRENT_USER"));

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userQuery = query(
          collection(database, "users"),
          where("nickname", "==", nickname.split("@")[1])
        );

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
    if (user?.follower.some((userId) => userId === CURRENT_USER.uid))
      setIsFollowed(true);
  }, [user]);

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

  useEffect(() => {
    setFollowersCount(user?.follower.length);
  }, [user]);

  const [followersCount, setFollowersCount] = useState(0);

  return (
    <My
      nickname={nickname}
      isFollowed={isFollowed}
      followersCount={followersCount}
      user={user}
      onClickFollow={onClickFollow}
    />
  );
};

export default MyPage;
