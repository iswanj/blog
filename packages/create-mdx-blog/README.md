# Minimalist Next.js + MDX Blog (`create-mdx-blog`)

Scaffold a fast, minimalist personal blog and interactive resume built with **Next.js 16 (App Router)**, **MDX (`@next/mdx`)**, **Tailwind CSS v4**, **Shiki syntax highlighting**, and **Mermaid** diagrams—configured from a single `src/blog.config.ts` file.

## Quick Start

Create a new blog using your favorite package manager:

```bash
# npx
npx create-mdx-blog my-blog

# pnpm
pnpm create mdx-blog my-blog

# npm
npm create mdx-blog@latest my-blog

# yarn
yarn create mdx-blog my-blog
```

Then install dependencies and start the dev server:

```bash
cd my-blog
pnpm install
pnpm dev
```

## Customizing Your Blog

Edit `src/blog.config.ts` to change:
- **Site & Author info**: Name, tagline, domain URL, avatar image, and resume contact details
- **Theme colors**: `background`, `foreground`, `accent`, `accentHover`, and `surface`
- **Social & Footer links**: Resume, LinkedIn, GitHub, Instagram, or any custom links

## Writing Posts & Editing Your Resume

- **Blog posts**: Add a folder under `src/app/(posts)/<slug>/page.md` (or `page.mdx`).
- **Resume**: Edit `src/app/resume/page.md` (includes built-in print/PDF styling).
