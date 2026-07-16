import { Match } from "@/lib/types";

// ============================================================================
// 2026 FIFAワールドカップ（米国・カナダ・メキシコ共催）全104試合の日程シード。
// football-data.org のAPIキー未設定／取得失敗時に使うフォールバック日程。
// utcDate はすべてUTC。表示は lib/datetime.ts で日本時間(JST=UTC+9)に変換する。
//
// 【データの出所・確度について（重要）】
// ・大会の骨格は確定情報に基づく：開催16都市・16スタジアム、開幕戦は6/11
//   メキシコシティ（エスタディオ・アステカ）、決勝は7/19 ニューヨーク/ニュージャージー
//   （メットライフ・スタジアム）。ノックアウトの各ラウンドの会場・日程もFIFA確定枠
//   （ラウンド32: 6/28〜7/3、ラウンド16: 7/4〜7/7、準々決勝: 7/9〜7/11、
//    準決勝: 7/14ダラス・7/15アトランタ、3位決定戦: 7/18マイアミ、決勝: 7/19）。
// ・日本のグループF（オランダ・スウェーデン・チュニジア）と開幕戦・主要カードは
//   既存の裏取り済みデータを保持。
// ・上記以外のグループステージの「対戦カード」は本アプリのキュレーション組分け
//   （data/teams.ts）に基づく。各試合の会場・キックオフ時刻は、実在の16会場と
//   実際の日程帯に沿って編集部が割り当てた“目安”であり、公式番組表での最終確認を推奨。
// ・ノックアウトの対戦カードはグループ最終順位の確定後に決まるため "TBD"。
//   会場・日程枠のみ確定情報として掲載している。
// ============================================================================

// 開催16会場（FIFA大会呼称の裏にある実スタジアム名で表記）。
const HOST = {
  AZT: { city: "メキシコシティ", stadium: "エスタディオ・アステカ" },
  GDL: { city: "グアダラハラ", stadium: "エスタディオ・アクロン" },
  MTY: { city: "モンテレイ（メキシコ）", stadium: "エスタディオBBVA" },
  TOR: { city: "トロント（カナダ）", stadium: "BMOフィールド" },
  VAN: { city: "バンクーバー（カナダ）", stadium: "BCプレイス" },
  ATL: { city: "アトランタ", stadium: "メルセデス・ベンツ・スタジアム" },
  BOS: { city: "ボストン（フォックスボロ）", stadium: "ジレット・スタジアム" },
  DAL: { city: "アーリントン（ダラス都市圏）", stadium: "AT&Tスタジアム" },
  HOU: { city: "ヒューストン（テキサス州）", stadium: "NRGスタジアム" },
  KAN: { city: "カンザスシティ（ミズーリ州）", stadium: "アローヘッド・スタジアム" },
  LA: { city: "ロサンゼルス（イングルウッド）", stadium: "SoFiスタジアム" },
  MIA: { city: "マイアミ（マイアミガーデンズ）", stadium: "ハードロック・スタジアム" },
  NYNJ: { city: "ニューヨーク/ニュージャージー", stadium: "メットライフ・スタジアム" },
  PHL: { city: "フィラデルフィア", stadium: "リンカーン・フィナンシャル・フィールド" },
  SF: { city: "サンフランシスコ・ベイエリア（サンタクララ）", stadium: "リーバイス・スタジアム" },
  SEA: { city: "シアトル", stadium: "ルーメン・フィールド" },
} as const;
type HostKey = keyof typeof HOST;

// グループステージの節ごとの会場・キックオフ（UTC）割り当て。
// v[0]/t[0] は第1試合、v[1]/t[1] は第2試合に対応。
type Slot = { date: string; v: [HostKey, HostKey]; t: [string, string] };
type GroupPlan = {
  g: string;
  order: [string, string, string, string]; // 組内の並び（ローテーションの基準）
  days: [Slot, Slot, Slot]; // 第1〜3節
};

// 各組の対戦は標準ローテーションで生成：
// 第1節 [0v1, 2v3] / 第2節 [0v2, 3v1] / 第3節 [3v0, 1v2]
const ROT: [number, number][][] = [
  [
    [0, 1],
    [2, 3],
  ],
  [
    [0, 2],
    [3, 1],
  ],
  [
    [3, 0],
    [1, 2],
  ],
];

// ※グループF（日本）は既存の裏取り済みデータを保持するため、ここでは生成しない。
const GROUP_PLANS: GroupPlan[] = [
  {
    g: "A",
    order: ["MEX", "RSA", "KOR", "CZE"],
    days: [
      { date: "2026-06-11", v: ["AZT", "GDL"], t: ["19:00", "22:00"] },
      { date: "2026-06-18", v: ["AZT", "MTY"], t: ["02:00", "19:00"] },
      { date: "2026-06-24", v: ["AZT", "GDL"], t: ["02:00", "02:00"] },
    ],
  },
  {
    g: "B",
    order: ["CAN", "BIH", "QAT", "SUI"],
    days: [
      { date: "2026-06-12", v: ["TOR", "VAN"], t: ["19:00", "22:00"] },
      { date: "2026-06-18", v: ["TOR", "SEA"], t: ["23:00", "20:00"] },
      { date: "2026-06-24", v: ["TOR", "VAN"], t: ["18:00", "18:00"] },
    ],
  },
  {
    g: "C",
    order: ["BRA", "MAR", "HAI", "SCO"],
    days: [
      { date: "2026-06-13", v: ["NYNJ", "PHL"], t: ["22:00", "19:00"] },
      { date: "2026-06-19", v: ["NYNJ", "BOS"], t: ["22:00", "19:00"] },
      { date: "2026-06-25", v: ["NYNJ", "PHL"], t: ["19:00", "19:00"] },
    ],
  },
  {
    g: "D",
    order: ["USA", "PAR", "AUS", "TUR"],
    days: [
      { date: "2026-06-13", v: ["LA", "SF"], t: ["01:00", "03:00"] },
      { date: "2026-06-19", v: ["SF", "SEA"], t: ["01:00", "22:00"] },
      { date: "2026-06-25", v: ["LA", "SF"], t: ["02:00", "02:00"] },
    ],
  },
  {
    g: "E",
    order: ["GER", "CUW", "CIV", "ECU"],
    days: [
      { date: "2026-06-13", v: ["ATL", "MIA"], t: ["16:00", "19:00"] },
      { date: "2026-06-19", v: ["HOU", "ATL"], t: ["16:00", "23:00"] },
      { date: "2026-06-24", v: ["ATL", "MIA"], t: ["22:00", "22:00"] },
    ],
  },
  // F（日本）は groupF を参照
  {
    g: "G",
    order: ["BEL", "EGY", "IRN", "NZL"],
    days: [
      { date: "2026-06-14", v: ["KAN", "DAL"], t: ["16:00", "19:00"] },
      { date: "2026-06-20", v: ["ATL", "KAN"], t: ["16:00", "23:00"] },
      { date: "2026-06-26", v: ["KAN", "DAL"], t: ["18:00", "18:00"] },
    ],
  },
  {
    g: "H",
    order: ["ESP", "CPV", "KSA", "URU"],
    days: [
      { date: "2026-06-15", v: ["SF", "LA"], t: ["16:00", "19:00"] },
      { date: "2026-06-21", v: ["VAN", "SF"], t: ["20:00", "23:00"] },
      { date: "2026-06-26", v: ["SF", "LA"], t: ["02:00", "02:00"] },
    ],
  },
  {
    g: "I",
    order: ["FRA", "SEN", "IRQ", "NOR"],
    days: [
      { date: "2026-06-16", v: ["PHL", "BOS"], t: ["16:00", "19:00"] },
      { date: "2026-06-22", v: ["NYNJ", "PHL"], t: ["16:00", "23:00"] },
      { date: "2026-06-27", v: ["PHL", "BOS"], t: ["18:00", "18:00"] },
    ],
  },
  {
    g: "J",
    order: ["ARG", "ALG", "AUT", "JOR"],
    days: [
      { date: "2026-06-16", v: ["MIA", "ATL"], t: ["22:00", "19:00"] },
      { date: "2026-06-22", v: ["HOU", "MIA"], t: ["19:00", "23:00"] },
      { date: "2026-06-27", v: ["MIA", "ATL"], t: ["22:00", "22:00"] },
    ],
  },
  {
    g: "K",
    order: ["POR", "COD", "UZB", "COL"],
    days: [
      { date: "2026-06-17", v: ["HOU", "GDL"], t: ["16:00", "19:00"] },
      { date: "2026-06-23", v: ["AZT", "HOU"], t: ["02:00", "23:00"] },
      { date: "2026-06-27", v: ["HOU", "GDL"], t: ["02:00", "02:00"] },
    ],
  },
  {
    g: "L",
    order: ["ENG", "CRO", "GHA", "PAN"],
    days: [
      { date: "2026-06-17", v: ["DAL", "KAN"], t: ["20:00", "23:00"] },
      { date: "2026-06-23", v: ["DAL", "MIA"], t: ["20:00", "16:00"] },
      { date: "2026-06-26", v: ["DAL", "KAN"], t: ["23:00", "23:00"] },
    ],
  },
];

// 既存IDや結果を保持するための上書き（キー: `${組}-${節}-${a|b}`）。
// スコアは2026-06-20時点（全12組の第1節＋A〜D組の第2節が消化済み）。
// home/away は order 配列の並び（home=先に来るチーム）に対応。
const OVERRIDE: Record<string, Partial<Match>> = {
  // ── グループA（第1〜2節 消化）──
  // 開幕戦（アステカ）メキシコ 2-0 南アフリカ
  "A-1-a": { id: "m-open", status: "FINISHED", homeScore: 2, awayScore: 0 },
  // 韓国 2-1 チェコ
  "A-1-b": { status: "FINISHED", homeScore: 2, awayScore: 1 },
  // メキシコ 1-0 韓国（メキシコが最速で決勝T進出）
  "A-2-a": { status: "FINISHED", homeScore: 1, awayScore: 0 },
  // チェコ 1-1 南アフリカ
  "A-2-b": { status: "FINISHED", homeScore: 1, awayScore: 1 },

  // ── グループB（第1〜2節 消化）──
  // カナダ 1-1 ボスニア
  "B-1-a": { status: "FINISHED", homeScore: 1, awayScore: 1 },
  // カタール 1-1 スイス
  "B-1-b": { status: "FINISHED", homeScore: 1, awayScore: 1 },
  // カナダ 6-0 カタール（J・デイビッドがハット・自国開催初勝利）
  "B-2-a": { status: "FINISHED", homeScore: 6, awayScore: 0 },
  // スイス 4-1 ボスニア
  "B-2-b": { status: "FINISHED", homeScore: 4, awayScore: 1 },

  // ── グループC（第1〜2節 消化）──
  // 注目カード ブラジル 1-1 モロッコ
  "C-1-a": { id: "m-c1", status: "FINISHED", homeScore: 1, awayScore: 1 },
  // ハイチ 0-1 スコットランド
  "C-1-b": { status: "FINISHED", homeScore: 0, awayScore: 1 },
  // ブラジル 3-0 ハイチ
  "C-2-a": { status: "FINISHED", homeScore: 3, awayScore: 0 },
  // スコットランド 0-1 モロッコ
  "C-2-b": { status: "FINISHED", homeScore: 0, awayScore: 1 },

  // ── グループD（第1〜2節 消化）──
  // アメリカ 4-1 パラグアイ
  "D-1-a": { status: "FINISHED", homeScore: 4, awayScore: 1 },
  // オーストラリア 2-0 トルコ
  "D-1-b": { status: "FINISHED", homeScore: 2, awayScore: 0 },
  // アメリカ 2-0 オーストラリア（最速で決勝T進出）
  "D-2-a": { status: "FINISHED", homeScore: 2, awayScore: 0 },
  // トルコ 0-1 パラグアイ
  "D-2-b": { status: "FINISHED", homeScore: 0, awayScore: 1 },

  // ── グループE（第1〜2節 消化）──
  // ドイツ 7-1 キュラソー
  "E-1-a": { status: "FINISHED", homeScore: 7, awayScore: 1 },
  // コートジボワール 1-0 エクアドル
  "E-1-b": { status: "FINISHED", homeScore: 1, awayScore: 0 },
  // ドイツ 2-1 コートジボワール（ウンダフが94分弾で決勝T進出）
  "E-2-a": { status: "FINISHED", homeScore: 2, awayScore: 1 },
  // エクアドル 0-0 キュラソー
  "E-2-b": { status: "FINISHED", homeScore: 0, awayScore: 0 },

  // ── グループG（第1節のみ）──
  // ベルギー 1-1 エジプト
  "G-1-a": { status: "FINISHED", homeScore: 1, awayScore: 1 },
  // イラン 2-2 ニュージーランド
  "G-1-b": { status: "FINISHED", homeScore: 2, awayScore: 2 },

  // ── グループH（第1節のみ）──
  // スペイン 0-0 カーボベルデ（大波乱）
  "H-1-a": { status: "FINISHED", homeScore: 0, awayScore: 0 },
  // サウジアラビア 1-1 ウルグアイ
  "H-1-b": { status: "FINISHED", homeScore: 1, awayScore: 1 },

  // ── グループI（第1節のみ）──
  // フランス 3-1 セネガル（ムバッペ2発）
  "I-1-a": { status: "FINISHED", homeScore: 3, awayScore: 1 },
  // イラク 1-4 ノルウェー（ハーランド2発）
  "I-1-b": { status: "FINISHED", homeScore: 1, awayScore: 4 },

  // ── グループJ（第1節のみ）──
  // アルゼンチン 3-0 アルジェリア（メッシがW杯初ハット）
  "J-1-a": { status: "FINISHED", homeScore: 3, awayScore: 0 },
  // オーストリア 3-1 ヨルダン（後半AT12分のPKで決着）
  "J-1-b": { status: "FINISHED", homeScore: 3, awayScore: 1 },

  // ── グループK（第1節のみ）──
  // ポルトガル 1-1 DRコンゴ（コンゴがW杯初勝点）
  "K-1-a": { status: "FINISHED", homeScore: 1, awayScore: 1 },
  // ウズベキスタン 1-3 コロンビア
  "K-1-b": { status: "FINISHED", homeScore: 1, awayScore: 3 },

  // ── グループL（第1〜3節 消化）──
  // 注目カード イングランド 4-2 クロアチア
  "L-1-a": { id: "m-l1", status: "FINISHED", homeScore: 4, awayScore: 2 },
  // ガーナ 1-0 パナマ
  "L-1-b": { status: "FINISHED", homeScore: 1, awayScore: 0 },
  // イングランド 0-0 ガーナ
  "L-2-a": { status: "FINISHED", homeScore: 0, awayScore: 0 },
  // パナマ 0-1 クロアチア
  "L-2-b": { status: "FINISHED", homeScore: 0, awayScore: 1 },
  // パナマ 0-2 イングランド
  "L-3-a": { status: "FINISHED", homeScore: 0, awayScore: 2 },
  // クロアチア 2-1 ガーナ
  "L-3-b": { status: "FINISHED", homeScore: 2, awayScore: 1 },

  // ── グループA（第3節 消化）──
  // チェコ 0-3 メキシコ
  "A-3-a": { status: "FINISHED", homeScore: 0, awayScore: 3 },
  // 南アフリカ 1-0 韓国
  "A-3-b": { status: "FINISHED", homeScore: 1, awayScore: 0 },

  // ── グループB（第3節 消化）──
  // スイス 2-1 カナダ
  "B-3-a": { status: "FINISHED", homeScore: 2, awayScore: 1 },
  // ボスニア 3-1 カタール
  "B-3-b": { status: "FINISHED", homeScore: 3, awayScore: 1 },

  // ── グループC（第3節 消化）──
  // スコットランド 0-3 ブラジル（ヴィニシウス2発）
  "C-3-a": { status: "FINISHED", homeScore: 0, awayScore: 3 },
  // モロッコ 4-2 ハイチ
  "C-3-b": { status: "FINISHED", homeScore: 4, awayScore: 2 },

  // ── グループD（第3節 消化）──
  // トルコ 3-2 アメリカ
  "D-3-a": { status: "FINISHED", homeScore: 3, awayScore: 2 },
  // パラグアイ 0-0 オーストラリア
  "D-3-b": { status: "FINISHED", homeScore: 0, awayScore: 0 },

  // ── グループE（第3節 消化）──
  // エクアドル 2-1 ドイツ
  "E-3-a": { status: "FINISHED", homeScore: 2, awayScore: 1 },
  // キュラソー 0-2 コートジボワール（ペペ2発）
  "E-3-b": { status: "FINISHED", homeScore: 0, awayScore: 2 },

  // ── グループG（第2〜3節 消化）──
  // ベルギー 0-0 イラン
  "G-2-a": { status: "FINISHED", homeScore: 0, awayScore: 0 },
  // ニュージーランド 1-3 エジプト
  "G-2-b": { status: "FINISHED", homeScore: 1, awayScore: 3 },
  // ニュージーランド 1-5 ベルギー（トロッサール2発）
  "G-3-a": { status: "FINISHED", homeScore: 1, awayScore: 5 },
  // エジプト 1-1 イラン
  "G-3-b": { status: "FINISHED", homeScore: 1, awayScore: 1 },

  // ── グループH（第2〜3節 消化）──
  // スペイン 4-0 サウジアラビア
  "H-2-a": { status: "FINISHED", homeScore: 4, awayScore: 0 },
  // ウルグアイ 2-2 カーボベルデ
  "H-2-b": { status: "FINISHED", homeScore: 2, awayScore: 2 },
  // ウルグアイ 0-1 スペイン（バエナ42分）
  "H-3-a": { status: "FINISHED", homeScore: 0, awayScore: 1 },
  // カーボベルデ 0-0 サウジアラビア
  "H-3-b": { status: "FINISHED", homeScore: 0, awayScore: 0 },

  // ── グループI（第2〜3節 消化）──
  // フランス 3-0 イラク（ムバッペ2発）
  "I-2-a": { status: "FINISHED", homeScore: 3, awayScore: 0 },
  // ノルウェー 3-2 セネガル（ハーランド2発）
  "I-2-b": { status: "FINISHED", homeScore: 3, awayScore: 2 },
  // ノルウェー 1-4 フランス（デンベレ・ハットトリック）
  "I-3-a": { status: "FINISHED", homeScore: 1, awayScore: 4 },
  // セネガル 5-0 イラク（ゲイェ2発）
  "I-3-b": { status: "FINISHED", homeScore: 5, awayScore: 0 },

  // ── グループJ（第2〜3節 消化）──
  // アルゼンチン 2-0 オーストリア（メッシ2発）
  "J-2-a": { status: "FINISHED", homeScore: 2, awayScore: 0 },
  // ヨルダン 1-2 アルジェリア
  "J-2-b": { status: "FINISHED", homeScore: 1, awayScore: 2 },
  // ヨルダン 1-3 アルゼンチン（メッシ、ロ・セルソ、マルティネス）
  "J-3-a": { status: "FINISHED", homeScore: 1, awayScore: 3 },
  // アルジェリア 3-3 オーストリア（マフレズ2発の劇的引き分け）
  "J-3-b": { status: "FINISHED", homeScore: 3, awayScore: 3 },

  // ── グループK（第2〜3節 消化）──
  // ポルトガル 5-0 ウズベキスタン（ロナウド2発）
  "K-2-a": { status: "FINISHED", homeScore: 5, awayScore: 0 },
  // コロンビア 1-0 DRコンゴ
  "K-2-b": { status: "FINISHED", homeScore: 1, awayScore: 0 },
  // コロンビア 0-0 ポルトガル
  "K-3-a": { status: "FINISHED", homeScore: 0, awayScore: 0 },
  // DRコンゴ 3-1 ウズベキスタン（ウィサ2発）
  "K-3-b": { status: "FINISHED", homeScore: 3, awayScore: 1 },
};

function expandGroups(): Match[] {
  const out: Match[] = [];
  for (const plan of GROUP_PLANS) {
    for (let md = 0; md < 3; md++) {
      const slot = plan.days[md];
      ROT[md].forEach(([hi, ai], i) => {
        const ab = i === 0 ? "a" : "b";
        const hostKey = slot.v[i];
        const host = HOST[hostKey];
        const base: Match = {
          id: `m-gs-${plan.g}${md + 1}${ab}`,
          utcDate: `${slot.date}T${slot.t[i]}:00Z`,
          stage: `グループステージ第${md + 1}節`,
          group: plan.g,
          homeCode: plan.order[hi],
          awayCode: plan.order[ai],
          venue: host.city,
          city: host.city,
          stadium: host.stadium,
          status: "SCHEDULED",
        };
        out.push({ ...base, ...OVERRIDE[`${plan.g}-${md + 1}-${ab}`] });
      });
    }
  }
  return out;
}

// グループF（日本）— 裏取り済みデータを保持。
const groupF: Match[] = [
  // 第1節 日本×オランダ 現地6/14 15:00 CDT → JST 6/15 05:00
  // 結果: オランダ 2-2 日本（日本が2度追いつき勝点1）
  {
    id: "m-f1a",
    utcDate: "2026-06-14T20:00:00Z",
    stage: "グループステージ第1節",
    group: "F",
    homeCode: "NED",
    awayCode: "JPN",
    venue: "アーリントン（ダラス）",
    city: "アーリントン（ダラス都市圏）",
    stadium: "AT&Tスタジアム",
    status: "FINISHED",
    homeScore: 2,
    awayScore: 2,
  },
  // 第1節 スウェーデン×チュニジア 現地6/14 20:00 CST → JST 6/15 11:00
  // 結果: スウェーデン 5-1 チュニジア（アヤリ2発、イサク・ヨケレスら）
  {
    id: "m-f1b",
    utcDate: "2026-06-15T02:00:00Z",
    stage: "グループステージ第1節",
    group: "F",
    homeCode: "SWE",
    awayCode: "TUN",
    venue: "モンテレイ",
    city: "モンテレイ（メキシコ）",
    stadium: "エスタディオBBVA",
    status: "FINISHED",
    homeScore: 5,
    awayScore: 1,
  },
  // 第2節 日本×チュニジア 現地6/20 22:00 CST → JST 6/21 13:00
  // 結果: 日本 4-0 チュニジア（上田2発・鎌田・伊東。日本W杯初の1試合4得点）
  {
    id: "m-f2a",
    utcDate: "2026-06-21T04:00:00Z",
    stage: "グループステージ第2節",
    group: "F",
    homeCode: "JPN",
    awayCode: "TUN",
    venue: "モンテレイ",
    city: "モンテレイ（メキシコ）",
    stadium: "エスタディオBBVA",
    status: "FINISHED",
    homeScore: 4,
    awayScore: 0,
  },
  // 第2節 オランダ×スウェーデン 現地6/20 12:00 CDT → JST 6/21 02:00
  // 結果: オランダ 5-1 スウェーデン（ブロビー・ハクポが各2得点）
  {
    id: "m-f2b",
    utcDate: "2026-06-20T17:00:00Z",
    stage: "グループステージ第2節",
    group: "F",
    homeCode: "NED",
    awayCode: "SWE",
    venue: "ヒューストン",
    city: "ヒューストン（テキサス州）",
    stadium: "NRGスタジアム",
    status: "FINISHED",
    homeScore: 5,
    awayScore: 1,
  },
  // 第3節 日本×スウェーデン 現地6/25 18:00 CDT → JST 6/26 08:00
  // 結果: 日本 1-1 スウェーデン（前田大然56分・エランガ62分。両チーム2位・3位で突破）
  {
    id: "m-f3a",
    utcDate: "2026-06-25T23:00:00Z",
    stage: "グループステージ第3節",
    group: "F",
    homeCode: "JPN",
    awayCode: "SWE",
    venue: "アーリントン（ダラス）",
    city: "アーリントン（ダラス都市圏）",
    stadium: "AT&Tスタジアム",
    status: "FINISHED",
    homeScore: 1,
    awayScore: 1,
  },
  // 第3節 チュニジア×オランダ 現地6/25 18:00 CDT → JST 6/26 08:00
  // 結果: チュニジア 1-3 オランダ（スヒリOG3分・ブロビー7分・マストゥーリ54分・ファン・ヘッケ62分）
  {
    id: "m-f3b",
    utcDate: "2026-06-25T23:00:00Z",
    stage: "グループステージ第3節",
    group: "F",
    homeCode: "TUN",
    awayCode: "NED",
    venue: "カンザスシティ",
    city: "カンザスシティ（ミズーリ州）",
    stadium: "アローヘッド・スタジアム",
    status: "FINISHED",
    homeScore: 1,
    awayScore: 3,
  },
];

// ノックアウト（決勝トーナメント）。会場・日程はFIFA確定枠。
// 対戦カードはグループ最終順位の確定後に決まるため "TBD"。
function ko(
  id: string,
  stage: string,
  date: string,
  time: string,
  hostKey: HostKey,
  teams?: { home: string; away: string },
  result?: {
    homeScore: number;
    awayScore: number;
    extraTime?: boolean;
    pk?: { home: number; away: number };
  }
): Match {
  const host = HOST[hostKey];
  return {
    id,
    utcDate: `${date}T${time}:00Z`,
    stage,
    homeCode: teams?.home ?? "TBD",
    awayCode: teams?.away ?? "TBD",
    venue: host.city,
    city: host.city,
    stadium: host.stadium,
    status: result ? "FINISHED" : "SCHEDULED",
    ...(result
      ? {
          homeScore: result.homeScore,
          awayScore: result.awayScore,
          ...(result.extraTime ? { extraTime: true } : {}),
          ...(result.pk ? { pkHome: result.pk.home, pkAway: result.pk.away } : {}),
        }
      : {}),
  };
}

// ============================================================================
// ノックアウト結果（2026-07-09時点でファクトチェック済み）。
// ラウンド32・ラウンド16は全16＋8試合が終了。準々決勝は7/9のFRA×MARのみ終了、
// 残り3試合（ESP×BEL／NOR×ENG／ARG×SUI）は7/10〜7/11開催予定。
// ============================================================================
const knockout: Match[] = [
  // ── ラウンド32（6/28〜7/3）48チーム中32チームが進出。W杯史上初の追加ラウンド ──
  // 南アフリカ 0-1 カナダ（エウスタキオ 90+2'）
  ko("m-r32-3", "ラウンド32", "2026-06-28", "23:00", "LA", { home: "CAN", away: "RSA" }, { homeScore: 1, awayScore: 0 }),
  // ブラジル 2-1 日本（佐野海舟29'先制→カゼミロ56'同点→マルティネッリ90+5'決勝弾。日本はラウンド32で敗退）
  ko("m-r32-4", "ラウンド32", "2026-06-29", "17:00", "HOU", { home: "BRA", away: "JPN" }, { homeScore: 2, awayScore: 1 }),
  // ドイツ 1-1 パラグアイ（延長でも決着つかずPK4-3でパラグアイが金星。ドイツ史上初のPK戦敗退）
  ko("m-r32-5", "ラウンド32", "2026-06-29", "22:00", "BOS", { home: "GER", away: "PAR" }, { homeScore: 1, awayScore: 1, extraTime: true, pk: { home: 3, away: 4 } }),
  // オランダ 1-1 モロッコ（延長でも決着つかずPK3-2でモロッコが金星。ブヌーがセーブ、サイバリが決勝弾）
  ko("m-r32", "ラウンド32", "2026-06-30", "02:00", "MTY", { home: "NED", away: "MAR" }, { homeScore: 1, awayScore: 1, extraTime: true, pk: { home: 2, away: 3 } }),
  // フランス 3-0 スウェーデン（ムバッペ2発・バルコラ）
  ko("m-r32-2", "ラウンド32", "2026-06-30", "19:00", "NYNJ", { home: "FRA", away: "SWE" }, { homeScore: 3, awayScore: 0 }),
  // コートジボワール 1-2 ノルウェー（ハーランド86'決勝弾）
  ko("m-r32-6", "ラウンド32", "2026-06-30", "23:00", "DAL", { home: "CIV", away: "NOR" }, { homeScore: 1, awayScore: 2 }),
  // メキシコ 2-0 エクアドル（キニョネス・ヒメネス）
  ko("m-r32-7", "ラウンド32", "2026-07-01", "02:00", "AZT", { home: "MEX", away: "ECU" }, { homeScore: 2, awayScore: 0 }),
  // イングランド 2-1 DRコンゴ（ケイン2発）
  ko("m-r32-8", "ラウンド32", "2026-07-01", "19:00", "ATL", { home: "ENG", away: "COD" }, { homeScore: 2, awayScore: 1 }),
  // アメリカ 2-0 ボスニア（バログン先制も64分に退場、10人で守り切る）
  ko("m-r32-11", "ラウンド32", "2026-07-01", "20:00", "SF", { home: "USA", away: "BIH" }, { homeScore: 2, awayScore: 0 }),
  // ベルギー 3-2 セネガル（延長125分、ティーレマンスのPKがW杯史上最も遅い決勝弾に）
  ko("m-r32-12", "ラウンド32", "2026-07-01", "23:00", "SEA", { home: "BEL", away: "SEN" }, { homeScore: 3, awayScore: 2, extraTime: true }),
  // ポルトガル 2-1 クロアチア（ロナウドPK・ラモス90+4'）
  ko("m-r32-9", "ラウンド32", "2026-07-02", "19:00", "TOR", { home: "POR", away: "CRO" }, { homeScore: 2, awayScore: 1 }),
  // スペイン 3-0 オーストリア（オヤルサバル2発）
  ko("m-r32-10", "ラウンド32", "2026-07-02", "23:00", "LA", { home: "ESP", away: "AUT" }, { homeScore: 3, awayScore: 0 }),
  // スイス 2-0 アルジェリア（エンボロ・ンドイエ）
  ko("m-r32-16", "ラウンド32", "2026-07-02", "19:00", "VAN", { home: "SUI", away: "ALG" }, { homeScore: 2, awayScore: 0 }),
  // オーストラリア 1-1 エジプト（延長でも決着つかずPK4-2でエジプトが金星。エジプト史上初の決勝T勝利）
  ko("m-r32-14", "ラウンド32", "2026-07-03", "17:00", "DAL", { home: "AUS", away: "EGY" }, { homeScore: 1, awayScore: 1, extraTime: true, pk: { home: 2, away: 4 } }),
  // アルゼンチン 3-2 カーボベルデ（延長、メッシ先制・マルティネス決勝弾）
  ko("m-r32-13", "ラウンド32", "2026-07-03", "19:00", "MIA", { home: "ARG", away: "CPV" }, { homeScore: 3, awayScore: 2, extraTime: true }),
  // コロンビア 1-0 ガーナ（アリアス14'、スアレスのアシスト）
  ko("m-r32-15", "ラウンド32", "2026-07-03", "23:00", "KAN", { home: "COL", away: "GHA" }, { homeScore: 1, awayScore: 0 }),

  // ── ラウンド16（7/4〜7/7）──
  // カナダ 0-3 モロッコ（ウナヒ2発・ラヒミ）
  ko("m-r16-1", "ラウンド16", "2026-07-04", "17:00", "HOU", { home: "CAN", away: "MAR" }, { homeScore: 0, awayScore: 3 }),
  // フランス 1-0 パラグアイ（ムバッペPK70'）
  ko("m-r16-2", "ラウンド16", "2026-07-04", "22:00", "PHL", { home: "FRA", away: "PAR" }, { homeScore: 1, awayScore: 0 }),
  // ブラジル 1-2 ノルウェー（ハーランド2発でブラジル撃破。試合後ネイマールが代表引退表明）
  ko("m-r16-3", "ラウンド16", "2026-07-05", "19:00", "NYNJ", { home: "BRA", away: "NOR" }, { homeScore: 1, awayScore: 2 }),
  // メキシコ 2-3 イングランド（ベリンガム2発・ケインPK。メキシコは10人のイングランドに逆転負け）
  ko("m-r16-4", "ラウンド16", "2026-07-06", "02:00", "AZT", { home: "MEX", away: "ENG" }, { homeScore: 2, awayScore: 3 }),
  // ポルトガル 0-1 スペイン（メリノ90+1'決勝弾。ロナウド代表最後の一戦か）
  ko("m-r16-5", "ラウンド16", "2026-07-06", "19:00", "DAL", { home: "POR", away: "ESP" }, { homeScore: 0, awayScore: 1 }),
  // アメリカ 1-4 ベルギー（デ・ケテラーレ2発でアメリカ大敗）
  ko("m-r16-6", "ラウンド16", "2026-07-06", "22:00", "SEA", { home: "USA", away: "BEL" }, { homeScore: 1, awayScore: 4 }),
  // アルゼンチン 3-2 エジプト（0-2から後半終盤3発の大逆転。メッシがW杯通算21点目）
  ko("m-r16-7", "ラウンド16", "2026-07-07", "19:00", "ATL", { home: "ARG", away: "EGY" }, { homeScore: 3, awayScore: 2 }),
  // コロンビア 0-0 スイス（延長でも決着つかずPK4-3でスイスが勝利）
  ko("m-r16-8", "ラウンド16", "2026-07-07", "22:00", "VAN", { home: "COL", away: "SUI" }, { homeScore: 0, awayScore: 0, extraTime: true, pk: { home: 3, away: 4 } }),

  // ── 準々決勝（7/9〜7/11）── 全4試合終了
  // フランス 2-0 モロッコ（デンベレ66'・ムバッペ得点関与）
  ko("m-qf-1", "準々決勝", "2026-07-09", "23:00", "BOS", { home: "FRA", away: "MAR" }, { homeScore: 2, awayScore: 0 }),
  // スペイン 2-1 ベルギー（F.ルイス30'→デ・ケテラーレ41'同点も、途中出場メリノが88'決勝弾）
  ko("m-qf-2", "準々決勝", "2026-07-10", "23:00", "LA", { home: "ESP", away: "BEL" }, { homeScore: 2, awayScore: 1 }),
  // ノルウェー 1-2 イングランド（延長。シェルデルプ36'→ベリンガムが45+2'同点・延長93'決勝弾の2発）
  ko("m-qf-3", "準々決勝", "2026-07-11", "16:00", "MIA", { home: "NOR", away: "ENG" }, { homeScore: 1, awayScore: 2, extraTime: true }),
  // アルゼンチン 3-1 スイス（延長。マカリスター10'→ンドイエ67'同点も、延長でアルバレス112'・ラウタロ・マルティネス120+1'。スイスはエンボロが72分に一発退場）
  ko("m-qf-4", "準々決勝", "2026-07-11", "23:00", "KAN", { home: "ARG", away: "SUI" }, { homeScore: 3, awayScore: 1, extraTime: true }),

  // ── 準決勝（7/14ダラス・7/15アトランタ）── 全2試合終了
  // フランス 0-2 スペイン（オヤルサバルPK22'・ポロ58'。スペインは無敗記録37試合でイタリアの歴代記録に並ぶ）
  ko("m-sf-1", "準決勝", "2026-07-14", "23:00", "DAL", { home: "FRA", away: "ESP" }, { homeScore: 0, awayScore: 2 }),
  // イングランド 1-2 アルゼンチン（ゴードン55'先制も、終盤にエンソ・フェルナンデス85'・ラウタロ・マルティネス90+2'でアルゼンチン大逆転）
  ko("m-sf-2", "準決勝", "2026-07-15", "23:00", "ATL", { home: "ENG", away: "ARG" }, { homeScore: 1, awayScore: 2 }),

  // ── 3位決定戦（7/18マイアミ）── フランス vs イングランド（未実施）
  ko("m-3rd", "3位決定戦", "2026-07-18", "21:00", "MIA", { home: "FRA", away: "ENG" }),

  // ── 決勝（7/19 ニューヨーク/ニュージャージー）現地15:00 ET → JST 7/20 04:00 ── スペイン vs アルゼンチン（未実施）
  ko("m-final", "決勝", "2026-07-19", "19:00", "NYNJ", { home: "ESP", away: "ARG" }),
];

export const fallbackMatches: Match[] = [
  ...expandGroups(),
  ...groupF,
  ...knockout,
];
