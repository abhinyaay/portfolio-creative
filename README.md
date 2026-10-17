# Abhinay Kumar — Portfolio

Dark + amber portfolio with a 3D character whose eyes follow your cursor.
Vite + React + GSAP (ScrollTrigger) + Lenis + three.js (@react-three/fiber).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Make the character YOU

The hero avatar is currently Ready Player Me's example model
(`public/models/preview.glb`, from their MIT-licensed repos).

1. Go to https://readyplayer.me and create an avatar **from your photo**
   (add your glasses in the editor — they have similar rectangular frames).
2. Download the avatar as `.glb` (or copy the `models.readyplayer.me/….glb` URL).
3. Save it as `public/models/character.glb`.
4. In `src/data/content.js` change `avatarModel` to `"/models/character.glb"`.

The head, neck, eyes and blink are driven by the standard RPM rig, so any
Ready Player Me avatar works without code changes.

## Remaining TODOs

- [ ] `public/resume.pdf` — drop your resume here (RESUME button already wired)
- [ ] `src/data/content.js` → `timeline` — add your degree (college, years)
- [ ] Replace the placeholder avatar (see above)

## Content

Everything on the page — name, roles, projects, timeline, tech stack, links —
lives in `src/data/content.js`. Edit that one file to update the site.

## Deploy

Static output — push to GitHub and import into Vercel (or Netlify).
Suggested domain: **abhinaykumar.dev**.
