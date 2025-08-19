import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: "1d5521c8-2e07-4d0e-b696-4a8fddecc782",  // from Azure
    authority: "https://login.microsoftonline.com/common", // common --> Works with all Microsoft accounts
    //organizations → Works with work/school only
    //consumers → Works with personal only
    redirectUri: "http://localhost:3000", // must match Azure
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
