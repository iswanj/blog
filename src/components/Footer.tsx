import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgb(40,44,53)]/90 backdrop-blur-sm">
      <nav
        aria-label="Social and resume links"
        className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-2 font-sans text-[11px] text-white/55"
      >
        <div className="flex items-center gap-3">
          {FOOTER_LINKS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 transition-colors hover:text-[#bc8a01]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 transition-colors hover:text-[#bc8a01]"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
        <span className="hidden sm:inline text-white/80">
          &copy; 2026 Iswan Jumat
        </span>
      </nav>
    </footer>
  );
}
