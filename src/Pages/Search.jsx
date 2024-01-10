import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../Contexts/UserData";
import { DarkMode } from "../Contexts/DarkMode";
import Blog from "../Components/Blog";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
import Userlist from "../Components/Userlist";
import { trim } from "lodash";

const Search = () => {
  const { isLightMode } = useContext(DarkMode);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const categories = [
    "All",
    "How-to Guides",
    "Listicles",
    "Interviews",
    "Reviews",
    "Case Studies",
    "Personal Stories",
    "Guest Posts",
    "Roundup Posts",
    "Behind-the-Scenes",
    "Technology",
    "FAQs (Frequently Asked Questions)",
    "Health and Wellness",
    "Science",
    "Nature",
    "Food and Travel",
    "History",
    "Travel",
    "Photography",
    "Exploration",
    "Wildlife",
  ];

  const getBlogs = async () => {
    try {
      const result = await axios.get("http://localhost:2222/blog/blogs");
      return result.data.result;
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  };
  useEffect(() => {
    getBlogs().then((res) => setBlogs(res));
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-svh w-full ">
      <Toaster />
      <header className=" flex w-full justify-center py-5 ">
        <input
          onFocus={() => setOpenSearch(true)}
          className={`w-1/2 bg-inherit outline-none border h-10 pl-2  md::pl-4 rounded-md ${
            isLightMode
              ? "border-black  placeholder:text-black/70"
              : " border-white placeholder:text-white/70"
          }`}
          type="search"
          name=""
          id=""
          value={search}
          onChange={(e) => {
            e.target.value = trim(e.target.value);
            setSearch(e.target.value);
          }}
          placeholder="Search Users"
        />
      </header>
      {openSearch ? (
        <div className="flex w-full justify-center">
          <Userlist
            search={search}
            openSearch={() => setOpenSearch(true)}
            closeSearch={() => setOpenSearch(false)}
            lightMode={isLightMode}
          />
        </div>
      ) : (
        <>
          <div className={` px-3 flex gap-2 items-center  `}>
            <label htmlFor="selectBlog">Sort blogs:</label>
            <select
              name=""
              id="selectBlog"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={`outline-none border bg-inherit  px-4 py-1 ${
                isLightMode
                  ? " border-black text-black "
                  : "border-white text-white "
              } `}
            >
              {categories.map((category) => (
                <option
                  value={category == "All" ? "" : category}
                  key={category}
                  className={`${
                    isLightMode ? "bg-[#d3d0ca]" : "bg-[#11151cff]"
                  } border `}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="">
              {blogs?.filter((blog) => blog.category.includes(sort)).length ==
              0 ? (
                <div className=" flex  justify-center items-center">
                  No blogs
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                  {blogs
                    ?.filter((blog) => blog.category.includes(sort))
                    .map((blog) => (
                      <Blog key={blog._id} blog={blog} />
                    ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
