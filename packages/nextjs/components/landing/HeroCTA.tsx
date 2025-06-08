// packages/nextjs/components/landing/HeroCTA.tsx

import { ArrowRight, ExternalLink } from "lucide-react";

export default function HeroCTA() {
  return (
    <div className="flex gap-4">
      <button
        className="bg-[#0A1E3F] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#102f5a] transition flex items-center gap-2"
        aria-label="Explore investment opportunities"
      >
        Explore Opportunities <ArrowRight size={16} />
      </button>

      <a
        href="/litepaper"
        className="border border-neutral-400 px-6 py-3 rounded-md hover:bg-neutral-100 transition flex items-center gap-2"
        aria-label="Read the ToKasa litepaper"
      >
        Read Litepaper <ExternalLink size={16} />
      </a>
    </div>
  );
}
