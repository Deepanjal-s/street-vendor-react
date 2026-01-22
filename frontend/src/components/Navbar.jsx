function Navbar({ go, loggedIn, logout }) {
  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => go("home")}>StreetVendor</h2>

      <div className="nav-links">
        <a onClick={() => go("home")}>Home</a>
        <a onClick={() => go("vendors")}>Vendors</a>

        {!loggedIn && <a onClick={() => go("login")}>Login</a>}
        {loggedIn && (
          <>
            <a onClick={() => go("dashboard")}>Dashboard</a>
            <a onClick={logout}>Logout</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
