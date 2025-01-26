import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Home/Home.js";
import UserDetails from "./Components/UserDetails/UserDetails.js";
import AddUser from "./Components/AddUser/AddUser.js";
import UpdateUser from "./Components/UpdateUser/UpdateUser.js";
import Register from "./Components/Register/Register.js";
import Login from "./Components/Login/Login.js";
import ContactUs from "./Components/ContactUs/ContactUs.js";
import SendPdf from "./Components/SendPdf/SendPdf.js";
import ImgUploder from "./Components/ImgUploder/ImgUploder.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/log" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/sendpdf" element={<SendPdf />} />
        <Route path="/img" element={<ImgUploder />} />
        <Route path="/userdetails/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
