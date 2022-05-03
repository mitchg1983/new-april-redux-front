import React from 'react'
import { useStore } from 'react-redux'
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersList } from '../features/users/usersSlice'

fetchUsersList();

export default function Connect() {
    const store = useStore();
    const dispatch = useDispatch();

  return (
    <div>
      More Connect
      <div>
          {/* {store.getState()} */}
      </div>
      <Outlet />
    </div>
  );
}
