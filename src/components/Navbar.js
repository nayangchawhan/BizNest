import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import "./Navbar.css";

export default function Navbar({ role }) {
  const { accounts } = useMsal();
  const account = accounts[0];
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    navigate("/logout");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-brand">
          <Link to="/" className="navbar-link">BizNest</Link>
        </h2>
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
        {role === "Customer" && (
          <>
            <Link to="/customer-dashboard" className="navbar-link">Home</Link>
            <Link to="/orders" className="navbar-link">My Orders</Link>
            <Link to="/cart" className="navbar-link">Cart</Link>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <span className="user-name">{account?.name || "User"}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {role === "Seller" && (
          <>
            <Link to="/seller-dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/products" className="navbar-link">My Products</Link>
            <Link to="/orders" className="navbar-link">Orders</Link>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <span className="user-name">{account?.name || "User"}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>

      {/* <div className="navbar-right">
        <span className="user-name">{account?.name || "User"}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div> */}{/* @Kushalroof will discuss this later */}
    </nav>
  );
}
