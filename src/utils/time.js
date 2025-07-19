export const DEFAULT_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function isCooldownOver(now, lastWateredAt, cooldown = DEFAULT_COOLDOWN) {
  if (!lastWateredAt) return true;
  return now - new Date(lastWateredAt) >= cooldown;
}

export function timeLeft(now, lastWateredAt, cooldown = DEFAULT_COOLDOWN) {
  if (!lastWateredAt) return 0;
  return Math.max(0, cooldown - (now - new Date(lastWateredAt)));
}
