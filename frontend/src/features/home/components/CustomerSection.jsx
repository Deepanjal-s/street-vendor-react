import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVendors } from '../../../services/api';

const DUMMY_VENDORS = [
  {
    _id: 'demo-1',
    businessName: 'Spice Corner',
    cuisine: 'North Indian',
    location: 'Sector 12 Market',
    rating: 4.5,
    eta: '20 min',
  },
  {
    _id: 'demo-2',
    businessName: 'Chai & Snacks Hub',
    cuisine: 'Street Snacks',
    location: 'Main Road Stall',
    rating: 4.2,
    eta: '15 min',
  },
  {
    _id: 'demo-3',
    businessName: 'South Tiffin Center',
    cuisine: 'South Indian',
    location: 'College Gate',
    rating: 4.7,
    eta: '25 min',
  },
];

const CustomerSection = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllVendors();
        setVendors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading vendors:', error);
        setVendors([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const isDummy = vendors.length === 0;
  const source = isDummy ? DUMMY_VENDORS : vendors;

  const getEta = (vendor) => {
    if (vendor.eta) return vendor.eta;
    const mins = 15 + (String(vendor._id).length % 12);
    return `${mins} min`;
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = source.map((v) => ({
      ...v,
      eta: getEta(v),
    }));

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

    return list.slice(0, 6);
  }, [source, search, sortBy]);

  return (
    <section id="order" className="landing-section">
      <h2 className="landing-section-title">Order Food Near You</h2>
      <p className="landing-section-subtitle">
        Search vendors by name, cuisine, or location — no account needed to browse
      </p>

      <div className="role-strip">
        <div className="role-strip-header">
          <span className="role-strip-icon">🍕</span>
          <div>
            <h3>For Customers</h3>
            <p>Find street food from vendors closest to you</p>
          </div>
        </div>

        {isDummy && !loading && (
          <span className="dummy-badge">Sample vendors — real listings appear when vendors join</span>
        )}

        <div className="vendor-search">
          <input
            type="text"
            placeholder="Search food, cuisine, or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {loading ? (
          <p className="loading">Loading vendors...</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No vendors match your search. Try a different keyword.</p>
          </div>
        ) : (
          <div className="vendor-preview-grid">
            {filtered.map((vendor) => (
              <div
                key={vendor._id}
                className="vendor-preview-card"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  String(vendor._id).startsWith('demo')
                    ? navigate('/vendors')
                    : navigate(`/menu/${vendor._id}`)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    String(vendor._id).startsWith('demo')
                      ? navigate('/vendors')
                      : navigate(`/menu/${vendor._id}`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <h4>{vendor.businessName}</h4>
                <p>{vendor.cuisine}</p>
                <div className="meta">
                  <span>📍 {vendor.location}</span>
                  <span>⭐ {(vendor.rating || 0).toFixed(1)}</span>
                </div>
                <div className="meta" style={{ marginTop: '0.35rem' }}>
                  <span>🕐 ~{vendor.eta}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="role-strip-actions">
          <button className="btn-primary" style={{ width: 'auto', marginTop: 0 }} onClick={() => navigate('/vendors')}>
            Browse All Vendors
          </button>
          <button className="btn-secondary" onClick={() => navigate('/vendors')}>
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
