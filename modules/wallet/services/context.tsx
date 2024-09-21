"use client";
import { ComethProvider, ComethWallet } from "@cometh/connect-sdk";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const WalletContext = createContext<{
  wallet: ComethWallet | null;
  setWallet: Dispatch<SetStateAction<ComethWallet | null>>;
  provider: ComethProvider | null;
  setProvider: Dispatch<SetStateAction<ComethProvider | null>>;
  isConnected: Boolean | null;
  setIsConnected: Dispatch<SetStateAction<Boolean | null>>;
  isConnecting: Boolean | null;
  setIsConnecting: Dispatch<SetStateAction<Boolean | null>>;
}>({
  wallet: null,
  setWallet: () => {},
  provider: null,
  setProvider: () => {},
  isConnected: null,
  setIsConnected: () => {},
  isConnecting: null,
  setIsConnecting: () => {},
});

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [wallet, setWallet] = useState<ComethWallet | null>(null);
  const [provider, setProvider] = useState<ComethProvider | null>(null);
  const [isConnected, setIsConnected] = useState<Boolean | null>(false);
  const [isConnecting, setIsConnecting] = useState<Boolean | null>(false);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        provider,
        setProvider,
        isConnected,
        setIsConnected,
        isConnecting,
        setIsConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
