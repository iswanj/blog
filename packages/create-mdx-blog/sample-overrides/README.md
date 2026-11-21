# My Personal MDX Blog

Built with [create-mdx-blog](https://www.npmjs.com/package/create-mdx-blog) using **Next.js 16**, **MDX**, **Tailwind CSS v4**, **Shiki**, and **Mermaid**.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customizing Your Blog (`src/blog.config.ts`)

All site text, author info, social links, and theme colors live in `src/blog.config.ts`:

- **Colors**: Change `theme.background`, `theme.foreground`, `theme.accent`, `theme.accentHover`, and `theme.surface`.
- **Author & Avatar**: Replace `public/avatar.svg` (or add `public/profile.jpg`) and update `author` in `src/blog.config.ts`.
- **Resume**: Update `src/app/resume/page.md` with your experience and skills.
- **New Posts**: Create `src/app/(posts)/<your-slug>/page.md` with `export const metadata = { title, date, description }`.
