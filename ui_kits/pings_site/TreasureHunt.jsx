/* TreasureHunt.jsx — exposes a registry that other sections can call to register hidden hearts.
   Each hidden heart is rendered inline in the surrounding copy via <HiddenHeart id="..." />.
   Progress persists to localStorage.
*/
const HUNT_TOTAL = 4;

function HiddenHeart({ id }) {
  const ctx = useContext(HuntContext);
  if (!ctx) return null;
  const found = ctx.found.has(id);
  return (
    <span
      className={`hidden-heart ${found ? "found" : ""}`}
      onClick={() => ctx.find(id)}
      title={found ? "found" : "tap me"}
    >
      <Ornament name="heart" size={14} color="currentColor" />
    </span>
  );
}

const HuntContext = React.createContext(null);

function HuntProvider({ children }) {
  const [found, setFound] = useState(() => {
    try {
      const raw = localStorage.getItem("pings.hunt.v1");
      return new Set(raw ? JSON.parse(raw) : []);
    } catch { return new Set(); }
  });
  const find = (id) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem("pings.hunt.v1", JSON.stringify([...next])); } catch {}
      return next;
    });
  };
  const reset = () => {
    setFound(new Set());
    try { localStorage.removeItem("pings.hunt.v1"); } catch {}
  };
  return (
    <HuntContext.Provider value={{ found, find, reset, total: HUNT_TOTAL }}>
      {children}
    </HuntContext.Provider>
  );
}

function TreasureHunt() {
  const ctx = useContext(HuntContext);
  const count = ctx?.found.size ?? 0;
  const total = HUNT_TOTAL;
  const done = count >= total;

  return (
    <Section id="hunt" eyebrow="a small game" title="four <em>tiny hearts</em> are hidden" sub="they're tucked inside the writing on this page. find them all.">
      <div className="hunt-card">
        <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"6px 14px",borderRadius:999,background:"var(--paper-2)",border:"1px solid var(--hairline)",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--ink-3)",letterSpacing:"0.06em"}}>
          <Icon name="sparkles" size={14} />
          {count} of {total} found
        </div>
        <div className="hunt-progress">
          {Array.from({length: total}).map((_, i) => (
            <span key={i} className={`hunt-pip ${i < count ? "found" : ""}`}></span>
          ))}
        </div>
        {done && (
          <div className="hunt-reveal">
            you found them all. the smallest one is the last word i ever want to stop saying — <span style={{color:"var(--blush-500)"}}>yours</span>.
          </div>
        )}
        {!done && count > 0 && (
          <div style={{marginTop:20,fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:14,color:"var(--ink-3)"}}>
            keep looking — {total - count} more.
          </div>
        )}
        <div style={{marginTop:18}}>
          <button className="btn btn-ghost" onClick={ctx?.reset} style={{fontSize:12}}>start over</button>
        </div>
      </div>
    </Section>
  );
}

window.TreasureHunt = TreasureHunt;
window.HuntProvider = HuntProvider;
window.HuntContext = HuntContext;
window.HiddenHeart = HiddenHeart;
