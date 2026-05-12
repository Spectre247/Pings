/* StickyPlayer.jsx — floating frosted-paper player */
function StickyPlayer() {
  const player = useContext(PlayerContext);
  if (!player?.track) return null;
  const { track, isPlaying, toggle, next, prev } = player;
  return (
    <div className={`sticky-player`}>
      <button className="sp-play" onClick={() => toggle(track)} aria-label={isPlaying ? "pause" : "play"}>
        <Icon name={isPlaying ? "pause" : "play"} size={16} style={{marginLeft: isPlaying ? 0 : 1}} />
      </button>
      <div className="sp-meta">
        <span className="sp-title">{track.title}</span>
        <span className="sp-time">{track.artist} · {track.length}</span>
      </div>
      <div className="sp-divider"></div>
      <button className="sp-skip" onClick={prev} aria-label="previous"><Icon name="skip-back" size={16} /></button>
      <button className="sp-skip" onClick={next} aria-label="next"><Icon name="skip-forward" size={16} /></button>
    </div>
  );
}
window.StickyPlayer = StickyPlayer;
