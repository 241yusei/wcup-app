"use client";
import { buildIcs } from "@/lib/datetime";

export default function ReminderButton({
  uid,
  title,
  utcStart,
  location,
}: {
  uid: string;
  title: string;
  utcStart: string;
  location?: string;
}) {
  const handle = () => {
    const ics = buildIcs({
      uid,
      title,
      utcStart,
      location,
      description: "100倍Wカップでチェック",
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${uid}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handle}
      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-jpnavy text-jpnavy hover:bg-jpnavy hover:text-white transition-colors"
    >
      🔔 リマインド登録
    </button>
  );
}
