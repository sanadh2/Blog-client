import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserData } from "../Contexts/UserData";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../Contexts/DarkMode";

const Notifications = () => {
  const { userData } = useContext(UserData);
  const { isLightMode } = useContext(DarkMode);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userData) setNotifications(userData.notifications.reverse());
  }, [userData]);

  return (
    <div className="w-full ml-10 overflow-hidden">
      <h1 className="text-2xl mb-10 text-left  mt-4">Notifications</h1>

      {notifications && (
        <ul className=" list-item list-disc h-full ">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`${isLightMode ? "text-black/60" : "text-white/60"}`}
            >
              {notification.title == "report" ? (
                <div>
                  <button
                    className={`${isLightMode ? "text-black" : "text-white"}`}
                    onClick={() =>
                      navigate(`/home/users/${notification.sender._id}`)
                    }
                  >
                    {notification.sender.username}
                  </button>
                  &nbsp;
                  <span className="">{notification.message}</span>
                  &nbsp;
                  <button
                    className={`${isLightMode ? "text-black" : "text-white"}`}
                    onClick={() =>
                      navigate(`/home/users/${notification.recipient._id}`)
                    }
                  >
                    {notification.recipient.username}
                  </button>
                </div>
              ) : (
                <div className="">
                  <button
                    className={`${isLightMode ? "text-black" : "text-white"}`}
                  >
                    {notification.sender.username}
                  </button>{" "}
                  &nbsp;
                  <span className="">{notification.message}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
