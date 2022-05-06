import { useState } from "react";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const handleDisplayName = (e) => {
    setDisplayName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    const newUser = {
      username: displayName,
      email: email,
      movieData: ["No favorite movies yet!"],
      userData: ["User has no data."],
    };
    const postNewUser = async () => {
      const response = await fetch("http://localhost:3100/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const postBody = await response.json();
      return postBody
    };

    postNewUser();
  };

  return (
    <div>
      <div className="form">
        <div>
          <h2>Signup Form</h2>
        </div>

        <div>
          <label className="label">Display Name</label>
          <input
            onChange={handleDisplayName}
            className="input"
            value={displayName}
            type="text"
          />

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
          />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
