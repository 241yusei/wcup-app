import Image from "next/image";
import Tabs from "@/components/Tabs";
import GuideBody from "@/components/learn/GuideBody";
import DeepBody from "@/components/learn/DeepBody";
import GenBody from "@/components/learn/GenBody";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "学ぶ｜入門ガイド・深掘り・トリオン解説｜100倍Wカップ",
  description:
    "W杯を100倍楽しむ「学ぶ」ハブ。にわか向けの入門ガイド、戦術や数字を読み解く深掘り、隠れキャラ・トリオンの忖度なし玄人解説まで、1ページで段階的にレベルアップ。",
};

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="楽しむ"
        title="学ぶ"
        description="入門 → 深掘り → 玄人解説。自分のペースでサッカーの解像度を上げよう。"
        action={
          <Image
            src="/mascot-ball.png"
            alt=""
            width={84}
            height={204}
            className="hidden sm:block shrink-0 drop-shadow-lg"
          />
        }
      />

      <Tabs
        tabs={[
          { label: "入門ガイド", icon: "🧭", panel: <GuideBody /> },
          { label: "深掘り", icon: "🔭", panel: <DeepBody /> },
          { label: "トリオン解説", icon: "🐱", panel: <GenBody /> },
        ]}
      />
    </div>
  );
}
