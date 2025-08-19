import React from "react";
import { useMsal } from "@azure/msal-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function SellerDashboard() {
  const { accounts } = useMsal();
  const account = accounts[0];

  return (
    <div style={{ padding: "20px" }}>
        <Navbar role='Seller' />
      <h1>Welcome, {account?.name || "Seller"} 🛍️</h1>
      <p>You are logged in as: <b>{account?.username}</b></p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/profile">
          <button style={{ marginRight: "10px" }}>Profile</button>
        </Link>

        <Link to="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
}
