import "../index.css";

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div id="navbar">
        <Link className="links" to="/">
          Homepage
        </Link>
        <Link className="links" to="/map">
          Map
        </Link>
        <Link className="links" to="/register">
          Signup
        </Link>
        <Link className="links" to="/login">
          Login
        </Link>
      </div>
    </>
  );
}

export default Navigation;
