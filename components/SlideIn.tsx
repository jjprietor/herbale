"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "left" | "right" | "bottom";

/**
 * Slide-in reveal that defaults to visible so server-rendered text is never
 * stuck invisible. Only animates once hydrated + the element comes into view.
 */
export function SlideIn({
  from = "bottom",
  delay = 0,
  children,
  className = "",
}: {
  from?: Direction;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    setHydrated(true);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight - 40 && rect.bottom > 40;
    if (inViewport) {
      setShown(true);
      return;
    }
    setShown(false);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);

    const failsafe = setTimeout(() => setShown(true), 1200);
    return () => {
      obs.disconnect();
      clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      data-hydrated={hydrated || undefined}
      className={`slide-in slide-${from} ${shown ? "show" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
