import { ImageResponse } from "next/og";
import { ABOUT } from "@/lib/content/about";

export const alt = "Sheikh Mohsin | Computer Science & Business Analytics";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#24273a",
        color: "#cad3f5",
        fontFamily: "monospace",
        padding: "72px",
        border: "24px solid #1e2030",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#c6a0f6",
            letterSpacing: 0,
          }}
        >
          {ABOUT.name}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#f5bde6",
            letterSpacing: 0,
          }}
        >
          {ABOUT.role}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#a5adcb",
            letterSpacing: 0,
          }}
        >
          {ABOUT.location}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          fontSize: 32,
          color: "#8aadf4",
        }}
      >
        <span>Systems</span>
        <span style={{ color: "#5b6078" }}>/</span>
        <span>Data</span>
        <span style={{ color: "#5b6078" }}>/</span>
        <span>Research</span>
      </div>
    </div>,
    size,
  );
}
