import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-10 pb-12">
      {posts.length === 0 ? (
        <p className="text-white/75">No blog posts yet.</p>
      ) : (
        posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/${post.slug}`} className="block">
              <h2 className="font-sans text-[28px] font-black leading-tight tracking-tight text-[#bc8a01] transition-colors group-hover:text-[#d9a212]">
                {post.title}
              </h2>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="mt-1 block font-serif text-[13px] text-white/65"
                >
                  {formatPostDate(post.date)}
                </time>
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
