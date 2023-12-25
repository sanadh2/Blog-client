import React, { useContext, useEffect, useState } from "react";
import { DarkMode } from "../Contexts/DarkMode";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DB } from "../firebase";
import { UserData } from "../Contexts/UserData";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const { isLightMOde, theme } = useContext(DarkMode);
  const navigate = useNavigate();
  const { userData } = useContext(UserData);
  useEffect(() => {
    if (!userData) navigate("/");
  }, []);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    images: [],
  });
  const [URLS, setURLS] = useState([]);

  const uploadImage = async (image) => {
    try {
      const storageRef = ref(DB, `blog/${image.name}+${new Date().getTime()}`);
      const response = await uploadBytesResumable(storageRef, image);
      const url = await getDownloadURL(response.ref);
      setURLS((prev) => [...prev, url]);
      console.log(url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;

    setBlogForm((prev) => ({
      ...prev,
      [name]: name === "images" ? (files ? Array.from(files) : []) : value,
    }));
  };
  const handleUploadImages = async (images) => {
    const imagePromises = Array.from(images, (image) => uploadImage(image));

    const imageRes = await Promise.all(imagePromises);
    return imageRes;
  };

  

  const submit = async (e) => {
    e.preventDefault();
    if (!userData) {
      toast.error("error");
      return;
    }
    await handleUploadImages(blogForm.images);
  };

  return (
    <div className=" min-h-screen overflow-hidden flex flex-col items-center py-5  w-full">
      <h1 className=" text-center font-velodroma-wide tracking-widest text-xl sm:text-2xl md:text-3xl lg:text-4xl  mb-10 whitespace-nowrap">
        New-BLOG
      </h1>
      <Toaster position="top right" />
      <form
        action=""
        method="post"
        onSubmit={submit}
        className="flex flex-col gap-2 justify-center items-center w-full "
      >
        {/* title */}
        <div className=" rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col items-stretch ">
          <label
            htmlFor="title"
            style={{ backgroundColor: theme.bg }}
            className=" whitespace-nowrap px-2  w-2/3 min-w-[8rem] text-sm sm:text-base"
          >
            Blog Title
          </label>
          <input
            type="text"
            style={{ border: "2px solid" }}
            required
            value={blogForm.title}
            name="title"
            onChange={onChange}
            id="title"
            placeholder="Enter title "
            className={` h-10  rounded placeholder:font-serif tracking-tighter placeholder:text-current/70 placeholder:font-light focus:placeholder:font-medium focus:placeholder:text-[#356e32] bg-transparent py-2 pl-3 w-full outline-none `}
          />
        </div>
        {/* content */}
        <div className=" rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col items-stretch ">
          <label
            htmlFor="content"
            style={{ backgroundColor: theme.bg }}
            className=" whitespace-nowrap px-2  w-2/3 min-w-[8rem] text-sm sm:text-base"
          >
            Blog Content
          </label>
          <textarea
            type="text"
            name="content"
            style={{ border: "2px solid" }}
            required
            value={blogForm.content}
            onChange={onChange}
            id="content"
            placeholder="Enter content"
            className={` resize-none rounded placeholder:font-serif tracking-tighter placeholder:text-current/70 placeholder:font-light focus:placeholder:font-medium focus:placeholder:text-[#356e32] bg-transparent py-2 pl-3 w-full outline-none `}
          />
        </div>
        {/* images */}
        <div className=" rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col justify-center items-center ">
          <label
            htmlFor="images"
            style={{ backgroundColor: theme.text, color: theme.bg }}
            className=" whitespace-nowrap px-6 py-1.5 cursor-pointer rounded-full "
          >
            Blog Images
          </label>
          <input
            type="file"
            name="images"
            onChange={onChange}
            accept="image/*"
            id="images"
            multiple
            className=" hidden"
          />
        </div>
        <div className="flex flex-wrap gap-10">
          {blogForm.images.length > 0 &&
            blogForm.images.map((el, index) => (
              <img
                className=" h-10 "
                key={index}
                src={URL.createObjectURL(el)}
                alt=""
              />
            ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
