import { createContext, useState } from "react";

export const UserData = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false);
  return (
    <UserData.Provider
      value={{ userData, setUserData, refreshUser, setRefreshUser }}
    >
      {children}
    </UserData.Provider>
  );
};
export default UserDataProvider;
