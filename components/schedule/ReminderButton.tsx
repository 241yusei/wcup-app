"use client";
import { useState } from "react";
import { buildIcs, googleCalUrl } from "@/lib/datetime";

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
  const [open, setOpen] = useState(false);

  const gcal = googleCalUrl({
    title,
    utcStart,
    location,
    details: "100倍Wカップでチェック https://wcup-2026-jp.vercel.app",
  });

  const downloadIcs = () => {
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
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-jpnavy text-jpnavy hover:bg-jpnavy hover:text-white transition-colors"
      >
        🔔 リマインド登録
      </button>
      {open && (
        <>
          {/* 外側クリックで閉じる */}
          <button
            aria-label="閉じる"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 z-50 mt-1 w-52 rounded-xl border border-line bg-surface shadow-lg overflow-hidden">
            <a
              href={gcal}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-line/50"
            >
              <span aria-hidden>📅</span>
              Googleカレンダーに登録
            </a>
            <button
              onClick={downloadIcs}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-line/50 border-t border-line"
            >
              <span aria-hidden>🍎</span>
              その他（iPhone等・.ics）
            </button>
          </div>
        </>
      )}
    </div>
  );
}
