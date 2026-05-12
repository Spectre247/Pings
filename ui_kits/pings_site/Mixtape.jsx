/* Mixtape.jsx — track list, drives the sticky player */
const TAPE_TRACKS = [
  { id: "t1", title: "our song no. 1",        artist: "the one from your kitchen",     length: "3:47" },
  { id: "t2", title: "the rain in lisbon",    artist: "and the bookshop after",        length: "4:12" },
  { id: "t3", title: "good morning, again",   artist: "458 days, 458 of these",        length: "2:58" },
  { id: "t4", title: "tuesday, nothing special", artist: "you said it back",           length: "3:31" },
  { id: "t5", title: "soon.",                 artist: "for the prague flight",         length: "4:44" },
];

function Mixtape() {
  const player = useContext(PlayerContext);
  return (
    <Section id="mixtape" eyebrow="mixtape" title="five <em>songs</em>, ours" sub="press one. press play. it'll follow you down the page.">
      <div className="tape-list">
        {TAPE_TRACKS.map((t, i) => {
          const isCurrent = player?.track?.id === t.id;
          const isPlaying = isCurrent && player?.isPlaying;
          return (
            <div
              key={t.id}
              className={`tape-row ${isPlaying ? "playing" : ""}`}
              onClick={() => player?.toggle(t)}
            >
              <span className="tape-num">{String(i+1).padStart(2,"0")}</span>
              <div>
                <div className="tape-title">{t.title}</div>
                <div className="tape-artist">{t.artist}</div>
              </div>
              <span className="tape-len">{t.length}</span>
              <div className="tape-icon">
                <Icon name={isPlaying ? "pause" : "play"} size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

window.Mixtape = Mixtape;
window.TAPE_TRACKS = TAPE_TRACKS;
