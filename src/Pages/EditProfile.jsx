import React, { useContext, useState } from "react";
import { UserData } from "../Contexts/UserData";

const EditProfile = () => {
  const { userData } = useContext(UserData);
  const [details, setDetails] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    username: userData?.username || "",
  });
  //   console.log(userData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-[100svh] w-full">
      <h1 className=" text-center text-2xl md:text-4xl font-velodroma-wide py-5">
        Edit Profile
      </h1>
      <form action="">
        <div className="text-black h-full items-center flex flex-col gap-2">
          <input
            value={details.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="name"
            className="w-3/4"
          />
          <input
            value={details.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="email"
            className="w-3/4"
          />
          <input
            onChange={handleChange}
            name="username"
            value={details.username}
            type="text"
            placeholder="username"
            className="w-3/4"
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditProfile;
