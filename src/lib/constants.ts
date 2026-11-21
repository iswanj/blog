export const LINKEDIN_URL = "https://www.linkedin.com/in/iswanjumat/";
export const GITHUB_URL = "https://github.com/iswanj";
export const INSTAGRAM_URL = "https://www.instagram.com/iswanjumat";
export const RESUME_URL = "/resume";

export interface FooterLink {
  label: string;
  href: string;
  external: boolean;
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Resume", href: RESUME_URL, external: false },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Instagram", href: INSTAGRAM_URL, external: true },
];
