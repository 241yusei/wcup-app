import { getMatches } from "@/lib/football";
import { getTeam } from "@/data/teams";
import Tabs from "@/components/Tabs";
import PredictionsSummary, {
  type PredMatch,
} from "@/components/PredictionsSummary";
import ExpertsBody from "@/components/predict/ExpertsBody";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "予想｜自分の勝敗予想と識者の優勝予想｜100倍Wカップ",
  description:
    "2026ワールドカップの予想ハブ。試合カードで選んだ自分の勝敗予想の的中率と、世界中の識者・統計モデルの優勝予想ランキングを、1ページでまとめてチェック。",
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
      <PageHeader
        eyebrow="楽しむ"
        title="予想"
        description={
          <>
            自分の勝敗予想の的中率と、世界の識者の優勝予想。どちらもここで。
            <span className="block text-[11px] mt-1">
              ※ 自分の予想はこの端末内（ブラウザ）にのみ保存されます。
            </span>
          </>
        }
      />

      <Tabs
        tabs={[
          {
            label: "自分の勝敗予想",
            icon: "✍️",
            panel: <PredictionsSummary matches={list} />,
          },
          { label: "識者の優勝予想", icon: "🔮", panel: <ExpertsBody /> },
        ]}
      />
    </div>
  );
}
