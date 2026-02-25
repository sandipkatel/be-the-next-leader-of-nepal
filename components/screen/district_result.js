"use client";

import Masthead from "../ui/masthead";

export default function DistrictResultScreen({
  setup,
  result,
  allResults,
  policyResults,
  onContinue,
}) {
  const { name, district, party } = setup;
  const playerWon = allResults[0].isSelf;
  const winner = allResults[0];
  const totalPS = policyResults.reduce(
    (s, r) => s + r.scores.reduce((ss, x) => ss + x.score, 0),
    0,
  );
  const maxPS = policyResults.length * 5 * 100;
  const policyPct = Math.round((totalPS / maxPS) * 100);

  return (
    <div className="paper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="z1">
        <Masthead
          sub={`${district} — Official Result Declared`}
          ticker={`RESULT: ${winner.name} (${winner.party.short}) wins ${district} with ${winner.votes.toLocaleString()} votes · Policy debate credited for ${playerWon ? "securing" : "narrowing"} the vote`}
        />
        <div
          style={{ maxWidth: 560, margin: "0 auto", padding: "18px 16px" }}
          className="fade-in"
        >
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            {playerWon ? (
              <div
                className="stamp stamp-g stamp-in"
                style={{ fontSize: 14, padding: "6px 20px", letterSpacing: 5 }}
              >
                SEAT WON ✓
              </div>
            ) : (
              <div
                className="stamp stamp-in"
                style={{ fontSize: 14, padding: "6px 20px", letterSpacing: 5 }}
              >
                SEAT LOST ✗
              </div>
            )}
          </div>
          <div
            style={{
              borderTop: "4px solid #170d00",
              borderBottom: "1px solid #170d00",
              padding: "12px 0",
              marginBottom: 14,
            }}
          >
            <div
              className="hl"
              style={{ fontSize: "clamp(20px,4.5vw,34px)", marginBottom: 8 }}
            >
              {playerWon
                ? `${name} Wins ${district}!`
                : `${winner.name} Captures ${district}`}
            </div>
            <div className="byline">
              Official Declaration · Returning Officer · {district}
            </div>
            <div className="body">
              {playerWon
                ? `${name} has won the ${district} parliamentary seat with ${result.pct}% of the vote. The public debate on policy proved decisive — voters rewarded specific, credible promises. Supporters pour into the streets.`
                : `${winner.name} of ${winner.party.short} has won ${district}. ${name} fought a strong campaign but fell short. Policy scores showed strength in some areas, but the rivals' ground game was stronger today.`}
            </div>
          </div>

          {/* Policy → votes explanation */}
          <div style={{ border: "1px solid #b8946a", marginBottom: 14 }}>
            <div className="ink-blue">
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                How Policies Influenced Votes
              </div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 9,
                      letterSpacing: 2,
                      color: "#694818",
                      textTransform: "uppercase",
                    }}
                  >
                    Policy Rating
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 900,
                      fontSize: 26,
                      color: "#0d2860",
                    }}
                  >
                    {policyPct}%
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 24,
                      color: "#694818",
                    }}
                  >
                    →
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 9,
                      letterSpacing: 2,
                      color: "#694818",
                      textTransform: "uppercase",
                    }}
                  >
                    Vote Share
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 900,
                      fontSize: 26,
                      color: "#780e0e",
                    }}
                  >
                    {result.pct}%
                  </div>
                </div>
              </div>
              <div
                className="body"
                style={{ fontSize: 12, fontStyle: "italic", color: "#5a3a0a" }}
              >
                {policyPct >= 65
                  ? "Your detailed, specific policies resonated deeply with voters. They felt you understood their problems."
                  : policyPct >= 45
                    ? "Your policies were credible. A stronger focus on voter-specific issues could have pushed further."
                    : "Vague or missing policies cost votes. Voters here want concrete plans, not broad slogans."}
              </div>
            </div>
          </div>

          <div style={{ border: "2px solid #170d00", marginBottom: 14 }}>
            <div className="ink">
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                Final Count — {district}
              </div>
            </div>
            {allResults.map((r, i) => {
              const barPct = Math.round((r.votes / allResults[0].votes) * 100);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderBottom:
                      i < allResults.length - 1 ? "1px solid #d8c080" : "none",
                    background: r.isSelf
                      ? "rgba(120,14,14,.05)"
                      : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 900,
                      fontSize: 18,
                      color: i === 0 ? "#780e0e" : "#9a8050",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 20 }}>{r.party.symbol}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: r.isSelf ? 700 : 400,
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {r.name}
                      {r.isSelf && (
                        <span
                          style={{
                            fontFamily: "'Special Elite',cursive",
                            fontSize: 9,
                            color: "#780e0e",
                            border: "1px solid #780e0e",
                            padding: "1px 5px",
                          }}
                        >
                          YOU
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: 6,
                          background: "#e8d8a0",
                          border: "1px solid #b8946a",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${barPct}%`,
                            background: r.isSelf ? party.color : r.party.color,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontFamily: "'Special Elite',cursive",
                          fontSize: 10,
                          color: "#694818",
                          width: 64,
                          textAlign: "right",
                        }}
                      >
                        {r.votes.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn-ink" onClick={onContinue}>
            Watch National Results →
          </button>
        </div>
      </div>
    </div>
  );
}
