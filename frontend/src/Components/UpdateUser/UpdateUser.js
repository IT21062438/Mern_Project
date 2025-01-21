import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav.js"
import "./UpdateUser.css";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      await sendRequest();
      alert("Updated successfully!");
      history("/userdetails");
    } catch (err) {
      alert("Failed to update. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <h2>Update User</h2>
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
        <button type="submit" className="btn-save">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
