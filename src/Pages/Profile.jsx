import React, { useContext, useRef, useState, useEffect } from "react";
import Blog from "../Components/Blog";
import { useNavigate } from "react-router-dom";
import { UserData } from "../Contexts/UserData";
import Modal from "../Components/Modal";
import Loader from "../Components/Loader/Loader";
import UploadDP from "../Components/UploadDP";
import { DarkMode } from "../Contexts/DarkMode";

const Profile = () => {
  const navigate = useNavigate();
  const { theme, isLightMode } = useContext(DarkMode);
  const { userData } = useContext(UserData);

  const Details = ({ title, type }) => {
    return (
      <div className="relative flex flex-col items-center">
        <p>{type.length}</p>
        <p>{title}</p>
      </div>
    );
  };
  console.log(userData);
  if (!userData) return <Loader />;
  return (
    <div className=" h-full flex flex-col   w-full">
      <div className="h-[40vh] md:h-[35vh] p-5 sm:px-10 lg:px-16">
        <div className=" flex justify-between sm:justify-start gap-10 text-sm items-center">
          <img
            style={{ borderColor: theme.text }}
            src={userData.profilePic}
            alt=""
            className="h-20 w-20 sm:h-24 sm:w-24 md:w-32 md:h-32  object-cover object-center rounded-full"
          />
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
            <div className="flex gap-3">
              <Details title={"Blogs"} type={userData.blogs} />
              <Details title={"Followers"} type={userData.followers} />
              <Details title={"Following"} type={userData.following} />
            </div>

            <div className=" flex justify-center items-center">
              <button
                onClick={() => navigate("/home/edit-profile")}
                style={{ borderColor: theme.text }}
                className=" bg-transparent px-4 py-1 rounded whitespace-nowrap border opacity-100 hover:opacity-50"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-20  flex-col items-start">
          <p>{userData.username}</p>
          {userData.role == "admin" && (
            <p
              className={`${isLightMode ? "text-[#463dae]" : "text-[#00ff00]"}`}
            >
              admin
            </p>
          )}
          <p className=" opacity-55 truncate ">{userData.email}</p>
        </div>
      </div>

      <div className="min-h-[65vh] w-full grid grid-cols-1 place-items-center  md:grid-cols-2 lg:grid-cols-3 gap-10">
        {userData.blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
