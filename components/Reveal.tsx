"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals children with a soft rise-in once they enter the viewport.
 * Important: starts in a *visible* state on the server and pre-hydration so
 * that text is never hidden by a stuck animation. Once mounted, if the element
 * is below the fold it gets hidden, then animates in via IntersectionObserver.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
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
    const inViewport =
      rect.top < window.innerHeight - 40 && rect.bottom > 40;

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

    // Safety: force-show after 900ms regardless
    const failsafe = setTimeout(() => setShown(true), 900);
    return () => {
      obs.disconnect();
      clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      data-hydrated={hydrated || undefined}
      className={`reveal ${shown ? "show" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
