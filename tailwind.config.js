/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        against: ["against", "Roboto", "Arial"],
        "velodroma-base": ["velodroma", "Roboto", "Arial"],
        "velodroma-wide": ["velodroma_wide", "velodroma", "Roboto", "Arial"],
        "velodroma-wider": [
          "velodroma_superwide",
          "velodroma_wide",
          "velodroma",
          "Roboto",
          "Arial",
        ],
        roboto: ["Roboto", "Arial"],
      },
      screens: {
        sm: "425px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
