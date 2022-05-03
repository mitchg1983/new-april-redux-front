import React, { useState, useEffect } from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import Home from "./routes/Home";
import Connect from "./routes/Connect";
import Users from "./routes/Users";
import Signup from "./routes/Signup";

const getAllUsers = async (req, res) => {
  console.log("starting getAllUsers...");
  const response = await fetch("http://localhost:3100/users/get-all-users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let { payload } = await response.json();
  console.log("getAllUsers response: data/payload is...", payload);
  return payload;
};

function App() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    console.log("Beginning useEffect on App.js...");

    async function setNewList() {
      console.log("userList is currently...", usersList);
      const newList = await getAllUsers();
      console.log("newList is...", newList)
      setUsersList(newList);
      console.log("userList is NOW...", usersList);
    };
    setNewList();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="connect" element={<Connect />} />
          <Route path="users" element={<Users />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
