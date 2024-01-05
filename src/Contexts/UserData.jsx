import axios from "axios";
import { createContext, useState } from "react";

export const UserData = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://api.example.com/user");

      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <UserData.Provider
      value={{ userData, setUserData, refreshUser, setRefreshUser }}
    >
      {children}
    </UserData.Provider>
  );
};
export default UserDataProvider;
