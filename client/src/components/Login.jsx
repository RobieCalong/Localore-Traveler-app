import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

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
      //  Save token so it can be reused
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      console.log("Logged in and token stored:", data.token);
      navigate(`/userhomepage/${data.user.id}`);
    } else {
      console.error(data.error);
    }
  }

  return (
      <div className="auth-container">
        <div className="auth-card">
          {/* Notice: Login title looks different from Sign Up */}
          <h1 className="auth-title login">Login</h1>
          <p className="auth-subtitle">
            Welcome, brave traveller. Your journey begins here. <br />
            Unlock the map, claim your quest, and step into a world of wonder.{" "}
            <span className="highlight">Login below</span> to continue your adventure.
          </p>
  
          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <button type="submit" className="auth-btn">
              Login
            </button>
            {error && <p className="auth-error">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

export default Login;
