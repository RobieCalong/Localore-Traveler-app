import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/BurgerMenu.css";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTavernClick = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    } else {
      navigate(`/userhomepage/${userId}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="burger-menu-container">
      <button className="burger-icon" onClick={handleToggle} aria-label="Open navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isOpen && (
        <nav className="burger-nav">
          <button className="burger-nav-btn" onClick={handleTavernClick}>The Tavern</button>
          <Link to="/map" onClick={() => setIsOpen(false)}>The Realm</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>Become An Adventurer</Link>
        </nav>
      )}
    </div>
  );
}

export default BurgerMenu;
