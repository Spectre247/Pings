/* primitives.jsx — shared UI kit primitives */

const { useState, useEffect, useRef, useContext, createContext, useMemo } = React;

// PlayerContext lets sections share player state.
const PlayerContext = createContext(null);

// useReveal — scroll-in fade-up via IntersectionObserver
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) el.classList.add("in"); }),
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Inline-SVG fetcher. We fetch the SVG file once, normalize it (drop fixed
// width/height so it scales with the wrapper, and ensure stroke uses currentColor),
// cache it, and inject it via dangerouslySetInnerHTML so stroke="currentColor"
// works the normal way and we can size + recolor it from the parent.
const __svgCache = new Map();
const __svgPending = new Map();

function fetchSvg(url) {
  if (__svgCache.has(url)) return Promise.resolve(__svgCache.get(url));
  if (__svgPending.has(url)) return __svgPending.get(url);
  const p = fetch(url).then(r => r.text()).then(text => {
    // normalize: remove fixed width/height; force inheriting color
    const cleaned = text
      .replace(/<svg([^>]*?)\swidth="[^"]*"/, '<svg$1')
      .replace(/<svg([^>]*?)\sheight="[^"]*"/, '<svg$1')
      .replace(/<svg /, '<svg width="100%" height="100%" ');
    __svgCache.set(url, cleaned);
    return cleaned;
  });
  __svgPending.set(url, p);
  return p;
}

function InlineSvg({ url, size = 20, color, style = {}, className = "" }) {
  const [html, setHtml] = useState(() => __svgCache.get(url) || null);
  useEffect(() => {
    let alive = true;
    if (!html) fetchSvg(url).then(t => { if (alive) setHtml(t); });
    return () => { alive = false; };
  }, [url]);
  const css = {
    width: size, height: size,
    color: color || "currentColor",
    display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    lineHeight: 0,
    ...style,
  };
  return (
    <span
      className={className}
      style={css}
      aria-hidden="true"
      dangerouslySetInnerHTML={html ? { __html: html } : undefined}
    />
  );
}

function Icon({ name, size = 20, style = {}, className = "" }) {
  return <InlineSvg url={`../../assets/icons/${name}.svg`} size={size} style={style} className={className} />;
}
function Ornament({ name, size = 24, color = "currentColor", style = {} }) {
  return <InlineSvg url={`../../assets/illustrations/${name}.svg`} size={size} color={color} style={style} />;
}

function Button({ variant = "primary", children, onClick, icon, style }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}

function Section({ id, eyebrow, title, sub, children, narrow = false, band = false }) {
  const ref = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`section reveal ${band ? "section-band" : ""} ${narrow ? "section-narrow" : ""}`}
      data-screen-label={id}
    >
      {(eyebrow || title || sub) && (
        <div className="section-head">
          {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
          {title && <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />}
          {sub && <p className="section-sub">{sub}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

Object.assign(window, { PlayerContext, useReveal, Icon, Ornament, Button, Section });
