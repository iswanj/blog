# Minimalist Next.js + MDX Blog & Resume

A minimalist personal blog and printable resume website built with **Next.js 16 (App Router)**, **MDX (`@next/mdx`)**, **Tailwind CSS v4**, **Shiki syntax highlighting**, and **Mermaid** diagrams—fully customizable from a single configuration file (`src/blog.config.ts`).

---

## 1. Create Your Own Blog & Setup Guide

You can scaffold your own copy of this blog (pre-loaded with **1 sample blog post**, **1 sample resume**, and a placeholder avatar) using a single command.

### Step 1: Scaffold a New Blog

Run one of the following commands in your terminal:

```bash
# Using npx
npx create-mdx-blog my-blog

# Using pnpm
pnpm create mdx-blog my-blog

# Using npm
npm create mdx-blog@latest my-blog

# Using yarn
yarn create mdx-blog my-blog
```

Then navigate into your project folder and install dependencies:

```bash
cd my-blog
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Step 2: Configure Colors, Text & Links (`src/blog.config.ts`)

Open `src/blog.config.ts` to customize your entire website from one place:

```ts
export const blogConfig: BlogConfig = {
  site: {
    name: "Your Name",
    title: "Your Name",
    tagline: "Software Engineer · Web Architecture",
    description: "Personal blog and resume of Your Name.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
    copyright: "© 2026 Your Name",
  },
  author: {
    name: "Your Name",
    jobTitle: "Software Engineer",
    avatar: "/avatar.svg", // Place your photo in public/ (e.g. "/profile.jpg")
    avatarLink: "https://linkedin.com/in/your-handle",
    phone: "+1 (555) 019-2834",
    email: "hello@your-domain.com",
    linkedinUrl: "https://linkedin.com/in/your-handle",
    linkedinLabel: "linkedin.com/in/your-handle",
  },
  theme: {
    background: "rgb(40, 44, 53)", // Page background color
    foreground: "#ffffff",        // Main body text color
    accent: "#bc8a01",            // Titles, links & highlights
    accentHover: "#d9a212",       // Link hover color
    surface: "#1d2027",           // Code blocks, callouts & Mermaid cards
  },
  social: {
    linkedin: "https://linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    instagram: "https://instagram.com/your-handle",
  },
  footerLinks: [
    { label: "Resume", href: "/resume", external: false },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", external: true },
    { label: "GitHub", href: "https://github.com/your-handle", external: true },
    { label: "Instagram", href: "https://instagram.com/your-handle", external: true },
  ],
  labels: {
    backToPosts: "← Back to all posts",
    emptyPosts: "No blog posts yet.",
    printResume: "Save / Print PDF",
  },
};
```

---

### Step 3: Update Your Avatar, Favicon & Resume

1. **Profile Picture**: Add your photo to `public/profile.jpg` and set `author.avatar: "/profile.jpg"` in `src/blog.config.ts`.
2. **Favicon**: Replace `src/app/favicon.ico` with your own icon.
3. **Resume (`/resume`)**: Edit `src/app/resume/page.md` in Markdown. The contact header is generated automatically from `blogConfig.author`, and visitors can click **Save / Print PDF** for a print-formatted copy.

---

### Step 4: Write & Publish Blog Posts

1. Create a new folder under `src/app/(posts)/<your-post-slug>/`.
2. Add a `page.md` (or `page.mdx`) file with `export const metadata` at the top:

```mdx
export const metadata = {
  title: "My First Blog Post",
  date: "2026-11-21",
  description: "A short summary displayed on the home page.",
};

Write your Markdown content here! The post title, formatted date, and estimated reading time are rendered automatically at the top of the page.
```

#### Embedding Mermaid Charts

Use a fenced `mermaid` code block inside any `.md` or `.mdx` post to render interactive diagrams with full-screen zoom:

````markdown
```mermaid
flowchart LR
  A[Write Markdown] --> B[Next.js + MDX]
  B --> C[Published Post]
```
````

---

## 2. Local Setup & Repository Guide (For Contributors / Maintainers)

If you cloned this repository directly to run or maintain the project locally, follow the steps below.

### Prerequisites

- **Node.js** `>= 20`
- **pnpm** (recommended) or `npm` / `yarn`

### Install & Run Locally

```bash
# 1. Install dependencies
pnpm install

# 2. Start the local development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to preview the site.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start the Next.js development server with Turbopack |
| `pnpm build` | Build the production application and prerender static routes |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint checks |
| `pnpm cli:check` | Build the CLI starter template and dry-run `npm pack` |

### Project Structure

```text
├── .github/workflows/
│   ├── ci.yml                              # Runs lint, build & CLI pack check on every push
│   └── publish-cli.yml                     # Manual trigger to bump, publish to npm & tag release
├── public/
│   └── profile.jpg                         # Profile avatar image
├── packages/
│   └── create-mdx-blog/                    # CLI scaffolder package (npx create-mdx-blog)
│       ├── bin/index.mjs                   # CLI entry point
│       ├── scripts/
│       │   ├── build-template.mjs          # Syncs app engine & overlays sample data
│       │   └── bump-version.mjs            # SemVer auto-bumping against package, npm & tags
│       └── sample-overrides/               # Sample config, 1 sample post & sample resume
└── src/
    ├── blog.config.ts                      # Central configuration (colors, text, links)
    ├── mdx-components.tsx                  # MDX typography, code blocks & Mermaid hook
    ├── lib/
    │   ├── constants.ts                    # Config exports for SEO routes
    │   └── posts.ts                        # Post scanner & reading-time calculator
    ├── components/
    │   ├── Header.tsx                      # Static top header
    │   ├── Footer.tsx                      # Fixed bottom bar
    │   ├── PostHeader.tsx                  # Auto-rendered post title, date & reading time
    │   ├── ResumeHeader.tsx                # Resume contact header + Print PDF button
    │   ├── CodeBlock.tsx                   # Syntax-highlighted code block with Copy button
    │   ├── Mermaid.tsx                     # Mermaid diagram renderer + fullscreen modal
    │   └── LazyMermaid.tsx                 # Dynamic client loader for Mermaid
    └── app/
        ├── globals.css                     # Theme variables, fonts & print styles
        ├── layout.tsx                      # Root layout, SEO metadata & JSON-LD
        ├── page.tsx                        # Home page blog list
        ├── opengraph-image.tsx             # Dynamic OpenGraph social preview card
        ├── sitemap.ts                      # Dynamic /sitemap.xml
        ├── robots.ts                       # /robots.txt
        ├── rss.xml/route.ts                # /rss.xml feed
        ├── resume/page.md                  # Online & printable resume page
        └── (posts)/
            ├── layout.tsx                  # Shared post layout
            └── <slug>/page.md              # Individual blog posts
```

### Automated GitHub Actions Release (Recommended)

Every push to `main` and pull request automatically runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml) to validate linting, the Next.js production build, and the CLI template tarball without publishing to npm.

#### One-Time npm Trusted Publisher Setup (OIDC — No Token Needed)

Instead of storing an `NPM_TOKEN` secret, configure **Trusted Publishing (OIDC)** on your npm package settings page:

1. Open your package on [npmjs.com](https://www.npmjs.com/package/create-mdx-blog) → **Settings** → **Trusted Publisher** → **GitHub Actions**:
   - **Organization or user**: `iswanj`
   - **Repository**: `mdx-blog`
   - **Workflow filename**: `publish-cli.yml`
   - **Environment name**: *(leave blank)*
   - **Allowed actions**: Check **Allow npm publish**
2. Under **Publishing access**, you can select **Require two-factor authentication and disallow bypass 2fa tokens (recommended)**—OIDC Trusted Publishers will continue to work without any static token.

*(GitHub automatically provides `GITHUB_TOKEN` for creating release commits, Git tags, and GitHub Releases.)*

#### Publishing a New Version

1. Open **Actions** → **Publish create-mdx-blog** on GitHub.
2. Click **Run workflow**.
3. Choose the SemVer increment (`patch`, `minor`, or `major`) and optionally toggle `dry_run` to test without publishing.

The workflow validates the app, auto-bumps `packages/create-mdx-blog/package.json`, publishes `create-mdx-blog` to npm, commits the version bump with `[skip ci]`, pushes tag `vX.Y.Z`, and creates a GitHub Release with auto-generated notes.

### Publishing Locally (Manual Fallback)

If you prefer to verify or release from your local machine:

```bash
# Verify clean template generation and tarball contents
pnpm cli:check

# Or bump & publish directly
cd packages/create-mdx-blog
npm run version:bump -- patch
npm publish --access public
```
