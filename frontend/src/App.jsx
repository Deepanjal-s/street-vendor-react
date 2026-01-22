import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Vendors from "./components/Vendors";
import Dashboard from "./components/Dashboard";

function App() {
  const [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Navbar go={setPage} loggedIn={loggedIn} logout={() => setLoggedIn(false)} />

      {page === "home" && <Home go={setPage} />}
      {page === "vendors" && <Vendors />}
      {page === "login" && <Login login={() => { setLoggedIn(true); setPage("dashboard"); }} />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;
