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
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, non tempora. A, laudantium nobis atque voluptatibus architecto fuga, minus numquam dolore in voluptatem corrupti. Aliquid, quas! Voluptatum vel harum veritatis!
       Corporis necessitatibus facilis atque. Facilis doloremque sed est vel aut aspernatur recusandae accusamus eum cum dolorem non quaerat pariatur quas, enim totam, molestias laboriosam ipsam id expedita provident voluptatibus distinctio.
       Delectus porro exercitationem minus nostrum quae. Voluptatum, ea vel asperiores molestiae laborum enim odit quas reprehenderit adipisci consectetur. Officia voluptatum atque quibusdam aut quas modi dicta inventore accusamus aspernatur eaque!
       Eum, ad modi aliquam quaerat ut distinctio tenetur nostrum iste voluptatum consequuntur consectetur minus totam iure voluptas aliquid doloremque. Corporis cum sunt dolore perspiciatis enim. Voluptatem, a illo. Facilis, incidunt.
       Nihil provident modi ipsam earum quae suscipit, beatae explicabo tenetur sed incidunt delectus, placeat exercitationem illo ab quidem sit? Optio porro impedit repellendus illo magni odio inventore corrupti praesentium ex!
       Quaerat totam nihil nulla aspernatur assumenda, consectetur adipisci error aperiam temporibus officia nobis debitis cupiditate! Magni, unde quia. Impedit laborum nihil deleniti optio illum! Officia obcaecati in corrupti eum error!
       Non in voluptatum natus itaque ad eius tempore aperiam cupiditate, delectus iste similique quam sint officia quod modi, vitae ab neque consequuntur necessitatibus asperiores, dolores ea laborum! Dolorem, ad. Inventore.
       Est ipsum qui modi eos sunt tempore, neque nostrum magni officia amet dolorem necessitatibus, totam placeat odit vitae ad dignissimos, iste natus vero libero sint omnis quaerat corrupti quasi? Rem.
       Ratione rerum exercitationem itaque nulla temporibus nesciunt aspernatur cupiditate minima nobis voluptatum. Pariatur nostrum autem, praesentium ratione molestiae id nisi dolores sapiente, eaque distinctio cumque harum numquam reiciendis minus tenetur?
       Harum, nulla laboriosam ratione voluptas dolores quia perspiciatis veniam at cupiditate temporibus recusandae sunt delectus quisquam ullam quo distinctio consequuntur? Quasi nemo, voluptas incidunt corrupti voluptate sapiente deleniti sed molestiae!
       Pariatur dignissimos porro amet, quos sequi quaerat ipsam deserunt ea aliquid eligendi veritatis praesentium vel laboriosam in explicabo rerum, culpa quam temporibus sunt omnis, iure ipsum nostrum! Commodi, laborum aliquid.
       Ab adipisci neque amet facere! Dolorem at deleniti amet voluptatibus saepe, maiores nulla exercitationem, esse quod consequatur rerum, fugiat perspiciatis placeat ea suscipit non quibusdam! Quas ut et ullam quo?
       Explicabo voluptatibus exercitationem, doloremque totam quia odio, sequi ab quibusdam, in maiores facilis ex adipisci iusto. Dolores obcaecati quia voluptate corporis dolorum, nemo perferendis commodi eaque dolorem in vero sapiente!
       Architecto in nemo dignissimos accusamus ipsum hic inventore consectetur enim dolorum voluptas autem necessitatibus, cumque nam modi vitae, saepe facere! Adipisci temporibus dolorum consequuntur ipsa labore officiis libero sed similique.
       Libero rerum exercitationem commodi accusantium aliquid aspernatur illo nulla porro inventore quisquam eaque totam assumenda maiores cupiditate quidem aperiam, dicta cum reprehenderit dolore consequuntur in voluptatum! Neque quidem nobis modi.
       Facere iure voluptate, doloremque consequuntur earum odio illo obcaecati accusantium quos officiis. Voluptatibus ratione velit ab fugit impedit maxime repellendus alias sed quasi. Corporis molestiae dolorum, eligendi earum vero quod?
       Molestias voluptates illum cumque. Velit delectus temporibus perspiciatis libero! Aliquam porro dolorum vitae nisi! Temporibus et laboriosam architecto similique voluptates vel facilis autem facere. Cum nobis obcaecati eum facere consequatur!
       Id exercitationem reprehenderit quas ullam laborum blanditiis illo rem numquam expedita unde alias sapiente magni, deleniti dolorem, iusto sunt error distinctio tempore perferendis eveniet laudantium. Quas cumque eveniet obcaecati sapiente.
       Excepturi asperiores maiores, voluptatem officia adipisci quidem. Accusantium eos, atque quia, sit excepturi officiis error facilis minus officia veritatis accusamus commodi ipsa quasi perspiciatis, ipsam nulla adipisci deserunt deleniti. In?
       Illo sapiente aut officia tempore facere mollitia doloribus dolores delectus quis praesentium natus architecto aliquam, debitis consectetur quo itaque suscipit illum tempora. Dignissimos iure voluptas tempore, eligendi necessitatibus expedita ut?`,
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
