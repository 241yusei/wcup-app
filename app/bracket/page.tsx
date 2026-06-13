import Link from "next/link";
import { japanInfo } from "@/data/japanHub";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";

export const metadata = {
  title: "決勝トーナメント早見｜ラウンド32〜決勝の流れ｜100倍Wカップ",
  description:
    "2026ワールドカップの決勝トーナメント（ノックアウト）の流れを早見。ラウンド32→16→準々決勝→準決勝→決勝の日程・試合数と、日本代表の勝ち上がりマップ。",
};

interface Round {
  name: string;
  emoji: string;
  teams: number;
  matches: number;
  period: string; // 現地日程
  note: string;
}

const rounds: Round[] = [
  {
    name: "ラウンド32",
    emoji: "🎯",
    teams: 32,
    matches: 16,
    period: "6/28〜7/3（現地）",
    note: "最初のノックアウト。各組上位2チーム＋成績上位の3位8チームの計32が激突。負けたら終わり。",
  },
  {
    name: "ラウンド16",
    emoji: "⚔️",
    teams: 16,
    matches: 8,
    period: "7/4〜7/7（現地）",
    note: "勝ち残った16チーム。ここから一気に強豪同士の潰し合いに。",
  },
  {
    name: "準々決勝",
    emoji: "🔥",
    teams: 8,
    matches: 4,
    period: "7/9〜7/11（現地）",
    note: "ベスト8。日本代表が未到達の壁。ここを越えれば歴史が変わる。",
  },
  {
    name: "準決勝",
    emoji: "🏟️",
    teams: 4,
    matches: 2,
    period: "7/14〜7/15（現地）",
    note: "ベスト4。世界の頂点まであと2つ。",
  },
  {
    name: "3位決定戦",
    emoji: "🥉",
    teams: 2,
    matches: 1,
    period: "7月中旬（決勝の前）",
    note: "準決勝で敗れた2チームによる3位争い。",
  },
  {
    name: "決勝",
    emoji: "🏆",
    teams: 2,
    matches: 1,
    period: "7/19（現地）／日本時間 7/20 04:00",
    note: "ニュージャージー・メットライフスタジアムで世界一が決まる。",
  },
];

export default function BracketPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-6">
        <div className="colors-stripe-thin w-16 rounded-full mb-3" />
        <h1 className="text-3xl font-bold mb-1">決勝トーナメント早見</h1>
        <p className="text-muted text-sm leading-relaxed">
          グループステージを勝ち抜いた32チームによる一発勝負。
          ラウンド32から決勝までの流れを早見でチェック。
        </p>
      </header>

      <SectionTabs items={MATCH_TABS} title="試合" />

      {/* フォーマット */}
      <section className="mb-8">
        <div className="rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed">
          <div className="font-bold mb-1">🗺️ 勝ち上がりの仕組み</div>
          <p className="text-muted">{japanInfo.format}</p>
        </div>
      </section>

      {/* ラウンドのタイムライン */}
      <section className="mb-10">
        <div className="space-y-3">
          {rounds.map((r, i) => (
            <div
              key={r.name}
              className={`rounded-2xl border bg-surface overflow-hidden ${
                r.name === "決勝" ? "border-jpred ring-1 ring-jpred/20" : "border-line"
              }`}
            >
              <div className="flex items-center gap-3 p-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    r.name === "決勝" ? "bg-jpred/10" : "bg-jpnavy/5"
                  }`}
                  aria-hidden
                >
                  {r.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold">{r.name}</span>
                    <span className="text-[11px] text-muted">
                      {r.teams}チーム・{r.matches}試合
                    </span>
                  </div>
                  <div className="text-xs text-jpnavy font-medium mt-0.5">
                    {r.period}
                  </div>
                  <p className="text-xs text-muted leading-relaxed mt-1">{r.note}</p>
                </div>
                <div className="shrink-0 text-xs font-black text-muted/50 tabular-nums">
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted mt-2">
          ※ 日付は現地基準。日本時間では翌日の早朝〜午前になることが多いです。
          対戦カードは結果が出るごとに確定します。
        </p>
      </section>

      {/* 日本の勝ち上がりマップ */}
      {japanInfo.knockoutOutlook && (
        <section className="mb-8">
          <div className="rounded-2xl border-2 border-jpred bg-jpred/[0.04] overflow-hidden">
            <div className="bg-jpred text-white px-4 py-3 font-bold flex items-center gap-2">
              <span aria-hidden>🇯🇵</span>日本代表の勝ち上がりマップ
            </div>
            <div className="p-4 text-sm leading-relaxed">
              {japanInfo.knockoutOutlook}
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-4">
        <Link href="/groups" className="text-sm font-bold text-jpnavy hover:underline">
          📊 グループ順位表 →
        </Link>
        <Link href="/japan" className="text-sm font-medium text-jpnavy hover:underline">
          🇯🇵 日本特集（突破条件）→
        </Link>
      </div>
    </div>
  );
}
