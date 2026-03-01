"use client";

import { useState } from "react";
import Masthead from "../ui/masthead";
import { NARRATOR } from "../../data/narrators";
import { shuffle } from "../../utils/shuffle";

export default function BallotScreen({ setup, opponents, onVote }) {
  const { name, district, party } = setup;
  const [allCandidates] = useState(() =>
    shuffle([{ name, party }, ...opponents.map((o) => ({ ...o }))]),
  );
  const [selected, setSelected] = useState(null);

  const handleCast = (i) => {
    setSelected(i);
    setTimeout(() => onVote(allCandidates[selected]), 3000);
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
          {/* Header */}
          <div
            className="hl"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              textAlign: "center",
              marginBottom: 6,
              marginTop: 6,
            }}
          >
            Cast Your Vote
          </div>

          {/* Official Ballot*/}
          <div
            style={{
              padding: "10px 12px",
              background: "#fff",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                border: "3px solid #2d1f0f",
                margin: "0 auto",
                maxWidth: 400,
                padding: "8px 0",
                fontFamily: "serif",
                fontWeight: 800,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(18px, 3vw, 18px)",
                  marginBottom: -16,
                }}
              >
                प्रतिनिधि सभा सदस्य निर्वाचन, २०८२
              </div>
              <br />
              प्रत्यक्ष्य निर्वाचन प्रणालीको मतपत्र
              <br />
              एउटा कोष्ठमा मात्र मतसङ्केत (✗) गर्नुहोस्
            </div>

            {/* Ballot Grid */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                margin: "24px 0",
              }}
            >
              {allCandidates.map((c, i) => (
                <div
                  key={i}
                  onClick={() => !selected && handleCast(i)}
                  style={{
                    border: "3px solid #2d1f0f",
                    display: "flex",
                    alignItems: "center",
                    minHeight: "clamp(60px, 15vw, 90px)",
                    cursor: selected ? "default" : "pointer",
                    background: selected === i ? "#f5f0e8" : "#fff",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected && selected !== i) {
                      e.currentTarget.style.background = "#faf8f3";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected && selected !== i) {
                      e.currentTarget.style.background = "#fff";
                    }
                  }}
                >
                  <div
                  className="stamp-in"
                    style={{
                      width: "clamp(35px, 8vw, 55px)",
                      height: "clamp(35px, 8vw, 55px)",
                    }}
                  >
                    <img
                      src={c.party.symbol}
                      alt="Vote stamp"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        marginLeft: 12,
                        filter: "brightness(0)",
                      }}
                    />
                  </div>
                  {/* Vote stamp */}
                  {selected === i && selected && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "clamp(30px, 10vw, 50px)",
                        height: "clamp(30px, 10vw, 50px)",
                        animation: "stamp 0.3s ease-out",
                      }}
                    >
                      <img
                        src="/swostik.png"
                        alt="Vote stamp"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div  style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 8,
              }}>
            <div
              style={{
                paddingBottom: "12px",
                textAlign: "center",
                fontFamily: "serif",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              मतदान अधिकृतको दस्तखत :{" "}
              </div>
              <div
                style={{
                  fontFamily: "'Carattere', 'Allura', cursive",
                  fontSize: 18,
                  fontWeight: 800,
                  fontStyle: "italic",
                  paddingLeft: 8,
                  marginTop: -8,
                  textDecoration: "underline",
                  rotate: "-20deg",
                  letterSpacing: "2px",
                }}
              >
                Sandip
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: 14 }}>
            {selected && (
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
