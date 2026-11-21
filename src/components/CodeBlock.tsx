"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

export function CodeBlock({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="print:hidden absolute top-2.5 right-2.5 z-10 rounded border border-white/10 bg-black/40 px-2 py-1 font-sans text-[11px] font-medium text-white/70 backdrop-blur-sm transition-all hover:border-[#bc8a01]/60 hover:text-[#bc8a01]"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre
        ref={preRef}
        className={`overflow-x-auto rounded-lg border border-white/5 bg-[#1d2027] p-4 pr-16 text-sm leading-6 text-white/95 [&_code]:bg-transparent [&_code]:p-0 ${className}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
