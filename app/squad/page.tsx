import Link from "next/link";
import { squad, manager, posMeta, posOrder, type SquadPlayer } from "@/data/squad";

export const metadata = {
  title: "日本代表メンバー名簿｜サムライブルー26人図鑑｜100倍Wカップ",
  description:
    "2026ワールドカップ日本代表（サムライブルー）の正式26名を、背番号・所属クラブ・年齢・身長・代表歴・プレースタイルまで網羅した完全名簿。ポジション別カードで一覧。",
};

function Stat({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === "") return null;
  return (
    <div className="text-center">
      <div className="text-[10px] text-muted leading-none">{label}</div>
      <div className="text-sm font-bold leading-tight mt-0.5">{value}</div>
    </div>
  );
}

function PlayerCard({ p }: { p: SquadPlayer }) {
  const m = posMeta[p.position];
  return (
    <div
      className="rounded-2xl border border-line bg-surface overflow-hidden shadow-sm flex flex-col"
      style={{ borderTopColor: m.color, borderTopWidth: 3 }}
    >
      {/* ヘッダー：背番号＋ポジション（キャラカード風グラデーション） */}
      <div
        className="relative px-4 pt-3 pb-2 text-white"
        style={{
          background: `linear-gradient(135deg, ${m.color} 0%, ${m.color}cc 60%, ${m.color}99 100%)`,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg" aria-hidden>
              {m.icon}
            </span>
            <span className="text-xs font-bold tracking-wide">{m.label}</span>
          </div>
          <span
            className="text-4xl font-black leading-none tabular-nums"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,.25)" }}
          >
            {p.number}
          </span>
        </div>
        <div className="mt-1">
          <div className="text-lg font-bold leading-tight">{p.name}</div>
          {p.enName && (
            <div className="text-[10px] uppercase tracking-wider text-white/75">
              {p.enName}
            </div>
          )}
        </div>
      </div>

      {/* 役割 */}
      {p.role && (
        <div className="px-4 pt-2.5">
          <span
            className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: m.color }}
          >
            {p.role}
          </span>
        </div>
      )}

      {/* スタッツ */}
      <div className="px-4 pt-2.5 grid grid-cols-3 gap-1 border-b border-line pb-2.5">
        <Stat label="年齢" value={p.age ? `${p.age}` : undefined} />
        <Stat label="身長" value={p.height ? `${p.height}cm` : undefined} />
        <Stat
          label={p.position === "FW" && p.goals ? "代表得点" : "代表"}
          value={p.position === "FW" && p.goals ? p.goals : p.caps}
        />
      </div>

      {/* 所属・スタイル */}
      <div className="px-4 py-2.5 flex-1 flex flex-col">
        <div className="text-xs font-medium mb-1.5">
          {p.clubFlag} {p.club}
        </div>
        {p.style && (
          <p className="text-xs text-muted leading-relaxed flex-1">{p.style}</p>
        )}
      </div>
    </div>
  );
}

export default function SquadPage() {
  const grouped = posOrder.map((pos) => ({
    pos,
    players: squad
      .filter((p) => p.position === pos)
      .sort((a, b) => a.number - b.number),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ヒーロー */}
      <header className="mb-8 rounded-2xl overflow-hidden border border-line">
        <div className="colors-stripe-thin w-full" />
        <div className="bg-jpnavy text-white p-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl" aria-hidden>
              🇯🇵
            </span>
            <h1 className="text-3xl font-bold">日本代表メンバー名簿</h1>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            2026ワールドカップに挑むサムライブルー
            <strong className="text-white">全26名</strong>
            。背番号・所属・経歴・プレースタイルを一枚のカードに。
            監督は<strong className="text-white">{manager}</strong>。
          </p>
        </div>
      </header>

      {/* ポジション別 */}
      {grouped.map(({ pos, players }) => {
        const m = posMeta[pos];
        return (
          <section key={pos} className="mb-10">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-sm"
                style={{ backgroundColor: m.color }}
                aria-hidden
              >
                {m.icon}
              </span>
              {m.full}
              <span className="text-sm text-muted font-normal">
                {m.label}・{players.length}名
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {players.map((p) => (
                <PlayerCard key={p.number} p={p} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-[11px] text-muted mb-6">
        ※ メンバー・背番号・所属はJFA公式（2026年大会登録）に基づきます。年齢・身長・
        代表歴は各種公開情報を参照・要約。カードのデザインはイメージで、選手本人の
        写真・似顔ではありません。
      </p>

      <div className="flex flex-wrap gap-4">
        <Link href="/japan" className="text-sm font-bold text-jpnavy hover:underline">
          🇯🇵 日本特集（攻略・突破条件）→
        </Link>
        <Link href="/teams/JPN" className="text-sm font-medium text-jpnavy hover:underline">
          日本代表の図鑑 →
        </Link>
      </div>
    </div>
  );
}
