import { Suspense, lazy, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/content";

// the Spline runtime only loads once the app shell is already interactive
const SplineCharacter = lazy(() => import("./SplineCharacter"));

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ ready }) {
  const root = useRef(null);

  /* ── intro, once the preloader is done ── */
  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "expo.out" },
          // The scroll parallax is built only after the intro has settled.
          // Created any earlier, a scrub tween would capture a mid-intro `y`
          // as its baseline and park the character below where it belongs.
          onComplete: buildScrollParallax,
        })
        .to(".hero__name b", { y: 0, duration: 1.3, stagger: 0.09 })
        .to(".hero__hello", { opacity: 1, y: 0, duration: 0.9 }, 0.2)
        .to(".hero__roles", { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .fromTo(
          ".stage__inner",
          { opacity: 0, y: 70, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.6 },
          0.15
        )
        .to(".hero__scroll", { opacity: 1, duration: 0.8 }, 1);

      /* the hero eases back as the next section arrives — scale and fade
         only, so the character never drifts down out of its frame */
      function buildScrollParallax() {
        gsap.set(".stage__inner", { y: 0, yPercent: 0, scale: 1, opacity: 1 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          // opacity, NOT autoAlpha: `visibility: hidden` lets the browser
          // discard the WebGL canvas's drawn frame, and Spline renders on
          // demand, so nothing redrew it on the way back and the robot came
          // back blank. Clicks below are released in SplineCharacter instead.
          .fromTo(
            ".stage__inner",
            { scale: 1, opacity: 1 },
            { scale: 0.92, opacity: 0, ease: "none" },
            0
          )
          .to(".hero__copy", { opacity: 0, y: -70, ease: "none" }, 0)
          .to(".hero__scroll", { opacity: 0, duration: 0.2 }, 0);
      }

      // role rotator
      const items = gsap.utils.toArray(".hero__rotator li");
      gsap.set(items, { yPercent: 110, opacity: 0 });
      gsap.set(items[0], { yPercent: 0, opacity: 1 });

      const loop = gsap.timeline({ repeat: -1, delay: 1.6 });
      items.forEach((item, i) => {
        const next = items[(i + 1) % items.length];
        loop
          .to(item, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power3.in" }, "+=2")
          .fromTo(
            next,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
            "<0.1"
          );
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={root}>
      {/* character front and centre, like the reference */}
      <div className="stage">
        <div className="stage__inner">
          <Suspense fallback={null}>
            <SplineCharacter />
          </Suspense>
        </div>
      </div>

      {/* copy overlays the stage */}
      <div className="hero__copy">
        <div className="hero__left">
          <p className="hero__hello">Hello! I&apos;m</p>
          <h1 className="hero__name">
            <span className="r-line">
              <b>{profile.firstName}</b>
            </span>
            <span className="r-line is-outline">
              <b>{profile.lastName}</b>
            </span>
          </h1>
        </div>

        <div className="hero__right">
          <div className="hero__roles">
            <span className="hero__an">A</span>
            <ul className="hero__rotator">
              {profile.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
