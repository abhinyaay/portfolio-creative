import { useEffect } from "react";

/**
 * Drives the specular highlight on every `.glass` / `.glass-lite` surface.
 *
 * One delegated pointermove on the document rather than a listener per
 * element — there are dozens of chips and tiles, and this stays O(1). The
 * handler writes `--mx` / `--my` (percentages, local to the hovered element)
 * which the `::after` radial-gradient reads, so the highlight slides across
 * the surface as though light were catching a curved edge.
 */
export default function useGlassSheen() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let pending = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    const onMove = (e) => {
      const el = e.target.closest?.(".glass, .glass-lite");
      if (!el) return;
      const r = el.getBoundingClientRect();
      pending = {
        el,
        x: (((e.clientX - r.left) / r.width) * 100).toFixed(1),
        y: (((e.clientY - r.top) / r.height) * 100).toFixed(1),
      };
      // coalesce to one write per frame
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
