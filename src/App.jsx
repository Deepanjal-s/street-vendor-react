import { useState } from "react";
import Home from "./components/Home";
import VendorList from "./components/VendorList";
import VendorMenu from "./components/VendorMenu";

function App() {
  const [page, setPage] = useState("home");
  const [selectedVendor, setSelectedVendor] = useState(null);

  if (page === "home") {
    return <Home goToVendors={() => setPage("vendors")} />;
  }

  if (page === "vendors") {
    return (
      <VendorList
        goToMenu={(vendor) => {
          setSelectedVendor(vendor);
          setPage("menu");
        }}
      />
    );
  }

  if (page === "menu") {
    return (
      <VendorMenu
        vendor={selectedVendor}
        goBack={() => setPage("vendors")}
      />
    );
  }
}

export default App;
