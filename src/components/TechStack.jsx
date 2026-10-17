import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStack } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".stack__cell", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out",
        stagger: { each: 0.025, from: "start" },
        scrollTrigger: { trigger: ".stack", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section shell" ref={root}>
      <p className="eyebrow">Tech stack</p>
      <h2 className="section-title">
        Things I reach for
        <br />
        <em>without thinking.</em>
      </h2>

      <div className="stack">
        {techStack.map((t) => (
          <div className="stack__cell glass-lite r-up" key={t.name}>
            <img src={t.icon} alt="" loading="lazy" width="32" height="32" />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
