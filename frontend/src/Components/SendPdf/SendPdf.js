import React, { use, useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import PdfView from "./PdfView";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function SendPdf() {
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allPdf, setAllPdf] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    const result = await axios.get("http://localhost:5000/getFile");
    console.log(result.data.data);
    setAllPdf(result.data.data);
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      if (result.data.status === 200) {
        alert("Pdf Uploaded Successfully..");
        getpdf();
      } else {
        alert("Upload Failed!!");
      }
    } catch (err) {
      console.err("Error Uploading" + err.message);
      alert("Error Uploading");
    }
  };

  const showPdf = (pdf) => {
    setPDFFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
    <div>
      <Nav />
      <h2>Send Pdf</h2>
      <form onSubmit={submitPdf}>
        <label>Pdf Title</label>
        <br></br>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <label>Select Pdf File</label>
        <br></br>
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => saveFile(e.target.files[0])}
        ></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
      <div>
        <h4>Pdf Details</h4>
        {allPdf === null
          ? ""
          : allPdf.map((data) => (
              <div key={data._id}>
                <h2>Title:{data.title}</h2>
                <button onClick={() => showPdf(data.pdf)}>Show Pdf</button>
              </div>
            ))}
      </div>
      <PdfView pdfFile={pdfFile} />
    </div>
  );
}

export default SendPdf;
