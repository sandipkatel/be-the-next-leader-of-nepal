"use client";

import { useState } from "react";
import Masthead from "../ui/masthead";
import { NARRATOR } from "../../data/narrators";
import { shuffle } from "../../utils/shuffle";
import { Autour_One } from "next/font/google";

export default function BallotScreen({ setup, opponents, onVote }) {
  const { name, district, party } = setup;
  const [allCandidates] = useState(() =>
    shuffle([{ name, party }, ...opponents.map((o) => ({ ...o }))]),
  );
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("choose");

  const handleCast = (i) => {
    setSelected(i);
    setPhase("confirm");
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
            <div
              style={{
                paddingBottom: "12px",
                textAlign: "center",
                fontFamily: "serif",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              मतदान अधिकृतको दस्तखत :
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: 14 }}>
            {!selected && phase === "confirm" && (
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
                <button className="btn-ink" onClick={handleCast}>
                  Cast Ballot ✗
                </button>
              </div>
            )}
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
