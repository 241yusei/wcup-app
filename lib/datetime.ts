// 日本時間（JST = UTC+9）での表示ユーティリティ。
// サーバ/クライアントで一致させるため、タイムゾーンを固定して整形する。

const WD = ["日", "月", "火", "水", "木", "金", "土"];

function toJst(utcIso: string): Date {
  // UTC時刻に9時間足したものを「JSTの壁時計時刻」としてUTCゲッターで読む
  const d = new Date(utcIso);
  return new Date(d.getTime() + 9 * 60 * 60 * 1000);
}

export function jstDateLabel(utcIso: string): string {
  const j = toJst(utcIso);
  const m = j.getUTCMonth() + 1;
  const d = j.getUTCDate();
  const wd = WD[j.getUTCDay()];
  return `${m}/${d}(${wd})`;
}

export function jstTimeLabel(utcIso: string): string {
  const j = toJst(utcIso);
  const hh = String(j.getUTCHours()).padStart(2, "0");
  const mm = String(j.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function jstDateKey(utcIso: string): string {
  const j = toJst(utcIso);
  const m = String(j.getUTCMonth() + 1).padStart(2, "0");
  const d = String(j.getUTCDate()).padStart(2, "0");
  return `${j.getUTCFullYear()}-${m}-${d}`;
}

// 深夜・早朝はにわか層が見逃しやすいので注意ラベルを出す
export function jstWatchHint(utcIso: string): string | null {
  const h = toJst(utcIso).getUTCHours();
  if (h >= 1 && h < 6) return "🌙 深夜キックオフ";
  if (h >= 6 && h < 9) return "☀️ 早朝キックオフ";
  return null;
}

// .ics（カレンダー登録用）を生成。試合開始2時間を所要として登録。
export function buildIcs(opts: {
  uid: string;
  title: string;
  utcStart: string;
  description?: string;
  location?: string;
}): string {
  const dt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const end = new Date(new Date(opts.utcStart).getTime() + 2 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//100x-wcup//JP",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@100x-wcup`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${dt(opts.utcStart)}`,
    `DTEND:${dt(end.toISOString())}`,
    `SUMMARY:${opts.title}`,
    opts.description ? `DESCRIPTION:${opts.description}` : "",
    opts.location ? `LOCATION:${opts.location}` : "",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:まもなくキックオフ",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
