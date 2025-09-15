import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = `http://localhost:3000`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
  
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
  
    if (res.ok) {
      //  Save token and userId so it can be reused
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id); // <-- FIXED: always use data.user.id
      console.log("Logged in and token stored:", data.token);
      navigate(`/userhomepage/${data.user.id}`); // <-- go to correct homepage
    } else {
      console.error(data.error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;
