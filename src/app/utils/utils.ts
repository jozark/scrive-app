export function msTimeFormat(ms: number): string {
  const s = Math.floor(ms / 1000);
  const minutes = Math.floor(s / 60);
  const seconds = s - minutes * 60;
  const hours = Math.floor(minutes / 60);
  const minutesWithHours = minutes - hours * 60;

  if (hours < 1) {
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds} min`;
  } else {
    return `${hours}:${
      minutesWithHours < 10 ? `0${minutesWithHours}` : minutesWithHours
    } h`;
  }
}
