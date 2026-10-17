import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { disciplines } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".disc").forEach((row) => {
        gsap.to(row.querySelectorAll(".r-up"), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 82%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section shell" id="about" ref={root}>
      <p className="eyebrow">What I do</p>
      <h2 className="section-title">
        Three things,
        <br />
        <em>done properly.</em>
      </h2>

      <div className="disciplines">
        {disciplines.map((d) => (
          <article className="disc" key={d.id}>
            <div>
              <h3 className="disc__label r-up">{d.label}</h3>
              <p className="disc__headline r-up">{d.headline}</p>
            </div>

            <div>
              <p className="disc__body r-up">{d.body}</p>
              <p className="disc__skills-label r-up">Skillset &amp; tools</p>
              <div className="disc__skills r-up">
                {d.skills.map((s) => (
                  <span className="glass-lite" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
