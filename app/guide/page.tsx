import Image from "next/image";
import Tabs from "@/components/Tabs";
import GuideBody from "@/components/learn/GuideBody";
import DeepBody from "@/components/learn/DeepBody";
import GenBody from "@/components/learn/GenBody";

export const metadata = {
  title: "学ぶ｜入門ガイド・深掘り・トリオン解説｜100倍Wカップ",
  description:
    "W杯を100倍楽しむ「学ぶ」ハブ。にわか向けの入門ガイド、戦術や数字を読み解く深掘り、隠れキャラ・トリオンの忖度なし玄人解説まで、1ページで段階的にレベルアップ。",
};

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">学ぶ</h1>
          <p className="text-muted text-sm leading-relaxed">
            入門 → 深掘り → 玄人解説。自分のペースでサッカーの解像度を上げよう。
          </p>
        </div>
        <Image
          src="/mascot-ball.png"
          alt=""
          width={84}
          height={204}
          className="hidden sm:block shrink-0 drop-shadow-lg"
        />
      </header>

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
