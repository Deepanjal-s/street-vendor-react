import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './app/components/Navbar';
import HomePage from './features/home/pages/HomePage';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import VendorListPage from './features/customer/pages/VendorListPage';
import VendorMenuPage from './features/customer/pages/VendorMenuPage';
import CustomerOrdersPage from './features/customer/pages/CustomerOrdersPage';
import VendorDashboardPage from './features/vendor/pages/VendorDashboardPage';
import DeliveryDashboardPage from './features/delivery/pages/DeliveryDashboardPage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/vendors" element={<VendorListPage />} />

          <Route path="/menu/:vendorId" element={<VendorMenuPage />} />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerOrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery-dashboard"
            element={
              <ProtectedRoute allowedRoles={['delivery']}>
                <DeliveryDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;