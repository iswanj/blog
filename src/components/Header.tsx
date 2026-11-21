import Image from "next/image";
import Link from "next/link";
import { LINKEDIN_URL } from "@/lib/constants";

export function Header() {
  return (
    <header className="mb-14 flex items-center justify-between">
      <Link
        href="/"
        className="font-sans text-2xl font-black tracking-tight text-white transition-opacity hover:opacity-85"
      >
        Iswan Jumat
      </Link>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Iswan Jumat on LinkedIn"
        className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white transition-transform hover:scale-105"
      >
        <Image
          src="/profile.jpg"
          alt="Iswan Jumat"
          width={40}
          height={40}
          priority
          className="h-full w-full -translate-y-0.5 scale-110 object-cover object-top"
        />
      </a>
    </header>
  );
}
