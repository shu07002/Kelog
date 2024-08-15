import React, { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem";
import "../../styles/list/listItem.scss";

const List = () => {
  const [items, setItems] = useState(mockData.slice(0, 9));
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const elementRef = useRef(null);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      //API CALLS!!!!
      if (items.length < 200) {
        setTimeout(() => {
          const newItems = mockData.slice((page + 1) * 9 - 9, (page + 1) * 9);
          setItems((items) => [...items, ...newItems]);
          setPage((prevPage) => prevPage + 1);
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
    <div>
      <ul className="postlist">
        {items.map((item, index) => {
          console.log(items.length);
          return <ListItem key={index} />;
        })}
        {hasMore && <div ref={elementRef}>Load More Items</div>}
      </ul>
    </div>
  );
};

export default List;

const mockData = [
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
  "abc",
];
