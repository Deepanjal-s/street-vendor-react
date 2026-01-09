function Home({ goToVendors }) {
  return (
    <div>
      <h1>Trusted Local Food in Minutes</h1>
      <p>Order from nearby street vendors with fast local delivery.</p>

      <div>
        <h3>Order Food</h3>
        <h3>Become a Vendor</h3>
        <h3>Delivery Partner</h3>
      </div>

      <button onClick={goToVendors}>View Vendors</button>
    </div>
  );
}

export default Home;