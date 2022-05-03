import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";
import { Outlet, Link } from "react-router-dom";

export default function Users() {
  const allUsers = useSelector(selectAllUsers);

  return (
    <div>
      Users
      <h2>Users List</h2>
      {allUsers.map((user, idx) => {
        return (
          <div key={`user-${idx}`}>
            <p>{user.name}</p>
            <p>{user.id}</p>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}
