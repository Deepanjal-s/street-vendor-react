import { Link } from "react-router-dom";

const vendors = [
  { id: 1, name: "Raju Chaat", location: "Main Road" },
  { id: 2, name: "Sita Snacks", location: "College Gate" },
];

function Vendors() {
  return (
    <div className="page">
      <h2>Nearby Vendors</h2>

      {vendors.map(v => (
        <div className="vendor" key={v.id}>
          <p>{v.name} - {v.location}</p>
          <Link to={`/vendors/${v.id}`}>View Menu</Link>
        </div>
      ))}
    </div>
  );
}

export default Vendors;


