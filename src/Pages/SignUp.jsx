import React, { useContext, useEffect, useState } from "react";
import { DarkMode } from "../Contexts/DarkMode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { theme, isLightMode } = useContext(DarkMode);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [submitCount, setSubmitCount] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const formValidator = () => {
    const errors = {};
    if (
      !formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    )
      errors.password = `Password must have at least 8 characters, contains at least 1 number,contains at least 1 uppercase letter, contains atleast 1 lowercase letter and a special character`;

    if (!formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      errors.email = "Invalid email";

    if (formData.username.length < 8)
      errors.username = `Username must have at least 8 letters `;

    if (formData.name.length < 5 || formData.name.length > 20)
      errors.name = `Full Name must have at least 5 letters and at most 20 letters`;

    setFormErrors(errors);
    return Object.keys(errors).length == 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitCount != 0) formValidator();
  };

  const signUp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:2222/user/signup",
        formData
      );
      return res.data;
    } catch (err) {
      console.error(err.response);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitCount(1);
    formValidator();
    if (formValidator()) {
      signUp().then((res) => {
        if (res != undefined) navigate("/");
      });
    }
  };

  return (
    <div className=" min-h-screen flex flex-col justify-evenly md:flex-row w-full items-center ">
      <div className="w-3/5 md:flex flex-col px-2 md:px-16 justify-center items-center hidden  ">
        <h1 className="font-velodroma-wide text-4xl whitespace-nowrap">
          Sign Up
        </h1>
        <p className="text-xl mt-10 font-light select-none cursor-text">
          "Welcome to{" "}
          <span className=" font-against font-medium">Blog and Blogger</span>!
          🚀 Start your journey by creating an account. It only takes a minute!
          🌟"
        </p>
      </div>
      <h1 className="font-velodroma-wide text-4xl block md:hidden font-light whitespace-nowrap">
        Sign Up
      </h1>
      <form
        className=" w-full md:w-2/5"
        action=""
        method="post"
        onSubmit={onSubmit}
      >
        <div className=" flex flex-col justify-center gap-6 h-full items-center">
          {/* fullName */}
          <div className="coolinput  flex justify-center items-center ">
            <label
              htmlFor="name"
              className="text"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              Full Name:
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.name}
              type="text"
              placeholder="write here"
              name="name"
              className={`input outline outline-2   placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e] ${
                isLightMode
                  ? "outline-black/30 focus:outline-black"
                  : "outline-white/30 focus:outline-white"
              }`}
              id="name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          {/* email */}
          <div className="coolinput  flex justify-center items-center ">
            <label
              htmlFor="email"
              className="text"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              Email:
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.email}
              type="email"
              id="email"
              placeholder="write here"
              name="email"
              className={`input outline lowercase outline-2 placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e] ${
                isLightMode
                  ? "outline-black/30 focus:outline-black"
                  : "outline-white/30 focus:outline-white"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          {/* username */}
          <div className="coolinput  flex justify-center items-center ">
            <label
              htmlFor="username"
              className="text"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              Username:
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.username}
              type="text"
              placeholder="write here"
              name="username"
              className={`input outline outline-2 lowercase   placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e] ${
                isLightMode
                  ? "outline-black/30 focus:outline-black"
                  : "outline-white/30 focus:outline-white"
              }`}
              id="username"
            />{" "}
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>

          {/* password */}
          <div className="coolinput  flex justify-center items-center ">
            <label
              htmlFor="password"
              className="text"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              Password
            </label>
            <input
              required
              id="password"
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
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm justify-self-start">
                {formErrors.password}
              </p>
            )}
          </div>

          <button
            style={{ backgroundColor: theme.text, color: theme.bg }}
            className="rounded-full px-4 py-1 outline-none focus:shadow-lg focus:shadow-black/70"
          >
            Sign Up
          </button>
          <p>
            Already a member? Try{" "}
            <span
              className=" underline underline-offset-2 italic cursor-pointer "
              onClick={() => navigate("/")}
            >
              Logging In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
