import React, { useContext, useState, useEffect, useRef } from "react";
import { UserData } from "../Contexts/UserData";
import axios from "axios";
axios.defaults.withCredentials = true;
import { DarkMode } from "../Contexts/DarkMode";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme, isLightMode } = useContext(DarkMode);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [focus, setFocus] = useState();

  useEffect(() => {
    setFocus(location);
  });
  const { setUserData, refreshUser } = useContext(UserData);
  let flag = true;
  const getUser = async () => {
    try {
      const result = await axios.get(
        "https://blog-turm.onrender.com/user/verify",
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (err) {
      console.log(err);
      if (err.response) console.error(err.response.data);
      navigate("/");
    }
  };

  const refreshToken = async () => {
    try {
      const result = await axios.get(
        "https://blog-turm.onrender.com/user/refresh",
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (err) {
      console.log(err);
      if (err.response) console.error(err.response.data);
      navigate("/");
    }
  };

  useEffect(() => {
    if (flag) {
      flag = false;
      getUser().then((data) => setUserData(data?.user));
    }
    let interval = setInterval(
      () => refreshToken().then((data) => setUserData(data?.user)),
      1000 * 20
    );
    return () => clearInterval(interval);
  }, [refreshUser]);

  const logout = async () => {
    try {
      const res = await axios.post(
        "https://blog-turm.onrender.com/user/signout"
      );
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative min-h-screen scroll-smooth flex flex-col-reverse md:flex-row "
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <nav
        style={{ boxShadow: "0px 1px 3px", backgroundColor: theme.bg }}
        className="fixed z-50 bottom-0 md:top-0 left-auto md:left-0  flex flex-row flex-nowrap md:flex-col justify-evenly items-center w-screen md:w-[4rem] h-[4rem] md:h-screen"
      >
        <button
          className={` w-12 h-12 p-1 rounded-[1000px] ${
            isLightMode
              ? "hover:bg-[#d3d0ca] active:bg-[#b5b0a6]"
              : "hover:bg-slate-700 active:bg-slate-600"
          }`}
          onClick={toggleTheme}
        >
          <svg
            fill={theme.text}
            width="36px"
            height="36px"
            viewBox="-2 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Change Theme</title>
            <g id="Dark">
              <path d="M12.741,20.917a9.389,9.389,0,0,1-1.395-.105,9.141,9.141,0,0,1-1.465-17.7,1.177,1.177,0,0,1,1.21.281,1.273,1.273,0,0,1,.325,1.293,8.112,8.112,0,0,0-.353,2.68,8.266,8.266,0,0,0,4.366,6.857,7.628,7.628,0,0,0,3.711.993,1.242,1.242,0,0,1,.994,1.963h0A9.148,9.148,0,0,1,12.741,20.917ZM10.261,4.05a.211.211,0,0,0-.065.011,8.137,8.137,0,1,0,9.131,12.526h0a.224.224,0,0,0,.013-.235.232.232,0,0,0-.206-.136A8.619,8.619,0,0,1,14.946,15.1a9.274,9.274,0,0,1-4.883-7.7,9.123,9.123,0,0,1,.4-3.008.286.286,0,0,0-.069-.285A.184.184,0,0,0,10.261,4.05Z" />
            </g>
          </svg>
        </button>
        <Link
          to={"/home"}
          className={`p-1 rounded-full ${
            isLightMode
              ? "hover:bg-[#d3d0ca] active:bg-[#b5b0a6]"
              : "hover:bg-slate-700 active:bg-slate-600"
          }`}
        >
          <svg
            stroke={theme.text}
            fill={focus == "/home" ? theme.text : theme.bg}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            version="1.2"
            baseProfile="tiny"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Home</title>
            <path d="M12 3s-6.186 5.34-9.643 8.232c-.203.184-.357.452-.357.768 0 .553.447 1 1 1h2v7c0 .553.447 1 1 1h3c.553 0 1-.448 1-1v-4h4v4c0 .552.447 1 1 1h3c.553 0 1-.447 1-1v-7h2c.553 0 1-.447 1-1 0-.316-.154-.584-.383-.768-3.433-2.892-9.617-8.232-9.617-8.232z" />
          </svg>
        </Link>
        <Link
          to={"/home/search"}
          className={`p-1 rounded-full ${
            isLightMode
              ? "hover:bg-[#d3d0ca] active:bg-[#b5b0a6]"
              : "hover:bg-slate-700 active:bg-slate-600"
          }`}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Search</title>
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke={theme.text}
              strokeWidth={`${focus == "/home/search" ? 2.5 : 1}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          to="/home/new-blog"
          className={`p-1 rounded-full ${
            isLightMode
              ? "hover:bg-[#d3d0ca] active:bg-[#b5b0a6]"
              : "hover:bg-slate-700 active:bg-slate-600"
          }`}
        >
          <svg
            aria-label="New post"
            fill="currentColor"
            height="30px"
            role="img"
            viewBox="0 0 24 24"
            width="30px"
            strokeWidth={focus == "/home/new-blog" ? 2.5 : 1}
          >
            <title>New post</title>
            <path
              d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="6.545"
              x2="17.455"
              y1="12.001"
              y2="12.001"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="12.003"
              x2="12.003"
              y1="6.545"
              y2="17.455"
            ></line>
          </svg>
        </Link>
        <Link
          to="/home/profile"
          className={`p-1 rounded-full ${
            isLightMode
              ? "hover:bg-[#d3d0ca] active:bg-[#b5b0a6]"
              : "hover:bg-slate-700 active:bg-slate-600"
          }`}
        >
          <svg
            width="30px"
            height="30px"
            stroke={theme.text}
            fill={focus == "/home/profile" ? theme.text : "none"}
            strokeWidth={1}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Profile</title>
            <path
              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="relative modal-container">
          <button className="btn opacity-100 hover:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </button>
          <button
            onClick={() => logout()}
            className={` modal  pointer-events-none opacity-0 absolute left-auto bottom-10 right-0 md:right-auto  md:left-9 md:bottom-0 px-4 py-2 rounded-md shadow-md  transition-all text-white delay-300 duration-300 ease-in-out -translate-x-1 bg-[#ff0000]`}
          >
            logout
          </button>
        </div>
      </nav>
      <div className="mb-16 ml-0 md:mt-0 md:ml-16 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
