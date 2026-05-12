/* Countdown.jsx — live ticking tiles */
function Countdown() {
  const target = useMemo(() => new Date("2026-05-28T18:00:00").getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  const tiles = [
    { n: pad(days),  l: "days",  first: true },
    { n: pad(hours), l: "hours" },
    { n: pad(mins),  l: "min" },
    { n: pad(secs),  l: "sec" },
  ];
  return (
    <Section id="countdown" eyebrow="prague · in" title="<em>soon.</em>" sub="three weeks of pierogi, the river at night, finally.">
      <div className="countdown-card">
        <div className="countdown-tiles">
          {tiles.map((t, i) => (
            <React.Fragment key={i}>
              <div className={`countdown-tile ${t.first ? "countdown-tile-first" : ""}`}>
                <span className="countdown-num">{t.n}</span>
                <span className="countdown-label">{t.l}</span>
              </div>
              {i < tiles.length - 1 && <span className="countdown-colon">:</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:18,marginTop:32,color:"var(--ink-3)",fontSize:13,fontFamily:"var(--font-sans)"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
            <Icon name="map-pin" size={14} /> Prague
          </span>
          <span style={{width:4,height:4,borderRadius:"50%",background:"var(--ink-4)"}}></span>
          <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
            <Icon name="calendar" size={14} /> May 28, 2026
          </span>
        </div>
      </div>
    </Section>
  );
}
window.Countdown = Countdown;
