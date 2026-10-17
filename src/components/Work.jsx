import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, profile } from "../data/content";
import { ArrowOut } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".proj").forEach((row) => {
        gsap.to(row.querySelectorAll(".r-up"), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section shell" id="work" ref={root}>
      <p className="eyebrow">Selected work</p>
      <h2 className="section-title">
        My <em>work</em>
      </h2>

      <div className="work">
        {projects.map((p) => (
          <article className="proj" key={p.no}>
            <p className="proj__no r-up">{p.no}</p>

            <div>
              <h3 className="proj__name r-up">{p.name}</h3>
              <p className="proj__cat r-up">{p.category}</p>
            </div>

            <div className="proj__right">
              <p className="proj__blurb r-up">{p.blurb}</p>
              <p className="proj__tools-label r-up">Tools &amp; features</p>
              <p className="proj__tools r-up">{p.tools.join("  ·  ")}</p>

              <div className="proj__links r-up">
                <a href={p.repo} target="_blank" rel="noreferrer noopener">
                  Repository
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer noopener">
                    Live site
                  </a>
                )}
              </div>
            </div>

            <a
              className="proj__arrow"
              href={p.live || p.repo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${p.name}`}
            >
              <ArrowOut />
            </a>
          </article>
        ))}
      </div>

      <div className="work__more">
        <p>
          Forty-odd repositories, from CDAC assignments to booking bots. The rest of it lives on
          GitHub.
        </p>
        <a
          className="link-arrow"
          href={profile.socials[0].url}
          target="_blank"
          rel="noreferrer noopener"
        >
          See all works →
        </a>
      </div>
    </section>
  );
}
