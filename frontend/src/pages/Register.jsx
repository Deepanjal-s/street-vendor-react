import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="page">
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <select name="role" onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
        <option value="delivery">Delivery Partner</option>
      </select>

      <button onClick={handleSubmit}>Create Account</button>
    </div>
  );
}

export default Register;
