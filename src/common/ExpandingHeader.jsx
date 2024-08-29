import React from "react";
import CommonHeader from "./CommonHeader";

const ExpandingHeader = (props) => {
  return <CommonHeader {...props} onClickMenuId={2} />;
};

export default ExpandingHeader;
