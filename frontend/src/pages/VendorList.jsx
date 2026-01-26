import React, { useState, useEffect } from 'react';
import { getAllVendors } from '../services/api';
import VendorCard from '../components/VendorCard';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const data = await getAllVendors();
        setVendors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setLoading(false);
      }
    };

    loadVendors();
  }, []);

  if (loading) {
    return <div className="loading">Loading vendors...</div>;
  }

  return (
    <div className="vendor-list-page container">
      <h2>Available Vendors</h2>
      
      {vendors.length === 0 ? (
        <div className="empty-state">
          <p>No vendors available at the moment.</p>
        </div>
      ) : (
        <div className="vendor-grid">
          {vendors.map(vendor => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
