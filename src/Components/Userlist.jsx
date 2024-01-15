import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const Userlist = ({ openSearch, closeSearch, lightMode, search }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const searchUsers = async () => {
    try {
      const result = await axios.get(
        `http://localhost:2222/user/search-users/${search}`
      );
      return result.data.users;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (search.length > 3) searchUsers().then((res) => setUsers(res));
  }, [search]);

  return (
    <div className=" flex gap-5 flex-col w-1/2 ">
      <ul className=" flex flex-col gap-2 items-start w-full">
        {users.length == 0 ? (
          <li>no users</li>
        ) : (
          users.map((user) => (
            <li
              className={`py-1.5  w-full flex items-center px-5 gap-2 rounded cursor-pointer ${
                lightMode
                  ? "bg-[#d3d0ca] hover:bg-[#fcff59]"
                  : "bg-[#11151cff] hover:bg-[#202834]"
              }`}
              key={user._id}
              onClick={() => navigate(`/home/users/${user._id}`)}
            >
              <img
                src={user.profilePic}
                alt=""
                className="h-10 object-cover w-10 rounded-full"
              />
              <p>{user.name}</p>
            </li>
          ))
        )}
      </ul>
      <button
        className="bg-[#ff0000] hover:bg-[#ff0000bb] px-4 py-1 rounded"
        onClick={closeSearch}
      >
        close
      </button>
    </div>
  );
};

export default Userlist;
