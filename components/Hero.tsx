import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-transparent">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-44 pb-28 md:pt-56 md:pb-40 min-h-[88vh] flex flex-col items-center justify-center text-center">
        <h1 className="display text-ink text-[clamp(80px,18vw,260px)] leading-[0.86] shimmer-in mt-10">
          Herbalé
        </h1>

        <p className="display text-ink text-[clamp(20px,3vw,40px)] leading-tight mt-3 rise d2 italic">
          Hierbas con propósito
        </p>

        <p className="mt-10 max-w-md text-ink-soft sans text-[14px] leading-[1.7] rise d3">
          Seis fórmulas en frasco de vidrio ámbar.
          <br />
          Plantas reales, sin extractos, sin saborizantes.
          <br />
          Hechas en Chile, en cosechas pequeñas.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 rise d4">
          <Link href="/formulas" className="btn-primary">
            Ver fórmulas
          </Link>
          <Link href="/precios" className="btn-ghost">
            Precios & packs
          </Link>
        </div>

        <div className="mt-24 rise d5 sans text-[11px] tracking-[0.24em] uppercase text-ink-mute flex items-center gap-3">
          <span className="block h-px w-10 bg-ink-mute/50" />
          Desliza para conocerlas
          <span className="block h-px w-10 bg-ink-mute/50" />
        </div>
      </div>
    </section>
  );
}
