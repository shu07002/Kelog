import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import ListItem from "./ListItem";
import { mockData } from "./mockData";
import "../../styles/list/listItem.scss";
import { DateFilterContext } from "../../context/DateFilterContext";

let end = 9;

const List = () => {
  const { dateFilter } = useContext(DateFilterContext);
  const today = new Date();

  const filteredData = useMemo(() => {
    switch (dateFilter) {
      case "오늘": {
        return mockData.filter(
          (data) =>
            data.date.getTime() >= today.getTime() - 1 * 24 * 60 * 60 * 1000
        );
      }
      case "이번 주": {
        return mockData.filter(
          (data) =>
            data.date.getTime() >= today.getTime() - 7 * 24 * 60 * 60 * 1000
        );
      }
      case "이번 달": {
        return mockData.filter(
          (data) =>
            data.date.getMonth() === today.getMonth() &&
            data.date.getFullYear() === today.getFullYear()
        );
      }
      case "올해": {
        return mockData.filter(
          (data) => data.date.getFullYear() === today.getFullYear()
        );
      }
      default: {
        return mockData;
      }
    }
  }, [dateFilter]);

  const [items, setItems] = useState(filteredData.slice(0, end));
  const [hasMore, setHasMore] = useState(filteredData.length > end);

  const elementRef = useRef(null);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      // API CALLS!!!!
      if (end < filteredData.length) {
        setTimeout(() => {
          end += 9;
          setItems((prevItems) => [
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

  useEffect(() => {
    // dateFilter가 바뀔 때 filteredData에 따라 items 초기화
    setItems(filteredData.slice(0, end));
    setHasMore(filteredData.length > end);
  }, [filteredData]);

  return (
    <div>
      <ul className="postlist">
        {items.map((item, index) => {
          return <ListItem key={index} item={item} />;
        })}
        {hasMore && <div ref={elementRef}></div>}
      </ul>
    </div>
  );
};

export default List;
