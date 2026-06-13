// 得点ランキング（ゴールデンブーツ・レース）。
// ※本アプリはフォールバック日程ベースのため、ライブの得点データは未連携。
//   下記は「大会前評価による得点王の本命ウォッチリスト（編集部）」＋
//   「現時点で確定している得点（開幕戦など）」を示す。公式の最新スタッツは
//   DAZN／FIFA公式で確認のこと。実APIが繋がれば現在順位が自動で埋まる設計。

export interface ScorerNote {
  asOf: string;
  caveat: string;
}

export const scorerMeta: ScorerNote = {
  asOf: "2026年6月13日時点",
  caveat:
    "大会序盤のため得点はこれから積み上がります。下のランキングは公式スタッツ連携前の暫定表示で、本命ウォッチリストは大会前評価にもとづく編集部の見立てです。",
};

// 現時点で確定している大会得点（フォールバック日程で FINISHED の試合から）。
export interface CurrentScorer {
  player: string;
  teamCode: string;
  goals: number;
}
export const currentScorers: CurrentScorer[] = [
  // 開幕戦 メキシコ 2-0 南アフリカ（チーム単位での確定得点）
  { player: "メキシコ代表（開幕戦の得点）", teamCode: "MEX", goals: 2 },
];

// ゴールデンブーツ本命ウォッチリスト（大会前評価・編集部）。
export interface BootContender {
  player: string;
  teamCode: string;
  position: string;
  why: string;
}
export const goldenBootContenders: BootContender[] = [
  {
    player: "キリアン・エムバペ",
    teamCode: "FRA",
    position: "FW",
    why: "圧倒的なスピードと決定力。前回大会も得点王。連覇を狙う最有力候補。",
  },
  {
    player: "アーリング・ハーランド",
    teamCode: "NOR",
    position: "FW",
    why: "クラブで量産する点取り屋がW杯初出場。出れば確実に得点を狙える破壊力。",
  },
  {
    player: "ラミネ・ヤマル",
    teamCode: "ESP",
    position: "FW",
    why: "スペインの新星。仕掛けと得点を両立する若き天才。大会の主役候補。",
  },
  {
    player: "ジュード・ベリンガム",
    teamCode: "ENG",
    position: "MF",
    why: "中盤から飛び込んで決める得点感覚。イングランドの攻撃の軸。",
  },
  {
    player: "ヴィニシウス・ジュニオール",
    teamCode: "BRA",
    position: "FW",
    why: "世界最速級のドリブラー。左サイドから量産すればブラジルの優勝も近づく。",
  },
  {
    player: "ハリー・ケイン",
    teamCode: "ENG",
    position: "FW",
    why: "歴代屈指の純正ストライカー。PKも含め確実に積み上げる得点王経験者級。",
  },
  {
    player: "上田 綺世",
    teamCode: "JPN",
    position: "FW",
    why: "サムライブルーの9番。日本がベスト8を狙うなら彼の得点が鍵を握る。",
  },
  {
    player: "フリアン・アルバレス",
    teamCode: "ARG",
    position: "FW",
    why: "前回王者の万能アタッカー。決定力と運動量でゴールに絡み続ける。",
  },
];
