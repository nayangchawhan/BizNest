import React from "react";
import { useMsal } from "@azure/msal-react";

const Profile = () => {
  const { accounts } = useMsal();

  if (accounts.length > 0) {
    return (
      <div>
        <h2>Welcome, {accounts[0].name}</h2>
        <p>Email: {accounts[0].username}</p>
      </div>
    );
  } else {
    return <p>Please sign in</p>;
  }
};

export default Profile;
