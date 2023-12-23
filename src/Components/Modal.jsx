import React from "react";

const Modal = ({ title, children, toggleModal }) => {
  return (
    <div className="fixed bg-transparent h-screen w-screen top-0 left-0 backdrop-blur-xl flex justify-center items-center">
      <div className="relative border-2 border-black rounded px-10 py-20">
        <button
          className="absolute top-0 right-3 text-3xl"
          onClick={toggleModal}
        >
          &times;
        </button>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
