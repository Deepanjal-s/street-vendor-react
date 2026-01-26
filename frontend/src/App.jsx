import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorList from './pages/VendorList';
import VendorMenu from './pages/VendorMenu';
import CustomerOrders from './pages/CustomerOrders';
import VendorDashboard from './pages/VendorDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/vendors" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <VendorList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/menu/:vendorId" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <VendorMenu />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/my-orders" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerOrders />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/vendor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/delivery-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['delivery']}>
                <DeliveryDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;