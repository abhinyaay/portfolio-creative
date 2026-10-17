import { profile } from "../data/content";
import { Doc, iconFor } from "./Icons";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  return (
    <>
      <nav className="nav glass">
        <a className="nav__mark" href="#top" aria-label="Back to top">
          {profile.initials}
        </a>

        <a className="nav__mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>
              <span>{l.label}</span>
              <span aria-hidden="true">{l.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <aside className="rail glass">
        {profile.socials.map((s) => {
          const Icon = iconFor(s.icon);
          return (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
              <Icon />
            </a>
          );
        })}
        <a href={`mailto:${profile.email}`} aria-label="Email">
          {(() => {
            const Icon = iconFor("mail");
            return <Icon />;
          })()}
        </a>
      </aside>

      <a className="resume-btn glass" href={profile.resume} target="_blank" rel="noreferrer noopener">
        RESUME <Doc />
      </a>
    </>
  );
}
