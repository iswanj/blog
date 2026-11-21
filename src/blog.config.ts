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
    name: "Iswan Jumat",
    title: "Iswan Jumat",
    tagline:
      "Technology Lead · React Native, Web Architecture & Engineering Leadership",
    description:
      "Personal blog by Iswan Jumat — Technology Lead writing about React Native, React, web architecture, and engineering leadership.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iswanjumat.com",
    copyright: "© 2026 Iswan Jumat",
  },
  author: {
    name: "Iswan Jumat",
    jobTitle: "Technology Lead",
    avatar: "/profile.jpg",
    avatarLink: "https://www.linkedin.com/in/iswanjumat/",
    phone: "+60 11 7242 6630",
    email: "ask@iswanjumat.com",
    linkedinUrl: "https://www.linkedin.com/in/iswanjumat/",
    linkedinLabel: "linkedin.com/in/iswanjumat/",
  },
  theme: {
    background: "rgb(40, 44, 53)",
    foreground: "#ffffff",
    accent: "#bc8a01",
    accentHover: "#d9a212",
    surface: "#1d2027",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/iswanjumat/",
    github: "https://github.com/iswanj",
    instagram: "https://www.instagram.com/iswanjumat",
  },
  footerLinks: [
    { label: "Resume", href: "/resume", external: false },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/iswanjumat/",
      external: true,
    },
    { label: "GitHub", href: "https://github.com/iswanj", external: true },
    {
      label: "Instagram",
      href: "https://www.instagram.com/iswanjumat",
      external: true,
    },
  ],
  labels: {
    backToPosts: "← Back to all posts",
    emptyPosts: "No blog posts yet.",
    printResume: "Save / Print PDF",
  },
};
