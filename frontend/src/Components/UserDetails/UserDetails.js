import React, { useEffect, useState, useRef } from "react";
import Nav from "../Nav/Nav.js";
import axios from "axios";
import User from "../User/User.js";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/users";

function UserDetails() {
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data.users);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      }
    };
    fetchHandler();
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("User Report Successfully Download !"),
  });

  return (
    <div>
      <Nav />
      <h2>User Details Display Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={ComponentsRef}>
        {users &&
          users.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))}
      </div>
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default UserDetails;
