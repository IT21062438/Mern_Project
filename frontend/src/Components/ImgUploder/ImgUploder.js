import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";

function ImgUploder() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  const submitImg = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      const result = await axios.post(
        "http://localhost:5000/uploadImg",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Upload success", result.data);
      alert("Upload successfully..");
      getImage();
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const onImagChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getImage");
      console.log("Images fetched", result.data.data);
      setAllImage(result.data.data);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      <Nav />
      <h2>Image Uploder</h2>
      <form onSubmit={submitImg}>
        <input type="file" accept="image/*" onChange={onImagChange}></input>
        <br></br>
        <br></br>
        <button type="submit">Upload</button>
      </form>
      <br></br>
      <br></br>
      {allImage === null
        ? ""
        : allImage.map((data) => (
            <img
              key={data._id}
              src={`http://localhost:5000/files/${data.image}`}
              height={100}
              width={100}
              alt="Photos"
            ></img>
          ))}
    </div>
  );
}

export default ImgUploder;
