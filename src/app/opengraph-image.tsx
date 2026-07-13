import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PILLAR_HEX: Record<string, string> = {
  eng: "#FF6719",
  ai: "#F0B546",
  path: "#D97A9B",
};

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            margin: 24,
            border: "1px solid #1e1e1e",
            background: "#141414",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            {site.identityStrip.map((panel) => {
              const hex = PILLAR_HEX[panel.pillar];
              return (
                <div
                  key={panel.glyph}
                  style={{
                    display: "flex",
                    flex: 1,
                    position: "relative",
                    background: `radial-gradient(circle at 50% 35%, ${hex}33 0%, #141414 70%)`,
                    borderRight: "1px solid #0a0a0a",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      bottom: 22,
                      left: 18,
                      color: hex,
                      fontSize: 15,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    {panel.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              inset: 0,
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.72) 45%, rgba(10,10,10,0.15) 100%)",
              padding: "0 96px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#f5f0ea",
                fontSize: 56,
                lineHeight: 1.05,
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                display: "flex",
                color: "#FF6719",
                fontSize: 30,
                marginTop: 18,
              }}
            >
              {site.tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
