"use client";

import { usePathname } from "next/navigation";
import type { PostSummary } from "@/lib/posts";

interface PostHeaderProps {
  posts: PostSummary[];
}

export function PostHeader({ posts }: PostHeaderProps) {
  const pathname = usePathname();
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const post = posts.find((item) => item.slug === slug);

  if (!post) return null;

  return (
    <header className="mb-8">
      <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-[#bc8a01] leading-tight mb-3">
        {post.title}
      </h1>
      {(post.formattedDate || post.readingTime) && (
        <div className="flex items-center gap-2 font-serif text-[13px] text-white/65">
          {post.formattedDate && (
            <time dateTime={post.date}>{post.formattedDate}</time>
          )}
          {post.formattedDate && post.readingTime && (
            <span aria-hidden="true">&middot;</span>
          )}
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      )}
    </header>
  );
}
