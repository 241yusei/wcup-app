// 得点ランキング（ゴールデンブーツ・レース）。
// ※実際の得点を手動集計したフォールバック表示。公式の最新スタッツは
//   DAZN／FIFA公式で確認のこと。実APIが繋がれば現在順位が自動で埋まる設計。

export interface ScorerNote {
  asOf: string;
  caveat: string;
}

export const scorerMeta: ScorerNote = {
  asOf: "2026年6月29日時点（全グループステージ48試合＋ラウンド32第1戦を反映）",
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
    goals: 6,
    note: "アルジェリア戦ハットトリック→オーストリア戦2発→ヨルダン戦1発（グループJ全3節で計6得点）",
  },
  {
    player: "ウスマン・デンベレ",
    teamCode: "FRA",
    goals: 4,
    note: "イラク戦1発→ノルウェー戦でハットトリック（3節計4得点。フランスが3戦全勝の原動力）",
  },
  {
    player: "ヴィニシウス・ジュニオール",
    teamCode: "BRA",
    goals: 4,
    note: "モロッコ戦・ハイチ戦各1発→スコットランド戦で2発（グループC計4得点）",
  },
  {
    player: "キリアン・ムバッペ",
    teamCode: "FRA",
    goals: 4,
    note: "セネガル戦2発→イラク戦2発（仏代表歴代最多得点記録を更新中）",
  },
  {
    player: "アーリング・ハーランド",
    teamCode: "NOR",
    goals: 4,
    note: "W杯デビューのイラク戦2発→セネガル戦でも2発（グループI計4得点）",
  },
  {
    player: "ジョナサン・デイビッド",
    teamCode: "CAN",
    goals: 3,
    note: "カタール戦でハットトリック（カナダ自国開催初勝利）",
  },
  {
    player: "デニス・ウンダフ",
    teamCode: "GER",
    goals: 3,
    note: "途中出場でキュラソー戦1発・コートジボワール戦94分決勝弾など計3得点",
  },
  {
    player: "マテウス・クーニャ",
    teamCode: "BRA",
    goals: 3,
    note: "ハイチ戦ブレイス→スコットランド戦でも1発（計3得点）",
  },
  {
    player: "ブライアン・ブロビー",
    teamCode: "NED",
    goals: 3,
    note: "スウェーデン戦ブレイス→チュニジア戦1発（計3得点）",
  },
  {
    player: "イライジャ・ジャスト",
    teamCode: "NZL",
    goals: 3,
    note: "イラン戦2発→ベルギー戦でも1発（計3得点）",
  },
  {
    player: "イスマエル・サイバリ",
    teamCode: "MAR",
    goals: 3,
    note: "ブラジル戦・スコットランド戦・ハイチ戦で各1点（計3得点）",
  },
  {
    player: "ハリー・ケイン",
    teamCode: "ENG",
    goals: 3,
    note: "クロアチア戦2発→パナマ戦1発（計3得点）",
  },
  {
    player: "サイル・ラリン",
    teamCode: "CAN",
    goals: 2,
    note: "ボスニア戦・カタール戦で連続得点",
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
    player: "鎌田 大地",
    teamCode: "JPN",
    goals: 2,
    note: "オランダ戦の同点弾＋チュニジア戦の先制弾",
  },
  {
    player: "上田 綺世",
    teamCode: "JPN",
    goals: 2,
    note: "チュニジア戦で2得点（4-0の快勝）",
  },
  {
    player: "クリセンシオ・サマービル",
    teamCode: "NED",
    goals: 2,
    note: "日本戦・スウェーデン戦で得点",
  },
  {
    player: "コディ・ハクポ",
    teamCode: "NED",
    goals: 2,
    note: "スウェーデン戦で2得点（ブレイス）",
  },
  {
    player: "ヨハン・マンザンビ",
    teamCode: "SUI",
    goals: 2,
    note: "ボスニア戦で2得点（4-1の勝利）",
  },
  {
    player: "レアンドロ・トロッサール",
    teamCode: "BEL",
    goals: 2,
    note: "ニュージーランド戦で2得点（5-1の大勝）",
  },
  {
    player: "マルコ・オヤルサバル",
    teamCode: "ESP",
    goals: 2,
    note: "サウジアラビア戦で2得点（4-0の快勝）",
  },
  {
    player: "クリスティアーノ・ロナウド",
    teamCode: "POR",
    goals: 2,
    note: "ウズベキスタン戦で2得点（5-0の大勝）",
  },
  {
    player: "パペ・マタル・ゲイェ",
    teamCode: "SEN",
    goals: 2,
    note: "イラク戦で2得点（5-0の快勝）",
  },
  {
    player: "イスマイラ・サール",
    teamCode: "SEN",
    goals: 2,
    note: "ノルウェー戦・イラク戦で各1点",
  },
  {
    player: "リヤド・マフレズ",
    teamCode: "ALG",
    goals: 2,
    note: "オーストリア戦で2発（3-3の劇的引き分け）",
  },
  {
    player: "ヨアネ・ウィサ",
    teamCode: "COD",
    goals: 2,
    note: "ウズベキスタン戦で2得点（3-1の勝利）",
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
