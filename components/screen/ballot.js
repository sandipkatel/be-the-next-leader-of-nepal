"use client";

import { useState } from "react";
import Masthead from "../ui/masthead";
import { NARRATOR } from "../../data/narrators";
import { shuffle } from "../../utils/shuffle";

export default function BallotScreen({ setup, opponents, onVote }) {
  const { name, district, party } = setup;
  const [allCandidates] = useState(() =>
    shuffle([
      { name, party, isSelf: true },
      ...opponents.map((o) => ({ ...o, isSelf: false })),
    ]),
  );
  const [selected, setSelected] = useState(null);
  const [stamped, setStamped] = useState(false);
  const [phase, setPhase] = useState("choose");
  const handleCast = () => {
    setStamped(true);
    setTimeout(() => onVote(allCandidates[selected]), 2000);
  };
  return (
    <div className="paper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="z1">
        <Masthead
          sub={`Election Day · ${district} · Polling In Progress`}
          ticker={`Polling stations open across ${district} · Long queues reported · ${name} awaits results · ${NARRATOR.ballotDay(district).slice(0, 70)}…`}
        />
        <div
          style={{ maxWidth: 720, margin: "0 auto", padding: "18px 16px" }}
          className="fade-in"
        >
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div
              style={{
                fontFamily: "'Special Elite',cursive",
                fontSize: 10,
                letterSpacing: 5,
                color: "#694818",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              निर्वाचन आयोग नेपाल · Election Commission Nepal
            </div>
            <div
              className="hl"
              style={{ fontSize: "clamp(20px,4.5vw,30px)", marginBottom: 4 }}
            >
              Cast Your Personal Vote
            </div>
            <div
              style={{
                fontFamily: "'Special Elite',cursive",
                fontSize: 11,
                letterSpacing: 2,
                color: "#694818",
              }}
            >
              {district} Parliamentary Constituency · 2082 B.S.
            </div>
          </div>
          <div className="ballot-box">
            <div
              style={{
                fontFamily: "'Special Elite',cursive",
                fontSize: 10,
                letterSpacing: 3,
                color: "#694818",
                textTransform: "uppercase",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Mark only ONE candidate
            </div>
            {allCandidates.map((c, i) => (
              <div
                key={i}
                className={`ballot-row${selected === i ? " selected" : ""}${stamped ? " stamped" : ""}`}
                onClick={() => !stamped && setSelected(i)}
              >
                <div
                  className={`ballot-circle${selected === i ? " filled" : ""}`}
                >
                  {selected === i && (
                    <span style={{ color: "#f3e8c8", fontSize: 12 }}>●</span>
                  )}
                </div>
                 <img
                  src={c.symbol}
                  alt={c.short}
                  style={{ width: 34, height: 34, objectFit: "contain" }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {c.name}
                    {c.isSelf && (
                      <span
                        style={{
                          fontFamily: "'Special Elite',cursive",
                          fontSize: 9,
                          color: "#780e0e",
                          border: "1px solid #780e0e",
                          padding: "1px 5px",
                          letterSpacing: 1,
                        }}
                      >
                        YOU
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 9,
                      letterSpacing: 2,
                      color: c.party.color,
                      textTransform: "uppercase",
                    }}
                  >
                    {c.party.short} · {c.party.name}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 9,
                    letterSpacing: 1,
                    color: "#694818",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {c.isSelf && (
                    <div style={{ color: "#0d2860", marginTop: 2 }}>
                      PM: {c.party.pm.split(" ").slice(-1)}
                    </div>
                  )}
                </div>
                <div
                  className={`vote-mark${selected === i && stamped ? " show" : ""}`}
                >
                  ✗
                </div>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px dashed #b8946a",
                marginTop: 12,
                paddingTop: 10,
                fontFamily: "'Special Elite',cursive",
                fontSize: 9,
                letterSpacing: 2,
                color: "#694818",
                textAlign: "center",
              }}
            >
              मतदाताले एउटा मात्र उम्मेदवारलाई मत दिनु पर्छ
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            {!stamped && phase === "choose" && (
              <button
                className="btn-ink"
                onClick={() => selected !== null && setPhase("confirm")}
                disabled={selected === null}
              >
                Confirm Selection →
              </button>
            )}
            {!stamped && phase === "confirm" && (
              <div>
                <div
                  style={{
                    border: "1px solid #780e0e",
                    padding: "12px 14px",
                    marginBottom: 10,
                    background: "rgba(120,14,14,.05)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 10,
                      letterSpacing: 3,
                      color: "#780e0e",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    Confirm Your Vote
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {allCandidates[selected]?.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 10,
                      color: "#694818",
                      marginTop: 2,
                    }}
                  >
                    {allCandidates[selected]?.party.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Libre Baskerville',serif",
                      fontSize: 12,
                      color: "#694818",
                      marginTop: 5,
                      fontStyle: "italic",
                    }}
                  >
                    Once sealed, your ballot cannot be changed.
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  <button
                    className="btn-outline"
                    onClick={() => setPhase("choose")}
                  >
                    ← Change
                  </button>
                  <button className="btn-ink" onClick={handleCast}>
                    Cast Ballot ✗
                  </button>
                </div>
              </div>
            )}
            {stamped && (
              <div
                style={{ textAlign: "center", padding: "16px 0" }}
                className="fade-in"
              >
                <div
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 11,
                    letterSpacing: 4,
                    color: "#0d4018",
                    textTransform: "uppercase",
                  }}
                >
                  ✓ Ballot Sealed · Counting Begins…
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
