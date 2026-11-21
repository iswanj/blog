import Link from "next/link";
import { blogConfig } from "@/blog.config";
import { PostHeader } from "@/components/PostHeader";
import { getAllPosts } from "@/lib/posts";

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getAllPosts();

  return (
    <article className="pb-16">
      <PostHeader posts={posts} />
      <div>{children}</div>
      <footer className="mt-14 border-t border-white/10 pt-6">
        <Link
          href="/"
          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {blogConfig.labels.backToPosts}
        </Link>
      </footer>
    </article>
  );
}
