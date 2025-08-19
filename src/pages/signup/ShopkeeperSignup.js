import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CosmosClient } from "@azure/cosmos";

export default function ShopkeeperSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const navigate = useNavigate();

  const endpoint = "https://biznestdb.documents.azure.com:443";
  const key =
    "DnYYjRuqFkOunOLV4XcdmMhMuaxWI0AGTkOD4jvq0b7vdwAeK7E99BmfAL2i2tXKgrHvpQUGKrloACDbPBjTug==";

  const client = new CosmosClient({ endpoint, key });
  const database = client.database("BizNestDB");
  const container = database.container("Users");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if user already exists
      const { resources } = await container.items
        .query(`SELECT * FROM c WHERE c.email = "${email}"`)
        .fetchAll();

      if (resources.length > 0) {
        alert("Shopkeeper already exists!");
        return;
      }

      // Create new shopkeeper
      await container.items.create({
        id: email,
        name,
        email,
        shopName,
        role: "ShopKeeper",
        createdAt: new Date().toISOString(),
      });

      alert("Shopkeeper registered successfully!");
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error(err);
      alert("Error registering shopkeeper. Check console.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Shopkeeper Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Shop Name:</label>
        <input
          type="text"
          value={shopName}
          required
          onChange={(e) => setShopName(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
