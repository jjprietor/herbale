import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Herbalé — Hierbas con propósito";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const higuen = await readFile(
    join(process.cwd(), "public/fonts/Higuen.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#EEDDC7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          fontFamily: "Higuen",
          color: "#2A1814",
          position: "relative",
        }}
      >
        {/* Olive medallion in the corner */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 540,
            height: 540,
            borderRadius: 540,
            background: "#89753D",
            opacity: 0.18,
          }}
        />

        {/* Top: brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#5a4036",
            fontFamily: "serif",
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 38,
              background: "#89753D",
              color: "#EEDDC7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Higuen",
              fontSize: 26,
            }}
          >
            H
          </span>
          Herbalé
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Higuen",
              fontSize: 196,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "#2A1814",
            }}
          >
            Herbalé
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: 40,
              lineHeight: 1.15,
              color: "#89753D",
              marginTop: 28,
              maxWidth: 880,
            }}
          >
            Hierbas con propósito — seis fórmulas, hojas enteras, lotes pequeños.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "serif",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5a4036",
          }}
        >
          <span>herbale.cl</span>
          <span style={{ display: "flex", gap: 18 }}>
            <span style={{ color: "#89753D" }}>● Digest</span>
            <span style={{ color: "#9BA3C0" }}>● Zeta</span>
            <span style={{ color: "#FFABEE" }}>● Kalma</span>
            <span style={{ color: "#F8B255" }}>● Focus</span>
            <span style={{ color: "#6B102F" }}>● Cyclo</span>
            <span style={{ color: "#EB743D" }}>● Inmuna</span>
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Higuen", data: higuen, style: "normal", weight: 400 }],
    },
  );
}
