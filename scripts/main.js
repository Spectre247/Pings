/* ===== Helpers ===== */
function stripComments(text) {
  return text.split("\n").filter(l => !l.trim().startsWith("#")).join("\n");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inlineEm(s) {
  // _italic_ → <em>italic</em> (after escaping)
  return escapeHtml(s).replace(/_([^_]+)_/g, "<em>$1</em>");
}

/* ===== Render: Moments (from content/moments.txt) ===== */
function renderMoments(text) {
  const cleaned = stripComments(text).trim();
  const lines = cleaned.split("\n").map(l => l.trim()).filter(Boolean);
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  lines.forEach(line => {
    const parts = line.split("|").map(p => p.trim());
    const file = parts[0] || "";
    const cap  = parts[1] || "";
    const date = parts[2] || "";
    const el = document.createElement("div");
    el.className = "shot";
    const img = document.createElement("img");
    img.className = "shot-img";
    img.src = "images/" + file;
    img.alt = cap;
    img.loading = "lazy";
    el.appendChild(img);
    const capEl = document.createElement("div");
    capEl.className = "shot-cap";
    capEl.appendChild(document.createTextNode(cap));
    const small = document.createElement("small");
    small.textContent = date;
    capEl.appendChild(small);
    el.appendChild(capEl);
    gallery.appendChild(el);
  });
}

/* ===== Render: Things I Love (from content/love.txt) ===== */
function renderLove(text) {
  const cleaned = stripComments(text).trim();
  const blocks = cleaned.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const loveList = document.getElementById("loveList");
  loveList.innerHTML = "";
  blocks.forEach((block, i) => {
    const lines = block.split("\n");
    const head = lines.shift() || "";
    const body = lines.join(" ").trim();
    const row = document.createElement("div");
    row.className = "love-row";
    row.innerHTML = `
      <button class="love-toggle">
        <span class="love-num">${String(i+1).padStart(2,"0")}</span>
        <span class="love-head">${escapeHtml(head)}</span>
        <span class="love-chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </button>
      <div class="love-body"><div class="love-body-inner">${inlineEm(body)}</div></div>`;
    row.querySelector(".love-toggle").addEventListener("click", () => row.classList.toggle("open"));
    loveList.appendChild(row);
  });
}

/* ===== Render: Future Plans (from content/plans.txt) ===== */
function renderPlans(text) {
  const cleaned = stripComments(text).trim();
  const lines = cleaned.split("\n").map(l => l.trim()).filter(Boolean);
  const list = document.getElementById("futureList");
  list.innerHTML = "";
  lines.forEach(line => {
    const parts = line.split("|").map(p => p.trim());
    const when  = parts[0] || "";
    const title = parts[1] || "";
    const loc   = parts[2] || "";
    const row = document.createElement("div");
    row.className = "future";
    row.innerHTML = `
      <span class="future-when">${escapeHtml(when)}</span>
      <span class="future-title">${escapeHtml(title)}</span>
      <span class="future-loc">${escapeHtml(loc)}</span>`;
    list.appendChild(row);
  });
}

/* ===== Render: Letter (from content/letter.txt) ===== */
function renderLetter(text) {
  const cleaned = stripComments(text).trim();
  // Split by blank lines into blocks
  const blocks = cleaned.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  if (blocks.length === 0) return;

  // First block holds date + greeting on first two lines
  const firstLines = blocks[0].split("\n");
  const date = firstLines.shift() || "";
  const greet = firstLines.shift() || "";

  const bodyBlocks = [];
  if (firstLines.length) bodyBlocks.push(firstLines.join(" "));

  let signLine = "";
  let signSmall = "";

  for (let i = 1; i < blocks.length; i++) {
    const lines = blocks[i].split("\n");
    if (lines[0].trim().startsWith("—") || lines[0].trim().startsWith("--")) {
      signLine = lines[0].trim();
      signSmall = (lines[1] || "").trim();
      break;
    }
    bodyBlocks.push(lines.join(" "));
  }

  document.getElementById("letterDate").textContent = date;
  document.getElementById("letterGreet").textContent = greet;
  const bodyEl = document.getElementById("letterBody");
  bodyEl.innerHTML = bodyBlocks.map(p => `<p>${inlineEm(p)}</p>`).join("");
  const signEl = document.getElementById("letterSign");
  signEl.innerHTML = "";
  if (signLine) {
    signEl.appendChild(document.createTextNode(signLine));
    if (signSmall) {
      const small = document.createElement("small");
      small.innerHTML = inlineEm(signSmall);
      signEl.appendChild(small);
    }
  }
}

/* ===== Load text files =====
   Uses fetch(). Works on any web server (GitHub Pages, localhost).
   If you double-click the .html file directly (file://), the browser blocks
   fetch — open it via a local server, or just push to GitHub Pages.
*/
async function loadContent(path, render, fallback) {
  try {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error("not ok");
    const text = await r.text();
    render(text);
  } catch (e) {
    console.warn("Could not load " + path + " — using fallback.", e);
    render(fallback);
  }
}

const FALLBACK_MOMENTS = "us1.jpg | a moment | 2024";
const FALLBACK_LOVE = "the way you say my name first thing in the morning\nbefore you've had coffee.";
const FALLBACK_PLANS = "AUG 11 | barcelona · eclipse watching | barcelona";
const FALLBACK_LETTER = "may 16, 2026\nmy dearest pings,\n\na placeholder note while content/letter.txt loads.\n\n— yours,\nalways";

loadContent("content/moments.txt", renderMoments, FALLBACK_MOMENTS);
loadContent("content/love.txt",   renderLove,   FALLBACK_LOVE);
loadContent("content/plans.txt",  renderPlans,  FALLBACK_PLANS);
loadContent("content/letter.txt", renderLetter, FALLBACK_LETTER);

/* ===== MODAL LOGIC ===== */
const scrim = document.getElementById("scrim");
const modals = document.querySelectorAll(".modal");

function openModal(id) {
  scrim.classList.add("open");
  const m = document.getElementById("modal-" + id);
  if (m) m.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeAll() {
  scrim.classList.remove("open");
  modals.forEach(m => m.classList.remove("open"));
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});
document.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", closeAll));
scrim.addEventListener("click", closeAll);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });

/* ===== COUNTDOWN + DAY-COUNTERS ===== */
const pragueTarget  = new Date("2026-05-29T18:00:00").getTime();
const togetherSince = new Date("2023-05-16T00:00:00").getTime();
function tick() {
  const now  = Date.now();
  const diff = Math.max(0, pragueTarget - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = n => String(n).padStart(2, "0");
  document.getElementById("t-d").textContent = pad(d);
  document.getElementById("t-h").textContent = pad(h);
  document.getElementById("t-m").textContent = pad(m);
  document.getElementById("t-s").textContent = pad(s);

  const daysUs = Math.floor((now - togetherSince) / 86400000);
  document.getElementById("daysTogether").textContent = daysUs;
  document.getElementById("daysToPrague").textContent = d;
}
tick(); setInterval(tick, 1000);
