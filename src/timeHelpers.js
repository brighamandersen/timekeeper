export function hoursToSeconds(hours) {
  return hours * 3600;
}

export function minutesToSeconds(minutes) {
  return minutes * 60;
}

// Ex: Converts 5 (seconds) into '00:00:05'
export function secondsToDisplayStr(seconds) {
  const fullDateStr = new Date(seconds * 1000).toISOString();
  const hourStr = fullDateStr.substring(11,13);
  const minStr = fullDateStr.substring(14,16);
  const secStr = fullDateStr.substring(17,19);
  return `${hourStr}h ${minStr}m ${secStr}s`
  // Old hour string below
  // return new Date(timeInSec * 1000).toISOString()//.substring(11, 19);
}