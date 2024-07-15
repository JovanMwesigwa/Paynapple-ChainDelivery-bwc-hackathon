"use client";

import { config } from "@/config";
import { WagmiProvider } from "wagmi";

function WagmiContextProvider({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}

export default WagmiContextProvider;
