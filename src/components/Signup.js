import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import client, { databaseId, containerId } from "../utils/cosmosClient";

const Signup = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role"); // "customer" or "shopkeeper"

  async function handleSignup() {
    try {
      // Microsoft login/signup
      const response = await instance.loginPopup({ scopes: ["User.Read"] });
      const account = response.account;
      console.log("MS Account:", account);

      // Store user in Cosmos DB
      const { database } = await client.databases.createIfNotExists({ id: databaseId });
      const { container } = await database.containers.createIfNotExists({ id: containerId });

      const userItem = {
        id: account.homeAccountId, // unique ID
        name: account.name,
        email: account.username,
        role: role,
        createdAt: new Date().toISOString(),
      };

      await container.items.create(userItem);

      // Redirect based on role
      if (role === "shopkeeper") navigate("/shopkeeper-dashboard");
      else if (role === "customer") navigate("/customer-dashboard");
      else navigate("/unauthorized");

    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  useEffect(() => {
    if (!role) navigate("/");
  }, [role, navigate]);

  return (
    <div>
      <h2>Signup as {role === "shopkeeper" ? "Shopkeeper" : "Customer"}</h2>
      <button onClick={handleSignup} className="btn-primary">
        Sign up with Microsoft
      </button>
      <br />
      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
};

export default Signup;
