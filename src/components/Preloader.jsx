import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Counts 000 → 100, wipes upward, then calls onDone so the hero can play in.
 */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    document.body.classList.add("is-locked");
    const value = { n: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("is-locked");
        onDone?.();
      },
    });

    tl.to(value, {
      n: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) {
          count.current.textContent = String(Math.round(value.n)).padStart(3, "0");
        }
      },
    })
      .to(bar.current, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)
      .to([count.current, bar.current], { opacity: 0, duration: 0.35 }, "+=0.15")
      .to(root.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
      })
      .set(root.current, { display: "none" });

    return () => {
      tl.kill();
      document.body.classList.remove("is-locked");
    };
  }, [onDone]);

  return (
    <div className="preloader" ref={root}>
      <div>
        <div className="preloader__count" ref={count}>
          000
        </div>
        <div className="preloader__label">Abhinay Kumar — Portfolio</div>
      </div>
      <div className="preloader__bar" ref={bar} />
    </div>
  );
}
