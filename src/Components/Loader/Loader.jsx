import React from "react";
const Loader = () => {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className="w-10 h-10 absolute z-50 top-1/2 left-1/2 border-[1px] border-white border-solid rounded-full animate-spin"
    ></div>
  );
};

export default Loader;
