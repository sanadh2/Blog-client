import React from "react";

const Modal = ({ children, open, close, theme }) => {
  if (!open) return null;
  console.log(theme);
  return (
    <div
      style={{ zIndex: 2000 }}
      className="fixed  p-20 flex justify-center items-center top-0 bottom-0 left-0 right-0 backdrop-blur backdrop-brightness-50"
    >
      <div
        className={`relative  bg-current p-20  flex justify-center items-center ${
          theme ? "bg-[#F2F3AE]" : " bg-slate-700"
        }`}
      >
        <span
          className="absolute right-[3%] top-[3%] text-3xl hover:text-[#ff0000] cursor-pointer"
          onClick={close}
        >
          &times;
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
