import { PARTIES } from "../data/parties";

export function rnd(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}
export function pick(a) {
  return a[Math.floor(Math.random() * a.length)];
}

// Score a policy text against a voter
export function scorePolicy(text, voter, problem) {
  if (!text || text.trim().length < 15) return 0;
  const lower = text.toLowerCase();
  let score = 20; // base for submitting
  voter.keywords.forEach((kw) => {
    if (lower.includes(kw)) score += 9;
  });
  if (text.length > 80) score += 8;
  if (text.length > 180) score += 8;
  if (/\d/.test(text)) score += 10; // specificity
  if (lower.includes("will") || lower.includes("shall")) score += 5;
  const problemWeight = problem.voterWeights[voter.id] || 1;
  score = Math.round(score * (problemWeight / 1.5));
  return Math.min(score, 100);
}

// Convert policy total score (0-300 per round, 3 rounds) to vote modifier
// Returns playerVotesPct: base 35%, can go up to 65%
export function policyScoreToVotePct(
  totalPolicyScore,
  maxPolicyScore,
  difficulty,
) {
  const ratio = totalPolicyScore / maxPolicyScore; // 0..1
  const bases = { easy: [42, 65], medium: [32, 60], hard: [22, 55] };
  const [lo, hi] = bases[difficulty];
  return Math.round(lo + ratio * (hi - lo));
}

export function simulateNationalSeats(party, playerWon, difficulty) {
  const total = 275;
  const majority = 138;
  const others = PARTIES.filter((p) => p.id !== party.id);
  const ranges = { easy: [78, 108], medium: [62, 98], hard: [46, 84] };
  const [lo, hi] = ranges[difficulty];
  let ps = rnd(lo, hi);
  if (playerWon) ps = Math.min(ps + rnd(3, 9), 140);
  else ps = Math.max(20, ps - rnd(4, 12));
  const seats = { [party.id]: ps };
  let rem = total - ps;
  others.forEach((p, i) => {
    if (i === others.length - 1) seats[p.id] = rem;
    else {
      const s = rnd(8, Math.floor(rem / 2));
      seats[p.id] = s;
      rem -= s;
    }
  });
  return seats;
}
