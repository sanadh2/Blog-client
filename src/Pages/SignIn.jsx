import "./auth.css";
import React, { useContext, useState } from "react";
import { DarkMode } from "../Contexts/DarkMode";

const SignIn = () => {
  const { theme } = useContext(DarkMode);

  const [formData, setFormData] = useState({
    usernameEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="min-h-screen flex lg:flex-row flex-col justify-center items-center w-screen"
      style={{ color: theme.text, backgroundColor: theme.bg }}
    >
      <div className="w-1/2 flex justify-center items-center">
        <h1 className=" font-velodroma-wide text-4xl">Sign In</h1>
      </div>
      <div className="w-full lg:w-1/2">
        <form
          action=""
          method="post"
          className=" flex justify-center items-center flex-col gap-5"
        >
          <div className="coolinput  flex  justify-center items-center ">
            <label htmlFor="username" className="text">
              Email / Username
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.usernameEmail}
              type="text"
              placeholder="write here"
              name="usernameEmail"
              className="input  placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e]"
              id="username"
            />
          </div>{" "}
          <div className="coolinput  flex justify-center items-center ">
            <label htmlFor="password" className="text">
              Password:
            </label>
            <input
              required
              onChange={handleChange}
              value={formData.password}
              type="text"
              placeholder="write here"
              name="password"
              className="input  placeholder:text-sm placeholder:font-serif focus:placeholder:text-[#f4442e]"
              id="password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
