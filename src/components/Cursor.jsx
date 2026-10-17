import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The cursor: a glass droplet with liquid physics.
 *
 * Colour comes from `backdrop-filter` against a translucent fill — it doesn't
 * paint, it refracts and lifts whatever sits beneath it. Blur is kept low so
 * text stays legible THROUGH the lens; the rim carries the visibility.
 *
 * The deformation models a real droplet rather than a simple stretch:
 *
 *   - SURFACE TENSION. Elongation is an underdamped spring, so the droplet
 *     overshoots when you stop and oscillates through its resting size —
 *     stretching AND squashing — before settling.
 *   - CONSTANT VOLUME. Liquid is incompressible, so it thins by exactly as
 *     much as it lengthens: scaleY = 1/scaleX.
 *   - NON-LINEAR RESPONSE. A pow() curve makes gentle movement visibly
 *     deform it; a linear map only reacted to violent flicks.
 *   - A TRAILING TIP. The two rear corners sharpen with speed.
 *   - SATELLITES. Above a speed threshold it sheds beads off its tail, the
 *     way a real droplet breaks up when flung.
 *   - WETTING. Over a link it spreads and adopts that element's corner
 *     radius, like liquid taking the shape of a surface.
 *   - CHROMATIC EDGE. Warm and cool fringes split apart as it deforms, so
 *     the rim refracts rather than merely blurring.
 *
 * Falls back to the native cursor on touch and under prefers-reduced-motion.
 */

const INTERACTIVE = "a, button, [data-cursor]";

/* resting diameter in px — must match .cursor in index.css */
const SIZE = 44;
/* max elongation, as a fraction of the resting radius */
const STRETCH = 0.85;
/* px-per-frame at which elongation maxes out. Ordinary mouse movement is
   roughly 5–25, so this has to sit inside that band to feel alive. */
const SPEED_FULL = 24;
/* <1 boosts the low end: slow drags deform, not just fast flicks */
const RESPONSE = 0.5;
/* how sharp the trailing tip gets: 50% = round, 4% = a hard point */
const TAIL_MIN = 4;
/* Surface tension. DAMP is velocity RETAINED per frame, so it must stay high
   enough for the spring to overshoot — at 0.7 the system is overdamped and
   the droplet just sags back without ever wobbling. */
const STIFF = 0.3;
const DAMP = 0.88;
/* Hover size. This MULTIPLIES with WET_SPREAD below, so the on-link diameter
   is SIZE * HOVER * (1 + WET_SPREAD) — keep an eye on that product. */
const HOVER = 1.6;
/* how much wider-and-flatter it goes when wetting a surface */
const WET_SPREAD = 0.2;
/* satellites: px-per-frame to start shedding, and min frames between beads */
const SHED_SPEED = 14;
const SHED_GAP = 4;
const SHED_MAX = 14;

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = ref.current;
    document.body.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...pointer };
    /* `base` is the resting size (hover/press tween it); `s`/`sv` are the
       spring position and velocity of the elongation */
    const state = { base: 1, angle: 0, s: 0, sv: 0 };
    /* wetness lives on its own object: grow() tweens `state` with
       overwrite:true, which would otherwise kill the spread mid-flight */
    const wet = { v: 0, radius: 50 };
    let seen = false;
    let sinceShed = 0;
    /* live HTMLCollection — counting actual nodes rather than tracking a
       tally, so a bead removed by anything other than its own onComplete
       can't leak the count and silently stop all shedding */
    const beads = document.getElementsByClassName("cursor-bead");

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!seen) {
        seen = true;
        gsap.to(el, { opacity: 1, duration: 0.4 });
      }
    };

    /* a bead flung off the tail, shrinking as it goes */
    const shed = (x, y) => {
      if (beads.length >= SHED_MAX) return;
      const b = document.createElement("span");
      b.className = "cursor-bead";
      document.body.appendChild(b);
      gsap.set(b, { x, y, scale: gsap.utils.random(0.5, 1) });
      gsap.to(b, {
        x: x + gsap.utils.random(-16, 16),
        y: y + gsap.utils.random(-16, 16),
        scale: 0,
        opacity: 0,
        duration: gsap.utils.random(0.5, 0.9),
        ease: "power2.out",
        onComplete: () => b.remove(),
      });
    };

    const tick = () => {
      const prevX = pos.x;
      const prevY = pos.y;
      pos.x += (pointer.x - pos.x) * 0.18;
      pos.y += (pointer.y - pos.y) * 0.18;

      const dx = pos.x - prevX;
      const dy = pos.y - prevY;
      // the follow-lerp leaves a long geometric tail of residual motion; cut
      // it off so the droplet actually reaches rest and can spring back
      const raw = Math.hypot(dx, dy);
      const speed = raw < 0.35 ? 0 : raw;

      // eased response so slow movement still deforms it
      const t = Math.min(speed / SPEED_FULL, 1);
      const target = Math.pow(t, RESPONSE) * STRETCH;

      // damped spring => overshoot and wobble, i.e. surface tension
      state.sv += (target - state.s) * STIFF;
      state.sv *= DAMP;
      state.s += state.sv;
      // allowed to go NEGATIVE: after over-stretching, a real droplet rebounds
      // through its own axis and briefly goes wide-and-flat before settling
      let amount = Math.max(-0.3, Math.min(state.s, STRETCH * 1.35));
      // a droplet clinging to a surface doesn't whip into a tail
      amount *= 1 - wet.v * 0.7;

      // ease the heading, wrapping the short way round the circle
      if (speed > 0.15) {
        const want = (Math.atan2(dy, dx) * 180) / Math.PI;
        const diff = ((want - state.angle + 540) % 360) - 180;
        state.angle += diff * 0.35;
      }

      // shed beads off the tail when moving fast
      sinceShed += 1;
      if (speed > SHED_SPEED && sinceShed >= SHED_GAP && wet.v < 0.5) {
        sinceShed = 0;
        shed(pos.x - dx * 1.8, pos.y - dy * 1.8);
      }

      // incompressible: it thins by as much as it lengthens
      const stretch = 1 + amount;
      // spreading on a surface is also volume-preserving, just wider + flatter
      const spread = 1 + wet.v * WET_SPREAD;
      const velTail = Math.min(50, Math.max(TAIL_MIN, 50 - (amount / STRETCH) * (50 - TAIL_MIN)));
      // blend the velocity tail toward the hovered element's corner radius
      const tail = velTail + (wet.radius - velTail) * wet.v;

      gsap.set(el, {
        x: pos.x,
        y: pos.y,
        rotate: state.angle,
        scaleX: state.base * stretch * spread,
        scaleY: (state.base / stretch) * spread,
        // refraction splits harder the more it is deformed
        "--ca": `${(Math.abs(amount) * 3.4).toFixed(2)}px`,
      });

      // Elliptical corners, via the `horizontal / vertical` form. The two
      // trailing corners get a narrow horizontal radius but a full-height
      // vertical one, so they meet in the middle of that edge and form a
      // POINT. The plain `4% 50% 50% 4%` form left two sharp corners with a
      // flat edge between them — which read as a D rather than a teardrop.
      // Set directly: GSAP's parser drops the `/` and collapses it back.
      el.style.borderRadius = `${tail}% 50% 50% ${tail}% / 50% 50% 50% 50%`;
    };

    const grow = (to, duration = 0.45) =>
      gsap.to(state, { base: to, duration, ease: "power3.out", overwrite: true });

    /* a drop hitting water: a ring expands and fades from the click point */
    const ripple = (x, y) => {
      const r = document.createElement("span");
      r.className = "cursor-ripple";
      document.body.appendChild(r);
      gsap.set(r, { x, y, scale: 0.25, opacity: 0.85 });
      gsap.to(r, {
        scale: 2.6,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
        onComplete: () => r.remove(),
      });
    };

    const onOver = (e) => {
      const target = e.target.closest?.(INTERACTIVE);
      if (!target) return;
      grow(HOVER);

      // take on the surface's corner radius, as a % of our own box
      const cs = getComputedStyle(target);
      const rect = target.getBoundingClientRect();
      const px = parseFloat(cs.borderTopLeftRadius) || 0;
      const isPill = px >= Math.min(rect.width, rect.height) / 2 - 1;
      // floor at 24%, not 6%: a zero-radius target used to square the droplet
      // right off, which reads as a hard "D" rather than a soft rounded rect
      wet.radius = isPill ? 50 : gsap.utils.clamp(24, 50, (px / SIZE) * 100);
      gsap.to(wet, { v: 1, duration: 0.45, ease: "power3.out" });
    };

    const onOut = (e) => {
      if (!e.target.closest?.(INTERACTIVE)) return;
      grow(1);
      gsap.to(wet, { v: 0, duration: 0.4, ease: "power3.out" });
    };

    const onDown = (e) => {
      grow(state.base * 0.7, 0.2);
      ripple(e.clientX, e.clientY);
      // a press also flicks the spring, so the droplet jiggles
      state.sv += 0.14;
    };
    const onUp = (e) => grow(e.target.closest?.(INTERACTIVE) ? HOVER : 1, 0.3);
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.25 });
    const onEnter = () => gsap.to(el, { opacity: 1, duration: 0.25 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      gsap.ticker.remove(tick);
      gsap.killTweensOf([state, wet]);
      document
        .querySelectorAll(".cursor-ripple, .cursor-bead")
        .forEach((n) => n.remove());
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
