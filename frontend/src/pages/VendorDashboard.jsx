import { useEffect, useState } from "react";
import { addMenuItem, getVendorByUser } from "../services/api";

function VendorDashboard() {
  const userId = localStorage.getItem("userId");

  const [vendorId, setVendorId] = useState(null);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    getVendorByUser(userId)
      .then((vendor) => {
        if (!vendor) {
          alert("Vendor profile not found");
          return;
        }
        setVendorId(vendor._id);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendor:", err);
        alert("Failed to load vendor data");
      });
  }, [userId]);

  const handleAdd = async () => {
    if (!itemName || !price) {
      alert("Please fill all fields");
      return;
    }

    await addMenuItem({
      vendorId,
      itemName,
      price: Number(price), // convert to number
    });

    alert("Menu item added");
    setItemName("");
    setPrice("");
  };

  if (loading) return <p>Loading vendor...</p>;

  return (
    <div>
      <h2>Vendor Dashboard</h2>

      <input
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleAdd}>Add Menu Item</button>
    </div>
  );
}

export default VendorDashboard;
