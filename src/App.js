import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PostLogin from "./pages/PostLogin";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ShopkeeperDashboard from "./pages/shopkeeper/ShopkeeperDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Post Login */}
          <Route path="/post-login" element={<PostLogin />} />

          {/* Dashboards */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route
            path="/shopkeeper-dashboard"
            element={<ShopkeeperDashboard />}
          />

          {/* Profile Page */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
