import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vendors from "./pages/Vendors";
import VendorMenu from "./pages/VendorMenu";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<VendorMenu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
