import { ImageResponse } from "next/og";
import { SITE_TITLE } from "@/lib/constants";

export const alt = SITE_TITLE;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "rgb(40, 44, 53)",
          color: "#ffffff",
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "96px",
            height: "6px",
            backgroundColor: "#bc8a01",
            borderRadius: "3px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#bc8a01",
              lineHeight: 1.1,
            }}
          >
            {SITE_TITLE}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            Technology Lead · React Native, Web Architecture &amp; Engineering
            Leadership
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.55)",
          }}
        >
          iswanjumat.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
