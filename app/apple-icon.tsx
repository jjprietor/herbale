import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const higuen = await readFile(
    join(process.cwd(), "public/fonts/Higuen.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#89753D",
          color: "#EEDDC7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Higuen",
          fontSize: 132,
          lineHeight: 1,
          paddingTop: 8,
        }}
      >
        H
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Higuen", data: higuen, style: "normal", weight: 400 }],
    },
  );
}
