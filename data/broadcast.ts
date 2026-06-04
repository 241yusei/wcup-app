// 2026 W杯の日本国内 視聴ガイド（放送・配信）。
// FIFA公式メディア権リスト＋各局合同発表（2026/5/14）＋DAZN公式で裏取り済み。
// ※重要：2026大会はABEMAに配信権なし（DAZNが取得）。2022カタール大会と混同しないこと。

export interface BroadcastItem {
  name: string;
  note: string;
  free: boolean; // 完全無料で見られるか
  source: string;
}

export const broadcastAsOf = "2026年6月時点（公式番組表での最終確認を推奨）";

export const tvBroadcast: BroadcastItem[] = [
  {
    name: "NHK 総合（地上波）",
    note: "開幕戦・決勝を含む地上波約34試合。日本戦はオランダ戦(6/15)・スウェーデン戦(6/26)を生中継。受信料制。",
    free: false,
    source: "https://web.gekisaka.jp/news/worldcup/detail/?451330-451330-fl=",
  },
  {
    name: "NHK BS 4K",
    note: "全104試合を放送（生中継または録画）。日本戦のチュニジア戦(6/21)はBSで生中継。受信料制。",
    free: false,
    source: "https://web.gekisaka.jp/news/worldcup/detail/?451330-451330-fl=",
  },
  {
    name: "日本テレビ（地上波）",
    note: "15試合（グループ9＋決勝T6）。日本戦のチュニジア戦(6/21)を地上波で生中継。無料。",
    free: true,
    source: "https://web.gekisaka.jp/news/worldcup/detail/?451330-451330-fl=",
  },
  {
    name: "フジテレビ（地上波）",
    note: "10試合（グループ5＋決勝T5）。日本が進出した場合のラウンド32などを担当。無料。",
    free: true,
    source: "https://web.gekisaka.jp/news/worldcup/detail/?451330-451330-fl=",
  },
];

export const streamingBroadcast: BroadcastItem[] = [
  {
    name: "DAZN（ダゾーン）",
    note: "日本で唯一の全104試合ライブ配信。日本代表戦は全試合“無料”（アカウント登録不要）。それ以外の試合をネットで見るには有料プランが必要。",
    free: true, // 日本戦は無料
    source:
      "https://www.dazn.com/ja-JP/news/%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC/fifa-world-cup-2026-broadcast/18nnx6yey1t1l1u6hsii1xgyil",
  },
  {
    name: "NHK ONE（旧NHKプラス）",
    note: "NHK地上波の試合＋ハイライトを同時・見逃し配信。NHK受信契約者向け。",
    free: false,
    source: "https://web.gekisaka.jp/news/worldcup/detail/?451330-451330-fl=",
  },
];

// 2022年との最大の違い（よくある誤解）
export const abemaNote =
  "【注意】2026大会はABEMAに配信権がありません。2022カタール大会でABEMAが全64試合を無料配信した記憶は今回は通用しません。ネットの全試合配信はDAZN一択です（検索で出る「ABEMA TIMES」はニュース記事で、試合配信ではありません）。";

// 日本代表3戦の放送先
export interface JpBroadcast {
  setsu: string;
  opp: string;
  jst: string;
  tv: string;
  free: string;
}
export const japanBroadcast: JpBroadcast[] = [
  { setsu: "第1戦", opp: "オランダ", jst: "6/15(月) 05:00", tv: "NHK総合・BS4K", free: "地上波＋DAZN無料" },
  { setsu: "第2戦", opp: "チュニジア", jst: "6/21(日) 13:00頃", tv: "日本テレビ・NHK BS", free: "地上波（日テレ）＋DAZN無料" },
  { setsu: "第3戦", opp: "スウェーデン", jst: "6/26(金) 08:00", tv: "NHK総合・BS4K", free: "地上波＋DAZN無料" },
];

// DAZN料金（日本戦以外をネットで見たい人向け）
export const daznPricing = [
  "通常：月額 4,200円",
  "キャンペーン：最初の3カ月 月額 1,980円（2026/5/29〜7/20）",
  "DAZN SOCCER（サッカー特化）：月額 2,600円",
];

export const watchCaveats = [
  "NHK地上波の試合数は報道により33／34と表記ゆれがあります（開幕戦・決勝を含む点は一致）。",
  "決勝・準決勝の具体的な担当局や時間は、公式番組表での最終確認を推奨します。",
  "TVer等での民放（日テレ・フジ）見逃し配信の可否は、試合により異なるため要確認です。",
  "日本戦以外のDAZN無料/有料区分は変更の可能性があるため、視聴前に公式を確認してください。",
];
