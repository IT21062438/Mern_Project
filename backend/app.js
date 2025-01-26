const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes.js");
const cors = require("cors");
const app = express();
//Middleware

app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/files", express.static("files"));

mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.mytyx.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })

  .catch((err) => console.log(err));

//Call Register Model
require("./Model/Register.js");
const User = mongoose.model("Register");
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await User.create({
      name,
      gmail,
      password,
    });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "err" });
  }
});

//Login
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail });
    if (!user) {
      return req.json({ err: "User not found" });
    }
    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ err: "Incorrect Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "server error" });
  }
});

//pdf
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./files");
  },
  filename: function (req, file, cd) {
    const uniqueSuffix = Date.now();
    cd(null, uniqueSuffix + file.originalname);
  },
});

//Insert Model
require("./Model/PdfModel.js");
const pdfSchema = mongoose.model("PdfDetails");
const uplode = multer({ storage });

app.post("/uploadfile", uplode.single("file"), async (req, res) => {
  console.log(res.file);
  const title = req.body.title;
  const pdf = req.file.filename;
  try {
    await pdfSchema.create({ title: title, pdf: pdf });
    console.log("Pdf Uploaded Successfully");
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

app.get("/getfile", async (req, res) => {
  try {
    const data = await pdfSchema.find({});
    res.send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

//Image
require("./Model/ImgModel.js");
const ImgSchema = mongoose.model("ImgModel");
const multerimg = require("multer");

const storageimg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

//upload
const uploadimg = multerimg({ storage: storage });

app.post("/uploadImg", uploadimg.single("image"), async (req, res) => {
  console.log("File uploaded:", req.file);
  const imageName = req.file.filename;
  try {
    await ImgSchema.create({ image: imageName });
    res.json({ status: "ok", message: "Image uploaded successfully" });
  } catch (err) {
    console.error("Error saving image to database:", err);
    res.json({ status: "Error", error: err });
  }
});

//Display Image

app.get("/getImage", async (req, res) => {
  try {
    ImgSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.json({ status: "error", error: err });
  }
});
