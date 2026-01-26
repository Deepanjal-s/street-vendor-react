import React from 'react';
import { Link } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
  return (
    <div className="vendor-card">
      <h3>{vendor.businessName}</h3>
      <p>{vendor.description}</p>
      <p><strong>Cuisine:</strong> {vendor.cuisine}</p>
      <p><strong>Location:</strong> {vendor.location}</p>
      
      <div className="vendor-card-footer">
        <span className="rating">⭐ {vendor.rating.toFixed(1)}</span>
        <Link to={`/menu/${vendor._id}`}>
          <button className="btn-primary">View Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;