import React, { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem";
import { mockData } from "./mockData";
import "../../styles/list/listItem.scss";

let end = 9;

const List = () => {
  const [items, setItems] = useState(mockData.slice(0, end));
  const [hasMore, setHasMore] = useState(true);

  const elementRef = useRef(null);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      //API CALLS!!!!
      if (end < mockData.length) {
        setTimeout(() => {
          end += 9;
          setItems(mockData.slice(0, end));
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
          return <ListItem key={index} item={item} />;
        })}
        {hasMore && <div ref={elementRef}>{console.log(hasMore)}</div>}
      </ul>
    </div>
  );
};

export default List;
