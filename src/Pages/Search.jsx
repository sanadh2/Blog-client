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
    <div className="min-h-screen w-full overflow-hidden">
      <Toaster />
      <header className=" flex justify-center py-5 ">
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
          placeholder="Search"
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
          <div
            className={`  grid pl-2  grid-flow-col auto-cols-auto gap-2 overflow-x-scroll overscroll-contain snap-mandatory snap-x`}
          >
            <button
              onClick={() => setSort("")}
              className={`px-3 py-0.5 rounded whitespace-nowrap overscroll-x-auto snap-center  ${
                isLightMode ? "bg-black text-white " : "bg-white/60 text-black"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSort(category)}
                className={`px-3 py-0.5 rounded whitespace-nowrap  overscroll-x-auto snap-center ${
                  isLightMode
                    ? "bg-black text-white "
                    : "bg-white/60 text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
              {blogs
                ?.filter((blog) => blog.category.includes(sort))
                .map((blog) => (
                  <Blog key={blog._id} blog={blog} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
