import React, { useState } from "react";
import { CosmosClient } from "@azure/cosmos";
import { useNavigate } from "react-router-dom";

export default function CustomerSignup() {
  const navigate = useNavigate();

  // 🔹 State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Cosmos DB connection
      const endpoint = "https://biznestdb.documents.azure.com:443";
      const key =
        "DnYYjRuqFkOunOLV4XcdmMhMuaxWI0AGTkOD4jvq0b7vdwAeK7E99BmfAL2i2tXKgrHvpQUGKrloACDbPBjTug==";

      const client = new CosmosClient({ endpoint, key });
      const database = client.database("BizNestDB");
      const container = database.container("Users");

      // Check if user already exists
      const { resources } = await container.items
        .query(`SELECT * FROM c WHERE c.email = "${formData.email}"`)
        .fetchAll();

      if (resources.length > 0) {
        setError("User already exists with this email.");
        setLoading(false);
        return;
      }

      // Insert new user
      await container.items.create({
        id: formData.email,
        ...formData,
        role: "Customer",
        createdAt: new Date().toISOString(),
      });

      setSuccess("Signup successful! Redirecting to login...");
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Signup</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.textarea}
        ></textarea>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

// 🔹 Inline styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "60px",
  },
  button: {
    padding: "12px",
    marginTop: "12px",
    border: "none",
    borderRadius: "5px",
    background: "#0078d7",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};
