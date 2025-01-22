import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Home/Home.js";
import UserDetails from "./Components/UserDetails/UserDetails.js";
import AddUser from "./Components/AddUser/AddUser.js";
import UpdateUser from "./Components/UpdateUser/UpdateUser.js";
import Register from "./Components/Register/Register.js";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdetails/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
