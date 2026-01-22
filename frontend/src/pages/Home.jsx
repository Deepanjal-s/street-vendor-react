import { useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Trusted Local Food in Minutes</h1>
      <p>Connecting customers, vendors, and delivery partners.</p>

      <div className="roles">
        <RoleCard
          title="Order Food"
          description="Find nearby street vendors"
          onClick={() => navigate("/vendors")}
        />
        <RoleCard
          title="Become a Vendor"
          description="Sell food online"
          onClick={() => navigate("/register")}
        />
        <RoleCard
          title="Delivery Partner"
          description="Earn by delivering food"
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}

export default Home;
