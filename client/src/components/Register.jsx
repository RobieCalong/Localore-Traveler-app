import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; 

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();

  const BASE_URL = `https://localore-traveler-app-4rn3.onrender.com` || `http://localhost:3000`;

  async function handleRegister(e) {
    e.preventDefault();
    
  
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
  
    if (res.ok) {
      //  Save token and userId so it can be reused
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id); // <-- FIXED: always use data.user.id
      console.log("Registered and token stored:", data.token);
      navigate(`/userhomepage/${data.user.id}`); // <-- go to correct homepage
    } else {
      console.error(data.error);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">
          Welcome, brave traveller. Your journey begins here. <br />
          Unlock the map, claim your quest, and step into a world of wonder.{" "}
          <span className="highlight">Sign up below</span> to begin your adventure.
        </p>

        <form onSubmit={handleRegister} className="auth-form">
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
            Register
          </button>
          {error && <p className="auth-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
