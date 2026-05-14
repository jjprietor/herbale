"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { products, formatCLP } from "@/lib/products";

const SHIPPING_THRESHOLD = 25000;
const SHIPPING_COST = 3990;

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart();
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

  const lineItems = items
    .map((i) => {
      const p = products.find((p) => p.id === i.id);
      if (!p) return null;
      return { ...p, qty: i.qty };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = lineItems.reduce((a, b) => a + b.price * b.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
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
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        aria-label="Carrito"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background-deep border-l border-[var(--rule)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--rule-soft)]">
          <div>
            <p className="text-gold text-[10px] tracking-[0.24em] uppercase">
              Tu canasta
            </p>
            <h2 className="serif text-cream text-2xl mt-1">
              {lineItems.length === 0
                ? "Vacía"
                : `${lineItems.length} ${lineItems.length === 1 ? "fórmula" : "fórmulas"}`}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Cerrar carrito"
            className="text-cream/70 hover:text-cream"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lineItems.length === 0 && (
            <div className="text-foreground-muted text-sm text-center py-16">
              Aún no has elegido ninguna fórmula.
              <div className="mt-6">
                <Link href="/shop" onClick={close} className="gold-link">
                  Explorar tienda
                </Link>
              </div>
            </div>
          )}

          <ul className="space-y-5">
            {lineItems.map((p) => (
              <li key={p.id} className="flex gap-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-background-soft">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="serif text-cream text-[16px] leading-tight truncate">
                        {p.name}
                      </p>
                      <p className="text-foreground-muted text-[11px] truncate">
                        {p.tagline}
                      </p>
                    </div>
                    <span className="text-gold text-[13px] tabular-nums">
                      {formatCLP(p.price * p.qty)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border border-[var(--rule)] rounded-full">
                      <button
                        aria-label="Disminuir"
                        onClick={() => setQty(p.id, p.qty - 1)}
                        className="p-2 text-cream/80 hover:text-gold"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-cream text-sm tabular-nums w-6 text-center">
                        {p.qty}
                      </span>
                      <button
                        aria-label="Aumentar"
                        onClick={() => setQty(p.id, p.qty + 1)}
                        className="p-2 text-cream/80 hover:text-gold"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      aria-label="Quitar"
                      onClick={() => remove(p.id)}
                      className="text-foreground-muted hover:text-gold"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {lineItems.length > 0 && (
          <div className="border-t border-[var(--rule-soft)] px-6 py-5 space-y-3">
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
            <div className="flex items-baseline justify-between pt-2 border-t border-[var(--rule-soft)]">
              <span className="text-cream text-sm tracking-wide">Total</span>
              <span className="serif gold-text text-2xl tabular-nums">
                {formatCLP(total)}
              </span>
            </div>
            {error && <p className="text-[12px] text-red-300">{error}</p>}
            <button
              onClick={checkout}
              disabled={loading}
              className="gold-fill w-full justify-center mt-2"
            >
              {loading ? "Procesando…" : "Finalizar compra"}
            </button>
            <p className="text-[11px] text-foreground-muted/70 text-center">
              Pago seguro. Envío en 24–48h dentro de Chile.
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
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-foreground-muted">{label}</span>
        <span className="text-cream tabular-nums">{value}</span>
      </div>
      {hint && (
        <p className="text-[11px] text-gold/80 mt-1">{hint}</p>
      )}
    </div>
  );
}
