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
        buttonBg: "white",
      }
    : {
        bg: "#11151cff",
        text: "white",
        buttonBg: "#364156ff",
      };

  const toggleTheme = () => {
    setIsLightTheme(!isLightMode);
  };

  return (
    <DarkMode.Provider value={{ theme, toggleTheme, isLightMode }}>
      {children}
    </DarkMode.Provider>
  );
};
export default DarkModeProvider;

// /* CSS HEX */
// --rich-black: #11151cff;
// --prussian-blue: #212d40ff;
// --charcoal: ;
