import { ResumeHeader } from "@/components/ResumeHeader";

export const metadata = {
  title: "Resume",
  description: "Sample resume page — edit src/app/resume/page.md with your experience and skills.",
};

<div className="resume-page">

<ResumeHeader />

## Summary

Senior Software Engineer with 8+ years of experience building fast, accessible web and mobile applications. Passionate about clean architecture, developer experience, and technical mentorship.

---

## Professional Experience

### Senior Software Engineer · Acme Corp
<p className="text-xs text-white/60 -mt-2 mb-4">Jan 2023 – Present</p>

- Led architecture and delivery of the core customer web platform using Next.js, TypeScript, and Tailwind CSS.
- Improved page load performance by 35% through server-side rendering, caching, and bundle optimization.
- Mentored engineers through code reviews, architecture RFCs, and pair programming.

### Software Engineer · Example Labs
<p className="text-xs text-white/60 -mt-2 mb-4">Jun 2019 – Dec 2022</p>

- Built and maintained cross-platform web and mobile applications serving 100k+ monthly active users.
- Automated CI/CD pipelines and testing workflows using GitHub Actions and Jest.

---

## Skills

- **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5/CSS3
- **Backend & Data:** Node.js, PostgreSQL, REST APIs, GraphQL, Redis
- **Tooling & DevOps:** Git, GitHub Actions, Docker, Vercel, TDD

---

<p className="print:hidden">
  <a href="/">← Back to all posts</a>
</p>

</div>
