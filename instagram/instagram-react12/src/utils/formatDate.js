import { format, isThisYear } from "date-fns";
import { formatDistanceStrict } from "date-fns/esm";

export function formatPostDate(date) {
  const formatShort = format(new Date(date), "MMMM d");
  const formatLong = format(new Date(date), "MMMM d, yyy");
  return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNowShort(date) {
  return formatDistanceStrict(new Date(date), new Date(Date.now()))
    .split(" ")
    .map((s, i) => (i === 1 ? s[0] : s))
    .join("");
}
