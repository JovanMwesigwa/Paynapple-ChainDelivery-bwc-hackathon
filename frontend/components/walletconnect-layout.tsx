"use client";

import { ReactNode, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const WalletConnectLayout = ({ children }: { children: ReactNode }) => {
  const { isConnected, isDisconnected } = useAccount();
  // Extract the connect function from the useConnect hook
  const { connect } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      if (window.ethereum && window.ethereum.isMiniPay) {
        connectMyWallet();
      }
    }
  }, [isConnected]);

  const connectMyWallet = async () => {
    connect({ connector: injected() });
  };

  return <>{children}</>;
};

export default WalletConnectLayout;
