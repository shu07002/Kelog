import React, { useEffect, useRef, useState } from "react";
import "../../styles/write/writeDetail.scss";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { useNavigate } from "react-router-dom";

const WriteDetail = ({ title, content, setShowWriteDetail }) => {
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [summary, setSummary] = useState(title);
  const navigate = useNavigate();

  useEffect(() => {
    setSummary(title);
  }, [title]);

  const saveImage = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
        imgRef.current.value = null;
      };
    }
  };

  const handleButtonClick = () => {
    imgRef.current.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const CURRENT_USER = JSON.parse(
      window.localStorage.getItem("CURRENT_USER")
    );

    try {
      const newPostRef = await addDoc(collection(database, "posts"), {
        title: title,
        content: content,
        authorId: CURRENT_USER.nickname,
        summary: summary,
        createdAt: new Date().getTime(),
        likes: [],
        comments: [],
        mainImage: imgFile,
        uid: CURRENT_USER.uid,
      });

      await updateDoc(newPostRef, {
        id: newPostRef.id,
      });

      console.log("성공!!!!");
      alert("포스팅 했습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail-bg">
      <div className="detail">
        <div className="left">
          <h3>포스트 미리보기</h3>
          {imgFile !== "" && (
            <div className="reup-delete">
              <button className="reup" onClick={handleButtonClick}>
                재업로드
              </button>
              <span></span>
              <button className="delete" onClick={() => setImgFile("")}>
                제거
              </button>
            </div>
          )}

          <div className={`image-bg ${imgFile !== "" && "delete-padding"}`}>
            <div className={`image-div ${imgFile === "" && "delete-aspect"}`}>
              {imgFile === "" ? (
                <svg width="107" height="85" fill="none" viewBox="0 0 107 85">
                  <path
                    fill="#868E96"
                    d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"
                  ></path>
                  <path
                    fill="#868E96"
                    d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"
                  ></path>
                </svg>
              ) : (
                <img src={imgFile} alt="thumbnail" />
              )}
            </div>

            <button
              className={`upload-btn ${imgFile !== "" && "no-display"}`}
              onClick={handleButtonClick}
            >
              썸네일 업로드
            </button>
            <input
              type="file"
              accept="image/*"
              id="file"
              name="file"
              ref={imgRef}
              onChange={saveImage}
              style={{ display: "none" }}
            />
          </div>

          <div className="summary">
            <textarea
              value={summary}
              defaultValue={title}
              className="summary-textarea"
              placeholder="당신의 포스트를 짧게 소개해보세요."
              onChange={(e) => setSummary(e.target.value)}
              maxLength={150}
            ></textarea>
            <div
              className={`counting-letters ${
                summary.length === 150 && "letter-limit"
              }`}
            >
              {" "}
              {summary.length} / 150
            </div>
          </div>

          <div className="buttons">
            <button
              className="cancle"
              onClick={() => setShowWriteDetail(false)}
            >
              취소
            </button>
            <button className="post" onClick={onSubmit}>
              출간하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteDetail;
