import React, { useState, useEffect } from "react";
import { Outlet, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { UserBug } from "./components/UserBug";
import "./App.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const getAllUsers = async (req, res) => {
  // console.log("starting getAllUsers...");
  const response = await fetch("http://localhost:3100/users/get-all-users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let { payload } = await response.json();
  // console.log("getAllUsers response: data/payload is...", payload);
  return payload;
};

const getAllMovies = async (req, res) => {
  // console.log("starting getAllUsers...");
  const response = await fetch("http://localhost:3100/movies/get-all-movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let { payload } = await response.json();
  // console.log("getAllUsers response: data/payload is...", payload);
  return payload;
};

function App() {
  const [currentUser, setCurrentUser] = useState("LOGIN");
  const [inputUserName, setInputUserName] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [noValidUser, setNoValidUser] = useState([""]);
  const [catalogue, setCatalogue] = useState([""]);

  async function getThisList() {
    let newList = await getAllUsers();
    // console.log("We have this...", newList);
    setUsersList(newList);
  }

  async function getCatalogue() {
    let newCatalogue = await getAllMovies();
    // console.log("We have this...", newCatalogue);
    setCatalogue(newCatalogue);
  }

  const handleInputUserName = (e) => {
    setInputUserName(e.target.value);
  };

  useEffect(() => {
    // console.log("Starting useEffect on App.js");
    getThisList();
    getCatalogue();
  }, [currentUser]);

  return (
    <div className="App">
      <div className="top-bar">
        <Navbar theList={usersList} catalogue={catalogue} />
        <div className="userbug-box">
          {" "}
          <UserBug name={currentUser} />
          <Popup
            trigger={<button className="button"> Change User </button>}
            modal
          >
            <span>
              <h2> Change User </h2>
              <label className="label">Enter username</label>
              <input
                onChange={handleInputUserName}
                className="input"
                value={inputUserName}
                type="text"
              />
              <button
                onClick={(e) => {
                  setNoValidUser("");
                  const result = usersList.filter(
                    (user) => user.name === inputUserName
                  );

                  if (result.length > 0) {
                    setCurrentUser(inputUserName);
                    setNoValidUser("Logged In!");
                    return;
                  }
                  setNoValidUser("Please enter a valid username.");
                  return;
                }}
                className="btn"
                type="submit"
              >
                Submit
              </button>
              {noValidUser}
            </span>
          </Popup>
        </div>
      </div>

      <header className="App-header">
        <Outlet />
      </header>
    </div>
  );
}

export default App;
