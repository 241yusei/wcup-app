// 得点ランキング（ゴールデンブーツ・レース）。
// ※実際の得点を手動集計したフォールバック表示。公式の最新スタッツは
//   DAZN／FIFA公式で確認のこと。実APIが繋がれば現在順位が自動で埋まる設計。

export interface ScorerNote {
  asOf: string;
  caveat: string;
}

export const scorerMeta: ScorerNote = {
  asOf: "2026年6月20日時点（全12組の第1節＋A〜D組の第2節を反映）",
  caveat:
    "実際の得点を手動集計したゴールデンブーツ・レースの暫定ランキングです（2得点以上の選手を掲載。1得点の選手は多数のため割愛）。本命ウォッチリストは大会前評価にもとづく編集部の見立てです。",
};

// 現時点の得点ランキング（2得点以上）。FINISHED の試合から集計。
export interface CurrentScorer {
  player: string;
  teamCode: string;
  goals: number;
  note?: string;
}
export const currentScorers: CurrentScorer[] = [
  {
    player: "リオネル・メッシ",
    teamCode: "ARG",
    goals: 3,
    note: "アルジェリア戦でW杯初ハットトリック（通算16点でクローゼに並ぶ）",
  },
  {
    player: "ジョナサン・デイビッド",
    teamCode: "CAN",
    goals: 3,
    note: "カタール戦でハットトリック（カナダ自国開催初勝利）",
  },
  {
    player: "サイル・ラリン",
    teamCode: "CAN",
    goals: 2,
    note: "ボスニア戦・カタール戦で連続得点",
  },
  {
    player: "イスマエル・サイバリ",
    teamCode: "MAR",
    goals: 2,
    note: "ブラジル戦・スコットランド戦で得点",
  },
  {
    player: "ヴィニシウス・ジュニオール",
    teamCode: "BRA",
    goals: 2,
    note: "モロッコ戦・ハイチ戦で得点",
  },
  {
    player: "マテウス・クーニャ",
    teamCode: "BRA",
    goals: 2,
    note: "ハイチ戦で2得点（ブレイス）",
  },
  {
    player: "フォラリン・バログン",
    teamCode: "USA",
    goals: 2,
    note: "パラグアイ戦で2得点（ブレイス）",
  },
  {
    player: "カイ・ハフェルツ",
    teamCode: "GER",
    goals: 2,
    note: "キュラソー戦で2得点（7-1の大勝）",
  },
  {
    player: "ヤシン・アヤリ",
    teamCode: "SWE",
    goals: 2,
    note: "チュニジア戦で2得点（ブレイス）",
  },
  {
    player: "キリアン・ムバッペ",
    teamCode: "FRA",
    goals: 2,
    note: "セネガル戦で2得点。仏代表歴代最多得点者に",
  },
  {
    player: "アーリング・ハーランド",
    teamCode: "NOR",
    goals: 2,
    note: "W杯デビューのイラク戦で2得点",
  },
  {
    player: "ハリー・ケイン",
    teamCode: "ENG",
    goals: 2,
    note: "クロアチア戦で2得点（うち1点はPK）",
  },
  {
    player: "ヨハン・マンザンビ",
    teamCode: "SUI",
    goals: 2,
    note: "ボスニア戦で2得点（4-1の勝利）",
  },
  {
    player: "イライジャ・ジャスト",
    teamCode: "NZL",
    goals: 2,
    note: "イラン戦で2得点（2-2のドロー）",
  },
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
