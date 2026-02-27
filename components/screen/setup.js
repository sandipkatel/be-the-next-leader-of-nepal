import { useState } from "react";
import Masthead from "../ui/masthead";
import { PARTIES } from "../../data/parties";
import { DISTRICTS } from "../../data/districts";

export default function SetupScreen({ onStart }) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [partyId, setPartyId] = useState(PARTIES[0].id);
  const [difficulty, setDifficulty] = useState("medium");
  const party = PARTIES.find((p) => p.id === partyId);
  return (
    <div className="paper">
      <div className="z1">
        <Masthead sub="Candidate Registration · उम्मेदवार दर्ता" />
        <div
          style={{ maxWidth: 820, margin: "0 auto", padding: "20px 16px" }}
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
              style={{ fontSize: "clamp(22px,5vw,36px)", marginBottom: 8 }}
            >
              A New Parliament.
              <br />
              <span style={{ fontStyle: "italic" }}>
                Your Constituency Awaits.
              </span>
            </div>
            <div className="byline">
              Parliamentary Election Simulation · Nepal 2082
            </div>
            <div className="body">
              You are a candidate contesting Nepal's federal parliament. Win
              your district through smart policy-making. Help your party cross
              138 seats. Watch your PM take oath at Singha Durbar.
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              border: "1px solid #b8946a",
              marginBottom: 18,
            }}
          >
            {[
              ["275", "Total Seats"],
              ["138", "Majority Mark"],
              ["3", "Policy Rounds"],
              ["4", "Voters Judge"],
            ].map(([n, l], i) => (
              <div
                key={i}
                style={{
                  padding: "12px 8px",
                  borderRight: i % 2 === 0 ? "1px solid #b8946a" : "none",
                  borderBottom: i < 2 ? "1px solid #b8946a" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 900,
                    fontSize: 28,
                    color: "#780e0e",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 9,
                    letterSpacing: 3,
                    color: "#694818",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#694818",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                <strong>Your Full Name</strong>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  name.trim() &&
                  onStart({ name: name.trim(), district, party, difficulty })
                }
                placeholder="Candidate's name…"
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#694818",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Your Constituency
              </div>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#694818",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Your Party
              </div>
              <select
                value={partyId}
                onChange={(e) => setPartyId(e.target.value)}
              >
                {PARTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.short})
                  </option>
                ))}
              </select>
              {party && (
                <div
                  style={{
                    fontFamily: "'Special Elite',cursive",
                    fontSize: 10,
                    color: "#694818",
                    marginTop: 6,
                    letterSpacing: 1,
                  }}
                >
                  PM Candidate:{" "}
                  <strong style={{ color: "#170d00" }}>{party.pm}</strong>
                </div>
              )}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#694818",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Difficulty
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  border: "1px solid #b8946a",
                }}
              >
                {[
                  ["easy", "सरल", "Easier win odds"],
                  ["medium", "मध्यम", "Balanced race"],
                  ["hard", "जटिल", "Tight margins"],
                ].map(([d, np, desc], i) => (
                  <div
                    key={d}
                    onClick={() => setDifficulty(d)}
                    style={{
                      padding: "10px 6px",
                      textAlign: "center",
                      borderRight: i < 2 ? "1px solid #b8946a" : "none",
                      background: difficulty === d ? "#170d00" : "transparent",
                      cursor: "pointer",
                      transition: "background .2s",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Special Elite',cursive",
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: difficulty === d ? "#f3e8c8" : "#170d00",
                      }}
                    >
                      {np}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Libre Baskerville',serif",
                        fontSize: 10,
                        color: difficulty === d ? "#c8a860" : "#694818",
                        marginTop: 2,
                        fontStyle: "italic",
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn-ink"
              onClick={() =>
                name.trim() &&
                onStart({ name: name.trim(), district, party, difficulty })
              }
              disabled={!name.trim()}
            >
              File Nomination →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
