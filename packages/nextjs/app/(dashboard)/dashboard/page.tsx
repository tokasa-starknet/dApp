import React from "react";
import Link from "next/link";
import { tokasaButton } from "~~/components/tokasa/tailwind-tokasa";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Contenido del dashboard */}
      <div className="mt-4">
        <Link href="/main" className="text-blue-500 hover:text-blue-700">
          Ir a la página main
        </Link>
      </div>
    </main>
  );
}
