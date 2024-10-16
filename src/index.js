import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
// import { Wagmiconfig } from './components/coinbase/wagmi.ts';
import { mainnet, polygon, optimism, arbitrum, base, baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WalletProvider } from "@coinbase/waas-sdk-web-react";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "cfec78e4-8eb3-4efc-a177-8d0cbd6ef273", // Update with your actual project ID
  chains: [mainnet, polygon, optimism, arbitrum, base, baseSepolia],
  ssr: true, // Enable SSR if required
});

// Initialize the QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WalletProvider
    verbose
    enableHostedBackups={true}
    collectAndReportMetrics
    prod={false}
    projectId={"0f9bcc25-9ab2-42b5-90d2-122588e83383"} // Update with your actual project ID
  >
    <WagmiProvider config={config}>
      {/* <WagmiProvider config={Wagmiconfig}> */}
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      {/* </WagmiProvider> */}
    </WagmiProvider>
  </WalletProvider>
);
