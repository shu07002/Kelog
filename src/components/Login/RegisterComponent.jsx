import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth, database, USER_COLLECTION } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const RegisterComponent = ({ onClickLogin, onClickLR }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const isNicknameAvailable = async () => {
    const q = query(
      collection(database, "users"),
      where("nickname", "==", nickname)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isAvail = await isNicknameAvailable();
    if (!isAvail) {
      alert("이미 사용중인 닉네입니다.");
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = doc(USER_COLLECTION, user.uid);
      await setDoc(userDoc, {
        uid: user.uid,
        email: email,
        nickname: nickname,
        profile_image_url: "",
        following_count: [],
        follower_count: [],
        cerated_at: Date.now(),
      });

      const CURRENT_USER = {
        email: email,
        nickname: nickname,
      };

      window.localStorage.setItem("CURRENT_USER", JSON.stringify(CURRENT_USER));
      console.log(user);
      console.log("성공");
      onClickLogin();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        alert("이메일을 바르게 입력해주세요");
      } else if (error.code === "auth/weak-password") {
        alert("비밀번호가 너무 쉬워요");
      } else if (error.code === "auth/email-already-in-use") {
        alert("이미 등록된 이메일입니다.");
      } else console.log(error);
    }
  };

  return (
    <div className="loginDiv">
      <div className="X-button">
        <svg
          onClick={onClickLogin}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          tabIndex="1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </div>
      <div className="loginInput">
        <div>
          <h2>회원가입</h2>
          <section>
            <h4>이메일로 회원가입</h4>
            <form>
              <input
                className="formInput"
                placeholder="이메일을 입력하세요."
                type="email"
                onChange={onChangeEmail}
                autoComplete="email"
              />
              <input
                className="formInput"
                placeholder="닉네임을 입력하세요."
                type="text"
                onChange={onChangeNickname}
                autoComplete="username"
              />
              <input
                className="formInput"
                placeholder="비밀번호를 입력하세요."
                type="password"
                onChange={onChangePassword}
                autoComplete="current-password"
              />
              <button onClick={onSubmit}>회원가입</button>
            </form>
          </section>
        </div>
        <div className="moveToRegister">
          <span>이미 회원이신가요?</span>
          <div onClick={onClickLR}>로그인</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
