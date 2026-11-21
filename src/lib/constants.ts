import { blogConfig, type FooterLinkItem } from "@/blog.config";

export const SITE_URL = blogConfig.site.url;
export const SITE_TITLE = blogConfig.site.title;
export const SITE_DESCRIPTION = blogConfig.site.description;

export const LINKEDIN_URL = blogConfig.social.linkedin ?? "";
export const GITHUB_URL = blogConfig.social.github ?? "";
export const INSTAGRAM_URL = blogConfig.social.instagram ?? "";
export const RESUME_URL = "/resume";

export type FooterLink = FooterLinkItem;
export const FOOTER_LINKS: FooterLink[] = blogConfig.footerLinks;
