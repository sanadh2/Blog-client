import "./auth.css";
import React, { useContext, useState } from "react";
import { DarkMode } from "../Contexts/DarkMode";
import axios from "axios";
axios.defaults.withCredentials = true;
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { theme, isLightMode } = useContext(DarkMode);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (data) => {
    try {
      const res = await axios.post(
        "https://blog-turm.onrender.com/user/signin",
        data
      );
      return res;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(formData).then((res) => {
      if (res?.data.success == true) navigate("/home");
    });
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col justify-center items-center w-screen">
      <div className="w-3/5 hidden  md:px-20 md:flex flex-col justify-center items-center">
        <h1 className="font-velodroma-wide text-4xl whitespace-nowrap">
          Sign In
        </h1>
        <p className="text-xl mt-10 font-light select-none cursor-text">
          "Welcome to{" "}
          <span className=" font-against font-medium">Blog and Blogger</span>!
          🚀 Continue your journey by logging your account. It only takes a
          minute! 🌟"
        </p>
      </div>
      <div className="w-full md:w-2/5">
        <Toaster position="top-right" />
        <form
          action=""
          method="post"
          className=" flex justify-center items-center flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <h1 className=" font-velodroma-wide text-4xl block md:hidden">
            Sign In
          </h1>
          <div className="coolinput  flex  justify-center items-center ">
            <label
              htmlFor="username"
              style={{ backgroundColor: theme.bg, color: theme.text }}
              className={`text `}
            >
              Email / Username
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.usernameEmail}
              type="text"
              placeholder="write here"
              name="usernameEmail"
              className={`input outline outline-2 lowercase   placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e] ${
                isLightMode
                  ? "outline-black/30 focus:outline-black"
                  : "outline-white/30 focus:outline-white"
              }`}
              id="username"
            />
          </div>
          <div className="coolinput  flex justify-center items-center ">
            <label
              htmlFor="password"
              style={{ backgroundColor: theme.bg, color: theme.text }}
              className={`text`}
            >
              Password:
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.password}
              type="password"
              placeholder="write here"
              name="password"
              className={`input outline outline-2   placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e] ${
                isLightMode
                  ? "outline-black/30 focus:outline-black"
                  : "outline-white/30 focus:outline-white"
              }`}
              id="password"
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: theme.text, color: theme.bg }}
            className="px-4 py-1 rounded-3xl outline-none focus:shadow-lg focus:shadow-black/70"
          >
            Sign In
          </button>
          <p>
            Not a member? Try{" "}
            <span
              className=" underline underline-offset-2 italic cursor-pointer "
              onClick={() => navigate("/signup")}
            >
              Signing Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
