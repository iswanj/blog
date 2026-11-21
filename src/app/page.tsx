import Link from "next/link";
import { blogConfig } from "@/blog.config";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-10 pb-12">
      {posts.length === 0 ? (
        <p className="text-white/75">{blogConfig.labels.emptyPosts}</p>
      ) : (
        posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/${post.slug}`} className="block">
              <h2 className="font-sans text-[28px] font-black leading-tight tracking-tight text-accent transition-colors group-hover:text-accent-hover">
                {post.title}
              </h2>
              {(post.date || post.readingTime) && (
                <div className="mt-1 flex items-center gap-2 font-serif text-[13px] text-white/65">
                  {post.date && (
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                  )}
                  {post.date && post.readingTime && (
                    <span aria-hidden="true">&middot;</span>
                  )}
                  {post.readingTime && <span>{post.readingTime}</span>}
                </div>
              )}
              {post.description && (
                <p className="mt-2 font-serif text-base leading-relaxed text-white/90">
                  {post.description}
                </p>
              )}
            </Link>
          </article>
        ))
      )}
    </div>
  );
}
