import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { UserData } from "../Contexts/UserData";
import Modal from "../Components/Modal";
import Comment from "../Components/Comment";
import toast, { Toaster } from "react-hot-toast";
import DOMPurify from "dompurify";

import Like from "../Components/Like";

import { DarkMode } from "../Contexts/DarkMode";

import "./blog.css";
const BlogDetails = () => {
  const { blogID } = useParams();
  const [reload, setReload] = useState(true);
  const { userData } = useContext(UserData);
  const [blogInfo, setBlogInfo] = useState(undefined);
  const { isLightMode, theme } = useContext(DarkMode);
  const [comment, setComment] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const getBlogInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:2222/blog/blogs/${blogID}`
      );
      return result.data.blog;
    } catch (err) {
      toast.error("error");
    }
  };

  const addLikeUnlike = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:2222/blog/blogs/likeUnlike`,
        {
          userID: userData._id,
          blogID,
        }
      );
      setReload(!reload);
      // console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [modal, setModal] = useState(false);

  const likeHandler = () => {
    if (!userData) console.log("no data");
    addLikeUnlike();
  };

  const deleteBlog = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:2222/blog/blogs?blogID=${blogInfo._id}&userID=${userData._id}`
      );

      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:2222/comment/add-comment",
        {
          comment,
          blogID: blogInfo._id,
          userID: userData._id,
        }
      );
      setComment("");
      setReload(!reload);
    } catch {
      console.log("error");
    }
  };
  const commentHandler = () => {
    if (comment.length < 1) return;
    if (!userData) toast.error("please Login");
    addComment();
  };

  useEffect(() => {
    getBlogInfo().then((result) => setTimeout(() => setBlogInfo(result), 1000));
  }, [reload]);
  let contentHTML;
  if (blogInfo?.content) {
    contentHTML = DOMPurify.sanitize(blogInfo.content);
  }

  return (
    <div className="h-full px-3 sm:px-7 md:px-10 pb-10 lg:px-12 xl:px-16  w-full min-h-screen overflow-hidden">
      {blogInfo ? (
        <div className="w-full">
          <h1 className=" font-velodroma-wide my-10 text-xl md:text-3xl leading-relaxed text-left font-bold pl-3    w-fit ">
            {blogInfo?.title}
          </h1>

          <Toaster position="top right" />
          <div
            className={`${
              blogInfo.images.length > 6
                ? "grid grid-flow-col auto-cols-auto  overflow-x-scroll overscroll-contain snap-mandatory snap-x"
                : "flex justify-center items-center flex-wrap"
            } gap-2 `}
          >
            {blogInfo.images?.map((image) => (
              <img
                src={image}
                alt=""
                key={image}
                className="w-[12rem] object-cover aspect-square max-w-none"
              />
            ))}
          </div>

          {contentHTML && (
            <div
              className="py-10 break-words"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          )}

          <p className=" mb-5">
            Author: &nbsp;&nbsp;
            <span
              className=" text-[#ff0000] cursor-pointer"
              onClick={() => navigate(`/home/users/${blogInfo.authorID._id}`)}
            >
              {blogInfo?.authorID.name}
            </span>
          </p>

          <div className="w-full flex justify-between  items-center mb-10">
            <Like
              text={"like"}
              onClick={likeHandler}
              likes={blogInfo?.likes.length}
            />
            <div className="Comment w-3/4  flex gap-1">
              <input
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`pl-3 w-4/5 ${
                  isLightMode ? "text-white" : "text-black"
                }`}
                id="comment"
              />
              <button
                onClick={commentHandler}
                className={`px-4 py-1 ${
                  isLightMode ? "bg-white" : "bg-slate-800"
                }`}
              >
                Add Comment
              </button>
            </div>

            {blogInfo &&
              blogInfo.authorID &&
              (userData?.role === "admin" ||
                blogInfo.authorID._id === userData?._id) && (
                <div>
                  <button className="" onClick={() => setOpenModal(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <title>Delete Blog</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <Modal
                    open={openModal}
                    close={() => setOpenModal(false)}
                    theme={isLightMode}
                  >
                    <p className=" mb-3">Do you want to delete this post?</p>
                    <div className="flex  justify-evenly">
                      <button
                        onClick={() => deleteBlog()}
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
                </div>
              )}
          </div>

          <h1 className=" text-xl mb-5">Comments</h1>
          <div className=" flex flex-col gap-2">
            {blogInfo.comments.map((comment) => (
              <Comment
                key={comment._id}
                commentObj={comment}
                setReload={setReload}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BlogDetails;
