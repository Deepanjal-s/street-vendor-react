import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VendorMenu() {
  const { vendorId } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/menus/${vendorId}`)
      .then(res => res.json())
      .then(data => setMenu(data));
  }, [vendorId]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const placeOrder = async () => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        vendorId,
        items: cart,
        totalPrice,
      }),
    });

    alert("Order placed successfully");
    setCart([]);
  };

  return (
    <div>
      <h2>Menu</h2>
      {menu.map((item) => (
        <div key={item._id}>
          <p>{item.itemName} - ₹{item.price}</p>
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map((item, index) => (
        <p key={index}>{item.itemName} - ₹{item.price}</p>
      ))}

      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
}

export default VendorMenu;
