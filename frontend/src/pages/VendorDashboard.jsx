import { useState } from "react";
import { addMenuItem } from "../services/api";

function VendorDashboard() {
  const vendorId = localStorage.getItem("vendorId"); // temporary
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async () => {
    await addMenuItem({
      vendorId,
      itemName,
      price
    });

    alert("Menu item added");
    setItemName("");
    setPrice("");
  };

  return (
    <div className="page">
      <h2>Vendor Dashboard</h2>

      <input
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleAdd}>Add Menu Item</button>
    </div>
  );
}

export default VendorDashboard;
