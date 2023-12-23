import React, { useContext, useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState();

  return (
    <div className="flex gap-2 h-full justify-center items-center w-full py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-against font-black ">
        Welcome to Blog and Blogger
      </h1>
    </div>
  );
};

export default Home;
