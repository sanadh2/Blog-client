import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DarkModeProvider from "./Contexts/DarkMode.jsx";
import UserDataProvider from "./Contexts/UserData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
