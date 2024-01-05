import React, { useContext } from "react";
import { DarkMode } from "../../Contexts/DarkMode";
const Loader = () => {
  const { isLightMode } = useContext(DarkMode);
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className={`w-10 h-10 absolute z-50 top-1/2 left-1/2 border-[1px]  border-solid rounded-full animate-spin ${
        isLightMode ? "border-black" : "border-white"
      }`}
    ></div>
  );
};

export default Loader;
