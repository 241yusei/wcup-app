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
  asOf: "2026年6月13日時点（第1節終了分を反映）",
  caveat:
    "開幕から2日分の実際の得点をまとめています。公式APIへの接続前のため手動更新です。本命ウォッチリストは大会前評価にもとづく編集部の見立てです。",
};

// 現時点で確定している大会得点（フォールバック日程で FINISHED の試合から）。
export interface CurrentScorer {
  player: string;
  teamCode: string;
  goals: number;
  note?: string;
}
export const currentScorers: CurrentScorer[] = [
  // USA 4-1 PAR（6/12）：バログンが2得点
  {
    player: "フォラリン・バログン",
    teamCode: "USA",
    goals: 2,
    note: "USA×パラグアイ戦で2得点（ブレイス）",
  },
  // 開幕戦 MEX 2-0 RSA（6/11）：J・キニョネスが第1号ゴール
  {
    player: "フリアン・キニョネス",
    teamCode: "MEX",
    goals: 1,
    note: "開幕戦 大会第1号ゴール",
  },
  // 開幕戦 MEX 2-0 RSA（6/11）：R・ヒメネスが追加点
  {
    player: "ラウル・ヒメネス",
    teamCode: "MEX",
    goals: 1,
    note: "開幕戦 追加点（頭蓋骨骨折から復活）",
  },
  // KOR 2-1 CZE（6/11）：ファン・インボムが同点弾＋1アシスト
  {
    player: "ファン・インボム",
    teamCode: "KOR",
    goals: 1,
    note: "韓国×チェコ 同点弾（1G1A）",
  },
  // KOR 2-1 CZE（6/11）：オ・ヒョンギュが途中出場から決勝ゴール
  {
    player: "オ・ヒョンギュ",
    teamCode: "KOR",
    goals: 1,
    note: "韓国×チェコ 途中出場から決勝ゴール",
  },
  // KOR 2-1 CZE（6/11）：クレイチーが先制点
  {
    player: "ラディスラフ・クレイチー",
    teamCode: "CZE",
    goals: 1,
    note: "韓国×チェコ 先制点（ヘディング）",
  },
  // CAN 1-1 BIH（6/12）：ルキッチが先制
  {
    player: "ジョヴォ・ルキッチ",
    teamCode: "BIH",
    goals: 1,
    note: "カナダ×ボスニア 先制点（代表初ゴール）",
  },
  // CAN 1-1 BIH（6/12）：ラリンが後半同点弾
  {
    player: "サイル・ラリン",
    teamCode: "CAN",
    goals: 1,
    note: "カナダ×ボスニア 後半78分同点弾",
  },
  // USA 4-1 PAR（6/12）：レイナがダメ押し
  {
    player: "ジオ・レイナ",
    teamCode: "USA",
    goals: 1,
    note: "USA×パラグアイ戦 ダメ押しゴール",
  },
  // USA 4-1 PAR（6/12）：マウリシオが1点返す
  {
    player: "マウリシオ",
    teamCode: "PAR",
    goals: 1,
    note: "USA×パラグアイ戦 1点返す",
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
