"use client";

import { blogConfig } from "@/blog.config";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded border border-accent/50 px-3 py-1 font-sans text-xs font-medium text-accent transition-colors hover:border-accent hover:bg-accent/10"
    >
      {blogConfig.labels.printResume}
    </button>
  );
}
