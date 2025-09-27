"use client";

import Link from "next/link";
import Image from "next/image";
import { Radar } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Metamask from "@/components/connect-wallets/connect-metamask";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import MobileThemeToggle from "@/components/mobile-theme-toggle";
import { Img1, Img2, Img3, Img4 } from "../../public/assets";

export default function HomePage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Function to handle successful wallet connection
  const handleWalletConnected = () => {
    console.log("Wallet connected successfully, closing modal...");
    setIsWalletModalOpen(false);
    // The Metamask component will handle the navigation
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <Radar className="w-6 hidden dark:block h-6 mr-3" />
            <Radar className="w-6 dark:hidden h-6 mr-3" />

            <span className="font-bold">Whale.</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {/* <MobileThemeToggle /> */}
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl text-[#161D26] dark:text-white font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              A web3 data aggregator dapp.
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
              This is a Decentralized Application (DApp)
              that enables users to aggregate web3 data in a user friendly &
              modern UI complete with desktop and mobile responsiveness.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button
                variant="default"
                className="bg-black hover:bg-slate-800 hover:text-slate-200 dark:bg-slate-100 dark:hover:bg-slate-300 dark:text-black"
                onClick={() => setIsWalletModalOpen(true)}
              >
                Open App
                <ArrowRightIcon className="ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="" target="_blank" rel="noopener noreferrer">
                  Learn more
                </Link>
              </Button>
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src={Img3}
              width={1080}
              height={608}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm dark:hidden"
            />
            <Image
              src={Img1}
              width={1080}
              height={608}
              alt="demo-dark"
              priority
              className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
            />
            <Image
              src={Img4}
              width={228}
              height={494}
              alt="demo-mobile"
              className="border rounded-xl absolute bottom-0 right-0 hidden lg:block dark:hidden"
            />
            <Image
              src={Img2}
              width={228}
              height={494}
              alt="demo-mobile"
              className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="">
        </div>
      </footer>

      {/* Wallet Connection Modal */}
      <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to access the dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Metamask onSuccess={handleWalletConnected} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
