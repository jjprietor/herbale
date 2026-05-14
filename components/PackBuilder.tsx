"use client";

import { useState, useMemo } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { Bottle } from "./Bottle";
import {
  PACKS,
  INFUSOR,
  formulas,
  formatCLP,
  type PackSize,
  type Formula,
} from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function PackBuilder() {
  const [size, setSize] = useState<PackSize>(3);
  const [selected, setSelected] = useState<Formula["id"][]>([]);
  const [addInfusor, setAddInfusor] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const pack = PACKS[size];
  const remaining = pack.size - selected.length;
  const isFull = remaining === 0;
  const canAdd = size === 6 || remaining === 0;

  // For pack 6, auto-selection of all formulas
  const finalIds = useMemo<Formula["id"][]>(
    () => (size === 6 ? formulas.map((f) => f.id) : selected),
    [size, selected],
  );

  const addToCart = useCart((s) => s.addPack);
  const addInfusorToCart = useCart((s) => s.addInfusor);

  function toggle(id: Formula["id"]) {
    if (size === 6) return;
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= pack.size) return [...cur.slice(1), id];
      return [...cur, id];
    });
  }

  function changeSize(s: PackSize) {
    setSize(s);
    if (s === 1) setSelected((cur) => cur.slice(0, 1));
    if (s === 3) setSelected((cur) => cur.slice(0, 3));
    if (s === 6) setSelected([]); // not used
  }

  function handleAdd() {
    addToCart(size, finalIds);
    if (addInfusor) addInfusorToCart(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    if (size !== 6) setSelected([]);
    setAddInfusor(false);
  }

  const totalNow =
    pack.price + (addInfusor ? INFUSOR.price : 0);

  return (
    <section id="armar" className="bg-cream">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-[1fr_1.1fr] gap-14 md:gap-20 items-start">
        {/* Left — title + pack selector + cta */}
        <div className="md:sticky md:top-28">
          <p className="sans text-[11px] tracking-[0.28em] uppercase text-olive mb-5">
            · Arma tu pack
          </p>
          <h2 className="display text-ink text-[clamp(48px,7vw,96px)] leading-[0.94] mb-10">
            Elige el<br />tamaño.
          </h2>

          <div className="space-y-3 mb-10">
            {Object.values(PACKS).map((p) => {
              const active = size === p.size;
              return (
                <button
                  key={p.size}
                  onClick={() => changeSize(p.size as PackSize)}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 px-6 py-5 flex items-baseline gap-4 ${
                    active
                      ? "border-ink bg-ink text-cream-light"
                      : "border-[var(--rule)] bg-transparent text-ink hover:border-ink"
                  }`}
                >
                  <span className="display text-[26px] md:text-[32px] leading-none">
                    {p.label}
                  </span>
                  {p.discount > 0 && (
                    <span
                      className={`sans text-[11px] tracking-[0.18em] uppercase ${
                        active ? "text-cream-light/85" : "text-olive"
                      }`}
                    >
                      -{p.discount}%
                    </span>
                  )}
                  <span className="leader" />
                  <span className="display text-[20px] md:text-[24px] tabular-nums">
                    {formatCLP(p.price)}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-3 mb-10 cursor-pointer select-none group">
            <span
              className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                addInfusor
                  ? "bg-ink border-ink"
                  : "border-ink/60 group-hover:border-ink"
              }`}
            >
              {addInfusor && <Check size={12} className="text-cream-light" />}
            </span>
            <span className="text-ink text-[15px]">
              Agregar Infusor de clip{" "}
              <span className="text-ink-mute">— {formatCLP(INFUSOR.price)}</span>
            </span>
          </label>

          <div className="flex items-baseline justify-between border-t border-[var(--rule)] pt-6 mb-6">
            <span className="sans text-[11px] tracking-[0.22em] uppercase text-ink-mute">
              Total
            </span>
            <span className="display text-ink text-[clamp(32px,4vw,48px)] tabular-nums">
              {formatCLP(totalNow)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="btn-primary w-full justify-center"
          >
            {justAdded
              ? "Añadido ✓"
              : size === 6
                ? "Añadir Pack 6"
                : canAdd
                  ? `Añadir ${pack.label}`
                  : `Elige ${remaining} más`}
          </button>
          {!canAdd && (
            <p className="sans text-[11px] tracking-[0.18em] uppercase text-ink-mute mt-4 text-center">
              {pack.size - remaining} de {pack.size} seleccionadas
            </p>
          )}
        </div>

        {/* Right — formula picker */}
        <div>
          <p className="sans text-[11px] tracking-[0.24em] uppercase text-olive mb-4">
            · {size === 6 ? "Pack 6 — todas incluidas" : `Elige ${pack.size} ${pack.size === 1 ? "fórmula" : "fórmulas"}`}
          </p>
          <h3 className="display text-ink text-[clamp(28px,3vw,40px)] leading-tight mb-8">
            {size === 6
              ? "Una de cada una."
              : pack.sub + "."}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-8">
            {formulas.map((f) => {
              const isSel = size === 6 || selected.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggle(f.id)}
                  disabled={size === 6}
                  className={`group text-left relative transition-all duration-500 ${
                    size === 6 ? "cursor-default" : ""
                  } ${isSel ? "scale-[1.02]" : "opacity-65 hover:opacity-100"}`}
                >
                  <div className="relative">
                    <Bottle formula={f} size={170} detailed={false} />
                    {isSel && (
                      <span
                        className="absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center shadow-sm"
                        style={{ background: f.color }}
                      >
                        <Check size={14} color={f.labelText} />
                      </span>
                    )}
                  </div>
                  <p
                    className="display text-[24px] mt-2 leading-none"
                    style={{ color: f.color }}
                  >
                    {f.name}
                  </p>
                  <p className="text-ink-mute text-[12px] mt-1 italic line-clamp-1">
                    {f.ingredients.slice(0, 3).join(", ")}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
