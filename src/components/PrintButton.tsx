"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded border border-[#bc8a01]/50 px-3 py-1 font-sans text-xs font-medium text-[#bc8a01] transition-colors hover:border-[#bc8a01] hover:bg-[#bc8a01]/10"
    >
      Save / Print PDF
    </button>
  );
}
