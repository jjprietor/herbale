"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PACKS, INFUSOR, formulas, type PackSize, type Formula } from "./products";

export type CartLine =
  | {
      kind: "pack";
      /** unique row id */
      uid: string;
      size: PackSize;
      formulaIds: Formula["id"][];
      qty: number;
    }
  | {
      kind: "infusor";
      uid: string;
      qty: number;
    };

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  addPack: (size: PackSize, formulaIds: Formula["id"][]) => void;
  addInfusor: (qty?: number) => void;
  setQty: (uid: string, qty: number) => void;
  remove: (uid: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      addPack: (size, formulaIds) =>
        set((s) => ({
          lines: [
            ...s.lines,
            { kind: "pack", uid: newId(), size, formulaIds, qty: 1 },
          ],
          isOpen: true,
        })),
      addInfusor: (qty = 1) =>
        set((s) => {
          const existing = s.lines.find(
            (l): l is Extract<CartLine, { kind: "infusor" }> => l.kind === "infusor",
          );
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.uid === existing.uid ? { ...l, qty: l.qty + qty } : l,
              ),
              isOpen: true,
            };
          }
          return {
            lines: [...s.lines, { kind: "infusor", uid: newId(), qty }],
            isOpen: true,
          };
        }),
      setQty: (uid, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.uid !== uid)
              : s.lines.map((l) => (l.uid === uid ? { ...l, qty } : l)),
        })),
      remove: (uid) =>
        set((s) => ({ lines: s.lines.filter((l) => l.uid !== uid) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "herbale-cart-v2", partialize: (s) => ({ lines: s.lines }) },
  ),
);

export function linePrice(line: CartLine): number {
  if (line.kind === "infusor") return INFUSOR.price * line.qty;
  return PACKS[line.size].price * line.qty;
}

export function lineTitle(line: CartLine): string {
  if (line.kind === "infusor") return "Infusor de clip";
  const names = line.formulaIds
    .map((id) => formulas.find((f) => f.id === id)?.name)
    .filter(Boolean)
    .join(", ");
  return `${PACKS[line.size].label} · ${names}`;
}

export function useCartCount() {
  return useCart((s) => s.lines.reduce((a, b) => a + b.qty, 0));
}
