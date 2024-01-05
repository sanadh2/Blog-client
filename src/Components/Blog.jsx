import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../Contexts/DarkMode";
import ReactHtmlParser from "html-react-parser";
const Blog = ({ blog }) => {
  const { theme } = useContext(DarkMode);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container mx-auto  ">
        <div className="flex flex-wrap justify-center">
          <div className="p-4 ">
            <div
              style={{ borderColor: theme.text }}
              className="h-[23rem] border-2 w-[80svw] sm:w-[70svw] md:w-[28svw] xl:w-[20svw]  border-opacity-60 rounded-lg overflow-hidden"
            >
              <img
                className="h-28 sm:h-32 w-full object-cover object-center"
                src={blog.images.length > 0 ? blog.images[0] : "/noImage.png"}
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium  mb-1">
                  {blog.category}
                </h2>
                <h1
                  style={{ color: theme.text }}
                  className="title-font text-lg font-medium  mb-3 line-clamp-1"
                >
                  {blog.title}
                </h1>
                <div className="leading-relaxed mb-3 line-clamp-3">
                  {ReactHtmlParser(blog.content)}
                </div>
                <div className="flex items-center flex-wrap ">
                  <Link
                    to={`/home/blog/${blog._id}`}
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx={12} cy={12} r={3} />
                    </svg>
                    1.2K
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                    {blog.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
