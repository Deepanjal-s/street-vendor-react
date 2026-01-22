function Vendors() {
  const vendors = [
    { id: 1, name: "Raju Chaat", place: "Main Road" },
    { id: 2, name: "Sita Snacks", place: "College Gate" },
    { id: 3, name: "Aman Juice", place: "Bus Stand" }
  ];

  return (
    <div className="page">
      <h2>Nearby Vendors</h2>

      {vendors.map(v => (
        <div className="vendor" key={v.id}>
          <p>{v.name} - {v.place}</p>
          <button>View Menu</button>
        </div>
      ))}
    </div>
  );
}

export default Vendors;
