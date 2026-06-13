// 2026 FIFAワールドカップ 開催16都市・16スタジアムのガイド。
// 都市・スタジアム名・所在国は確定情報。収容人数は概算（W杯仕様の暫定値を含む）。
// 担当ラウンドは確定枠（決勝=ニューヨーク/ニュージャージー、準決勝=ダラス/アトランタ、
// 3位決定戦・準々決勝の一部=マイアミ ほか）。

export interface Venue {
  key: string;
  city: string; // 日本語都市名
  stadium: string; // 実スタジアム名（大会呼称ではなく通称）
  country: "🇺🇸" | "🇨🇦" | "🇲🇽";
  countryName: string;
  capacity: string; // 概算収容
  rounds: string[]; // 担当ラウンドの目安
  note: string; // にわか向けの一言メモ
  highlight?: boolean; // 開幕戦・決勝など特別会場
}

export const venues: Venue[] = [
  {
    key: "AZT",
    city: "メキシコシティ",
    stadium: "エスタディオ・アステカ",
    country: "🇲🇽",
    countryName: "メキシコ",
    capacity: "約83,000",
    rounds: ["開幕戦", "グループ", "ラウンド32"],
    note: "1970・1986に続き史上初の3大会開催。標高2,200mの“聖地”で開幕戦の舞台。",
    highlight: true,
  },
  {
    key: "GDL",
    city: "グアダラハラ",
    stadium: "エスタディオ・アクロン",
    country: "🇲🇽",
    countryName: "メキシコ",
    capacity: "約48,000",
    rounds: ["グループ", "ラウンド32"],
    note: "名門チーバスの本拠。情熱的なメキシコ西部のサッカー文化が味わえる。",
  },
  {
    key: "MTY",
    city: "モンテレイ",
    stadium: "エスタディオBBVA",
    country: "🇲🇽",
    countryName: "メキシコ",
    capacity: "約53,000",
    rounds: ["グループ", "ラウンド32"],
    note: "“エル・ヒガンテ・デ・アセロ（鋼の巨人）”。山並みを背にした美しい新スタジアム。日本戦も開催。",
  },
  {
    key: "TOR",
    city: "トロント",
    stadium: "BMOフィールド",
    country: "🇨🇦",
    countryName: "カナダ",
    capacity: "約45,000（拡張）",
    rounds: ["カナダ開幕", "グループ", "ラウンド32"],
    note: "カナダ代表のW杯初白星なるか。大会向けに増設して臨む。",
  },
  {
    key: "VAN",
    city: "バンクーバー",
    stadium: "BCプレイス",
    country: "🇨🇦",
    countryName: "カナダ",
    capacity: "約54,000",
    rounds: ["グループ", "ラウンド32", "ラウンド16"],
    note: "開閉式屋根のダウンタウン立地。天候に左右されない好環境。",
  },
  {
    key: "ATL",
    city: "アトランタ",
    stadium: "メルセデス・ベンツ・スタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約71,000",
    rounds: ["グループ", "ラウンド16", "準決勝"],
    note: "開閉式の屋根と巨大360度ビジョンを備えた最新鋭。準決勝の大舞台。",
    highlight: true,
  },
  {
    key: "BOS",
    city: "ボストン（フォックスボロ）",
    stadium: "ジレット・スタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約65,000",
    rounds: ["グループ", "ラウンド16", "準々決勝"],
    note: "NFLペイトリオッツの本拠。準々決勝の一戦を開催。",
  },
  {
    key: "DAL",
    city: "アーリントン（ダラス都市圏）",
    stadium: "AT&Tスタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約80,000+",
    rounds: ["グループ", "ラウンド32", "ラウンド16", "準決勝"],
    note: "最多9試合を担当する巨大ドーム。準決勝もここ。日本戦の舞台にも。",
    highlight: true,
  },
  {
    key: "HOU",
    city: "ヒューストン",
    stadium: "NRGスタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約72,000",
    rounds: ["グループ", "ラウンド32", "ラウンド16"],
    note: "開閉式屋根で猛暑のテキサスでも快適。日本戦も開催。",
  },
  {
    key: "KAN",
    city: "カンザスシティ",
    stadium: "アローヘッド・スタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約76,000",
    rounds: ["グループ", "ラウンド16", "準々決勝"],
    note: "全米屈指の“爆音”スタジアム。準々決勝の熱気は必見。日本戦も開催。",
  },
  {
    key: "LA",
    city: "ロサンゼルス（イングルウッド）",
    stadium: "SoFiスタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約70,000",
    rounds: ["米国開幕", "グループ", "ラウンド16", "準々決勝"],
    note: "全米最高額の超ハイテク。米国の開幕戦と準々決勝の舞台。",
    highlight: true,
  },
  {
    key: "MIA",
    city: "マイアミ（マイアミガーデンズ）",
    stadium: "ハードロック・スタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約65,000",
    rounds: ["グループ", "ラウンド16", "準々決勝", "3位決定戦"],
    note: "ラテンの熱が渦巻く南国会場。準々決勝と3位決定戦を開催。",
    highlight: true,
  },
  {
    key: "NYNJ",
    city: "ニューヨーク/ニュージャージー",
    stadium: "メットライフ・スタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約82,500",
    rounds: ["グループ", "ラウンド32", "ラウンド16", "決勝"],
    note: "7/19の決勝の舞台。世界が見つめる大会のフィナーレ会場。",
    highlight: true,
  },
  {
    key: "PHL",
    city: "フィラデルフィア",
    stadium: "リンカーン・フィナンシャル・フィールド",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約69,000",
    rounds: ["グループ", "ラウンド32", "ラウンド16"],
    note: "独立宣言の街。熱狂的なスポーツファンで知られる。",
  },
  {
    key: "SF",
    city: "サンフランシスコ・ベイエリア（サンタクララ）",
    stadium: "リーバイス・スタジアム",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約68,500",
    rounds: ["グループ", "ラウンド32", "ラウンド16"],
    note: "シリコンバレーの最新鋭。テック都市らしいスマートな観戦体験。",
  },
  {
    key: "SEA",
    city: "シアトル",
    stadium: "ルーメン・フィールド",
    country: "🇺🇸",
    countryName: "アメリカ",
    capacity: "約69,000",
    rounds: ["グループ", "ラウンド32", "ラウンド16"],
    note: "全米最大級の応援文化。サウンダーズのサポーターで知られる音の壁。",
  },
];

export function getVenue(key: string): Venue | undefined {
  return venues.find((v) => v.key === key);
}
