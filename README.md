# Editing this site

All the writing on this site lives in plain text files in `/content/`.
Edit them on GitHub (or locally), commit, and the site updates.
You don't need to touch HTML or JS.

| File | What it controls |
| --- | --- |
| `content/moments.txt` | Photos in "Moments" (filename + caption + date) |
| `content/love.txt`   | Entries in "Things I Love About You" |
| `content/plans.txt`  | Items in "Future Plans" |
| `content/letter.txt` | The handwritten letter |

Each file has a small block of `# instructions` at the top — read those first. Add/remove entries freely; the site re-renders automatically.

## Photos

Replace any of `images/us1.jpg` … `images/us9.jpg` with your own photo of the same name, or point `content/moments.txt` at differently-named files.

## Dates

Anniversary + Prague countdown dates live in `scripts/main.js` near the bottom:
```
const pragueTarget  = new Date("2026-05-29T18:00:00").getTime();
const togetherSince = new Date("2023-05-16T00:00:00").getTime();
```
