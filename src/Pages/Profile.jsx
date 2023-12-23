import React, { useContext, useRef, useState } from "react";
import Blog from "../Components/Blog";
import { useNavigate } from "react-router-dom";
import { UserData } from "../Contexts/UserData";
import Modal from "../Components/Modal";
import Loader from "../Components/Loader/Loader";
import UploadDP from "../Components/UploadDP";

const Profile = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserData);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const blogs = [
    {
      _id: 1,
      title: "How to Start a Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorID: "60f75e6b8be25c001f93879a",
      category: "How-to Guides",
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      createdAt: "2023-01-01T12:00:00Z",
      updatedAt: "2023-01-01T12:00:00Z",
    },
    {
      _id: 2,
      title: "Top 10 Blogging Tips",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      authorID: "60f75e6b8be25c001f93879b",
      category: "Listicles",
      images: [
        "https://example.com/image3.jpg",
        "https://example.com/image4.jpg",
      ],
      createdAt: "2023-01-02T10:30:00Z",
      updatedAt: "2023-01-02T10:30:00Z",
    },
    {
      _id: 3,
      title: "Interview with a Blogger",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      authorID: "60f75e6b8be25c001f93879c",
      category: "Interviews",
      images: [
        "https://example.com/image5.jpg",
        "https://example.com/image6.jpg",
      ],
      createdAt: "2023-01-03T15:45:00Z",
      updatedAt: "2023-01-03T15:45:00Z",
    },
    {
      _id: 4,
      title: "Book Review: The Art of Writing",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      authorID: "60f75e6b8be25c001f93879d",
      category: "Reviews",
      images: [
        "https://example.com/image7.jpg",
        "https://example.com/image8.jpg",
      ],
      createdAt: "2023-01-04T08:15:00Z",
      updatedAt: "2023-01-04T08:15:00Z",
    },
    {
      _id: 5,
      title: "Case Study: Successful Blog Launch",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.",
      authorID: "60f75e6b8be25c001f93879e",
      category: "Case Studies",
      images: [
        "https://example.com/image9.jpg",
        "https://example.com/image10.jpg",
      ],
      createdAt: "2023-01-05T12:30:00Z",
      updatedAt: "2023-01-05T12:30:00Z",
    },
    {
      _id: 6,
      title: "Personal Story: My Blogging Journey",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      authorID: "60f75e6b8be25c001f93879f",
      category: "Personal Stories",
      images: [
        "https://example.com/image11.jpg",
        "https://example.com/image12.jpg",
      ],
      createdAt: "2023-01-06T14:00:00Z",
      updatedAt: "2023-01-06T14:00:00Z",
    },
    {
      _id: 7,
      title: "Guest Post: Tips for Effective Writing",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      authorID: "60f75e6b8be25c001f9387a0",
      category: "Guest Posts",
      images: [
        "https://example.com/image13.jpg",
        "https://example.com/image14.jpg",
      ],
      createdAt: "2023-01-07T09:45:00Z",
      updatedAt: "2023-01-07T09:45:00Z",
    },
    {
      _id: 8,
      title: "Roundup: Best Blogs of the Month",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      authorID: "60f75e6b8be25c001f9387a1",
      category: "Roundup Posts",
      images: [
        "https://example.com/image15.jpg",
        "https://example.com/image16.jpg",
      ],
      createdAt: "2023-01-08T11:20:00Z",
      updatedAt: "2023-01-08T11:20:00Z",
    },
    {
      _id: 9,
      title: "Behind-the-Scenes: Blogging Life",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.",
      authorID: "60f75e6b8be25c001f9387a2",
      category: "Behind-the-Scenes",
      images: [
        "https://example.com/image17.jpg",
        "https://example.com/image18.jpg",
      ],
      createdAt: "2023-01-09T13:10:00Z",
      updatedAt: "2023-01-09T13:10:00Z",
    },
    {
      _id: 10,
      title: "FAQs: Common Blogging Questions",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      authorID: "60f75e6b8be25c001f9387a3",
      category: "FAQs (Frequently Asked Questions)",
      images: [
        "https://example.com/image19.jpg",
        "https://example.com/image20.jpg",
      ],
      createdAt: "2023-01-10T16:00:00Z",
      updatedAt: "2023-01-10T16:00:00Z",
    },
  ];

  if (!userData) return <Loader />;

  return (
    <div className="flex flex-col h-full mt-20">
      <div className="h-[35vh] px-5 lg:px-20 flex gap-10">
        <div className="w-40 h-40 flex justify-center  cursor-pointer border-2 rounded-full border-black">
          <img
            src={userData.profilePic}
            alt=""
            className=" rounded-full object-center object-cover"
            onClick={toggleModal}
          />
        </div>
        {modal && (
          <Modal title={"Update Profile Picture"} toggleModal={toggleModal}>
            <UploadDP />
          </Modal>
        )}
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <p className="text-2xl">{userData.name}</p>
            <button className="opacity-80 border rounded px-3 py-0.5 text-sm">
              Edit Profile
            </button>
          </div>
          <div className="">
            <p className="text-[#44ff5a] opacity-100">
              {userData.role == "admin" && userData.role}
            </p>
            <p className=" opacity-60">{userData.username}</p>
            <p className=" opacity-60">email: {userData.email}</p>
          </div>
          <div className=" flex gap-2">
            <p>blogs:{userData.blogs.length}</p>
            <button>followers:{userData.followers.length}</button>
            <button>following:{userData.following.length}</button>
          </div>
        </div>
      </div>
      <div className="py-10 px-5 flex gap-5 flex-col justify-center items-center">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            onClick={() => navigate(`/home/blog/${blog._id}`)}
          >
            <Blog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
