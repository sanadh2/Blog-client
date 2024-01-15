import React, { useContext, useState, useEffect } from "react";
import { UserData } from "../Contexts/UserData";
import UploadDP from "../Components/UploadDP";
import { DarkMode } from "../Contexts/DarkMode";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const { isLightMode } = useContext(DarkMode);
  const { userData, setRefreshUser } = useContext(UserData);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    username: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      setDetails({
        name: userData.name,
        email: userData.email,
        username: userData.username,
      });
    }
  }, [userData]);
  const [submitCount, setSubmitCount] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [openmodal, setOpenModal] = useState(false);

  const formValidator = () => {
    const errors = {};
    if (!details.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      errors.email = "Invalid email";

    if (details.username.length < 8)
      errors.username = `Username must have at least 8 letters `;

    if (details.name.length < 5 || details.name.length > 20)
      errors.name = `Full Name must have at least 5 letters and at most 20 letters`;

    setFormErrors(errors);
    return Object.keys(errors).length == 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitCount != 0) formValidator();
  };

  const updateUser = async (req, res, next) => {
    try {
      const updatedData = {
        userID: userData._id,
      };
      if (details.name !== userData.name) {
        updatedData.name = details.name;
      }

      if (details.email !== userData.email) {
        updatedData.email = details.email;
      }

      if (details.username !== userData.username) {
        updatedData.username = details.username;
      }
      if (Object.keys(updatedData).length > 1) {
        const result = await axios.patch(
          "http://localhost:2222/user/update-user",
          updatedData
        );
        setRefreshUser((prev) => !prev);
        return result.data;
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.success == false)
        toast.error(error.response?.data?.msg);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitCount(1);
    formValidator();

    if (
      formValidator() &&
      (details.name !== userData.name ||
        details.email !== userData.email ||
        details.username !== userData.username)
    ) {
      updateUser().then((res) => {
        if (res != undefined) navigate("/home/profile");
      });
    }
  };

  if (!userData) return null;

  return (
    <div className="h-[100svh] w-full">
      <Toaster position="top right" />
      <h1 className=" text-center text-2xl md:text-4xl font-velodroma-wide py-5">
        Edit Profile
      </h1>
      <form action="" className=" h-full">
        <div className="text-black h-[70%] items-center flex flex-col justify-center gap-2">
          <div
            className="h-20 w-20 rounded-full border relative cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            <img
              src={userData?.profilePic}
              alt=""
              className=" rounded-full object-cover object-center h-full w-full"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6 absolute -bottom-2 right-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <UploadDP
            open={openmodal}
            user={userData}
            closeModal={() => setOpenModal(false)}
            lightMode={isLightMode}
            setRefreshUser={setRefreshUser}
          />
          <input
            value={details.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="name"
            className="w-3/4 max-w-80 h-10 pl-3 rounded placeholder:capitalize"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
          <input
            value={details.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="email"
            className="w-3/4 max-w-80 h-10 pl-3 rounded placeholder:capitalize"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
          <input
            onChange={handleChange}
            name="username"
            value={details.username}
            type="text"
            placeholder="username"
            className="w-3/4 max-w-80 h-10 pl-3 rounded placeholder:capitalize"
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm">{formErrors.username}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={onSubmit}
              className="inline-flex text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/home/profile")}
              className="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
