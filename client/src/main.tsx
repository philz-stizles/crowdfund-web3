import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import "./styles/globals.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CampaignProvider } from "./context/CampaignContext";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia}>
      <Router>
        <CampaignProvider>
          <App />
        </CampaignProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
