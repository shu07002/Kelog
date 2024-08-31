import React, { useState } from "react";
import My from "../../components/my/My";
import { useParams } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";

const MyPage = () => {
  const { nickname } = useParams();

  return <My nickname={nickname} />;
};

export default MyPage;
