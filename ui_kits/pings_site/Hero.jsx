/* Hero.jsx — name + drifting ornaments */
function Hero() {
  const ref = useReveal();
  // pre-randomized positions for ornaments
  const stars = [
    { left: "8%",  top: "18%", size: 14, color: "var(--blush-300)", anim: "twinkle",  delay: "0s" },
    { left: "82%", top: "14%", size: 10, color: "var(--sage-300)",  anim: "twinkle",  delay: "1.2s" },
    { left: "16%", top: "62%", size: 12, color: "var(--honey-200)", anim: "twinkle",  delay: "2.6s" },
    { left: "88%", top: "70%", size: 14, color: "var(--blush-300)", anim: "twinkle",  delay: "0.6s" },
    { left: "70%", top: "22%", size: 18, color: "var(--rose-200)",  anim: "drift-1",  delay: "0s" },
    { left: "22%", top: "30%", size: 16, color: "var(--sage-200)",  anim: "drift-2",  delay: "0s" },
  ];
  const hearts = [
    { left: "12%", top: "78%", size: 16, color: "var(--rose-200)", anim: "drift-2", delay: "0.4s" },
    { left: "78%", top: "82%", size: 14, color: "var(--blush-300)", anim: "drift-1", delay: "1.5s" },
  ];
  return (
    <section ref={ref} className="hero reveal" id="top" data-screen-label="hero">
      <div className="hero-halo" />
      {stars.map((s, i) => (
        <div key={i} className={`ornament ${s.anim}`} style={{ left: s.left, top: s.top, animationDelay: s.delay }}>
          <Ornament name="star" size={s.size} color={s.color} />
        </div>
      ))}
      {hearts.map((h, i) => (
        <div key={i} className={`ornament ${h.anim}`} style={{ left: h.left, top: h.top, animationDelay: h.delay }}>
          <Ornament name="heart" size={h.size} color={h.color} />
        </div>
      ))}
      <div className="hero-eyebrow">an anniversary, in cream paper</div>
      <h1 className="hero-title">for <em>you</em>,<br/>since day one.</h1>
      <p className="hero-sub">a quiet page · for the long way between us</p>
      <div className="hero-meta">
        <span>458 days</span>
        <span className="hero-meta-dot"></span>
        <span>2 cities</span>
        <span className="hero-meta-dot"></span>
        <span>1 trip booked</span>
      </div>
    </section>
  );
}
window.Hero = Hero;
