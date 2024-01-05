import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../Contexts/UserData";

const Comment = ({ commentObj, setReload }) => {
  const { userData } = useContext(UserData);
  const deleteComment = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:2222/comment/${commentObj._id}`
      );
      setReload((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = () => {
    if (!userData) toast.error("please sign In");
    deleteComment();
  };
  return (
    <div className="px-10 rounded flex gap-3 relative">
      <img
        src={commentObj.userID.profilePic}
        alt=""
        className=" aspect-square h-16 object-cover rounded-full"
      />
      <div className="flex flex-col gap-2 justify-center">
        <p className=" text-lg">{commentObj.userID.name}</p>
        <p className="">{commentObj.comment}</p>
      </div>
      {userData?._id == commentObj.userID._id && (
        <button
          type="button"
          className=" absolute right-0"
          onClick={deleteHandler}
        >
          <svg
            fill="#ff0000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className=" w-5"
          >
            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Comment;
