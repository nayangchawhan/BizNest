import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { CosmosClient } from "@azure/cosmos";

export default function PostLogin() {
  const { accounts } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserRole() {
      if (accounts.length === 0) return;

      const account = accounts[0];
      const email = account.username; // Azure ID email
      console.log("ID Token Claims:", account.idTokenClaims);

      // ----- Cosmos DB connection -----
      const endpoint = "https://biznestdb.documents.azure.com:443";
      const key =
        "DnYYjRuqFkOunOLV4XcdmMhMuaxWI0AGTkOD4jvq0b7vdwAeK7E99BmfAL2i2tXKgrHvpQUGKrloACDbPBjTug==";

      const client = new CosmosClient({ endpoint, key });
      const database = client.database("BizNestDB"); // Use your DB name
      const container = database.container("Users"); // Users container

      try {
        // ----- Query user in Cosmos DB -----
        const { resources } = await container.items
          .query({
            query: "SELECT * FROM c WHERE c.email = @email",
            parameters: [{ name: "@email", value: email }],
          })
          .fetchAll();

        let role = "Customer"; // default role

        if (resources.length > 0) {
          // Existing user
          role = resources[0].role;
        } else {
          // New user: insert with default role Customer
          await container.items.create({
            id: email,
            email,
            name: account.name || "",
            role: "Customer",
            createdAt: new Date().toISOString(),
          });
        }

        // ----- Redirect based on role -----
        if (role === "ShopKeeper") navigate("/shopkeeper-dashboard");
        else if (role === "Customer") navigate("/customer-dashboard");
        else navigate("/unauthorized");
      } catch (err) {
        console.error("Cosmos DB error:", err);
        navigate("/unauthorized");
      }
    }

    checkUserRole();
  }, [accounts, navigate]);

  return <div>Redirecting...</div>;
}
