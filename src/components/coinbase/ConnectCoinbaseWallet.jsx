import React, { useEffect } from "react";
import Logo from "../../assets/logo.png";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectCoinbaseWallet = ({ check, handleUltimate }) => {
  const { account, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const coinbaseConnector = connectors.find((connector) => connector.name === "Coinbase Wallet");

  // Check if wallet is connected and trigger appropriate functions
  useEffect(() => {
    if (status === 'connected' && account?.address) {
      check(account.address);  // Call check with the connected address
      handleUltimate();  // Call handleUltimate to handle any additional logic
    }
  }, [status, account, check, handleUltimate]);

  return (
    <div className="w-[280px] md:w-[455px] flex justify-center mx-auto">
      {coinbaseConnector && (
        <button
          className="text-black shadow-blue-950 hover:shadow-3xl w-[280px] md:w-[455px] h-fit p-1 hover:cursor-pointer hover:bg-slate-100 border-2 border-customButtonStroke rounded-[32px]"
          key={coinbaseConnector.id}
          onClick={() => status === "connected" ? disconnect() : connect({ connector: coinbaseConnector })}
          type="button"
        >
          {status === "connected" ? (
            <div className="flex justify-center font-bold items-center text-xl p-1">
              Disconnect Wallet
            </div>
          ) : (
            <>
              <div className="flex justify-center font-bold items-center text-sm lg:text-base">
                <img className="h-4 md:h-6 w-4 md:w-6 mr-2" src={Logo} alt="" />
                Connect with Ultimate Wallet
              </div>
              <div className="flex justify-center items-center text-sm md:text-base text-slate-400">
                <svg
                  className="w-4 h-4 md:w-6 md:h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  Secured by{" "}
                  <span className="text-blue-500 font-bold">Coinbase</span>
                </p>
              </div>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ConnectCoinbaseWallet;
