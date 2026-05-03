export type Prayer = { name: string; time: string; minutes: number; icon: string };

export const PRAYERS: Prayer[] = [
  { name: "Fajr", time: "5:30 AM", minutes: 5 * 60 + 30, icon: "🌅" },
  { name: "Dhuhr", time: "1:30 PM", minutes: 13 * 60 + 30, icon: "☀️" },
  { name: "Asr", time: "5:15 PM", minutes: 17 * 60 + 15, icon: "🌇" },
  { name: "Maghrib", time: "6:30 PM", minutes: 18 * 60 + 30, icon: "🌆" },
  { name: "Isha", time: "8:15 PM", minutes: 20 * 60 + 15, icon: "🌙" },
];

export const FAST = { begins: "4:50 AM", ends: "6:30 PM" };

export function getCurrentAndNext(now: Date) {
  const m = now.getHours() * 60 + now.getMinutes();
  let current = -1;
  for (let i = 0; i < PRAYERS.length; i++) if (m >= PRAYERS[i].minutes) current = i;
  const nextIdx = current === PRAYERS.length - 1 || current === -1
    ? (current === -1 ? 0 : 0)
    : current + 1;
  const next = PRAYERS[nextIdx];
  let diff = next.minutes - m;
  if (diff <= 0) diff += 24 * 60;
  return { currentIdx: current, nextIdx, next, minutesUntilNext: diff };
}

export function formatHijri(date: Date) {
  try {
    return new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric", month: "long", year: "numeric",
    }).format(date).replace(" AH", " AH");
  } catch {
    return "1 Ramadan 1445";
  }
}
