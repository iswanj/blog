import Image from "next/image";
import Link from "next/link";
import { blogConfig } from "@/blog.config";

export function Header() {
  return (
    <header className="mb-14 flex items-center justify-between">
      <Link
        href="/"
        className="font-sans text-2xl font-black tracking-tight text-foreground transition-opacity hover:opacity-85"
      >
        {blogConfig.site.name}
      </Link>
      <a
        href={blogConfig.author.avatarLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${blogConfig.author.name} profile`}
        className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white transition-transform hover:scale-105"
      >
        <Image
          src={blogConfig.author.avatar}
          alt={blogConfig.author.name}
          width={40}
          height={40}
          priority
          className="h-full w-full -translate-y-0.5 scale-110 object-cover object-top"
        />
      </a>
    </header>
  );
}
