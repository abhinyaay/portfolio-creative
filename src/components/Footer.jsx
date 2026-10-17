import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".r-up", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={root}>
      <div className="shell">
        <div className="cta">
          <p className="eyebrow r-up" style={{ justifyContent: "center" }}>
            Contact
          </p>
          <h2 className="cta__big r-up">
            <a href={`mailto:${profile.email}`}>Let&apos;s build it →</a>
          </h2>
          <p className="cta__sub r-up">Open to work · {profile.location}</p>
        </div>

        <div className="foot">
          <p className="foot__name">
            {profile.firstName} {profile.lastName}
          </p>

          <div>
            <h4>Email</h4>
            <ul>
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Location</h4>
            <ul>
              <li>{profile.location}</li>
            </ul>
          </div>

          <div>
            <h4>Social</h4>
            <ul>
              {profile.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noreferrer noopener">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot__bar">
          <span>Designed &amp; developed by {profile.firstName}</span>
          <span>{year}</span>
        </div>
      </div>
    </footer>
  );
}
