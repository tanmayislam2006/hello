"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MetamaskWallet } from "../../../public/assets";
import { Button } from "@/components/ui/button";

interface MetamaskProps {
  onSuccess?: () => void;
}

export default function Metamask({ onSuccess }: MetamaskProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if Metamask is already connected
    checkIfWalletIsConnected();

    // Listen for account changes
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    // Cleanup listeners
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    console.log("Starting wallet connection...");
    
    if (typeof window.ethereum === "undefined") {
      console.log("No ethereum provider found");
      alert("Please install Metamask!");
      return;
    }

    console.log("Ethereum provider found, requesting accounts...");
    setIsConnecting(true);
    
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      console.log("Accounts received:", accounts);
      
      if (accounts.length > 0) {
        console.log("Setting account:", accounts[0]);
        setAccount(accounts[0]);
        setIsConnected(true);
        
        console.log("Wallet connected successfully:", accounts[0]);
        
        // Call the success callback to close modal
        console.log("Calling onSuccess callback...");
        onSuccess?.();
        
        // Use window.location for more reliable navigation
        console.log("Setting timeout for redirect...");
        setTimeout(() => {
          console.log("Redirecting to dashboard...");
          try {
            window.location.href = '/dashboard';
          } catch (error) {
            console.error("Error during redirect:", error);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
      alert("Failed to connect to Metamask");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && account) {
    return (
      <div className="bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg p-3 cursor-pointer transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={MetamaskWallet} alt="Metamask" width={32} height={32} />
            <div className="ml-3">
              <h3 className="dark:text-white text-black text-sm font-bold">
                Connected Successfully!
              </h3>
              <p className="dark:text-gray-300 text-gray-600 text-xs">
                {formatAddress(account)}
              </p>
              <p className="dark:text-green-600 text-green-600 text-xs mt-1">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => window.location.href = '/dashboard'}
              className="text-xs"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
              className="text-xs"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-lg p-3 cursor-pointer transition-colors"
      onClick={connectWallet}
    >
      <div className="flex items-center">
        <Image src={MetamaskWallet} alt="Metamask" width={32} height={32} />
        <div className="ml-3">
          <h3 className="dark:text-white text-black text-sm font-bold">
            {isConnecting ? "Connecting..." : "Connect Metamask"}
          </h3>
          <p className="dark:text-gray-300 text-gray-600 text-xs">
            {isConnecting ? "Please approve in Metamask" : "Click to connect"}
          </p>
        </div>
      </div>
    </div>
  );
}
