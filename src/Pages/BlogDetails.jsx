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

import "./blog.css";
import { DarkMode } from "../Contexts/DarkMode";

const BlogDetails = () => {
  const { blogID } = useParams();
  const [reload, setReload] = useState(true);
  const { userData } = useContext(UserData);
  const [blogInfo, setBlogInfo] = useState(undefined);
  const { isLightMode, theme } = useContext(DarkMode);
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

  const toggleModal = () => {
    setModal(!modal);
  };
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

  useEffect(() => {
    getBlogInfo().then((result) => setTimeout(() => setBlogInfo(result), 1000));
  }, [reload]);
  let contentHTML;
  if (blogInfo?.content) {
    console.log(blogInfo);
    contentHTML = DOMPurify.sanitize(blogInfo.content);
  }
  return (
    <div className="h-full px-3 sm:px-7 md:px-10 pb-10 lg:px-12 xl:px-16  w-full min-h-screen overflow-hidden">
      {blogInfo ? (
        <div className=" ">
          <h1 className=" font-velodroma-wide my-10 text-xl md:text-3xl leading-relaxed text-left font-bold pl-3    w-fit ">
            {blogInfo?.title}
          </h1>

          <Toaster position="top right" />
          <center className="">
            {blogInfo.images?.map((image) => (
              <img
                src={image}
                alt=""
                key={image}
                className=" inline-block my-2  h-60 w-60 object-cover select-none"
              />
            ))}
          </center>

          {contentHTML && (
            <div
              className="py-10 break-words"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          )}

          <p onClick={() => navigate(`/home/users/${blogInfo.authorID._id}`)}>
            Author: &nbsp;&nbsp;
            <span className=" text-[#ff0000]">{blogInfo?.authorID.name}</span>
          </p>

          <div className="w-full flex justify-between  items-center">
            <Like
              text={"like"}
              onClick={likeHandler}
              likes={blogInfo?.likes.length}
            />
            <div className="Comment w-3/4  flex gap-1">
              <input
                type="text"
                placeholder="Comment"
                className={`pl-3 w-4/5 ${
                  isLightMode ? "text-white" : "text-black"
                }`}
                id="comment"
              />
              <button
                className={`px-4 py-1 ${
                  isLightMode ? "bg-white" : "bg-slate-800"
                }`}
              >
                Add Comment
              </button>
            </div>
          </div>

          {blogInfo && blogInfo.authorID === userData?._id && (
            <button
              onClick={() => deleteBlog()}
              className=" top-10 right-3 lg:right-20 font-sans text-base  font-normal text-[#ff0000]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <title>Delete this blog</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          )}

          <div>
            {blogInfo.comments.map((comment) => (
              // <p className="" key={comment}>
              //   {comment}
              // </p>
              <Comment />
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
