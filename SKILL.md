---
name: pings-design
description: Use this skill to generate well-branded interfaces and assets for Pings — a warm, soft, modern romantic anniversary site aesthetic — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map

- **Tokens**: `colors_and_type.css` — warm cream paper, terracotta-rose accent, sage breath, Newsreader serif + Geist sans.
- **Voice**: see CONTENT FUNDAMENTALS in README — first-person plural, sentence-case, no emoji, specific over generic.
- **UI kit**: `ui_kits/pings_site/` — working anniversary site with Hero, Countdown, Timeline, Treasure Hunt, Mixtape, Letter, sticky frosted player.
- **Assets**: `assets/icons/` (Lucide subset, copied locally), `assets/illustrations/` (decorative SVG ornaments), `assets/logo-pings.svg`.
- **Preview cards** (`preview/*.html`) demonstrate every token group.

## Hard rules

- Never pure black/white — use `--ink` and `--paper`.
- One accent (`--blush-400`) used sparingly. Sage is for breath, not for buttons.
- No emoji except a single ✨ or ❤ as a typographic glyph in `--love` color, max once per page.
- No linear blue/purple gradients. Ever.
- Buttons are pill-shaped (`--r-pill`).
- Italic Newsreader doubles as the "handwritten" accent — never a fake handwriting font.
