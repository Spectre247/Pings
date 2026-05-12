/* Timeline.jsx — vertical thread of relationship chapters */
const TIMELINE_ENTRIES = [
  {
    eyebrow: "CHAPTER 01 · FEB 2024",
    title: "the night we met",
    body: "a friend's birthday. you laughed at a joke i didn't tell well, and i decided that was enough.",
    photo: true,
  },
  {
    eyebrow: "CHAPTER 02 · APR 2024",
    title: "the first long week",
    body: "two flights, three time zones, one bad airport coffee. we figured out how to fall asleep on the phone.",
  },
  {
    eyebrow: "CHAPTER 03 · NOV 2024",
    title: "first time you said it back",
    body: "a tuesday. nothing special, everything special.",
    photo: true,
  },
  {
    eyebrow: "CHAPTER 04 · MAR 2025",
    title: "the rain in lisbon",
    body: "we ducked into a bookshop and didn't leave for two hours. you bought me a small green book.",
  },
  {
    eyebrow: "CHAPTER 05 · MAY 2026",
    title: "prague · soon",
    body: "tickets booked. pierogi mapped. it's almost here.",
    soft: true,
  },
];

function Timeline() {
  return (
    <Section id="timeline" eyebrow="our timeline" title="five <em>chapters</em>, so far" sub="the version we'd tell at a small dinner, not on instagram.">
      <div className="timeline-list">
        {TIMELINE_ENTRIES.map((e, i) => (
          <React.Fragment key={i}>
            <div className="timeline-rail">
              <div className={`timeline-dot ${e.soft ? "timeline-dot-soft" : ""}`}></div>
            </div>
            <div className="timeline-entry">
              <div className="timeline-eyebrow">{e.eyebrow}</div>
              <h3 className="timeline-title">{e.title}</h3>
              <p className="timeline-body">{e.body}</p>
              {e.photo && <div className="timeline-photo">photo placeholder · drop a real one in</div>}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
}
window.Timeline = Timeline;
