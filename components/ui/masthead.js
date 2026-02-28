export default function Masthead({ sub, ticker }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      {sub && <div className="sub-bar">{sub}</div>}
      {ticker && (
        <div className="ticker">
          <span className="ticker-inner">
            &nbsp;&nbsp;⬛ LIVE 2082 &nbsp;·&nbsp; {ticker} &nbsp;·&nbsp; JANATA
            PATRIKA — NEPAL'S ELECTION VOICE &nbsp;·&nbsp; निर्वाचन आयोग नेपाल
            &nbsp;·&nbsp; ⬛&nbsp;&nbsp;
          </span>
        </div>
      )}
    </>
  );
}
