import type { Formula } from "@/lib/products";

type Props = {
  formula: Formula;
  size?: number;
  className?: string;
  /** Show full label text (name, ingredients) */
  detailed?: boolean;
};

function Motif({ kind, color }: { kind: Formula["motif"]; color: string }) {
  const stroke = color;
  switch (kind) {
    case "spring":
      return (
        <path
          d="M -10 0 q 5 -8 10 0 t 10 0 t 10 0 t 10 0"
          transform="translate(0,0)"
          fill="none"
          stroke={stroke}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      );
    case "zigzag":
      return (
        <>
          <path d="M -14 -8 q 4 -4 8 0 t 8 0 t 8 0 t 8 0" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -14 0 q 4 -4 8 0 t 8 0 t 8 0 t 8 0" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -14 8 q 4 -4 8 0 t 8 0 t 8 0 t 8 0" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
    case "leaf":
      return (
        <g>
          <path d="M 0 -14 C -10 -8 -10 6 0 14 C 10 6 10 -8 0 -14 Z" fill={stroke} opacity="0.92" />
          <path d="M 0 -10 L 0 12" stroke={stroke === "#ebdfc4" ? "#3D2A1F22" : "#ffffff66"} strokeWidth="1.2" />
        </g>
      );
    case "star":
      return (
        <path
          d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z"
          fill={stroke}
        />
      );
    case "heart":
      return (
        <g>
          <path d="M 0 12 C -16 2 -14 -12 -4 -10 C 0 -10 0 -6 0 -4 C 0 -6 0 -10 4 -10 C 14 -12 16 2 0 12 Z" fill={stroke} />
          <circle cx="9" cy="-2" r="2" fill={stroke} />
          <circle cx="12" cy="3" r="1.4" fill={stroke} />
        </g>
      );
    case "branch":
      return (
        <g>
          <path d="M 0 -16 C -8 -10 -8 -4 0 0 C 8 -4 8 -10 0 -16 Z" fill={stroke} />
          <path d="M -12 4 C -6 8 -2 10 4 6" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M -6 12 C 0 14 6 12 10 8" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
  }
}

export function Bottle({ formula, size = 280, className, detailed = true }: Props) {
  const w = size;
  const h = Math.round(size * 1.8);
  return (
    <svg
      viewBox="0 0 200 360"
      width={w}
      height={h}
      className={className}
      aria-label={`Frasco ${formula.name}`}
    >
      <defs>
        <linearGradient id={`glass-${formula.id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3a2616" />
          <stop offset="0.5" stopColor="#5b3a22" />
          <stop offset="1" stopColor="#2a1a0e" />
        </linearGradient>
        <linearGradient id={`cork-${formula.id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c89a64" />
          <stop offset="1" stopColor="#8c6a44" />
        </linearGradient>
        <linearGradient id={`shine-${formula.id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="100" cy="346" rx="62" ry="6" fill="#2a1c14" opacity="0.18" />

      {/* cork */}
      <rect x="78" y="14" width="44" height="34" rx="3" fill={`url(#cork-${formula.id})`} />
      <rect x="78" y="14" width="44" height="6" fill="#000" opacity="0.22" />
      {/* neck */}
      <rect x="80" y="46" width="40" height="22" fill={`url(#glass-${formula.id})`} />
      <rect x="78" y="62" width="44" height="10" rx="2" fill={`url(#glass-${formula.id})`} />
      {/* body */}
      <path
        d="M 60 80 Q 60 70 78 70 L 122 70 Q 140 70 140 80 L 140 332 Q 140 344 128 344 L 72 344 Q 60 344 60 332 Z"
        fill={`url(#glass-${formula.id})`}
      />
      {/* shine */}
      <path
        d="M 68 90 Q 68 80 84 80 L 92 80 L 92 332 Q 92 340 84 340 L 76 340 Q 68 340 68 332 Z"
        fill={`url(#shine-${formula.id})`}
      />

      {/* label */}
      <rect x="68" y="120" width="64" height="186" fill={formula.color} />

      {/* label brand */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fill={formula.labelText}
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: 14,
          fontStyle: "italic",
          fontWeight: 400,
        }}
      >
        Herbalé
      </text>
      <text
        x="100"
        y="154"
        textAnchor="middle"
        fill={formula.labelText}
        opacity="0.75"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: 6,
          letterSpacing: "0.05em",
        }}
      >
        Hierbas con propósito
      </text>

      {/* ingredient column (left-aligned, tiny) */}
      {detailed && (
        <g
          transform="translate(76,170)"
          fill={formula.labelText}
          opacity="0.78"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: 5,
          }}
        >
          {formula.ingredients.slice(0, 6).map((ing, i) => (
            <text key={ing} x="0" y={i * 7}>
              {ing}
            </text>
          ))}
        </g>
      )}

      {/* motif */}
      <g transform="translate(100,240)">
        <Motif kind={formula.motif} color={formula.labelText} />
      </g>

      {/* name */}
      <text
        x="100"
        y="284"
        textAnchor="middle"
        fill={formula.labelText}
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: 18,
          fontWeight: 400,
        }}
      >
        {formula.name}
      </text>
      <text
        x="100"
        y="298"
        textAnchor="middle"
        fill={formula.labelText}
        opacity="0.6"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: 5,
          letterSpacing: "0.04em",
        }}
      >
        Producto chileno
      </text>
    </svg>
  );
}
