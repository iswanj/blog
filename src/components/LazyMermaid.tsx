"use client";

import dynamic from "next/dynamic";

export const LazyMermaid = dynamic(
  () => import("@/components/Mermaid").then((mod) => mod.Mermaid),
  {
    ssr: false,
    loading: () => (
      <div
        className="my-6 flex justify-center rounded-lg border border-white/5 bg-[#1d2027] p-4 py-6"
        aria-label="Loading diagram"
      >
        <span className="font-mono text-xs text-white/50">
          Loading diagram...
        </span>
      </div>
    ),
  }
);
