export const metadata = {
  title: "Build Your Own Minimal MDX Blog",
  date: "2026-11-21",
  description:
    "How to scaffold, customize, and publish a fast, minimalist MDX blog and printable resume using create-mdx-blog.",
};

Most developer blogs suffer from one of two extremes: either they are hooked up to a bloated, over-engineered headless CMS, or they are bare-bones templates that require hacking twenty different CSS and config files just to change your accent color or add a social link.

When I rebuilt this blog, I wanted something different:

- **Blazing fast**: Next.js 16 App Router with zero client-side bloat.
- **Pure Markdown & MDX**: Write posts in plain `.md` files with rich code snippets and diagrams.
- **Single config file**: Every color, title, author handle, and link controlled in one spot (`src/blog.config.ts`).
- **Built-in printable resume**: A dedicated `/resume` page with clean print-to-PDF formatting out of the box.

To make this effortless for anyone else who just wants a clean corner of the internet to write their thoughts, I packaged the entire setup into an open-source CLI: [`create-mdx-blog`](https://www.npmjs.com/package/create-mdx-blog).

Here is how you can have your own blog up and running in a couple of minutes.

## 1. Scaffold your blog

You don't need to clone repos or fiddle with boilerplate. Open your terminal and run:

```bash
npx create-mdx-blog my-blog
```

*(Or use `pnpm create mdx-blog my-blog` / `npm create mdx-blog my-blog` if you prefer).*

The CLI will prompt you for your project name and package manager (`pnpm`, `npm`, or `yarn`), install the dependencies, and set up your git repository.

Once it finishes, jump into the directory and fire up the development server:

```bash
cd my-blog
pnpm dev
```

Visit `http://localhost:3000`—your blog is live locally.

## 2. Make it yours with a single file

Instead of hunting through layout files, Tailwind configs, and metadata tags, open:

```text
src/blog.config.ts
```

This single file drives the entire site. You can update your details in 30 seconds:

```typescript
export const blogConfig = {
  site: {
    title: "Jane Doe",
    description: "Software Engineer & Systems Enthusiast",
    url: "https://yourdomain.com",
    tagline: "Notes on software architecture, tooling, and shipping clean code.",
  },
  author: {
    name: "Jane Doe",
    role: "Senior Staff Engineer",
    avatar: "/avatar.jpg",
    bio: "Building distributed systems and sharing lessons along the way.",
    social: {
      github: "https://github.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
      x: "https://x.com/janedoe",
      instagram: "https://instagram.com/janedoe",
    },
  },
  colors: {
    background: "#0f172a", // Change your theme with hex colors
    accent: "#38bdf8",     // Links, buttons, and highlights
    hover: "#7dd3fc",
    surface: "#1e293b",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#334155",
  },
};
```

Drop your photo into `public/avatar.jpg`, adjust the palette, and your entire site re-themes instantly.

## 3. Write your first post

Adding a new post is as simple as creating a folder under `src/app/(posts)/`:

```text
src/app/(posts)/my-first-post/page.md
```

Export your metadata at the top, then start writing in standard Markdown:

```markdown
export const metadata = {
  title: "My First Post",
  date: "2026-11-21",
  description: "A quick note on getting started.",
};

Here is my opening thought. Writing in plain Markdown feels good.

## Code blocks that just work

Syntax highlighting is powered by Shiki with automatic line formatting and a built-in copy button:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
\```
```

You can even include interactive Mermaid flowcharts and diagrams directly inside your articles—they render crisp SVGs and include a fullscreen lightbox modal when clicked.

## 4. Update your resume

One of my favorite features is the built-in `/resume` page (`src/app/resume/page.md`).

It reads like a clean, distraction-free document on the web, but click the **"Print / Save PDF"** button (or press `Cmd + P`), and custom print CSS kicks in:
- Navigation headers and footers disappear.
- Screen dark mode transitions to crisp, high-contrast black-and-white.
- Margins and typography lock to standard US Letter / A4 paper proportions.

No more fighting with Google Docs or maintaining separate Word files whenever you update your experience.

## 5. Deploy to Vercel in 1 click

When you’re ready to share your blog with the world:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial blog setup"
   git remote add origin https://github.com/your-username/my-blog.git
   git push -u origin main
   ```
2. Import the repo into [Vercel](https://vercel.com).
3. Click **Deploy**.

Vercel will detect Next.js automatically and build the static output. It includes pre-configured RSS feeds (`/rss.xml`), sitemaps (`/sitemap.xml`), dynamic OpenGraph social cards, and privacy-friendly analytics.

---

That’s all it takes. If you try it out and build your own blog with it, let me know or drop a star on the [GitHub repository](https://github.com/iswanj/mdx-blog/tree/main/packages/create-mdx-blog)—I’d love to see what you build!
