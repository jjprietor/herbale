"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function AddToCart({ id }: { id: string }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex items-center border border-[var(--rule)] rounded-full">
        <button
          aria-label="Disminuir"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="p-3 text-cream/80 hover:text-gold"
        >
          <Minus size={14} />
        </button>
        <span className="px-3 text-cream text-sm tabular-nums w-8 text-center">
          {qty}
        </span>
        <button
          aria-label="Aumentar"
          onClick={() => setQty((q) => q + 1)}
          className="p-3 text-cream/80 hover:text-gold"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={() => add(id, qty)}
        className="gold-fill"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
