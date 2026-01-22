import { useParams } from "react-router-dom";

function VendorMenu() {
  const { id } = useParams();

  const menu = ["Samosa", "Chaat", "Juice"];

  return (
    <div className="page">
      <h2>Vendor Menu (ID: {id})</h2>
      <ul>
        {menu.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default VendorMenu;
