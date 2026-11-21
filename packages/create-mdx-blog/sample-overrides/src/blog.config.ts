export interface FooterLinkItem {
  label: string;
  href: string;
  external: boolean;
}

export interface BlogConfig {
  site: {
    name: string;
    title: string;
    tagline: string;
    description: string;
    url: string;
    copyright: string;
  };
  author: {
    name: string;
    jobTitle: string;
    avatar: string;
    avatarLink: string;
    phone?: string;
    email?: string;
    linkedinUrl?: string;
    linkedinLabel?: string;
  };
  theme: {
    background: string;
    foreground: string;
    accent: string;
    accentHover: string;
    surface: string;
  };
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  footerLinks: FooterLinkItem[];
  labels: {
    backToPosts: string;
    emptyPosts: string;
    printResume: string;
  };
}

export const blogConfig: BlogConfig = {
  site: {
    name: "Alex Morgan",
    title: "Alex Morgan",
    tagline: "Software Engineer · Web Architecture & Developer Tools",
    description:
      "Personal blog and resume of Alex Morgan — writing about software engineering, web architecture, and developer workflows.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    copyright: "© 2026 Alex Morgan",
  },
  author: {
    name: "Alex Morgan",
    jobTitle: "Software Engineer",
    avatar: "/avatar.svg",
    avatarLink: "https://linkedin.com",
    phone: "+1 (555) 019-2834",
    email: "hello@example.com",
    linkedinUrl: "https://linkedin.com/in/your-handle",
    linkedinLabel: "linkedin.com/in/your-handle",
  },
  theme: {
    background: "#0f172a",
    foreground: "#f8fafc",
    accent: "#38bdf8",
    accentHover: "#7dd3fc",
    surface: "#1e293b",
  },
  social: {
    linkedin: "https://linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    instagram: "https://instagram.com/your-handle",
  },
  footerLinks: [
    { label: "Resume", href: "/resume", external: false },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/your-handle",
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/your-handle",
      external: true,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/your-handle",
      external: true,
    },
  ],
  labels: {
    backToPosts: "← Back to all posts",
    emptyPosts: "No blog posts yet.",
    printResume: "Save / Print PDF",
  },
};
