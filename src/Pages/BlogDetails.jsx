import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { UserData } from "../Contexts/UserData";
import Modal from "../Components/Modal";
import Comment from "../Components/Comment";
import toast, { Toaster } from "react-hot-toast";
import DOMPurify from "dompurify";
import { IoFlagSharp } from "react-icons/io5";
import Like from "../Components/Like";

import { DarkMode } from "../Contexts/DarkMode";

import "./blog.css";
const BlogDetails = () => {
  const { blogID } = useParams();
  const [reload, setReload] = useState(true);
  const { userData, setRefreshUser } = useContext(UserData);
  const [blogInfo, setBlogInfo] = useState(undefined);
  const { isLightMode, theme } = useContext(DarkMode);
  const [comment, setComment] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const getBlogInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:2222/blog/blogs/single?blogID=${blogID}&userID=${userData._id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) getBlogInfo().then((res) => setBlogInfo(res.blog));
  }, [userData, reload]);

  let contentHTML;
  if (blogInfo?.content) {
    contentHTML = DOMPurify.sanitize(blogInfo.content);
  }

  const likeUnlikeBlog = async () => {
    try {
      if (!blogInfo || !userData) return;
      const result = await axios.patch(
        `http://localhost:2222/blog/blogs/like-unlike`,
        { blogID: blogInfo._id, userID: userData._id }
      );
      setReload((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      if (!blogInfo || !userData || comment.length < 1) return;
      const result = await axios.post(
        `http://localhost:2222/comment/add-comment`,
        { comment, blogID: blogInfo._id, userID: userData._id }
      );
      setReload(!reload);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    try {
      if (!blogInfo || !userData) return;
      const result = await axios.delete(
        `http://localhost:2222/blog/blogs?blogID=${blogInfo._id}&userID=${userData._id}`
      );
      setReload(!reload);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const reportBlog = async () => {
    try {
      if (!userData || !blogID) return;
      const result = await axios.post(
        `http://localhost:2222/blog/report-blog`,
        { userID: userData._id, blogID }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blogInfo);
  return (
    <div className=" px-3 sm:px-7 md:px-10 pb-10 lg:px-12 xl:px-16  w-full">
      {blogInfo ? (
        <div className="w-full">
          <h1 className=" font-velodroma-wide my-10 text-xl md:text-3xl leading-relaxed text-left font-bold pl-3 ">
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
              className="py-10 break-words content"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          )}

          <div className="flex mb-5  justify-between ">
            <p className="   flex items-center ">
              Author: &nbsp;&nbsp;
              <Link
                className=" text-[#00ff00] cursor-pointer font-bold text-xl font-velodroma  opacity-100 hover:opacity-65"
                to={`/home/users/${blogInfo.authorID._id}`}
              >
                {blogInfo?.authorID.name}
              </Link>
            </p>
            <button
              className="flex gap-1 opacity-100 hover:opacity-75 "
              onClick={() => reportBlog()}
            >
              <IoFlagSharp
                className="align-middle"
                title="Report Blog"
                size={25}
              />
              <span>Report</span>
            </button>
          </div>

          <div className="w-full flex justify-between  items-center mb-10">
            <Like
              text={"like"}
              onClick={() => likeUnlikeBlog()}
              likeInfo={blogInfo?.likes}
              userID={userData._id}
            />
            <div className="Comment w-3/4  flex gap-1">
              <input
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`pl-3 w-3/5 bg-inherit border rounded outline-none ${
                  isLightMode
                    ? "text-black border-black "
                    : "text-white border-white"
                }`}
                id="comment"
              />
              <button
                onClick={() => addComment()}
                className={`px-4 py-1 rounded  transition active:bg-transparent ${
                  isLightMode
                    ? "bg-white hover:bg-white/50"
                    : "bg-slate-800 hover:bg-slate-800/50"
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
                  <button
                    className=" opacity-100 hover:opacity-65"
                    onClick={() => setOpenModal(true)}
                  >
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
