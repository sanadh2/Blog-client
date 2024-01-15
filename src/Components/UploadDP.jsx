import React, { useEffect, useState, useContext } from "react";
import { DB } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { UserData } from "../Contexts/UserData";
axios.defaults.withCredentials = true;

const UploadDP = ({ open, closeModal, lightMode, setRefreshUser }) => {
  const [img, setImg] = useState();
  const { userData: user } = useContext(UserData);
  const uploadDp = async () => {
    const imageName = new Date().getTime() + img.name;
    const imageRef = ref(DB, `DPs/${imageName}`);
    await uploadBytesResumable(imageRef, img);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const uploadUrl = async () => {
    if (!img) return;
    try {
      const url = await uploadDp();
      const res = await axios.patch(
        "https://blog-turm.onrender.com/user/uploaddp",
        {
          imageDp: url,
          userID: user._id,
        }
      );
      setRefreshUser((prev) => !prev);
      toast.success(res.data.msg);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = () => {
    uploadUrl().then((res) => closeModal());
  };

  if (!open) return null;

  return (
    <div className="p-10 lg:p-20 fixed backdrop-blur left-0 right-0 top-0 bottom-0 flex justify-center items-center">
      <Toaster />
      <div
        className={`p-5 relative min-h-80 w-full max-w-[30rem] flex flex-wrap justify-center items-center  ${
          lightMode ? " bg-[#d3d0ca]" : " bg-[#1d2430] text-white"
        }`}
      >
        <button
          type="button"
          className="absolute top-3 right-5 text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button
          type="button"
          className="px-4 py-1 bg-black text-white"
          onClick={handleClick}
        >
          {" "}
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadDP;
