import DownloadContracts from "./_components/DownloadContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-stark/getMetadata";

export const metadata = getMetadata({
  title: "Configure Contracts",
  description: "Configure your deployed 🏗 Scaffold-Stark 2 contracts",
});

// Deshabilitar prerendering estático para esta página
export const dynamic = 'force-dynamic';

const Configure: NextPage = () => {
  return <DownloadContracts />;
};

export default Configure;
