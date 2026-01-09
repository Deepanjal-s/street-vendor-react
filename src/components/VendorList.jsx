function VendorList({ goToMenu }) {
  const vendors = [
    { id: 1, name: "Raju Chaat", location: "Main Road" },
    { id: 2, name: "Sita Snacks", location: "College Gate" },
    { id: 3, name: "Aman Juice", location: "Bus Stand" }
  ];

  return (
    <div>
      <h2>Nearby Vendors</h2>

      {vendors.map(vendor => (
        <div key={vendor.id}>
          <p>{vendor.name} - {vendor.location}</p>
          <button onClick={() => goToMenu(vendor)}>
            View Menu
          </button>
        </div>
      ))}
    </div>
  );
}

export default VendorList;
