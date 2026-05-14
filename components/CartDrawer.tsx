"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart, linePrice, lineTitle } from "@/lib/cart-store";
import { formulas, PACKS, INFUSOR, formatCLP } from "@/lib/products";

const SHIPPING_THRESHOLD = 25000;
const SHIPPING_COST = 3990;

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const subtotal = lines.reduce((a, l) => a + linePrice(l), 0);
  const shipping =
    subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.fallbackWhatsApp) {
        window.open(data.fallbackWhatsApp, "_blank");
        return;
      }
      setError(data.error ?? "No se pudo iniciar el pago.");
    } catch {
      setError("Error de red.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        aria-label="Canasta"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-cream-light border-l border-[var(--rule)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-[var(--rule-soft)]">
          <div>
            <p className="sans text-[10px] tracking-[0.24em] uppercase text-olive">
              Tu canasta
            </p>
            <h2 className="display text-ink text-[32px] mt-1 leading-none">
              {lines.length === 0
                ? "Vacía"
                : `${lines.length} ${lines.length === 1 ? "ítem" : "ítems"}`}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Cerrar"
            className="text-ink/70 hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 && (
            <div className="text-ink-mute text-[15px] text-center py-16">
              <p className="display text-ink text-[28px] mb-3">Aún nada.</p>
              <p className="italic mb-8">Las fórmulas te esperan.</p>
              <Link href="/precios" onClick={close} className="btn-ghost">
                Armar mi pack
              </Link>
            </div>
          )}

          <ul className="space-y-7">
            {lines.map((l) => {
              const title = lineTitle(l);
              const color =
                l.kind === "pack" && l.formulaIds[0]
                  ? formulas.find((f) => f.id === l.formulaIds[0])?.color
                  : "#7A7548";
              return (
                <li key={l.uid} className="flex gap-4 items-start">
                  <span
                    className="block h-14 w-14 rounded-md shrink-0"
                    style={{ background: color }}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="display text-ink text-[18px] leading-tight">
                        {l.kind === "pack" ? PACKS[l.size].label : INFUSOR.name}
                      </p>
                      <span className="display text-ink text-[18px] tabular-nums">
                        {formatCLP(linePrice(l))}
                      </span>
                    </div>
                    {l.kind === "pack" && (
                      <p className="text-ink-mute italic text-[13px] mt-1 line-clamp-1">
                        {title.split("·")[1]?.trim()}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[var(--rule)] rounded-full">
                        <button
                          aria-label="Disminuir"
                          onClick={() => setQty(l.uid, l.qty - 1)}
                          className="p-2 text-ink/80 hover:text-olive"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-ink text-sm tabular-nums w-6 text-center">
                          {l.qty}
                        </span>
                        <button
                          aria-label="Aumentar"
                          onClick={() => setQty(l.uid, l.qty + 1)}
                          className="p-2 text-ink/80 hover:text-olive"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        aria-label="Quitar"
                        onClick={() => remove(l.uid)}
                        className="text-ink-mute hover:text-olive"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {lines.length > 0 && (
          <div className="border-t border-[var(--rule-soft)] px-6 py-6 space-y-3">
            <Row label="Subtotal" value={formatCLP(subtotal)} />
            <Row
              label="Envío"
              value={shipping === 0 ? "Gratis" : formatCLP(shipping)}
              hint={
                subtotal < SHIPPING_THRESHOLD
                  ? `Te faltan ${formatCLP(SHIPPING_THRESHOLD - subtotal)} para envío gratis`
                  : undefined
              }
            />
            <div className="flex items-baseline justify-between pt-3 border-t border-[var(--rule-soft)]">
              <span className="sans text-[11px] tracking-[0.22em] uppercase text-ink-mute">
                Total
              </span>
              <span className="display text-ink text-[32px] tabular-nums">
                {formatCLP(total)}
              </span>
            </div>
            {error && <p className="text-[12px] text-red-700">{error}</p>}
            <button
              onClick={checkout}
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading ? "Procesando…" : "Finalizar compra"}
            </button>
            <p className="sans text-[10px] tracking-[0.16em] uppercase text-ink-mute text-center pt-1">
              Pago seguro · Envío 24–48h
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[14px]">
        <span className="text-ink-mute">{label}</span>
        <span className="text-ink tabular-nums">{value}</span>
      </div>
      {hint && <p className="text-[11px] text-olive mt-1 italic">{hint}</p>}
    </div>
  );
}
