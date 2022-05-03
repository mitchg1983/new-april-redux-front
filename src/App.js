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

// async function setNewList() {
//   console.log("Beginning setNewList");
//   const newList = await getAllUsers();
//   // setUsersList(...newList);
//   console.log(newList);
//   return newList;
// }

function App() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    console.log("Beginning useEffect on App.js...");

    async function getThis() {
      let newList = await getAllUsers();
      console.log("We have this...", newList);
      setUsersList(newList);
    };

    getThis();

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
