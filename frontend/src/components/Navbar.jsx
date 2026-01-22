import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">StreetVendor</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/vendors">Vendors</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
