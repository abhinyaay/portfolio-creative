# Abhinay Kumar — Portfolio

Dark + amber portfolio with a liquid-glass cursor and a 3D Spline character
whose head follows your cursor. Built with Vite + React, GSAP ScrollTrigger
and Lenis smooth scroll.

Live: _add your Vercel URL here once deployed_

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Content

Everything on the page — name, roles, projects, education, timeline, tech
stack, social links — lives in [src/data/content.js](src/data/content.js).
Edit that one file to update the site.

## The 3D character

The hero character is a Spline scene served from Spline's CDN:

```
https://prod.spline.design/Ng3zv3sWjWqG3EvH/scene.splinecode
```

To swap it, publish a new scene in Spline (Export → Code → React) and change
`splineScene` in `src/data/content.js`.

Two things are locked every frame in [SplineCharacter.jsx](src/components/SplineCharacter.jsx)
so pointer input can't drag the robot off-frame:

- the robot root's position, so no baked animation walks him around
- the camera's position and rotation, so mouse orbit can't swing it away

The scene's `Head` object is left free so the look-at-cursor still works.

## The cursor

A glass droplet with real liquid physics in [Cursor.jsx](src/components/Cursor.jsx):

- surface tension (damped spring, overshoots and wobbles back)
- volume preservation (`scaleY = 1/scaleX`)
- a trailing teardrop tip that sharpens with speed
- satellite beads shed off the tail at high speed
- wets to the hovered element's border radius
- a chromatic rim that splits warm/cool as it deforms
- a ripple on click

Falls back to the native cursor on touch and under `prefers-reduced-motion`.

## Deploy

Static Vite output — push to GitHub and import into Vercel. Vercel detects
Vite automatically; no config needed.

## Still outstanding

- `public/resume.pdf` — drop a PDF here and the Resume button starts working
