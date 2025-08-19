import React from "react";
import { useMsal } from "@azure/msal-react";

const Logout = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <button onClick={handleLogout} className="btn-secondary">
      Logout
    </button>
  );
};

export default Logout;
