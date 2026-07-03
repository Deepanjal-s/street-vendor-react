import React, { useEffect, useMemo, useState } from 'react';
import { getAllVendors } from '../../../services/api';
import VendorCard from '../ui/VendorCard';

const VendorListPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const data = await getAllVendors();
        setVendors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVendors();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...vendors];

    if (q) {
      list = list.filter(
        (v) =>
          v.businessName?.toLowerCase().includes(q) ||
          v.cuisine?.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q),
      );
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => (a.businessName || '').localeCompare(b.businessName || ''));
    }

    return list;
  }, [vendors, search, sortBy]);

  if (loading) {
    return <div className="loading">Loading vendors...</div>;
  }

  return (
    <div className="vendor-list-page container">
      <h2>Available Vendors</h2>

      <div className="vendor-search" style={{ maxWidth: 700, margin: '0 auto 2rem' }}>
        <input
          type="text"
          placeholder="Search by name, cuisine, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="rating">Sort by Rating</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No vendors match your search.</p>
        </div>
      ) : (
        <div className="vendor-grid">
          {filtered.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorListPage;
