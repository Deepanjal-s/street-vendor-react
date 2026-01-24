import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVendors } from "../services/api";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendors()
      .then(data => {
        setVendors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="page">Loading vendors...</p>;
  }

  return (
    <div className="page">
      <h2>Nearby Vendors</h2>

      {vendors.length === 0 && <p>No vendors found</p>}

      {vendors.map(v => (
        <div className="vendor" key={v._id}>
          <p><strong>{v.name}</strong> – {v.location}</p>
          <Link to={`/vendors/${v._id}`}>View Menu</Link>
          <Link to="/vendor-dashboard">Vendor Dashboard</Link>
        </div>
      ))}
    </div>
  );
}

export default Vendors;
