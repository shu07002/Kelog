import React from "react";
import CommonHeader from "./CommonHeader";

const ExpandingHeader = (props) => {
  return (
    <CommonHeader
      {...props}
      expand={props.expand}
      headerRef={props.headerRef}
      onClickMenuId={2}
    />
  );
};

export default ExpandingHeader;
