import React, { useState } from "react";
import Nav from "../Nav/Nav.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css"
export default function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try{
      await sendRequest();
      alert("User added successfully!");
      history("/userdetails");
    }catch(err){
      alert("Failed to add user. Please try again.");
    }
    
  };
  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };
  return (
    <div>
      <Nav />
      <h2>Add User Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="gmail">Gmail:</label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            onChange={handleChange}
            value={inputs.gmail}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={handleChange}
            value={inputs.age}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={inputs.address}
          />
        </div>
        <br></br>
        <button type="submit" className="btn-add">Add User</button>
      </form>
    </div>
  );
}
