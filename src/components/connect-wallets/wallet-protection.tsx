"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface WalletProtectionProps {
  children: React.ReactNode;
}

export default function WalletProtection({ children }: WalletProtectionProps) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length === 0) {
            // No wallet connected, redirect to home
            router.push('/');
            return;
          }
        } else {
          // No ethereum provider, redirect to home
          router.push('/');
          return;
        }
        setIsChecking(false);
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        router.push('/');
      }
    };

    checkWalletConnection();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-lg">Checking wallet connection...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
