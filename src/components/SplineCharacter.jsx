import { useCallback, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/content";

/**
 * The hero character — a Spline scene, published from the Spline editor and
 * served from their CDN.
 *
 * The scene's own mouse interaction rotates the `Head` object (that's the
 * look-at-the-cursor behaviour) and is left completely alone.
 *
 * What this wrapper adds is a transform lock, re-applied every frame, on two
 * things the scene would otherwise let drift:
 *
 *   - the robot's root, so no baked looping translation walks him around
 *   - the CAMERA, which ships with mouse orbit controls enabled. Without
 *     this, moving the pointer swings the camera off the subject entirely
 *     (measured: Y position 6 → 446, Y rotation 0 → 1.12rad) and the robot
 *     simply vanishes from frame.
 *
 * To swap scenes: publish a new one in Spline, then change `splineScene` in
 * src/data/content.js. If the new scene's root object has a different name,
 * update ROOT below — each lock no-ops safely if its object isn't found.
 */

const ROOT = "RoBOT_(Duplicate)";
const CAMERA = "Camera";

export default function SplineCharacter() {
  const wrap = useRef(null);
  const lock = useRef(null);

  const onLoad = useCallback((app) => {
    if (import.meta.env.DEV) window.splineApp = app;

    // fade in — the scene pops in hard otherwise
    gsap.to(wrap.current, { opacity: 1, duration: 1.2, ease: "power2.out" });

    // the canvas changes layout height, so scroll positions need re-measuring
    ScrollTrigger.refresh();

    // The stage is position:fixed and only fades to opacity 0 past the hero,
    // so it must stop catching clicks meant for the sections underneath.
    // Coming back, force a redraw: Spline renders on demand and won't repaint
    // a canvas it thinks is unchanged.
    // onLeave/onEnterBack rather than onToggle: the hero starts at scroll 0,
    // so returning to the very top counts as "leaving back" — onToggle would
    // disable pointer events (and the head-tracking with them) at the top.
    const setLive = (live) => {
      if (wrap.current) wrap.current.style.pointerEvents = live ? "auto" : "none";
      if (live) app.requestRender?.();
    };
    const visibility = ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      onLeave: () => setLive(false),
      onEnterBack: () => setLive(true),
    });
    lock.current = { visibility };

    const root = app.findObjectByName?.(ROOT);
    const cam = app.findObjectByName?.(CAMERA);
    if (!root && !cam) return;

    // snapshot the framing the scene shipped with
    const snap = (o) =>
      o && {
        o,
        p: { x: o.position.x, y: o.position.y, z: o.position.z },
        r: { x: o.rotation.x, y: o.rotation.y, z: o.rotation.z },
      };
    const held = [snap(root), snap(cam)].filter(Boolean);

    const pin = () => {
      for (const { o, p, r } of held) {
        o.position.x = p.x;
        o.position.y = p.y;
        o.position.z = p.z;
        o.rotation.x = r.x;
        o.rotation.y = r.y;
        o.rotation.z = r.z;
      }
    };

    // Applying this on gsap.ticker alone isn't enough: gsap and Spline run
    // separate rAF loops with no ordering guarantee, so Spline could move the
    // camera and paint that frame before the reset landed — visible as the
    // character drifting under the cursor. Patching `render` guarantees the
    // locked transform is what actually gets drawn, every frame.
    const originalRender = typeof app.render === "function" ? app.render.bind(app) : null;
    if (originalRender) {
      app.render = (...args) => {
        pin();
        return originalRender(...args);
      };
    }

    gsap.ticker.add(pin, false, false);
    lock.current = { visibility, pin, app, originalRender };
  }, []);

  useEffect(
    () => () => {
      const l = lock.current;
      if (!l) return;
      l.visibility?.kill();
      if (l.pin) gsap.ticker.remove(l.pin);
      if (l.originalRender) l.app.render = l.originalRender;
    },
    []
  );

  return (
    <div className="spline-wrap" ref={wrap}>
      <Spline scene={profile.splineScene} onLoad={onLoad} />
    </div>
  );
}
