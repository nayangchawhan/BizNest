import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract role from query parameter (?role=customer or ?role=shopkeeper)
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role"); 

  async function handleLogin() {
    try {
      // Microsoft login popup
      const response = await instance.loginPopup({
        scopes: ["User.Read"],
      });

      console.log("Login Response:", response);

      // Simulating role check based on chosen role
      if (role === "shopkeeper") {
        navigate("/shopkeeper-dashboard");
      } else if (role === "customer") {
        navigate("/customer-dashboard");
      } else {
        navigate("/unauthorized");
      }

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  useEffect(() => {
    if (!role) {
      console.warn("No role provided. Redirecting to landing...");
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <div>
      <h2>Login as {role === "shopkeeper" ? "Shopkeeper" : "Customer"}</h2>
      <button onClick={handleLogin} className="btn-primary">
        Sign in with Microsoft
      </button>
      <br />
      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
};

export default Login;
