import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Users() {
  console.log("Beginning Users route...");

  const location = useLocation();
  const data = location.state;

  console.log("Users...", data);

  return (
    <div>
      <h2> Users Page </h2>
      <div>
        {data.map((user, idx) => {
          return (
            <div key={`user-mapped-${idx}`} >
              <li>{user.name}</li>
              <li>{user.username}</li>
              <li>{user.movieData}</li>
              <li>{user.userData}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}
