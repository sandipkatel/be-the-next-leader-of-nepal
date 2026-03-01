export default function TimerBar({ seconds, total, danger }) {
  const pct = (seconds / total) * 100;
  const red = seconds <= danger;
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return (
    <div>
      <div className="srule">
        <span>Time Remaining</span>
        <span
          style={{
            fontFamily: "var(--font-headline), serif",
            fontWeight: 900,
            fontSize: 22,
            color: red ? "#780e0e" : "#170d00",
            display: "flex",
            alignItems: "center",
            gap: 5,
            minWidth: 110,
            justifyContent: "flex-end",
            fontVariantNumeric: "tabular-nums",
          }}
          className={red && seconds <= 5 ? "blink" : ""}
        >
          ⏱ {mins}:{secs}
        </span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill${red ? " red" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
