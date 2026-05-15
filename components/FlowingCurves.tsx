"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One single golden line, top to bottom, drawn with C1-continuous Beziers.
 *
 * Implementation note: every segment after the first uses an `S` command,
 * which reflects the previous control point across the join — that's what
 * guarantees the tangent is continuous and the line never breaks. There is
 * no second path, no closing curl, no special-case arc.
 */
export function FlowingCurves() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const lineLen = useRef(0);
  const [size, setSize] = useState({ w: 1400, h: 2400 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    lineLen.current = p.getTotalLength();
    p.style.strokeDasharray = String(lineLen.current);
  }, [size]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const wrap = wrapRef.current;
      const p = pathRef.current;
      if (wrap && p) {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const traveled = vh - rect.top;
        const progress = Math.max(0, Math.min(1, traveled / total));
        // Draw across the first 80% of scroll so the line is complete before
        // the user reaches the footer.
        const drawn = Math.max(0, Math.min(1, progress / 0.8));
        p.style.strokeDashoffset = String(lineLen.current * (1 - drawn));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { w, h } = size;

  // Geometry: a wide arch over the hero (around Herbalé) then a sequence of
  // S-curve weaves to the bottom. Amplitudes shrink slightly so the line
  // converges toward the center as it ends.
  const arcR = Math.min(w * 0.45, 640);
  const cx = w / 2;
  const top = Math.min(h * 0.36, 880); // where the arch sits visually
  const bottom = h - 24;

  // Pass-through nodes for the line. Alternating sides for a slow weave.
  const nodes: Array<[number, number]> = [
    [cx - arcR * 1.1, top * 0.55],
    [cx + arcR * 1.1, top * 0.55], // exits the upper arch on the right
    [cx - arcR * 0.85, top + arcR * 0.9],
    [cx + arcR * 0.85, top + arcR * 1.9],
    [cx - arcR * 0.75, top + arcR * 2.95],
    [cx + arcR * 0.7, top + arcR * 4.0],
    [cx - arcR * 0.55, top + arcR * 5.05],
    [cx + arcR * 0.45, top + arcR * 6.1],
    [cx, bottom],
  ];

  // Push y values past the wrapper bottom downward proportionally so the line
  // really reaches the page bottom on long pages.
  const lastNodeY = nodes[nodes.length - 2][1];
  const scaleY = lastNodeY > 0 ? (bottom - top * 0.55) / (lastNodeY - top * 0.55) : 1;
  for (let i = 1; i < nodes.length - 1; i++) {
    nodes[i][1] = top * 0.55 + (nodes[i][1] - top * 0.55) * scaleY;
  }

  // Build the path. First segment is an explicit C that defines the upper
  // arch peak (control points go ABOVE the start/end to make the curve crest
  // above Herbalé). Subsequent segments are smooth S continuations.
  const [n0, n1, ...rest] = nodes;
  const archPeak = Math.max(20, top * 0.55 - arcR * 0.85);
  const segs = [
    `M ${n0[0]} ${n0[1]}`,
    `C ${n0[0]} ${archPeak}, ${n1[0]} ${archPeak}, ${n1[0]} ${n1[1]}`,
  ];

  // Pick second control points for each subsequent S that gently swings the
  // curve toward the next node on the opposite side. The control point sits
  // on the same side as the upcoming node, halfway between nodes.
  let prev = n1;
  for (let i = 0; i < rest.length; i++) {
    const cur = rest[i];
    // Place cp2 a bit "past" the midpoint horizontally toward the node side,
    // and slightly above the node vertically — gives a soft S shape.
    const midX = (prev[0] + cur[0]) / 2;
    const cp2x = midX + (cur[0] - midX) * 0.55;
    const cp2y = cur[1] - (cur[1] - prev[1]) * 0.32;
    segs.push(`S ${cp2x} ${cp2y}, ${cur[0]} ${cur[1]}`);
    prev = cur;
  }

  const d = segs.join(" ");

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        overflow="visible"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="herbale-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6c277" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#d6b06a" stopOpacity="0.78" />
            <stop offset="70%" stopColor="#b8923f" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8a6b2c" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="url(#herbale-gold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
