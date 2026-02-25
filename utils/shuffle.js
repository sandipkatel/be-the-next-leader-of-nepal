export function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5);
}
