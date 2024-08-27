import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import ListItem from "./ListItem";
import "../../styles/list/listItem.scss";
import { DateFilterContext } from "../../context/DateFilterContext";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { database } from "../../firebase";

const today = new Date();

let startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
startOfToday.setHours(0, 0, 0, 0);
startOfToday = startOfToday.getTime();

const dayOfWeek = today.getDay();
let startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - dayOfWeek);
startOfWeek.setHours(0, 0, 0, 0);
startOfWeek = startOfWeek.getTime();

let startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
startOfMonth.setHours(0, 0, 0, 0);
startOfMonth = startOfMonth.getTime();

let startOfYear = new Date(today.getFullYear(), 0, 1);
startOfYear.setHours(0, 0, 0, 0);
startOfYear = startOfYear.getTime();

const List = () => {
  const { dateFilter } = useContext(DateFilterContext);

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const lastVisibleRef = useRef(null);
  const loadRef = useRef();
  const mountRef = useRef(false);

  const ref = useRef(1);

  const getPosts = async (compare, Timestamp) => {
    console.log(ref.current++);

    let q = query(
      collection(database, "posts"),
      where("createdAt", compare, Timestamp),
      orderBy("createdAt", "desc"),
      limit(9)
    );

    if (lastVisibleRef.current) {
      q = query(
        collection(database, "posts"),
        where("createdAt", compare, Timestamp),
        orderBy("createdAt", "desc"),
        startAfter(lastVisibleRef.current),
        limit(9)
      );
    }

    const querySnapshot = await getDocs(q);

    const lastPost = querySnapshot.docs[querySnapshot.docs.length - 1];

    if (querySnapshot.docs.length < 9) setHasMore(false);

    lastVisibleRef.current = lastPost;

    const postsData = querySnapshot.docs.map((doc) => doc.data());
    console.log(postsData);
    return postsData;
  };

  useEffect(() => {
    console.log(ref.current++);
    setPosts([]);
    lastVisibleRef.current = null;
    setHasMore(true);
  }, [dateFilter]);

  const filteredData = async () => {
    console.log(ref.current++);
    switch (dateFilter) {
      case "오늘": {
        const posts = await getPosts(">=", startOfToday);
        setPosts((prev) => [...prev, ...posts]);
        break;
      }
      case "이번 주": {
        const posts = await getPosts(">=", startOfWeek);
        setPosts((prev) => [...prev, ...posts]);

        break;
      }
      case "이번 달": {
        const posts = await getPosts(">=", startOfMonth);
        setPosts((prev) => [...prev, ...posts]);
        break;
      }
      case "올해": {
        const posts = await getPosts(">=", startOfYear);
        setPosts((prev) => [...prev, ...posts]);
        break;
      }

      default:
        return null;
    }
  };

  // useEffect(() => {
  //   console.log(ref.current++);
  //   lastVisibleRef.current = null;
  //   filteredData();
  // }, [dateFilter]);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      filteredData();
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
  }, [hasMore, dateFilter]);

  return (
    <ul className="postlist">
      {posts.map((post, index) => {
        return <ListItem key={index} post={post} />;
      })}
      {hasMore && <div ref={loadRef}></div>}
    </ul>
  );
};

export default List;
