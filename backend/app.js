const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes.js");
const cors = require("cors");
const app = express();
//Middleware

app.use(express.json());
app.use(cors());
app.use("/users", router);

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
