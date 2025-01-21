import React from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";

function User(props) {
  const { _id, name, gmail, age, address } = props.user;
  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/users/${_id}`);
      if (response.status === 200) {
        alert("User deleted successfully!");
        window.location.reload();
        history("/userdetails");
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ margin: "10px", padding: "10px" }}>
      <h3>ID: {_id}</h3>
      <h3>Name: {name}</h3>
      <h3>Email: {gmail}</h3>
      <h3>Age: {age}</h3>
      <h3>Address: {address}</h3>
      <br></br>
      {/* <Link to={`/userdetails/${_id}`} className="btn-update">
        Update
      </Link> */}
      <button
        onClick={() => history(`/userdetails/${_id}`)}
        className="btn-update"
      >
        Update
      </button>
      <button onClick={deleteHandler} className="btn-delete">
        Delete
      </button>
    </div>
  );
}

export default User;
