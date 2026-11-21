import fs from "node:fs/promises";
import path from "node:path";

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  description: string;
  readingTime: string;
}

const POSTS_DIR = path.join(process.cwd(), "src", "app", "(posts)");
const WORDS_PER_MINUTE = 200;

function calculateReadingTime(source: string): string {
  const withoutMetadata = source.replace(
    /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};?/,
    ""
  );
  const plainText = withoutMetadata
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>\[\]()!-]/g, " ")
    .trim();

  const words = plainText ? plainText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function extractMetadataField(block: string, field: string): string | null {
  const regex = new RegExp(
    `\\b${field}\\s*:\\s*(?:"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"|'([^'\\\\]*(?:\\\\.[^'\\\\]*)*)'|\`([^\`\\\\]*(?:\\\\.[^\`\\\\]*)*)\`)`
  );
  const match = block.match(regex);
  if (!match) return null;
  const raw = match[1] ?? match[2] ?? match[3] ?? "";
  return raw.replace(/\\(['"`\\])/g, "$1").trim();
}

function parsePostMetadata(
  source: string,
  slug: string
): Omit<PostSummary, "slug" | "formattedDate" | "readingTime"> {
  const metadataBlockMatch = source.match(
    /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};?/
  );
  const block = metadataBlockMatch ? metadataBlockMatch[1] : "";

  const title =
    extractMetadataField(block, "title") ??
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const date = extractMetadataField(block, "date") ?? "";
  const description = extractMetadataField(block, "description") ?? "";

  return { title, date, description };
}

export function formatPostDate(dateString: string): string {
  if (!dateString) return "";
  const parsed = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export async function getAllPosts(): Promise<PostSummary[]> {
  "use cache";

  let entries;
  try {
    entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const posts: PostSummary[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const slug = entry.name;
    const postDir = path.join(POSTS_DIR, slug);

    let fileContent: string | null = null;
    for (const filename of ["page.mdx", "page.md"]) {
      try {
        fileContent = await fs.readFile(path.join(postDir, filename), "utf8");
        break;
      } catch {
        // Try next extension
      }
    }

    if (!fileContent) continue;

    const meta = parsePostMetadata(fileContent, slug);
    const readingTime = calculateReadingTime(fileContent);
    posts.push({
      slug,
      ...meta,
      formattedDate: formatPostDate(meta.date),
      readingTime,
    });
  }

  return posts.sort((a, b) => {
    const timeA = a.date ? Date.parse(a.date) : 0;
    const timeB = b.date ? Date.parse(b.date) : 0;
    return timeB - timeA;
  });
}
