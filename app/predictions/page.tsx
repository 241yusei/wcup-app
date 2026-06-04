import { getMatches } from "@/lib/football";
import { getTeam } from "@/data/teams";
import PredictionsSummary, {
  type PredMatch,
} from "@/components/PredictionsSummary";

export const revalidate = 60;

export const metadata = {
  title: "わたしの勝敗予想｜的中率をチェック｜100倍Wカップ",
  description:
    "試合カードで予想した勝敗をまとめて確認。的中数・的中率がたまる予想ノート。にわかでも自分ごとに楽しめる。",
};

export default async function PredictionsPage() {
  const { matches } = await getMatches();
  const list: PredMatch[] = matches
    .slice()
    .sort((a, b) => +new Date(a.utcDate) - +new Date(b.utcDate))
    .map((m) => ({
      id: m.id,
      stage: m.stage + (m.group ? `・組${m.group}` : ""),
      homeFlag: getTeam(m.homeCode)?.flag ?? "🏳️",
      awayFlag: getTeam(m.awayCode)?.flag ?? "🏳️",
      homeName: getTeam(m.homeCode)?.name ?? m.homeCode,
      awayName: getTeam(m.awayCode)?.name ?? m.awayCode,
      status: m.status,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
    }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-6">
        <div className="colors-stripe-thin w-16 rounded-full mb-3" />
        <h1 className="text-3xl font-bold mb-1">わたしの勝敗予想</h1>
        <p className="text-muted text-sm leading-relaxed">
          試合カードの「勝敗予想」で選んだ結果がここに集まります。
          的中率を上げて、にわかでも自分ごとにW杯を楽しもう。
          <span className="block text-[11px] mt-1">
            ※ 予想はこの端末内（ブラウザ）にのみ保存されます。
          </span>
        </p>
      </header>

      <PredictionsSummary matches={list} />
    </div>
  );
}
