import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline, education } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // the amber line draws itself down the rail as you scroll
      gsap.to(".tl__progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".tl",
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });

      gsap.utils.toArray(".tl__row").forEach((row) => {
        gsap.to(row.querySelectorAll(".r-up"), {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 86%" },
        });

        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 40%",
          onToggle: (self) => row.classList.toggle("is-on", self.isActive),
        });
      });

      // the education cards live outside .tl__row, so they need their own
      // trigger — without this their `.r-up` never animates and they stay at
      // opacity 0 permanently
      gsap.to(".edu__card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".edu", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section shell" ref={root}>
      <p className="eyebrow">Career</p>
      <h2 className="section-title">
        My career &amp;
        <br />
        <em>experience</em>
      </h2>

      <div className="tl">
        <span className="tl__line" />
        <span className="tl__progress" />

        {timeline.map((t) => (
          <article className="tl__row" key={t.title}>
            <p className="tl__year r-up">{t.year}</p>
            <div>
              <h3 className="tl__title r-up">{t.title}</h3>
              <p className="tl__org r-up">{t.org}</p>
            </div>
            <p className="tl__body r-up">{t.body}</p>
          </article>
        ))}
      </div>

      <div className="edu">
        <p className="eyebrow edu__eyebrow">Education</p>
        <div className="edu__grid">
          {education.map((e) => (
            <article className="edu__card glass-lite r-up" key={e.school}>
              <p className="edu__year">{e.year}</p>
              <h3 className="edu__school">{e.school}</h3>
              <p className="edu__course">{e.course}</p>
              <p className="edu__place">{e.place}</p>
              <p className="edu__note">{e.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
