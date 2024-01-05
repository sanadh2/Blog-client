import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../Components/Blog";
import { DarkMode } from "../Contexts/DarkMode";
import Loader from "../Components/Loader/Loader";
import { UserData } from "../Contexts/UserData";
import toast from "react-hot-toast";

const User = () => {
  const { userID } = useParams();
  const { userData, setRefreshUser } = useContext(UserData);
  const { theme, isLightMode } = useContext(DarkMode);
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const result = await axios.get(
        `http://localhost:2222/user/users/${userID}`
      );
      setUser(result.data.user);
    };
    getUser();
  }, [refresh]);

  const follow = async () => {
    try {
      const res = await axios.patch("http://localhost:2222/user/follow", {
        followeeID: user._id,
        userID: userData._id,
      });
      setRefresh(!refresh);
      setRefreshUser((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handlefollow = () => {
    if (!userData || !user) toast.error("Please Log In");
    follow();
  };

  const Details = ({ title, type }) => {
    return (
      <div className="relative flex flex-col items-center">
        <p>{type.length}</p>
        <p>{title}</p>
      </div>
    );
  };
  console.log(userData);
  return (
    <>
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
            {user?.username !== userData?.username && (
              <button
                onClick={handlefollow}
                className={`inline-flex text-white bg-green-500 hover:shadow-md active:shadow-none   border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded `}
              >
                {userData?.following.includes(user._id) ? "unfollow" : "follow"}
              </button>
            )}
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
