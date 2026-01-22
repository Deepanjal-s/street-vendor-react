function Home({ go }) {
  return (
    <div className="page">
      <h1>Trusted Local Food in Minutes</h1>
      <p>Order from nearby street vendors with fast delivery.</p>

      <div className="roles">
        <div className="card" onClick={() => go("vendors")}>
          <h3>Order Food</h3>
          <p>Find nearby vendors</p>
        </div>

        <div className="card">
          <h3>Become a Vendor</h3>
          <p>Sell food online</p>
        </div>

        <div className="card">
          <h3>Delivery Partner</h3>
          <p>Earn by delivering</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
