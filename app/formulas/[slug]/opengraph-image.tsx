import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getFormula } from "@/lib/products";

export const alt = "Herbalé — fórmula";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFormula(slug);
  if (!f) {
    return new ImageResponse(<div />, size);
  }

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
          padding: "72px 96px",
          position: "relative",
          fontFamily: "serif",
          color: "#2A1814",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 720,
            height: 720,
            borderRadius: 720,
            background: f.color,
            opacity: 0.22,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#5a4036",
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
            Herbalé · Fórmula
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Higuen",
                fontSize: 248,
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: f.color,
              }}
            >
              {f.name}
            </div>
            <div
              style={{
                fontStyle: "italic",
                fontSize: 38,
                lineHeight: 1.2,
                color: "#2A1814",
                marginTop: 24,
                maxWidth: 920,
              }}
            >
              {f.benefit}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              fontStyle: "italic",
              fontSize: 22,
              color: "#5a4036",
            }}
          >
            {f.ingredients.map((ing) => (
              <span
                key={ing}
                style={{
                  border: "1px solid rgba(42,24,20,0.28)",
                  borderRadius: 999,
                  padding: "8px 18px",
                }}
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Higuen", data: higuen, style: "normal", weight: 400 }],
    },
  );
}
