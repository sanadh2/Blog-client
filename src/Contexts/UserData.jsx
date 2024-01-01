import { createContext, useState } from "react";

export const UserData = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserData.Provider value={{ userData, setUserData }}>
      {children}
    </UserData.Provider>
  );
};
export default UserDataProvider;
