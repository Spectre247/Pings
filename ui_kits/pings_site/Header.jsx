/* Header.jsx — minimal sticky header */
function Header() {
  return (
    <header className="header">
      <a href="#top" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
        <img src="../../assets/logo-pings-mark.svg" width="28" height="28" alt="" />
        <span style={{fontFamily:"var(--font-serif)",fontSize:20,letterSpacing:"-0.03em",color:"var(--ink)",fontWeight:400}}>pings</span>
      </a>
      <nav className="header-nav">
        <a className="header-link" href="#countdown">prague</a>
        <a className="header-link" href="#timeline">timeline</a>
        <a className="header-link" href="#mixtape">mixtape</a>
        <a className="header-link" href="#letter">letter</a>
      </nav>
    </header>
  );
}
window.Header = Header;
