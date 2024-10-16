import React, { useEffect } from "react";
import HeaderLogo from "./components/Header";
import Logo from "../src/assets/logo.png";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import axios from "axios";
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import ConnectCoinbaseWallet from "./components/coinbase/ConnectCoinbaseWallet";
import CustomButton from "./components/Wallet";

const App = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const { waas, user, isCreatingWallet, wallet, isLoggingIn, error } =
    useWalletContext();

    const check = async (address) => {
      if (address) {
        try {
          const res = await axios.post(
            "https://api.ultimatedigits.com/coinbase/addressExists",
            { address }
          );
    
          if (res.data.exists) {
            const redirectUrl = `ud://success?address=${address}`;
            window.location.href = redirectUrl;
          } else {
            // Redirect to the specified URL if the address does not exist
            window.location.href = "https://www.ultimatedigits.com/";
          }
        } catch (error) {
          console.error("Error checking address:", error);
        }
      }
    };
    

  useEffect(() => {
    if (isConnected && address) {
      console.log("Connected to account:", address);
      check(address);
    }
  }, [isConnected, address]);

  const handleUltimate = async () => {
    try {
      if (user) {
        await waas.logout();
      }
      const res = await waas.login();
      if (res.hasWallet === false) {
        alert("No wallet found");
      } else {
        const res2 = await res.restoreFromHostedBackup();
        const address = await res2.addresses.for(ProtocolFamily.EVM);
        check(address.address);
      }
    } catch (error) {
      console.log("Error with Coinbase wallet:", error);
    }
  };

  return (
    <div className="items-center mx-auto bg-gradient-to-t from-customStart via-customStart to-blue-950 flex justify-center min-h-screen inter-font">
      <div>
        <HeaderLogo />
        <div className="flex justify-center items-center pt-10">
          <div className="bg-white rounded-xl mx-6 md:mx-0 w-[340px] md:w-[500px] space-y-3 md:space-y-6 p-8">
            <div className="flex justify-center">
              <img className="h-12 w-12" src={Logo} alt="Logo" />
            </div>
            <p className="text-black font-bold text-3xl text-center">
              Sign up or Log in
            </p>
            <div className="flex justify-center">
              <div className="space-y-6">
                {/* Pass wallet address and connection state to CustomButton */}
                <CustomButton address={address} isConnected={isConnected} />
                <ConnectCoinbaseWallet
                  check={check}
                  handleUltimate={handleUltimate}
                />
              </div>
            </div>
            <div className="text-center">
              <a href="https://www.ultimatedigits.com/" className="underline">
                Click here if you’re not redirected
              </a>
            </div>
            <div className="text-center text-black">
              &copy; 2024 Ultimate Digits. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
