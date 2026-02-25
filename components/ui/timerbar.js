export default function TimerBar({ seconds, total, danger }) {
  const pct = (seconds / total) * 100;
  const red = seconds <= danger;
  return (
    <div>
      <div className="srule">
        <span>Time Remaining</span>
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            fontSize: 22,
            color: red ? "#780e0e" : "#170d00",
          }}
          className={red && seconds <= 5 ? "blink" : ""}
        >
          {seconds}s
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
