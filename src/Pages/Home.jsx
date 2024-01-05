import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Blog from "../Components/Blog";
import Loader from "../Components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { UserData } from "../Contexts/UserData";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { userData } = useContext(UserData);
  const [loading, setLoading] = useState(true);
  const getBlogs = async () => {
    try {
      const result = await axios.get(
        `http://localhost:2222/blog/following/${userData._id}`
      );
      return result.data.followingBlogs;
    } catch (err) {
      toast.error("error");
    }
  };

  useEffect(() => {
    if (userData) {
      getBlogs().then((res) => setBlogs(res));
      setTimeout(() => setLoading(false), 1000);
    }
  }, [userData]);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col gap-2 min-h-[100svh] h-full  items-center w-full">
      <h1 className="text-base sm:text-3xl md:text-4xl xl:text-5xl font-against font-black  py-4 md:py-7 lg:py-10 ">
        Welcome to Blog and Blogger
      </h1>
      <Toaster position="top right" />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {blogs?.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
