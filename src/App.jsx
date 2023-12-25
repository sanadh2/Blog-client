import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import BlogDetails from "./Pages/BlogDetails";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import NewBlog from "./Pages/NewBlog";
import Navbar from "./Components/Navbar";
import { DarkMode } from "./Contexts/DarkMode";
const App = () => {
  const { theme } = useContext(DarkMode);
  return (
    <div
      style={{ color: theme.text, backgroundColor: theme.bg }}
      className=" min-h-screen"
    >
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Search" element={<Search />} />
            <Route path="new-blog" element={<NewBlog />} />
            <Route path="blog/:blogID" element={<BlogDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
