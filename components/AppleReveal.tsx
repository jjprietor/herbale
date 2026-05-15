"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Apple-store style reveal: slow ease-out lift with subtle scale + blur lift.
 * Defaults to visible so server-rendered text is never invisible.
 */
export function AppleReveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    setHydrated(true);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight - 80 && rect.bottom > 80;
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
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(el);
    const failsafe = setTimeout(() => setShown(true), 1500);
    return () => {
      obs.disconnect();
      clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <As
      ref={ref}
      data-hydrated={hydrated || undefined}
      className={`apple-reveal ${shown ? "shown" : ""} ${className}`}
    >
      {children}
    </As>
  );
}
