export const NARRATOR = {
  setup: (n, d, p) =>
    `The year is 2081 B.S. Nepal stands at a crossroads. ${n}, a determined leader from ${d}, has been nominated by the ${p.name} to contest the parliamentary seat. The party's PM candidate, ${p.pm}, has staked everything on winning a majority. If ${p.short} captures 83 or more seats, ${p.pm} becomes Prime Minister — and ${n}'s seat in ${d} is essential.`,
  campaign: (d, iss) =>
    `Campaign fever grips ${d}. Supporters fan out across wards and toles, hanging flags and plastering walls with posters. Voters gather in tea shops debating policy. The dominant issues on the ground are: ${iss.join(" and ")}. Your opponents are working door to door. Now is the moment to show the people what you stand for.`,
  policyIntro: (n) =>
    `Before a packed public gathering, ${n} steps to the podium. The crowd goes quiet. Local journalists scribble notes. Voters hold banners. Three urgent problems have been placed before the candidate — the people want concrete answers, not vague slogans.`,
  ballotDay: (d) =>
    `Election Day dawns clear across ${d}. Voters queue from 6 AM outside polling stations set up in schools and community halls. Officials in blue vests check voter cards. Ballot papers are distributed. Ink is applied to fingers. The district holds its breath.`,
  counting: (d) =>
    `Polling has closed. The ballot boxes from across ${d} have arrived at the counting centre. Party agents take their seats. Officials unfold papers one by one under fluorescent lights. Tally marks grow on whiteboards. Every hundred votes shifts the atmosphere in the room.`,
};
