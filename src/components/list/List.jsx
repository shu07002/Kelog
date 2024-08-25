import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import ListItem from "./ListItem";
import "../../styles/list/listItem.scss";
import { DateFilterContext } from "../../context/DateFilterContext";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";

let end = 0;

const List = () => {
  const { dateFilter } = useContext(DateFilterContext);
  const today = new Date();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const allPostsRef = useRef([]);
  const elementRef = useRef(null);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(database, "posts"));
    const postsData = querySnapshot.docs.map((doc) => doc.data());
    allPostsRef.current = postsData;

    setPosts(allPostsRef.current.slice(0, end));
    end += 9;
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredData = () => {
    switch (dateFilter) {
      case "오늘": {
        return posts
          .filter((data) => {
            return (
              new Date(data.createdAt).getTime() >=
              today.getTime() - 1 * 24 * 60 * 60 * 1000
            );
          })
          .reverse();
      }
      case "이번 주": {
        return posts
          .filter(
            (data) =>
              new Date(data.createdAt).getTime() >=
              today.getTime() - 7 * 24 * 60 * 60 * 1000
          )
          .reverse();
      }
      case "이번 달": {
        return posts
          .filter(
            (data) =>
              new Date(data.createdAt).getMonth() === today.getMonth() &&
              new Date(data.createdAt).getFullYear() === today.getFullYear()
          )
          .reverse();
      }
      case "올해": {
        return posts
          .filter(
            (data) =>
              new Date(data.createdAt).getFullYear() === today.getFullYear()
          )
          .reverse();
      }
      default: {
        return posts;
      }
    }
  };

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      console.log("detected");

      if (end > allPostsRef.current.length) setHasMore(false);

      console.log(end, allPostsRef.current.length, posts.length);
      setPosts(allPostsRef.current.slice(0, end));
      end += 9;
      console.log(end, allPostsRef.current.length, posts.length);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore]);

  return (
    <ul className="postlist">
      {posts.map((post, index) => {
        return <ListItem key={index} post={post} />;
      })}
      {hasMore && <div ref={elementRef}>loading</div>}
    </ul>
  );
};

export default List;
