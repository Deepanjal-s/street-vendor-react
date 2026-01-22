function Login({ login }) {
  return (
    <div className="page">
      <h2>Login</h2>
      <input placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
