import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/connect"> Connect </Link>
      <Link to="/users"> Users </Link>
      <Link to="/signup"> Sign Up </Link>
    </nav>
  );
}