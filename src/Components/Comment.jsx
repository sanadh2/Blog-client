import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../Contexts/UserData";
import Modal from "./Modal";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;
const Comment = ({ commentObj, setReload }) => {
  const { userData } = useContext(UserData);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
    <div className="px-10 rounded flex items-center opacity-80 hover:opacity-100 gap-3 relative">
      <img
        src={commentObj.userID.profilePic}
        alt=""
        className=" aspect-square h-10 lg:h-16 object-cover rounded-full"
      />
      <div className="flex flex-col gap-0 md:gap-1 lg:gap-2 justify-center">
        <Link
          className=" text-lg cursor-pointer"
          to={`/home/users/${commentObj.userID._id}`}
        >
          {commentObj.userID.name}
        </Link>
        <p className="">{commentObj.comment}</p>
      </div>
      {userData?._id == commentObj.userID._id && (
        <>
          <button
            type="button"
            onClick={() => setOpenDeleteModal(true)}
            className=" absolute right-0  opacity-100 hover:opacity-65"
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
          <Modal close={() => setOpenDeleteModal(false)} open={openDeleteModal}>
            <p className=" mb-3">Do you want to delete this comment?</p>
            <div className="flex  justify-evenly">
              <button
                onClick={deleteHandler}
                className=" px-3 py-1 bg-[#ff0000ab]"
              >
                Delete
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="px-3 py-1 bg-[#3ffc4c95]"
              >
                Close
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Comment;
