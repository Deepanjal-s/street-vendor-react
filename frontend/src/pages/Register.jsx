function Register() {
  return (
    <div className="page">
      <h2>Register</h2>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <select>
        <option>Customer</option>
        <option>Vendor</option>
        <option>Delivery Partner</option>
      </select>
      <button>Create Account</button>
    </div>
  );
}

export default Register;
