import { Link } from "react-router-dom";

export function Navbar(props) {
  // console.log(props.theList)
  return (
    <nav className="navbar">
      <Link to="/"> Home </Link>
      <Link to="/connect" state={props.catalogue}> Connect </Link>
      <Link to="/users" state={props.theList}> Users </Link>
      <Link to="/signup"> Sign Up </Link>
    </nav>
  );
}