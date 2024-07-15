import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import WagmiContextProvider from "@/providers/wagmi-context-provider";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/reactquery-provider";
import WalletConnectLayout from "@/components/walletconnect-layout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ChainDelivery",
  description: "Handle delivery gigs on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiContextProvider>
      <ReactQueryProvider>
        <WalletConnectLayout>
          <html lang="en">
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
              )}
            >
              <div className="flex flex-1 flex-grow bg-slate-50 flex-col min-h-screen">
                {children}
              </div>
              <Toaster />
            </body>
          </html>
        </WalletConnectLayout>
      </ReactQueryProvider>
    </WagmiContextProvider>
  );
}
