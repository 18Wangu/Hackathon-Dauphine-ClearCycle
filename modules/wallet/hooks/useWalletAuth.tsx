"use client";

import {
  ComethWallet,
  ComethProvider,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { getConnectViemClient } from "@cometh/connect-sdk-viem";
import { toast } from "sonner";
import { useState } from "react";
import { useWalletContext } from "./useWalletContext";
import axios from "axios";

export function useWalletAuth() {
  const {
    setWallet,
    setProvider,
    wallet,
    isConnected,
    setIsConnected,
    isConnecting,
    setIsConnecting,
    provider,
  } = useWalletContext();

  const [connectionError, setConnectionError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY;
  const rpcUrl = process.env.NEXT_PUBLIC_COMETH_CONNECT_API_URL as string;

  function displayError(message: string) {
    toast(message);
    console.error(message);
    setConnectionError(message);
  }

  async function reconnect() {
    if (!apiKey) throw new Error("no apiKey provided");
    console.log("reconnecting");
    setIsConnecting(true);
    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.ARBITRUM_SEPOLIA,
        apiKey,
      });

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey,
        rpcUrl,
      });

      const localStorageAddress = window.localStorage.getItem("walletAddress");
      await instance.connect(localStorageAddress!);

      if (localStorageAddress) {
        console.log("local wallet", localStorageAddress);
        const connectViemClient = getConnectViemClient({
          wallet: instance,
          apiKey,
          rpc: rpcUrl,
        });
        setWallet(instance);
        setProvider(connectViemClient as any);
        await instance.connect(localStorageAddress);
        setIsConnected(true);
        toast.success("Connected Successfully");
      }
    } catch (e) {
      toast.error((e as Error).message);
      console.error((e as Error).message);
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  async function connect() {
    if (!apiKey) throw new Error("no apiKey provided");
    setIsConnecting(true);
    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.ARBITRUM_SEPOLIA,
        apiKey,
      });

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey,
        rpcUrl,
      });

      // const localStorageAddress = window.localStorage.getItem("walletAddress");

      // if (localStorageAddress) {
      //   console.log("local wallet", localStorageAddress);
      //   await instance.connect(localStorageAddress);
      // } else {
      await instance.connect();
      console.log("local wallet", instance.getAddress());
      const walletAddress = instance.getAddress();
      window.localStorage.setItem("walletAddress", walletAddress);

      const connectViemClient = getConnectViemClient({
        wallet: instance,
        apiKey,
        rpc: rpcUrl,
      });

      setWallet(instance);
      toast.success("Connected Successfully");
      setProvider(connectViemClient as any);
      setIsConnected(true);
    } catch (e) {
      toast.error((e as Error).message);
      console.error((e as Error).message);
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    if (wallet) {
      try {
        console.log("disconnect");
        await wallet!.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        toast.error("Disconnected Successfully");
        console.log("disconnected successfully");
      } catch (e) {
        toast((e as Error).message);
        console.error((e as Error).message);
        displayError((e as Error).message);
      }
    }
  }

  async function signMessage(message: string) {
    if (!apiKey) throw new Error("no apiKey provided");
    console.log("signing message");
    try {
      const api = axios.create({ baseURL: "https://api.connect.cometh.io" });
      api.defaults.headers.common["apikey"] = apiKey;

      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.ARBITRUM_SEPOLIA,
        apiKey: apiKey,
      });

      const wallet = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey: apiKey,
        rpcUrl: rpcUrl,
      });

      const walletAddress = window.localStorage.getItem("walletAddress");
      if (!walletAddress) throw new Error("no wallet address");

      await wallet.connect(walletAddress);

      const message = "hello world";
      const signature = await wallet.signMessage(message);
      console.log("signature", signature);

      const body = { message, signature };
      const response = await api.post(
        `/wallets/${walletAddress}/is-valid-signature`,
        body
      );

      const verificationResult = response.data.result;
      console.log("verificationResult", verificationResult);
    } catch (e) {
      toast((e as Error).message);
      console.error((e as Error).message);
      displayError((e as Error).message);
    }
  }
  return {
    wallet,
    connect,
    provider,
    reconnect,
    disconnect,
    isConnected,
    isConnecting,
    connectionError,
    setConnectionError,
    signMessage,
  };
}
