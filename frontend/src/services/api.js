const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL =", API_URL);
// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// User APIs
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};

// Vendor APIs
export const getAllVendors = async () => {
  const response = await fetch(`${API_URL}/vendors`);
  return response.json();
};

export const getVendorById = async (id) => {
  const response = await fetch(`${API_URL}/vendors/${id}`);
  return response.json();
};

export const getVendorByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/vendors/user/${userId}`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

// Menu APIs
export const createMenuItem = async (menuData) => {
  const response = await fetch(`${API_URL}/menus`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(menuData)
  });
  return response.json();
};

export const getMenuByVendorId = async (vendorId) => {
  const response = await fetch(`${API_URL}/menus/${vendorId}`);
  return response.json();
};

export const updateMenuItem = async (id, menuData) => {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(menuData)
  });
  return response.json();
};

export const deleteMenuItem = async (id) => {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// Order APIs
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData)
  });
  return response.json();
};

export const getOrdersByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/orders/user/${userId}`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const getAllOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return response.json();
};