import { createContext, useEffect, useState } from "react";

export const DarkMode = createContext();

const DarkModeProvider = ({ children }) => {
  const localtheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme") === "true"
    : true;
  const [isLightMode, setIsLightTheme] = useState(localtheme);

  useEffect(() => {
    localStorage.setItem("theme", isLightMode);
  }, [isLightMode]);

  const theme = isLightMode
    ? {
        bg: "#F2F3AE",
        text: "black",
      }
    : { bg: "black", text: "white" };

  const toggleTheme = () => {
    setIsLightTheme(!isLightMode);
  };

  return (
    <DarkMode.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkMode.Provider>
  );
};
export default DarkModeProvider;
