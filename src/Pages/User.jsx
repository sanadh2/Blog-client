import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../Components/Blog";
import { DarkMode } from "../Contexts/DarkMode";
import Loader from "../Components/Loader/Loader";

const User = () => {
  const { userID } = useParams();
  const { theme } = useContext(DarkMode);
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const result = await axios.get(
        `http://localhost:2222/user/users/${userID}`
      );
      setUser(result.data.user);
    };
    getUser();
  }, []);

  const Details = ({ title, type }) => {
    return (
      <div className="relative flex flex-col items-center">
        <p>{type.length}</p>
        <p>{title}</p>
      </div>
    );
  };
  return (
    <>
      {" "}
      {user ? (
        <div className=" h-full flex flex-col   w-full">
          <div className="h-[40vh] md:h-[35vh] p-5 sm:px-10 lg:px-16">
            <div className=" flex justify-between sm:justify-start gap-10 text-sm items-center">
              <img
                style={{ borderColor: theme.text }}
                src={user.profilePic}
                alt=""
                className="h-20 w-20 sm:h-24 sm:w-24 md:w-32 md:h-32  object-cover object-center rounded-full"
              />
              <div className="flex gap-3 justify-center items-center">
                <Details title={"Blogs"} type={user.blogs} />
                <Details title={"Followers"} type={user.followers} />
                <Details title={"Following"} type={user.following} />
              </div>
            </div>
            <div className="flex w-20  flex-col items-start">
              <p>{user.username}</p>
              {user.role == "admin" && <p className="text-[#00ff00]">admin</p>}
              <p className=" opacity-55 truncate ">{user.email}</p>
            </div>
          </div>

          <div className="min-h-[65vh] w-full grid grid-cols-1 place-items-center  md:grid-cols-2 lg:grid-cols-3 gap-10">
            {user.blogs.map((blog) => (
              <Blog key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default User;
