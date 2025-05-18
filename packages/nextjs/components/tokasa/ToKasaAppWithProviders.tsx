"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { StarknetConfig, starkscan } from "@starknet-react/core";
import { ProgressBar } from "~~/components/scaffold-stark/ProgressBar";
import { appChains, connectors } from "~~/services/web3/connectors";
import provider from "~~/services/web3/provider";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-stark/useNativeCurrencyPrice";
import { Sidebar } from "~~/components/tokasa/sidebar";

// Separando el componente visual del provider
export const ToKasaApp = ({ children }: { children: React.ReactNode }) => {
  useNativeCurrencyPrice();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 h-full w-64 bg-zinc-900 border-r border-zinc-800">
        <Sidebar />
      </div>

      <div className="ml-64 flex-1 overflow-y-auto bg-zinc-950">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

// Componente que solo proporciona los providers
export const ToKasaProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <StarknetConfig
      chains={appChains}
      provider={provider}
      connectors={connectors}
      explorer={starkscan}
    >
      <ProgressBar />
      {children}
    </StarknetConfig>
  );
};

// Para mantener compatibilidad con código existente
export const ToKasaAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ToKasaProviders>
      <ToKasaApp>{children}</ToKasaApp>
    </ToKasaProviders>
  );
};
