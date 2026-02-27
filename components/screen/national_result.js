"use client";

import { useState, useEffect } from "react";
import Masthead from "../ui/masthead";
import { PARTIES } from "../../data/parties";
import { simulateNationalSeats } from "../../helpers/logic";

export default function NationalResultScreen({
  setup,
  playerWon,
  policyResults,
}) {
  const { name, district, party } = setup;
  const [seats] = useState(() =>
    simulateNationalSeats(party, playerWon, setup.difficulty),
  );
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const isCoalition = Math.random() > 0.5;
  const majority = 138;
  const playerSeats = seats[party.id];
  const partyWon = playerSeats >= majority;
  const otherParties = PARTIES.filter((p) => p.id !== party.id).sort(
    (a, b) => seats[b.id] - seats[a.id],
  );
  const biggestRival = otherParties[0];

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += 2.5;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => setRevealed(true), 300);
      }
    }, 300);
    return () => clearInterval(t);
  }, []);

  const totalPS = policyResults.reduce(
    (s, r) => s + r.scores.reduce((ss, x) => ss + x.score, 0),
    0,
  );
  const maxPS = policyResults.length * 5 * 100;
  const policyPct = Math.round((totalPS / maxPS) * 100);

  const constituenciesCounted = Math.round((progress / 100) * 275);

  return (
    <div className="paper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="z1">
        <Masthead
          sub="National Results — Nepal Parliamentary Election 2082"
          ticker={`BREAKING · ${constituenciesCounted}/275 seats declared · ${party.short} ${progress < 100 ? "leading in" : "wins"} ${Math.round((progress / 100) * playerSeats)} seats · Majority mark: ${majority} · ${progress >= 100 ? (partyWon ? "MAJORITY SECURED — " + party.pm + " to be PM" : "HUNG PARLIAMENT — Coalition talks begin") : "Counting continues nationwide"} · ${name} ${playerWon ? "WON" : "LOST"} ${district}`}
        />
        <div
          style={{ maxWidth: 720, margin: "0 auto", padding: "18px 16px" }}
          className="fade-in"
        >
          <div
            style={{
              borderBottom: "1px solid #170d00",
              padding: "12px 0",
              marginBottom: 14,
            }}
          >
            <div
              className="hl"
              style={{ fontSize: "clamp(20px,4.5vw,34px)", marginBottom: 8 }}
            >
              {progress >= 100
                ? partyWon
                  ? `${party.pm} Set to Become Prime Minister`
                  : `${party.name} Falls Short — Coalition Needed`
                : `${party.name} ${partyWon ? "Leading Towards Majority" : "In Tight Race"}`}
            </div>
            <div className="byline">
              {progress >= 100 ? "Special Edition" : "Live Update"} · National
              Results · Shree Patrika
            </div>
            <div className="body">
              {progress >= 100
                ? partyWon
                  ? `${party.name} has secured ${playerSeats} seats in the 275-member parliament — crossing the 138-seat majority mark. ${party.pm} will be invited to form government. It is a historic mandate for the party.`
                  : `${party.name} has won ${playerSeats} seats, short of the 138 needed for a majority. Nepal faces a hung parliament. Coalition negotiations with ${biggestRival.name} (${seats[biggestRival.id]} seats) are expected to begin immediately.`
                : `Early results show ${party.name} with ${Math.round((progress / 100) * playerSeats)} seats declared so far. Election Commission officials work through the night. Final results expected soon.`}
            </div>
          </div>

          {/* Seat tally */}
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
                {progress >= 100 ? "Final Seat Count" : "Live Seat Tally"} — 275
                Constituencies
              </div>
            </div>
            <div
              style={{
                padding: "6px 14px 2px",
                background: "rgba(13,40,96,.06)",
                borderBottom: "1px solid #d8c080",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 9,
                  letterSpacing: 2,
                  color: "#0d2860",
                  textTransform: "uppercase",
                }}
              >
                Majority Mark
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize: 22,
                  color: "#0d2860",
                }}
              >
                {majority} seats
              </span>
            </div>
            {[party, ...otherParties].map((p) => {
              const s = seats[p.id] || 0;
              const displaySeats = Math.round(s * (progress / 100));
              const barPct = Math.round((displaySeats / 275) * 100);
              const isP = p.id === party.id;
              return (
                <div key={p.id} className="nat-row">
                  <img
                    src={p.symbol}
                    alt={p.short}
                    style={{ width: 34, height: 34, objectFit: "contain" }}
                  />
                  <div style={{ width: 90, flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Libre Baskerville',serif",
                        fontSize: 12,
                        fontWeight: isP ? 700 : 400,
                        color: isP ? "#780e0e" : "#170d00",
                      }}
                    >
                      {p.short}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Special Elite',cursive",
                        fontSize: 8,
                        letterSpacing: 1,
                        color: "#694818",
                        textTransform: "uppercase",
                      }}
                    >
                      {isP ? "★ Your Party" : "Opposition"}
                    </div>
                  </div>
                  <div className="sbar-track">
                    <div
                      className="sbar-fill"
                      style={{
                        width: `${barPct}%`,
                        background: p.color,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: 36,
                      textAlign: "right",
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 900,
                      fontSize: 18,
                      color: p.color,
                      flexShrink: 0,
                    }}
                  >
                    {displaySeats}
                  </div>
                </div>
              );
            })}
            <div
              style={{ padding: "10px 14px", borderTop: "1px solid #d8c080" }}
            >
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 9,
                  letterSpacing: 3,
                  color: "#694818",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Parliament Composition
              </div>
              <div
                style={{
                  display: "flex",
                  height: 18,
                  overflow: "hidden",
                  border: "1px solid #b8946a",
                }}
              >
                {[party, ...otherParties].map((p) => {
                  const displaySeats = Math.round(
                    (seats[p.id] || 0) * (progress / 100),
                  );
                  return (
                    <div
                      key={p.id}
                      style={{
                        flex: displaySeats || 0,
                        background: p.color,
                        transition: "flex 0.3s ease",
                      }}
                      title={`${p.short}: ${displaySeats}`}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 5,
                  flexWrap: "wrap",
                }}
              >
                {[party, ...otherParties].map((p) => (
                  <div
                    key={p.id}
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        background: p.color,
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Special Elite',cursive",
                        fontSize: 9,
                        color: "#694818",
                      }}
                    >
                      {p.short}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          {progress < 100 && (
            <div style={{ border: "1px solid #b8946a", marginBottom: 14 }}>
              <div className="ink">
                <div
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 10,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                  }}
                >
                  National Result Compilation
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
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 10,
                      letterSpacing: 2,
                      color: "#694818",
                    }}
                  >
                    Constituencies Declared
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    {constituenciesCounted} / 275
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
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 9,
                    color: "#694818",
                    marginTop: 5,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  <span>
                    Results compiling <span className="blink">●</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* PM Outcome - only show when fully revealed */}
          {revealed && (
            <div
              className="fade-in"
              style={{
                background: partyWon ? "#0d2e0d" : "#170d00",
                color: "#f3e8c8",
                padding: "16px",
                marginBottom: 14,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg,${party.color},#f3e8c844,${party.color})`,
                }}
              />
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 9,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  opacity: 0.7,
                  marginBottom: 6,
                }}
              >
                {partyWon
                  ? "Prime Minister Elect"
                  : isCoalition
                    ? "Coalition Partner"
                    : "Opposition Leader"}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize: 24,
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                {party.pm}
              </div>
              <div
                style={{
                  fontFamily: "'Libre Baskerville',serif",
                  fontSize: 13,
                  lineHeight: 1.8,
                  opacity: 0.9,
                }}
              >
                {partyWon
                  ? `${party.pm} of the ${party.name} is set to become Prime Minister of Nepal. The President has invited the party to form government. Supporters gather at Singha Durbar. A new chapter in Nepal's democracy begins today.`
                  : isCoalition
                    ? `${party.pm} announces coalition talks with ${biggestRival.name}. Together with ${seats[biggestRival.id]} opposition seats, a government majority emerges. Negotiations begin at Singha Durbar for a unified parliament.`
                    : `Despite a strong campaign, ${party.name} fell short of a majority. ${party.pm} addresses supporters: "We will be a strong opposition. The people's voice will never be silenced." Coalition talks begin at dawn.`}
              </div>
            </div>
          )}

          {/* Your personal report card - only show when fully revealed */}
          {revealed && (
            <div
              className="fade-in"
              style={{ border: "1px solid #b8946a", marginBottom: 14 }}
            >
              <div className="ink-blue">
                <div
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 10,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                  }}
                >
                  Your Personal Report Card
                </div>
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  [
                    "District Result",
                    playerWon ? "WON ✓" : "LOST ✗",
                    playerWon ? "#0d4018" : "#780e0e",
                  ],
                  [
                    "Party Result",
                    partyWon ? "MAJORITY ✓" : "SHORT ✗",
                    partyWon ? "#0d4018" : "#780e0e",
                  ],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 8,
                      borderBottom: "1px solid #e8d8a0",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Special Elite',cursive",
                        fontSize: 10,
                        letterSpacing: 2,
                        color: "#694818",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 900,
                        fontSize: 18,
                        color,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {revealed && (
            <>
              <button
                className="btn-ink fade-in"
                onClick={() => window.location.reload()}
              >
                ↺ Contest Again — New Election
              </button>
              <div
                className="fade-in"
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 9,
                  color: "#8a7040",
                  textAlign: "center",
                  marginTop: 12,
                  letterSpacing: 2,
                }}
              >
                SHREE PATRIKA · श्री पत्रिका · ELECTION 2082 COVERAGE
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
