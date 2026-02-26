export default function Masthead({ sub, ticker }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <div className="edition-bar">
        <span>NEPAL PARLIAMENTARY ELECTION · 2082 B.S.</span>
        <span>{today}</span>
        <span>निःशुल्क</span>
      </div>
      <div className="masthead">
        <div
          style={{
            fontFamily: "'Special Elite',cursive",
            fontSize: 10,
            letterSpacing: 6,
            color: "#583a0e",
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          The
        </div>
        <div className="mast-title">Shree Patrika</div>
        <div className="mast-sub">
          श्री पत्रिका · Voice of the People · Nepal's Election Chronicle
        </div>
      </div>
      {sub && <div className="sub-bar">{sub}</div>}
      {ticker && (
        <div className="ticker">
          <span className="ticker-inner">
            &nbsp;&nbsp; ⬜ LIVE 2082 &nbsp;·&nbsp; {ticker} &nbsp;·&nbsp; SHREE
            PATRIKA — NEPAL'S ELECTION VOICE &nbsp;·&nbsp; निर्वाचन आयोग नेपाल
            &nbsp;·&nbsp; ⬜&nbsp;&nbsp;
          </span>
        </div>
      )}
    </>
  );
}
