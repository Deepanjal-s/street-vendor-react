function VendorMenu({ vendor, goBack }) {
  return (
    <div>
      <h2>{vendor.name} Menu</h2>

      <ul>
        <li>Samosa</li>
        <li>Chaat</li>
        <li>Juice</li>
      </ul>

      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default VendorMenu;





