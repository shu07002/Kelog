import ReactDom from "react-dom";

export const LoginModalPortal = ({ children }) => {
  const element = document.getElementById("loginModal");

  return ReactDom.createPortal(children, element);
};
