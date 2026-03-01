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
              fontFamily: "var(--font-headline), serif",
              fontSize: 9,
              letterSpacing: 0.3,
              color: "#694818",
              textTransform: "capitalize",
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
                marginTop: 3,
              }}
            >
              {voter.desc}
            </div>
          )}
          {pending && !revealed && (
            <div
              style={{
                fontFamily: "var(--font-headline), serif",
                fontSize: 9,
                color: "#987438",
                marginTop: 4,
                letterSpacing: 0.3,
              }}
            >
              Awaiting policy…
            </div>
          )}
          {revealed && (
            <div style={{ marginTop: 4 }}>
              <div
                style={{
                  fontFamily: "var(--font-headline), serif",
                  fontSize: 9,
                  letterSpacing: 0.3,
                  color: vc,
                  textTransform: "capitalize",
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
                    fontFamily: "var(--font-headline), serif",
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
