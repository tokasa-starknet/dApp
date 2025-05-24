import Link from "next/link";
import Image from "next/image";
import { Home, BarChart3, Wallet, History, Settings,Palmtree } from "lucide-react";
//scaffold-stark
import { CustomConnectButton } from "~~/components/tokasa/CustomConnectButton";
import { useAccount, useNetwork, useProvider } from "@starknet-react/core";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { useEffect, useState } from "react";
import {
  tokasaSidebar,
  tokasaNavItem,
  tokasaNavSection,
  tokasaFooterSection,
  tokasaGradient,
  tokasaHeading,
  tokasaLabel,
  tokasaStatusIndicator,
} from "./tailwind-tokasa";

export function Sidebar() {
  const { provider } = useProvider();
  const { address, status, chainId } = useAccount();
  const { chain } = useNetwork();
  const { targetNetwork } = useTargetNetwork();
  const [isDeployed, setIsDeployed] = useState(true);

  useEffect(() => {
    if (
      status === "connected" &&
      address &&
      chainId === targetNetwork.id &&
      chain.network === targetNetwork.network
    ) {
      provider
        .getClassHashAt(address)
        .then((classHash) => {
          if (classHash) setIsDeployed(true);
          else setIsDeployed(false);
        })
        .catch((e) => {
          if (e.toString().includes("Contract not found")) {
            setIsDeployed(false);
          }
        });
    }
  }, [
    status,
    address,
    provider,
    chainId,
    targetNetwork.id,
    targetNetwork.network,
    chain.network,
  ]);

  return (
    <aside className={tokasaSidebar}>
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <Image
            src="/tokasa/logoTK.jpg"
            alt="ToKasa Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <h2 className={tokasaHeading + " text-center"}>ToKasa</h2>
        <p className={tokasaLabel + " text-center"}>
          Real Estate Tokenization Platform
        </p>
      </div>

      <nav className={tokasaNavSection}>
        
        <Link
          href="/dashboard/admin"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-zinc-800"
        >
          <Settings className="h-5 w-5" />
          <span>Administración</span>
        </Link>
        <Link
          href="/dashboard/vacation-properties"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-zinc-800"
        >
          <Palmtree className="h-5 w-5" />
          <span>Casas Vacacionales</span>
        </Link>
        <Link
          href="/dashboard?tab=portfolio"
          className={tokasaNavItem.inactive}
        >
          <BarChart3 className="h-5 w-5" />
          <span>My Portfolio</span>
        </Link>
        <Link href="/wallet" className={tokasaNavItem.inactive}>
          <Wallet className="h-5 w-5" />
          <span>Wallet</span>
        </Link>
        <Link
          href="/dashboard?tab=transactions"
          className={tokasaNavItem.inactive}
        >
          <History className="h-5 w-5" />
          <span>Transactions</span>
        </Link>
      </nav>

      <div className={tokasaFooterSection}>
        <div className={tokasaGradient + " rounded-lg p-4"}>
          <h3 className="font-medium mb-2">
            <CustomConnectButton />
          </h3>
          <div className="flex items-center">
            <div className={tokasaStatusIndicator.active + " mr-2"}></div>
            <p className={tokasaLabel + " truncate"}>
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "0x...0"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
