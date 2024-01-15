import axios from "axios";
axios.defaults.withCredentials = true;
import React, { useContext, useEffect, useState } from "react";
import Blog from "../Components/Blog";
import Loader from "../Components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { UserData } from "../Contexts/UserData";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { userData } = useContext(UserData);
  const [loading, setLoading] = useState(true);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const getBlogs = async () => {
    try {
      const result = await axios.get(
        `https://blog-turm.onrender.com/blog/following/${userData._id}`
      );
      return result.data.followingBlogs;
    } catch (err) {
      toast.error("error");
    }
  };

  const getfeaturedBlogs = async () => {
    try {
      const result = await axios.get(
        `https://blog-turm.onrender.com/blog/featured-blogs`
      );
      return result.data;
    } catch (error) {}
  };
  useEffect(() => {
    getfeaturedBlogs().then((res) => setFeaturedBlogs(res.blogs));
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
      <div className="w-full justify-center text-base md:text-lg xl:text-xl items-center flex gap-10 md:gap-20">
        <button
          className={`${
            !isFeatured && "underline"
          } decoration-rose-500 wwwunderline-offset-4`}
          onClick={() => setIsFeatured(false)}
        >
          Following
        </button>
        <button
          className={`${
            isFeatured && "underline"
          } decoration-rose-500 underline-offset-4`}
          onClick={() => setIsFeatured(true)}
        >
          Featured
        </button>
      </div>

      {isFeatured ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {featuredBlogs.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
          <p className="flex justify-center h-full items-center">
            follow more people to view more blogs
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
