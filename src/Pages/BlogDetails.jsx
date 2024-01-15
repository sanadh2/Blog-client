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
        `https://blog-turm.onrender.com/blog/blogs/single?blogID=${blogID}&userID=${userData._id}`
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
        `https://blog-turm.onrender.com/blog/blogs/like-unlike`,
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
        `https://blog-turm.onrender.com/comment/add-comment`,
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
        `https://blog-turm.onrender.com/blog/blogs?blogID=${blogInfo._id}&userID=${userData._id}`
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
        `https://blog-turm.onrender.com/blog/report-blog`,
        { userID: userData._id, blogID }
      );
      toast.success("reported");
      setReload(!reload);
      setRefreshUser((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

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
            {blogInfo?.authorID._id ==
            userData?._id ? null : userData?.reports.includes(blogID) ? (
              <p className="flex items-center gap-1">
                Reported{" "}
                <svg
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <path
                    style={{ fill: "#FF9900" }}
                    d="M507.494,426.066L282.864,53.536c-5.677-9.415-15.87-15.172-26.865-15.172
              c-10.994,0-21.188,5.756-26.865,15.172L4.506,426.066c-5.842,9.689-6.015,21.774-0.451,31.625
              c5.564,9.852,16.001,15.944,27.315,15.944h449.259c11.314,0,21.751-6.093,27.315-15.944
              C513.509,447.839,513.336,435.755,507.494,426.066z"
                  />
                  <path
                    style={{ fill: "#FFDC35" }}
                    d="M255.999,38.365c-10.994,0-21.188,5.756-26.865,15.172L4.506,426.066
              c-5.842,9.689-6.015,21.774-0.451,31.625c5.564,9.852,16.001,15.944,27.315,15.944h224.629L255.999,38.365L255.999,38.365z"
                  />
                  <path
                    style={{ fill: "#F20013" }}
                    d="M445.326,432.791H67.108c-3.591,0-6.911-1.909-8.718-5.012c-1.807-3.104-1.827-6.934-0.055-10.056
              L247.23,85.028c1.792-3.155,5.139-5.106,8.767-5.107c0.001,0,0.003,0,0.004,0c3.626,0,6.974,1.946,8.767,5.099l189.324,332.694
              c1.777,3.123,1.759,6.955-0.047,10.061S448.918,432.791,445.326,432.791z M84.436,412.616h343.543L256.013,110.423L84.436,412.616z"
                  />
                  <path
                    style={{ fill: "#FF4B00" }}
                    d="M256.332,412.616H84.436l171.576-302.192l-0.01-30.501h-0.005c-3.628,0.001-6.976,1.951-8.767,5.107
              L58.336,417.722c-1.773,3.123-1.752,6.953,0.055,10.056c1.807,3.104,5.127,5.012,8.718,5.012h189.224v-20.175H256.332z"
                  />
                  <path
                    style={{ fill: "#533F29" }}
                    d="M279.364,376.883c0,12.344-10.537,23.182-22.88,23.182c-13.246,0-23.182-10.838-23.182-23.182
              c0-12.644,9.935-23.182,23.182-23.182C268.826,353.701,279.364,364.238,279.364,376.883z M273.644,319.681
              c0,9.333-10.236,13.246-17.462,13.246c-9.634,0-17.762-3.914-17.762-13.246c0-35.826-4.214-87.308-4.214-123.134
              c0-11.741,9.634-18.365,21.977-18.365c11.741,0,21.677,6.623,21.677,18.365C277.858,232.373,273.644,283.855,273.644,319.681z"
                  />
                </svg>
              </p>
            ) : (
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
            )}
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
