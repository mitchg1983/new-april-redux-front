import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/connect"> Connect </Link>
    </nav>
  );
}