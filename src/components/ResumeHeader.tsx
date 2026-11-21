"use client";

import { blogConfig } from "@/blog.config";
import { PrintButton } from "@/components/PrintButton";

export function ResumeHeader() {
  const { name, phone, email, linkedinUrl, linkedinLabel } = blogConfig.author;

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1 font-sans text-[13px] text-white/90">
        <h1 className="hidden print:block font-sans text-2xl font-black tracking-tight text-white mb-2">
          {name}
        </h1>
        {phone && (
          <div className="flex items-baseline whitespace-nowrap">
            <span className="font-bold text-white">Phone:&nbsp;</span>
            <span className="font-normal">{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-baseline whitespace-nowrap">
            <span className="font-bold text-white">Email:&nbsp;</span>
            <a
              href={`mailto:${email}`}
              className="font-normal text-accent underline decoration-accent/50 underline-offset-4 hover:text-accent-hover"
            >
              {email}
            </a>
          </div>
        )}
        {linkedinUrl && (
          <div className="flex items-baseline whitespace-nowrap">
            <span className="font-bold text-white">LinkedIn:&nbsp;</span>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-accent underline decoration-accent/50 underline-offset-4 hover:text-accent-hover"
            >
              {linkedinLabel ?? linkedinUrl}
            </a>
          </div>
        )}
      </div>
      <div className="shrink-0">
        <PrintButton />
      </div>
    </div>
  );
}
