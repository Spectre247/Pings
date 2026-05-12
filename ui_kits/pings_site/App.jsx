/* App.jsx — composes everything, provides PlayerContext */
function App() {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = (t) => {
    if (!track || track.id !== t.id) {
      setTrack(t);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };
  const findIndex = (t) => TAPE_TRACKS.findIndex((x) => x.id === t.id);
  const next = () => {
    if (!track) return;
    const i = findIndex(track);
    setTrack(TAPE_TRACKS[(i + 1) % TAPE_TRACKS.length]);
    setIsPlaying(true);
  };
  const prev = () => {
    if (!track) return;
    const i = findIndex(track);
    setTrack(TAPE_TRACKS[(i - 1 + TAPE_TRACKS.length) % TAPE_TRACKS.length]);
    setIsPlaying(true);
  };

  const playerValue = { track, isPlaying, toggle, next, prev };

  return (
    <HuntProvider>
      <PlayerContext.Provider value={playerValue}>
        <div className="page">
          <Header />
          <Hero />
          {/* one hidden heart tucked into the hero margin via tiny inline span */}
          <div style={{textAlign:"center",marginTop:-40,marginBottom:24,fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:14,color:"var(--ink-3)"}}>
            scroll, slowly<HiddenHeart id="h-hero" />.
          </div>
          <Countdown />
          <Timeline />
          {/* hidden heart inside intro to the hunt */}
          <div style={{textAlign:"center",marginTop:-32,marginBottom:0,fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:14,color:"var(--ink-3)"}}>
            (one is closer than you think<HiddenHeart id="h-tl" />)
          </div>
          <TreasureHunt />
          <Mixtape />
          <Letter />
          <footer style={{textAlign:"center",padding:"40px 0 0",color:"var(--ink-4)",fontFamily:"var(--font-sans)",fontSize:12,letterSpacing:"0.06em"}}>
            pings · made by hand · for one person
          </footer>
        </div>
        <StickyPlayer />
      </PlayerContext.Provider>
    </HuntProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
