import { ImageResponse } from "next/og";
import { blogConfig } from "@/blog.config";

export const alt = blogConfig.site.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const domain = blogConfig.site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: blogConfig.theme.background,
          color: blogConfig.theme.foreground,
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "96px",
            height: "6px",
            backgroundColor: blogConfig.theme.accent,
            borderRadius: "3px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: blogConfig.theme.accent,
              lineHeight: 1.1,
            }}
          >
            {blogConfig.site.title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            {blogConfig.site.tagline}
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.55)",
          }}
        >
          {domain}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
