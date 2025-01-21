import React, { useEffect, useState, useRef } from "react";
import Nav from "../Nav/Nav.js";
import axios from "axios";
import User from "../User/User.js";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/users";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuary] = useState("");
  const [noResults, setNoResults] = useState(false);

  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      return response.data.users;
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
      return [];
    }
  };

  useEffect(() => {
    fetchHandler().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("User Report Successfully Downloaded!"),
  });

  return (
    <div>
      <Nav />
      <h2>User Details Display Page</h2>
      <input
        onChange={(e) => setSearchQuary(e.target.value)}
        type="text"
        name="search"
        placeholder="Search User Details"
      />
      <button onClick={handleSearch}>Search</button>
      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {users &&
            users.map((user, i) => (
              <div key={i}>
                <User user={user} />
              </div>
            ))}
        </div>
      )}
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default UserDetails;
