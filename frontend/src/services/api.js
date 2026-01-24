// This file will later contain API calls using fetch/axios
// Example:
// export const getVendors = () => fetch("/api/vendors");

export {};

const API_BASE = "http://localhost:5000";

export const getVendors = async () => {
  const res = await fetch(`${API_BASE}/api/vendors`);
  return res.json();
};

export const getMenuByVendor = async (vendorId) => {
  const res = await fetch(`${API_BASE}/api/menus/${vendorId}`);
  return res.json();
};

export const addMenuItem = async (data) => {
  const res = await fetch(`${API_BASE}/api/menus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};
