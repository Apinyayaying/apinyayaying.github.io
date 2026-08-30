# Portfolio — Apinya Yawai

Personal portfolio site, built with plain HTML, CSS, and JavaScript. One page covering a short intro,
background, three featured projects, and contact details, plus a downloadable CV.

🔗 **Live demo:** https://apinyayaying.github.io/portfolio/
*(update this if you deploy it under a different repo name — see notes below)*

## Features
- Hero section with an animated signal/waveform illustration (drawn in with JavaScript + SVG,
  referencing the sensor/gesture-recognition background behind the GestureTalk project)
- About section summarizing education and current focus
- Three project write-ups, each linking to its GitHub repo and live demo
- Downloadable CV (PDF)
- Fully responsive, and respects `prefers-reduced-motion`

## Tech stack
HTML5, CSS3, vanilla JavaScript (SVG path animation via the Web Animations timing loop). No frameworks.

## Project structure
```
index.html            # Page content and structure
style.css              # Design tokens, layout, responsive rules
script.js               # Hero waveform draw-in + looping sweep animation
Apinya_Yawai_CV.pdf   # Downloadable CV, linked from the hero and contact sections
```

## Run it locally
No build step needed:
```bash
git clone https://github.com/Apinyayaying/portfolio.git
cd portfolio
```
Then open `index.html` in your browser.

## Deploying
To make this live at `apinyayaying.github.io` directly (instead of a `/portfolio/` sub-path), create a
repo named exactly `apinyayaying.github.io`, push these files there, and enable Pages — GitHub serves
that repo at the root domain automatically, no extra Pages setup needed.
