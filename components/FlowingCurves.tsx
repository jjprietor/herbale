"use client";

import { useEffect, useRef } from "react";

/**
 * Two intertwined curves that span the homepage. Animate stroke-dashoffset
 * proportionally to scroll progress so the lines "draw" as the user reads.
 */
export function FlowingCurves() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathA = useRef<SVGPathElement | null>(null);
  const pathB = useRef<SVGPathElement | null>(null);
  const lenA = useRef(0);
  const lenB = useRef(0);

  useEffect(() => {
    const a = pathA.current;
    const b = pathB.current;
    if (!a || !b) return;
    lenA.current = a.getTotalLength();
    lenB.current = b.getTotalLength();
    a.style.strokeDasharray = String(lenA.current);
    b.style.strokeDasharray = String(lenB.current);
    a.style.strokeDashoffset = String(lenA.current);
    b.style.strokeDashoffset = String(lenB.current);

    let rafId = 0;
    const tick = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when top is at vh, 1 when bottom is at 0.
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const progress = Math.max(0, Math.min(1, traveled / total));

      // A: draws on the first 70% of scroll.
      const pA = Math.max(0, Math.min(1, progress / 0.7));
      a.style.strokeDashoffset = String(lenA.current * (1 - pA));
      // B: starts later, finishes near the end.
      const pB = Math.max(0, Math.min(1, (progress - 0.15) / 0.7));
      b.style.strokeDashoffset = String(lenB.current * (1 - pB));

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
    >
      <svg
        viewBox="0 0 1400 3000"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Curve A — left-to-right weave */}
        <path
          ref={pathA}
          d="
            M 80 760
            A 620 620 0 0 1 1320 760
            C 1480 820 1240 1080 1080 1180
            C 880 1320 380 1240 220 1420
            C 60 1620 320 1900 660 1860
            C 1040 1820 1380 1640 1260 1980
            C 1140 2320 540 2380 380 2620
            C 280 2800 700 2900 1100 2860
          "
          fill="none"
          stroke="rgba(31,20,13,0.18)"
          strokeWidth="1.1"
        />
        {/* Curve B — right-to-left weave, crosses A */}
        <path
          ref={pathB}
          d="
            M 1320 760
            A 620 620 0 0 0 80 760
            C -80 880 280 1140 460 1220
            C 700 1320 1080 1200 1240 1380
            C 1420 1580 1140 1860 780 1820
            C 420 1780 120 1620 240 1980
            C 380 2380 1020 2400 1180 2620
            C 1300 2780 880 2900 480 2860
          "
          fill="none"
          stroke="rgba(90,86,58,0.22)"
          strokeWidth="1.1"
        />
        {/* Three quiet dots where curves intersect — tiny editorial detail */}
        <circle cx="700" cy="1230" r="3" fill="rgba(31,20,13,0.45)" />
        <circle cx="760" cy="1820" r="3" fill="rgba(31,20,13,0.45)" />
        <circle cx="800" cy="2620" r="3" fill="rgba(31,20,13,0.45)" />
      </svg>
    </div>
  );
}
