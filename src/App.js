import React from "react";
// import { useSelector, useDispatch } from "react-redux"
import { Users } from "./features/users/Users";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import Home from "./routes/Home"
import Connect from "./routes/Connect"

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="connect" element={<Connect />} />

        </Routes>


      </header>
    </div>
  );
}

export default App;
