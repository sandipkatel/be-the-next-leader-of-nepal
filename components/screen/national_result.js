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
  const [revealed, setRevealed] = useState(false);
  const majority = 138;
  const playerSeats = seats[party.id];
  const partyWon = playerSeats >= majority;
  const otherParties = PARTIES.filter((p) => p.id !== party.id).sort(
    (a, b) => seats[b.id] - seats[a.id],
  );
  const biggestRival = otherParties[0];

  useEffect(() => {
    setTimeout(() => setRevealed(true), 800);
  }, []);

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
          sub="National Results — Nepal Parliamentary Election 2082"
          ticker={`BREAKING · ${party.short} wins ${playerSeats} seats · Majority mark: ${majority} · ${partyWon ? "MAJORITY SECURED — " + party.pm + " to be PM" : "HUNG PARLIAMENT — Coalition talks begin"} · ${name} ${playerWon ? "WON" : "LOST"} ${district}`}
        />
        <div
          style={{ maxWidth: 720, margin: "0 auto", padding: "18px 16px" }}
          className="fade-in"
        >
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            {partyWon ? (
              <div
                className="stamp stamp-g stamp-in"
                style={{ fontSize: 13, padding: "6px 22px", letterSpacing: 5 }}
              >
                MAJORITY SECURED ✓
              </div>
            ) : (
              <div
                className="stamp stamp-in"
                style={{ fontSize: 12, padding: "6px 22px", letterSpacing: 4 }}
              >
                HUNG PARLIAMENT
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
              {partyWon
                ? `${party.pm} Set to Become Prime Minister`
                : `${party.name} Falls Short — Coalition Needed`}
            </div>
            <div className="byline">
              Special Edition · National Results · Shree Patrika
            </div>
            <div className="body">
              {partyWon
                ? `${party.name} has secured ${playerSeats} seats in the 275-member parliament — crossing the 138-seat majority mark. ${party.pm} will be invited to form government. It is a historic mandate for the party.`
                : `${party.name} has won ${playerSeats} seats, short of the 138 needed for a majority. Nepal faces a hung parliament. Coalition negotiations with ${biggestRival.name} (${seats[biggestRival.id]} seats) are expected to begin immediately.`}
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
                Seat Count — 275 Constituencies
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
              const barPct = Math.round((s / 275) * 100);
              const isP = p.id === party.id;
              return (
                <div key={p.id} className="nat-row">
                  <span style={{ fontSize: 20, flexShrink: 0 }}>
                    {p.symbol}
                  </span>
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
                        width: revealed ? `${barPct}%` : "0%",
                        background: p.color,
                        transition: "width 1.5s ease",
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
                    {revealed ? s : "-"}
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
                {[party, ...otherParties].map((p) => (
                  <div
                    key={p.id}
                    style={{
                      flex: seats[p.id] || 0,
                      background: p.color,
                      transition: "flex 1.5s ease",
                    }}
                    title={`${p.short}: ${seats[p.id]}`}
                  />
                ))}
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

          {/* PM Outcome */}
          <div
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
              {partyWon ? "Prime Minister Elect" : "Opposition Leader"}
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
                : `Despite a strong campaign, ${party.name} fell short of a majority. ${party.pm} addresses supporters: "We will be a strong opposition. The people's voice will never be silenced." Coalition talks begin at dawn.`}
            </div>
          </div>

          {/* Your personal report card */}
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
                [
                  "Policy Rating",
                  `${policyPct}%`,
                  policyPct >= 60
                    ? "#0d4018"
                    : policyPct >= 40
                      ? "#8a7010"
                      : "#780e0e",
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
              <div
                className="body"
                style={{ fontSize: 12, fontStyle: "italic", color: "#5a3a0a" }}
              >
                {playerWon && partyWon
                  ? "A perfect election. You won your seat AND your party won the majority. Nepal celebrates."
                  : playerWon && !partyWon
                    ? "You won your seat but the party fell short. You'll serve as opposition MP. Honourable."
                    : !playerWon && partyWon
                      ? "You lost your seat but your party still won majority. Bittersweet. The PM owes you a call."
                      : "Both battles lost. But every strong campaign shapes the next election. Nepal remembers its fighters."}
              </div>
            </div>
          </div>

          <button className="btn-ink" onClick={() => window.location.reload()}>
            ↺ Contest Again — New Election
          </button>
          <div
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
        </div>
      </div>
    </div>
  );
}
