import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Owner: Studio (A). Default social preview (1200×630) in the brand gradient. Pages inherit it.
export const alt = site.title;
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "white", backgroundImage: "linear-gradient(46deg, #003687 3%, #0077ff 100%)", fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 8 }}>RAISETALKS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 68, lineHeight: 1.1 }}>Global Fundraising & Due Diligence</div>
          <div style={{ fontSize: 60, fontStyle: "italic", fontFamily: "serif", color: "#ffab0e" }}>for early-stage ventures</div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>AI fundraising workspace for founders and investors</div>
      </div>
    ),
    size,
  );
}
