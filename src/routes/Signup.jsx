import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    const newUser = {
      name: username,
      username: username + "$$",
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
          <label className="label">Name</label>
          <input
            onChange={handleName}
            className="input"
            value={username}
            type="text"
          />

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
          />

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
