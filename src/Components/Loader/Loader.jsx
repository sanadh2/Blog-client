import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="absolute backdrop-blur-xl h-screen flex justify-center items-center w-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
