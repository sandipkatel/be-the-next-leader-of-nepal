"use client";

import { useState, useEffect, useRef } from "react";
import Masthead from "../ui/masthead";
import TimerBar from "../ui/timerbar";
import VoterCard from "../ui/votercard";
import { scorePolicy } from "../../logic";

export default function PolicyScreen({ setup, problems, voters, onComplete }) {
  const { name, district, party } = setup;
  const [round, setRound] = useState(0);
  const [policy, setPolicy] = useState("");
  const [timeLeft, setTimeLeft] = useState(75);
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState("write"); // write | reveal
  const [roundResults, setRoundResults] = useState([]);
  const timerRef = useRef(null);

  const problem = problems[round];

  useEffect(() => {
    if (phase !== "write" || submitted) return;
    setTimeLeft(75);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          doSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [round, phase]);

  const doSubmit = (auto = false) => {
    if (submitted) return;
    clearInterval(timerRef.current);
    setSubmitted(true);
    const text = auto ? "" : policy;
    const scores = voters.map((v) => ({
      voter: v,
      score: scorePolicy(text, v, problem),
    }));
    setRoundResults((prev) => [
      ...prev,
      { problem, policy: text || null, scores },
    ]);
    setTimeout(() => setPhase("reveal"), 400);
  };

  const handleNext = () => {
    if (round + 1 >= problems.length) {
      onComplete(roundResults.concat());
      return;
    }
    setRound((r) => r + 1);
    setPolicy("");
    setPhase("write");
    setSubmitted(false);
  };

  const roundTotal =
    phase === "reveal"
      ? roundResults[round]?.scores.reduce((s, r) => s + r.score, 0) || 0
      : 0;
  const roundMax = voters.length * 100;

  return (
    <div className="paper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="z1">
        <Masthead
          sub={`Public Policy Debate — Problem ${round + 1} of ${problems.length}`}
          ticker={`${name} addresses ${district} voters on ${problem.title} · Crowd listens closely · ${party.pm} watches from Kathmandu`}
        />
        <div
          style={{ maxWidth: 600, margin: "0 auto", padding: "16px 16px" }}
          className="fade-in"
        >
          {/* Progress */}
          <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
            {problems.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 5,
                  background:
                    i < round ? "#170d00" : i === round ? "#780e0e" : "#c8a060",
                  transition: "background .4s",
                }}
              />
            ))}
          </div>

          {/* Problem card */}
          <div
            style={{
              border: "2px solid #170d00",
              marginBottom: 14,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "#780e0e",
              }}
            />
            <div className="ink-red">
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                }}
              >
                ⚠ Problem Statement — Round {round + 1}
              </div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <span style={{ fontSize: 38, lineHeight: 1, flexShrink: 0 }}>
                  {problem.emoji}
                </span>
                <div>
                  <div
                    className="hl"
                    style={{
                      fontSize: "clamp(18px,4vw,26px)",
                      marginBottom: 6,
                    }}
                  >
                    {problem.headline}
                  </div>
                  <div className="body" style={{ fontSize: 13 }}>
                    {problem.body}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {phase === "write" && (
            <div className="fade-in">
              <div style={{ marginBottom: 12 }}>
                <TimerBar seconds={timeLeft} total={75} danger={18} />
              </div>
              <div className="policy-box" style={{ marginBottom: 14 }}>
                <div className="ink">
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 10,
                      letterSpacing: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    Your Policy Statement, {name}
                  </div>
                </div>
                <div>
                  <textarea
                    value={policy}
                    onChange={(e) => setPolicy(e.target.value)}
                    disabled={submitted}
                    rows={5}
                    placeholder={`As ${name}, my policy to address this crisis is…`}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 14px 10px",
                      borderTop: "1px solid #d8c080",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Special Elite',cursive",
                        fontSize: 9,
                        color: "#8a7040",
                        letterSpacing: 1,
                      }}
                    >
                      {policy.length > 180
                        ? "✦ Excellent"
                        : policy.length > 80
                          ? "◆ Good"
                          : "◇ Keep writing…"}
                    </div>
                    <button
                      className="btn-outline"
                      onClick={() => doSubmit(false)}
                      disabled={!policy.trim() || submitted}
                    >
                      Submit Policy →
                    </button>
                  </div>
                </div>
              </div>
              <div className="srule">Voters Waiting for Your Answer</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {voters.map((v) => (
                  <VoterCard
                    key={v.id}
                    voter={v}
                    score={0}
                    revealed={false}
                    pending
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 9,
                  color: "#8a7040",
                  textAlign: "center",
                  marginTop: 10,
                  letterSpacing: 2,
                }}
              >
                HINT: USE SPECIFIC WORDS & NUMBERS · TAILOR TO VOTER CONCERNS
              </div>
            </div>
          )}

          {phase === "reveal" && (
            <div className="fade-in">
              <div style={{ border: "1px solid #987438", marginBottom: 14 }}>
                <div className="ink">
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 10,
                      letterSpacing: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    Your Submitted Policy
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    borderLeft: "4px solid #780e0e",
                  }}
                >
                  <div
                    className="body"
                    style={{
                      fontStyle: roundResults[round]?.policy
                        ? "normal"
                        : "italic",
                      color: roundResults[round]?.policy
                        ? "#270e00"
                        : "#780e0e",
                    }}
                  >
                    {roundResults[round]?.policy ||
                      "⏰ Time expired — no policy submitted. The crowd murmured."}
                  </div>
                </div>
              </div>
              <div className="srule">Voter Reactions</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                {roundResults[round]?.scores.map(({ voter, score }) => (
                  <VoterCard
                    key={voter.id}
                    voter={voter}
                    score={score}
                    revealed
                  />
                ))}
              </div>
              {/* Round score */}
              {(() => {
                const pct = Math.round((roundTotal / roundMax) * 100);
                const [word, wc] =
                  pct >= 75
                    ? ["CROWD FAVOURITE", "#0d4018"]
                    : pct >= 55
                      ? ["WELL RECEIVED", "#2a4008"]
                      : pct >= 35
                        ? ["MIXED REACTION", "#5a4000"]
                        : ["POOR RESPONSE", "#5a0808"];
                return (
                  <div
                    style={{
                      border: "2px solid #170d00",
                      textAlign: "center",
                      marginBottom: 16,
                    }}
                  >
                    <div className="ink">
                      <div
                        style={{
                          fontFamily: "'Special Elite',cursive",
                          fontSize: 10,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                        }}
                      >
                        Public Response — Round {round + 1}
                      </div>
                    </div>
                    <div style={{ padding: "14px" }}>
                      <div
                        style={{
                          fontFamily: "'Special Elite',cursive",
                          fontSize: 10,
                          letterSpacing: 6,
                          color: wc,
                          border: `2px solid ${wc}`,
                          display: "inline-block",
                          padding: "4px 18px",
                          marginBottom: 8,
                        }}
                      >
                        {word}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 900,
                          fontSize: 46,
                          color: "#170d00",
                          lineHeight: 1,
                        }}
                      >
                        {pct}%
                      </div>
                      <div
                        style={{
                          fontFamily: "'Special Elite',cursive",
                          fontSize: 9,
                          color: "#694818",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          marginTop: 4,
                        }}
                      >
                        Approval · {roundTotal} / {roundMax} points
                      </div>
                    </div>
                  </div>
                );
              })()}
              <button className="btn-ink" onClick={handleNext}>
                {round + 1 >= problems.length
                  ? "Proceed to Election Day →"
                  : `Next Problem — ${round + 2} of ${problems.length} →`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
