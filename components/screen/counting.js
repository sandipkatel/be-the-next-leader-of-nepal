"use client";

import { useState, useEffect } from "react";
import Masthead from "../ui/masthead";
import { NARRATOR } from "../../data/narrators";
import { rnd, policyScoreToVotePct } from "../../helpers/logic";
export default function CountingScreen({
  setup,
  opponents,
  policyResults,
  onResult,
  totalVotes,
}) {
  const { name, district, party, difficulty } = setup;
  const [progress, setProgress] = useState(0);

  const totalPolicyScore = policyResults.reduce(
    (s, r) => s + r.scores.reduce((ss, x) => ss + x.score, 0),
    0,
  );
  const maxPolicyScore = policyResults.length * 4 * 100; // rounds × voters × 100
  const playerPct = policyScoreToVotePct(
    totalPolicyScore,
    maxPolicyScore,
    difficulty,
  );
  const playerVotes = Math.round((playerPct / 100) * totalVotes);
  const opponentVotes = totalVotes - playerVotes;

  const opVotesSplit = [];
  let rem = opponentVotes;
  opponents.forEach((o, i) => {
    if (i === opponents.length - 1) {
      opVotesSplit.push(rem);
    } else {
      const v = Math.floor(rem * (0.25 + Math.random() * 0.35));
      opVotesSplit.push(v);
      rem -= v;
    }
  });
  const allResults = [
    { name, party, votes: playerVotes, isSelf: true },
    ...opponents.map((o, i) => ({
      ...o,
      votes: opVotesSplit[i],
      isSelf: false,
    })),
  ].sort((a, b) => b.votes - a.votes);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += 1.8;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(t);
        setTimeout(
          () =>
            onResult(
              { playerVotes, opponentVotes, totalVotes, pct: playerPct },
              allResults,
            ),
          4000,
        );
      }
    }, 250);
    return () => clearInterval(t);
  }, []);

  const counted = Math.round((progress / 100) * totalVotes);

  return (
    <div className="paper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="z1">
        <Masthead
          sub={`Vote Counting · ${district} · Live`}
          ticker={`${district} counting underway · ${counted.toLocaleString()} votes tallied · Party agents tense · Policy debate echoes in counting room`}
        />
        <div
          style={{ maxWidth: 720, margin: "0 auto", padding: "18px 16px" }}
          className="fade-in"
        >
          <div
            style={{
              borderBottom: "1px solid #170d00",
              padding: "10px 0",
              marginBottom: 14,
            }}
          >
            <div
              className="hl"
              style={{ fontSize: "clamp(18px,4vw,26px)", marginBottom: 6 }}
            >
              {NARRATOR.counting(district).slice(0, 80)}…
            </div>
            <div className="byline">
              Live Count · {district} Counting Centre
            </div>
            <div className="body" style={{ fontSize: 13 }}>
              Your policy performance during the public debate will directly
              influence today's vote tally. Every promise made — and kept
              specific — earns votes.
            </div>
          </div>

          {/* Counting progress */}
          <div style={{ border: "1px solid #b8946a", marginBottom: 14 }}>
            <div className="ink">
              <div
                style={{
                  fontFamily: "var(--font-headline), serif",
                  fontSize: 10,
                  letterSpacing: 0.5,
                  textTransform: "capitalize",
                }}
              >
                Ballot Count Progress
              </div>
            </div>
            <div style={{ padding: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-headline), serif",
                    fontSize: 10,
                    letterSpacing: 0.3,
                    color: "#694818",
                  }}
                >
                  Votes Tallied
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 900,
                    fontSize: 18,
                  }}
                >
                  {counted.toLocaleString()} / {totalVotes.toLocaleString()}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-headline), serif",
                  fontSize: 9,
                  color: "#694818",
                  marginTop: 5,
                  letterSpacing: 0.3,
                  textTransform: "capitalize",
                }}
              >
                {progress < 100 ? (
                  <span>
                    Counting in progress <span className="blink">●</span>
                  </span>
                ) : (
                  "Complete ✓"
                )}
              </div>
            </div>
          </div>
          <div className="srule">Live Tally (Partial)</div>
          <div style={{ border: "1px solid #b8946a" }}>
            {allResults.map((r, i) => {
              const displayVotes = Math.round(r.votes * (progress / 100));
              const barPct =
                allResults[0].votes > 0
                  ? Math.round((displayVotes / totalVotes) * 100)
                  : 0;
              return (
                <div key={i} className="counting-row">
                  <div
                    style={{
                      width: 96,
                      fontFamily: "'Libre Baskerville',serif",
                      fontSize: 12,
                      fontWeight: r.isSelf ? 700 : 400,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={r.party.symbol}
                      alt={r.party.short}
                      style={{ width: 34, height: 34, objectFit: "contain" }}
                    />
                    <span style={{ color: r.isSelf ? "#780e0e" : "#170d00" }}>
                      {r.name.split(" ")[0]}
                    </span>
                  </div>
                  <div className="cbar-track">
                    <div
                      className="cbar-fill"
                      style={{
                        width: `${barPct}%`,
                        background: r.isSelf ? party.color : r.party.color,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: 72,
                      textAlign: "right",
                      fontFamily: "var(--font-headline), serif",
                      fontSize: 11,
                      letterSpacing: 0.3,
                      flexShrink: 0,
                    }}
                  >
                    {displayVotes.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Policy score summary */}
          <div style={{ border: "1px solid #b8946a", marginTop: 14 }}>
            <div className="ink-blue">
              <div
                style={{
                  fontFamily: "var(--font-headline), serif",
                  fontSize: 10,
                  letterSpacing: 0.5,
                  textTransform: "capitalize",
                }}
              >
                Policy Performance Summary
              </div>
            </div>
            <div
              style={{
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {policyResults.map((r, i) => {
                const rs = r.scores.reduce((s, x) => s + x.score, 0);
                const rmax = r.scores.length * 100;
                const pct = Math.round((rs / rmax) * 100);
                return (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-headline), serif",
                          fontSize: 9,
                          letterSpacing: 0.3,
                          color: "#694818",
                          textTransform: "capitalize",
                        }}
                      >
                        {r.problem.title}
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: "#e8d8a0",
                          border: "1px solid #b8946a",
                          marginTop: 3,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${pct}%`,
                            background:
                              pct >= 60
                                ? "#0d4018"
                                : pct >= 40
                                  ? "#8a7010"
                                  : "#780e0e",
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 900,
                        fontSize: 16,
                        color:
                          pct >= 60
                            ? "#0d4018"
                            : pct >= 40
                              ? "#8a7010"
                              : "#780e0e",
                        flexShrink: 0,
                        width: 40,
                        textAlign: "right",
                      }}
                    >
                      {pct}%
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                padding: "8px 14px",
                borderTop: "1px solid #d8c080",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-headline), serif",
                  fontSize: 9,
                  letterSpacing: 0.3,
                  color: "#694818",
                  textTransform: "capitalize",
                }}
              >
                Overall Policy Rating
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#170d00",
                }}
              >
                {Math.round((totalPolicyScore / maxPolicyScore) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
