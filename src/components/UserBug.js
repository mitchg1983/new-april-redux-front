import React from "react";

export function UserBug(props) {
//   console.log(props.name);
  return (
    <div className="user-bug-container">
      <p> {props.name} </p>
      {/* {props.name === "LOGIN" ? <div>hey there login!</div> : <div></div>} */}
    </div>
  );
}
