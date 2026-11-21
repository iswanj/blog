"use client";

import { PrintButton } from "@/components/PrintButton";

export function ResumeHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1 font-sans text-[13px] text-white/90">
        <h1 className="hidden print:block font-sans text-2xl font-black tracking-tight text-white mb-2">
          Iswan Jumat
        </h1>
        <div className="flex items-baseline whitespace-nowrap">
          <span className="font-bold text-white">Phone:&nbsp;</span>
          <span className="font-normal">+60 11 7242 6630</span>
        </div>
        <div className="flex items-baseline whitespace-nowrap">
          <span className="font-bold text-white">Email:&nbsp;</span>
          <a
            href="mailto:ask@iswanjumat.com"
            className="font-normal text-[#bc8a01] underline decoration-[#bc8a01]/50 underline-offset-4 hover:text-[#d9a212]"
          >
            ask@iswanjumat.com
          </a>
        </div>
        <div className="flex items-baseline whitespace-nowrap">
          <span className="font-bold text-white">LinkedIn:&nbsp;</span>
          <a
            href="https://www.linkedin.com/in/iswanjumat/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-[#bc8a01] underline decoration-[#bc8a01]/50 underline-offset-4 hover:text-[#d9a212]"
          >
            linkedin.com/in/iswanjumat/
          </a>
        </div>
      </div>
      <div className="shrink-0">
        <PrintButton />
      </div>
    </div>
  );
}
