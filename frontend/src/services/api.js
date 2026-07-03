import { apiFetch, getAuthHeaders } from '../lib/api/client';

// User APIs
export const register = async (userData) => {
  return apiFetch('/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
};

export const login = async (credentials) => {
  return apiFetch('/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
};

// Auth (Checkout OTP) APIs
export const requestCheckoutOtp = async ({ phone }) => {
  return apiFetch('/auth/otp/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
};

export const verifyCheckoutOtp = async ({ phone, otp, name }) => {
  return apiFetch('/auth/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp, name }),
  });
};

// Vendor APIs
export const getAllVendors = async () => {
  return apiFetch('/vendors');
};

export const getVendorById = async (id) => {
  return apiFetch(`/vendors/${id}`);
};

export const getVendorByUserId = async (userId) => {
  return apiFetch(`/vendors/user/${userId}`, { headers: getAuthHeaders() });
};

// Menu APIs
export const createMenuItem = async (menuData) => {
  return apiFetch('/menus', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(menuData),
  });
};

export const getMenuByVendorId = async (vendorId) => {
  return apiFetch(`/menus/${vendorId}`);
};

export const updateMenuItem = async (id, menuData) => {
  return apiFetch(`/menus/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(menuData),
  });
};

export const deleteMenuItem = async (id) => {
  return apiFetch(`/menus/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
};

// Order APIs
export const createOrder = async (orderData) => {
  return apiFetch('/orders', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
};

export const getOrdersByUserId = async (userId) => {
  return apiFetch(`/orders/user/${userId}`, { headers: getAuthHeaders() });
};

export const getAllOrders = async () => {
  return apiFetch('/orders', { headers: getAuthHeaders() });
};

export const updateOrderStatus = async (id, status) => {
  return apiFetch(`/orders/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
};