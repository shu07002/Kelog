import React, { useEffect, useState } from "react";
import "../../styles/post/post.scss";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../../firebase";

const OtherPost = ({ post }) => {
  const [otherPosts, setOtherPosts] = useState([]);

  const getUsersPosts = async () => {
    const q = query(
      collection(database, "posts"),
      where("authorId", "==", post.authorId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => doc.data());
    const currentIndex = posts.findIndex((val) => val.id === post.id);

    const prevIndex = currentIndex !== 0 ? currentIndex - 1 : null;
    const nextIndex =
      currentIndex !== posts.length - 1 ? currentIndex + 1 : null;

    setOtherPosts([posts[prevIndex], posts[nextIndex]]);
  };

  useEffect(() => {
    getUsersPosts();
  }, []);

  return (
    <div className="next-prev">
      {otherPosts[1] && (
        <a className="prev" href={`/posting/${otherPosts[1].id}`}>
          <div className="arrow-svg">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
          </div>
          <div className="other-post-info">
            <div>이전 포스트</div>
            <h3>{otherPosts[1].title}</h3>
          </div>
        </a>
      )}
      {otherPosts[0] && (
        <a className="next" href={`/posting/${otherPosts[0].id}`}>
          <div className="other-post-info">
            <div>다음 포스트</div>
            <h3>{otherPosts[0].title}</h3>
          </div>
          <div className="arrow-svg">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
            </svg>
          </div>
        </a>
      )}
    </div>
  );
};

export default OtherPost;
