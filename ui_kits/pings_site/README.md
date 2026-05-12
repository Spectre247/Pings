# Pings — Anniversary Site UI Kit

A high-fidelity working prototype of the Pings anniversary website. One scrolling page with:

- **Hero** — name, drifting stars/hearts, sub-line entry
- **Countdown** — live ticking countdown to Prague (May 28, 2026)
- **Timeline** — vertical "thread" of relationship chapters
- **Treasure hunt** — 4 hearts hidden across the page; find them all to reveal a closing note
- **Mixtape** — track list, click to play; drives the sticky player
- **Letter** — italic closing note
- **Sticky player** — floating frosted-paper pill, persistent across sections

## Files

```
ui_kits/pings_site/
├── README.md          ← this file
├── index.html         ← entry; loads React, Babel, then all components
├── styles.css         ← component-specific styles (tokens come from /colors_and_type.css)
├── primitives.jsx     ← Icon, Button, Section, useReveal hook, PlayerContext
├── Header.jsx         ← small wordmark + chapter dots
├── Hero.jsx           ← name + drifting ornaments
├── Countdown.jsx      ← live mono-digit tiles
├── Timeline.jsx       ← vertical thread of chapters
├── TreasureHunt.jsx   ← findable hearts + reveal counter
├── Mixtape.jsx        ← track rows with play state
├── Letter.jsx         ← italic closing letter
├── StickyPlayer.jsx   ← floating frosted pill
└── App.jsx            ← composes everything + provides PlayerContext
```

## Run

Open `index.html` in any browser. No build step.

## Notes

- **Player state** is held in `App.jsx` and exposed via `PlayerContext` so `Mixtape` and `StickyPlayer` stay in sync. Audio playback itself is mocked (no real .mp3 — drop your tracks in `tracks/` and wire to an `<audio>` element).
- **Treasure-hunt count** persists to `localStorage` so reloads don't lose progress.
- **Countdown target** is hard-coded to `2026-05-28T18:00:00`; change in `Countdown.jsx`.
- **Photos** are placeholder cream rectangles with hairline borders; drop real images into `photos/` and reference them from `Timeline.jsx`.
