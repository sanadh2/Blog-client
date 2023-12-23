import React, { useEffect, useState } from "react";
import { dpDB } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

const UploadDP = () => {
  const [img, setImg] = useState();

  const uploadDp = async () => {
    const imageName = new Date().getTime() + img.name;
    const imageRef = ref(dpDB, `DPs/${imageName}`);
    await uploadBytesResumable(imageRef, img);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const uploadUrl = async () => {
    if (!img) return;
    try {
      const url = await uploadDp();
      const res = await axios.patch("http://localhost:2222/user/uploaddp", {
        imageDp: url,
        userID: "65853eb38cf11443262c659b",
      });
      toast.success(res.data.msg);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = () => {
    uploadUrl().then((res) => console.log(res));
  };

  return (
    <div>
      <Toaster />
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button className="px-4 py-1 bg-black text-white" onClick={handleClick}>
        {" "}
        Upload
      </button>
    </div>
  );
};

export default UploadDP;
