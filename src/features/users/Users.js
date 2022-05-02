import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "./usersSlice";

export function Users() {
  const allUsers = useSelector(selectAllUsers);
  // const dispatch = useDispatch();
  // const [currentName, setCurrentName] = useState("Mitch");

  return (
    <div>
      <h2>Users List</h2>
      {console.log(allUsers)}

      {allUsers.map((user) => {
        return (
          <p>
            <p>{user.name}</p>
            <p>{user.id}</p>
          </p>
        );
      })}
    </div>
  );
}
