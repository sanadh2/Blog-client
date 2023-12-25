import React from "react";

const Blog = ({ blog }) => {
  return (
    <div className="h-60 bg-white/30 w-[80vw] px-2 flex py-5 gap-5 ">
      <div className=" w-20 h-full  flex items-center">
        <img
          src={blog.images[0]}
          alt="image"
          className="bg-white rounded-full"
        />
      </div>
      <div>
        <h1 className="text-center underline w-full decoration-black underline-offset-2">
          {blog.title}
        </h1>
        <p className=" line-clamp-[8] h-30 ">{blog.content}</p>
      </div>
    </div>
  );
};

export default Blog;
