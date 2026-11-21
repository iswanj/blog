import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist_Mono, Merriweather, Montserrat } from "next/font/google";
import type { CSSProperties } from "react";
import { blogConfig } from "@/blog.config";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(blogConfig.site.url),
  title: {
    default: blogConfig.site.title,
    template: `%s — ${blogConfig.site.title}`,
  },
  description: blogConfig.site.description,
  authors: [{ name: blogConfig.author.name, url: blogConfig.site.url }],
  creator: blogConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: blogConfig.site.url,
    siteName: blogConfig.site.title,
    title: blogConfig.site.title,
    description: blogConfig.site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: blogConfig.site.title,
    description: blogConfig.site.description,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${blogConfig.site.url}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sameAsLinks = [
  blogConfig.social.linkedin,
  blogConfig.social.github,
  blogConfig.social.instagram,
].filter((url): url is string => Boolean(url));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: blogConfig.author.name,
      url: blogConfig.site.url,
      jobTitle: blogConfig.author.jobTitle,
      sameAs: sameAsLinks,
    },
    {
      "@type": "WebSite",
      name: blogConfig.site.title,
      url: blogConfig.site.url,
      description: blogConfig.site.description,
    },
  ],
};

const themeStyle = {
  "--background": blogConfig.theme.background,
  "--foreground": blogConfig.theme.foreground,
  "--accent": blogConfig.theme.accent,
  "--accent-hover": blogConfig.theme.accentHover,
  "--surface": blogConfig.theme.surface,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={themeStyle}
      className={`${montserrat.variable} ${merriweather.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-12 pb-16">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
