import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import LandingPage from "./pages/LandingPage";
// import ServicesPage from "./pages/ServicesPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import CustomerDashboard from "./pages/customer/CustomerDashboard";
// import ProviderDashboard from "./pages/provider/ProviderDashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import NotFound from "./pages/NotFound";

// Import Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> */}

          {/* Customer */}
          {/* <Route path="/customer/dashboard" element={<CustomerDashboard />} /> */}

          {/* Provider */}
          {/* <Route path="/provider/dashboard" element={<ProviderDashboard />} /> */}

          {/* Admin */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

          {/* 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
