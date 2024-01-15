import React, { useContext, useEffect, useState } from "react";
import { DarkMode } from "../Contexts/DarkMode";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DB } from "../firebase";
import { UserData } from "../Contexts/UserData";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const NewBlog = () => {
  const [URLS, setURLS] = useState([]);
  const { isLightMode, theme } = useContext(DarkMode);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(UserData);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    images: [],
    category: "How-to Guides",
  });
  const uploadImage = async (image) => {
    try {
      const storageRef = ref(DB, `blog/${image.name}+${new Date().getTime()}`);
      const response = await uploadBytesResumable(storageRef, image);
      const url = await getDownloadURL(response.ref);
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
    try {
      const imagePromises = Array.from(images, (image) => uploadImage(image));

      const imageRes = await Promise.all(imagePromises);
      setURLS(imageRes);
      setImagesUploaded(true);
      return imageRes;
    } catch (error) {
      console.error("Error uploading images:", error);
      setImagesUploaded(false);
      throw error;
    }
  };

  const createBlog = async () => {
    try {
      const result = await axios.post("http://localhost:2222/blog/new-blog", {
        title: blogForm.title,
        content: blogForm.content,
        images: URLS,
        userID: userData._id,
        category: blogForm.category,
      });
      if (imagesUploaded) toast.success("Blog Uploaded");
      navigate("/home");
      return result.data;
    } catch (err) {
      console.log(err);
      if (err.response?.data?.success == false)
        toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    const submitBlog = async () => {
      if (imagesUploaded) {
        try {
          await createBlog();
        } catch (err) {
          console.log(err);
          toast.error("Error creating blog");
        }
      }
    };
    submitBlog().then(() =>
      setBlogForm({
        images: [],
        title: "",
        category: "How-to Guides",
        content: "",
      })
    );
  }, [imagesUploaded]);

  const submit = async (e) => {
    e.preventDefault();
    if (!userData) {
      toast.error("error");
      return;
    }
    const { title, content, category } = blogForm;

    if (title.trim() == "" || content.trim() == "" || category.trim() == "") {
      toast.error("not just whitespaces");
      return;
    }
    try {
      await handleUploadImages(blogForm.images);
    } catch (err) {
      toast.error("Error uploading images:", err);
    }
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
        className="flex flex-col gap-8 justify-center items-center w-full "
      >
        {/* title */}
        <div className=" rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col items-stretch gap-2 md:gap-0 ">
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
        <div className=" rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col items-stretch gap-2 md:gap-0 ">
          <label
            htmlFor="content"
            style={{ backgroundColor: theme.bg }}
            className=" whitespace-nowrap px-2  w-2/3 min-w-[8rem] text-sm sm:text-base"
          >
            Blog Content
          </label>
          <Toaster position="top right" />
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
        <div className=" rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col items-stretch gap-2 md:gap-0 ">
          <label
            htmlFor="category"
            style={{ backgroundColor: theme.bg }}
            className=" whitespace-nowrap px-2  w-2/3 min-w-[8rem] text-sm sm:text-base"
          >
            Blog Category
          </label>
          <select
            required
            name="category"
            id="category"
            onChange={onChange}
            value={blogForm.category}
            className={` h-10  rounded placeholder:font-serif tracking-tighter placeholder:text-current/70 placeholder:font-light focus:placeholder:font-medium focus:placeholder:text-[#356e32] bg-transparent py-2 pl-3 w-full  outline-none border-2 ${
              isLightMode ? "border-black" : "border-white"
            } focus:border-[#356e32]`}
            style={{ backgroundColor: theme.bg }}
          >
            <option value="How-to Guides">How-to Guides</option>
            <option value="Listicles">Listicles</option>
            <option value="Interviews">Interviews</option>
            <option value="Reviews">Reviews</option>
            <option value="Case Studies">Case Studies</option>
            <option value="Personal Stories">Personal Stories</option>
            <option value="Guest Posts">Guest Posts</option>
            <option value="Roundup Posts">Roundup Posts</option>
            <option value="Behind-the-Scenes">Behind-the-Scenes</option>
            <option value="Technology">Technology</option>
            <option value="FAQs (Frequently Asked Questions)">
              FAQs (Frequently Asked Questions)
            </option>
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Science">Science</option>
            <option value="Nature">Nature</option>
            <option value="Food and Travel">Food and Travel</option>
            <option value="History">History</option>
            <option value="Travel">Travel</option>
            <option value="Photography">Photography</option>
            <option value="Exploration">Exploration</option>
            <option value="Wildlife">Wildlife</option>
          </select>
        </div>
        {/* images */}
        <div className="rounded-xl  w-4/5 min-w-40 flex md:flex-row flex-col items-stretch gap-2 md:gap-0 ">
          <p className="whitespace-nowrap px-2  w-2/3 min-w-[8rem] text-sm sm:text-base">
            Blog Images
          </p>
          <label
            tabIndex={0}
            htmlFor="images"
            className={` h-10 flex gap-1 cursor-pointer hover:opacity-65    rounded placeholder:font-serif tracking-tighter placeholder:text-current/70 placeholder:font-light focus:placeholder:font-medium focus:placeholder:text-[#356e32] bg-transparent py-2 pl-3 w-full outline-none  border-2 ${
              isLightMode ? "border-black" : "border-white"
            } focus:border-[#356e32]`}
            style={{ backgroundColor: theme.bg }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            onChange={onChange}
            accept="image/*"
            id="images"
            multiple
            required
            className="hidden"
          />
        </div>

        <div className="flex flex-wrap gap-10">
          {blogForm.images.length > 0 &&
            blogForm.images.map((el, index) => (
              <div key={index}>
                <img className="h-10" src={URL.createObjectURL(el)} alt="" />
              </div>
            ))}
        </div>
        <button
          type="submit"
          className=" px-6 py-1.5 rounded"
          style={{ backgroundColor: theme.text, color: theme.bg }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
