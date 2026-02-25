import Masthead from "../ui/masthead";
import { NARRATOR } from "../../data/narrators";

export default function CampaignScreen({
  setup,
  opponents,
  issues,
  onContinue,
}) {
  const { name, district, party } = setup;
  return (
    <div className="paper">
      <div className="z1">
        <Masthead
          sub={`Campaign Trail · ${district} Constituency`}
          ticker={`${name} of ${party.short} campaigns in ${district} · Voters demand answers on ${issues[0]} · Rivals mobilise`}
        />
        <div
          style={{ maxWidth: 580, margin: "0 auto", padding: "18px 16px" }}
          className="fade-in"
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div
              className="stamp stamp-in"
              style={{ borderColor: party.color, color: party.color }}
            >
              {party.symbol} {party.short}
            </div>
            <div
              className="stamp stamp-b stamp-in"
              style={{ animationDelay: ".1s" }}
            >
              3 Days To Vote
            </div>
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
              style={{ fontSize: "clamp(20px,4.5vw,32px)", marginBottom: 8 }}
            >
              {name} Takes the Campaign to {district}
            </div>
            <div className="byline">
              By Our Correspondent · {district} Bureau
            </div>
            <div className="body">{NARRATOR.campaign(district, issues)}</div>
          </div>
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
                Key Issues — {district}
              </div>
            </div>
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {issues.map((iss, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#780e0e",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Libre Baskerville',serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#270e00",
                      textTransform: "capitalize",
                    }}
                  >
                    {iss}
                  </div>
                  <div style={{ flex: 1, height: 1, background: "#d8c080" }} />
                </div>
              ))}
            </div>
          </div>
          <div className="srule">Your Opponents</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {opponents.map((op, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "9px 12px",
                  border: "1px solid #b8946a",
                  background: "rgba(255,255,255,.22)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: op.party.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {op.party.symbol}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {op.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Special Elite',cursive",
                      fontSize: 9,
                      letterSpacing: 2,
                      color: "#694818",
                      textTransform: "uppercase",
                    }}
                  >
                    {op.party.short} · {op.party.ideology}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#0d2860",
              color: "#f3e8c8",
              padding: "14px 16px",
              marginBottom: 16,
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
                height: 3,
                background: `linear-gradient(90deg,${party.color},#f3e8c844,${party.color})`,
              }}
            />
            <div
              style={{
                fontFamily: "'Special Elite',cursive",
                fontSize: 9,
                letterSpacing: 4,
                textTransform: "uppercase",
                opacity: 0.7,
                marginBottom: 5,
              }}
            >
              Your Party's PM Candidate
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900,
                fontSize: 22,
                lineHeight: 1.1,
              }}
            >
              {party.pm}
            </div>
            <div
              style={{
                fontFamily: "'Libre Baskerville',serif",
                fontSize: 12,
                opacity: 0.85,
                marginTop: 6,
                fontStyle: "italic",
              }}
            >
              "{party.name} needs a majority. Your seat in {district} is vital
              to our mandate. The people need to hear your policies."
            </div>
          </div>
          <button className="btn-ink" onClick={onContinue}>
            Address the Public — Policy Stage →
          </button>
        </div>
      </div>
    </div>
  );
}
