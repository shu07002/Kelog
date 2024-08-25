import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import ListItem from "./ListItem";
import "../../styles/list/listItem.scss";
import { DateFilterContext } from "../../context/DateFilterContext";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";

let end = 9;

const List = () => {
  const { dateFilter } = useContext(DateFilterContext);
  const today = new Date();

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(database, "posts"));
    const postsData = querySnapshot.docs.map((doc) => doc.data());
    setPosts(postsData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredData = useMemo(() => {
    switch (dateFilter) {
      case "오늘": {
        return posts
          .filter(
            (data) =>
              new Date(data.date).getTime() >=
              today.getTime() - 1 * 24 * 60 * 60 * 1000
          )
          .reverse();
      }
      case "이번 주": {
        return posts
          .filter(
            (data) =>
              new Date(data.date).getTime() >=
              today.getTime() - 7 * 24 * 60 * 60 * 1000
          )
          .reverse();
      }
      case "이번 달": {
        return posts
          .filter(
            (data) =>
              new Date(data.date).getMonth() === today.getMonth() &&
              new Date(data.date).getFullYear() === today.getFullYear()
          )
          .reverse();
      }
      case "올해": {
        return posts
          .filter(
            (data) => new Date(data.date).getFullYear() === today.getFullYear()
          )
          .reverse();
      }
      default: {
        return posts;
      }
    }
  }, [dateFilter]);

  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      console.log(filteredData.length);
      if (end < filteredData.length) {
        setTimeout(() => {
          end += 9;
          setPosts((prevItems) => [
            ...prevItems,
            ...filteredData.slice(prevItems.length, end),
          ]);
        }, 500);
      } else setHasMore(false);
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
