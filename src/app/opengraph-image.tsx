import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #F5F0EB 0%, #FAF8F5 50%, #E8E0D5 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.35em",
            color: "#8B7355",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Organic Bath Salt
        </div>
        <div
          style={{
            fontSize: 72,
            color: "#2D4A3E",
            letterSpacing: "0.1em",
          }}
        >
          Calm Trinity
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#6B6B6B",
            marginTop: 32,
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          植物の恵みを感じる、上質なバスソルト
        </div>
      </div>
    ),
    { ...size },
  );
}
