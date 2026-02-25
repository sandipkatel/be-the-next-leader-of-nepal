export default function Masthead({ sub, ticker }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <div className="edition-bar">
        <span>NEPAL PARLIAMENTARY ELECTION · 2081 B.S.</span>
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
        <div className="mast-title">Janata Patrika</div>
        <div className="mast-sub">
          जनता पत्रिका · Voice of the People · Nepal's Election Chronicle
        </div>
      </div>
      {sub && <div className="sub-bar">{sub}</div>}
      {ticker && (
        <div className="ticker">
          <span className="ticker-inner">
            &nbsp;&nbsp;⬛ LIVE 2081 &nbsp;·&nbsp; {ticker} &nbsp;·&nbsp; JANATA
            PATRIKA — NEPAL'S ELECTION VOICE &nbsp;·&nbsp; निर्वाचन आयोग नेपाल
            &nbsp;·&nbsp; ⬛&nbsp;&nbsp;
          </span>
        </div>
      )}
    </>
  );
}

export default function VoterCard({ voter, score, revealed, pending }) {
  const cls = revealed
    ? score >= 60
      ? "good"
      : score >= 35
        ? "mid"
        : "bad"
    : "";
  const verdict =
    score >= 80
      ? "Strongly Supports"
      : score >= 60
        ? "Supports"
        : score >= 40
          ? "Undecided"
          : score >= 20
            ? "Opposes"
            : "Strongly Opposes";
  const vc = score >= 60 ? "#1a5a08" : score >= 40 ? "#5a4800" : "#5a0808";
  const stars = Math.round((score / 100) * 5);
  return (
    <div className={`voter-card ${cls}`}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>
          {voter.emoji}
        </span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {voter.name}
          </div>
          <div
            style={{
              fontFamily: "'Special Elite',cursive",
              fontSize: 9,
              letterSpacing: 2,
              color: "#694818",
              textTransform: "uppercase",
            }}
          >
            {voter.role}
          </div>
          {!revealed && (
            <div
              style={{
                fontFamily: "'Libre Baskerville',serif",
                fontSize: 11,
                color: "#694818",
                fontStyle: "italic",
                marginTop: 3,
              }}
            >
              {voter.desc}
            </div>
          )}
          {pending && !revealed && (
            <div
              style={{
                fontFamily: "'Special Elite',cursive",
                fontSize: 9,
                color: "#987438",
                marginTop: 4,
                letterSpacing: 1,
              }}
            >
              Awaiting policy…
            </div>
          )}
          {revealed && (
            <div style={{ marginTop: 4 }}>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 9,
                  letterSpacing: 2,
                  color: vc,
                  textTransform: "uppercase",
                }}
              >
                {verdict}
              </div>
              <div style={{ display: "flex", gap: 1, marginTop: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    style={{
                      color: i <= stars ? "#7a3800" : "#c8a860",
                      fontSize: 13,
                    }}
                  >
                    ★
                  </span>
                ))}
                <span
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 9,
                    color: "#694818",
                    marginLeft: 4,
                  }}
                >
                  {score}/100
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimerBar({ seconds, total, danger }) {
  const pct = (seconds / total) * 100;
  const red = seconds <= danger;
  return (
    <div>
      <div className="srule">
        <span>Time Remaining</span>
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            fontSize: 22,
            color: red ? "#780e0e" : "#170d00",
          }}
          className={red && seconds <= 5 ? "blink" : ""}
        >
          {seconds}s
        </span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill${red ? " red" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
