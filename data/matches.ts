import { Match } from "@/lib/types";

// football-data.org のAPIキー未設定時に使うフォールバック日程。
// 2026本大会の実際の組み合わせ抽選（2025/12/5）と公式日程に基づく確定情報。
// utcDateはUTC。表示は lib/datetime.ts で日本時間(JST=UTC+9)に変換。
// 日程・会場・キックオフ時刻は複数の一次・準一次ソースでファクトチェック済み。
export const fallbackMatches: Match[] = [
  // 開幕戦（メキシコシティ・アステカ）現地6/11 13:00 CT → JST 6/12 04:00
  {
    id: "m-open",
    utcDate: "2026-06-11T19:00:00Z",
    stage: "グループステージ第1節",
    group: "A",
    homeCode: "MEX",
    awayCode: "RSA",
    venue: "メキシコシティ（開幕戦）",
    city: "メキシコシティ",
    stadium: "エスタディオ・アステカ",
    status: "SCHEDULED",
  },
  // グループC マルキーカード 現地6/13 18:00 ET → JST 6/14 07:00
  {
    id: "m-c1",
    utcDate: "2026-06-13T22:00:00Z",
    stage: "グループステージ第1節",
    group: "C",
    homeCode: "BRA",
    awayCode: "MAR",
    venue: "ニュージャージー",
    city: "ニュージャージー",
    stadium: "メットライフ・スタジアム",
    status: "SCHEDULED",
  },
  // グループL マルキーカード（2018準決勝の再戦）現地6/17 16:00 ET → JST 6/18 05:00
  {
    id: "m-l1",
    utcDate: "2026-06-17T20:00:00Z",
    stage: "グループステージ第1節",
    group: "L",
    homeCode: "ENG",
    awayCode: "CRO",
    venue: "アーリントン（ダラス）",
    city: "アーリントン（ダラス都市圏）",
    stadium: "AT&Tスタジアム",
    status: "SCHEDULED",
  },

  // グループF（日本）第1節 日本×オランダ 現地6/14 15:00 CDT → JST 6/15 05:00
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
    status: "SCHEDULED",
  },
  // 第1節 スウェーデン×チュニジア 現地6/14 20:00 CST → JST 6/15 11:00
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
    status: "SCHEDULED",
  },
  // グループF 第2節 日本×チュニジア 現地6/20 22:00 CST → JST 6/21 13:00
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
    status: "SCHEDULED",
  },
  // 第2節 オランダ×スウェーデン 現地6/20 12:00 CDT → JST 6/21 02:00
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
    status: "SCHEDULED",
  },
  // グループF 第3節 日本×スウェーデン 現地6/25 18:00 CDT → JST 6/26 08:00
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
    status: "SCHEDULED",
  },
  // 第3節 チュニジア×オランダ 現地6/25 18:00 CDT → JST 6/26 08:00
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
    status: "SCHEDULED",
  },

  // 決勝トーナメント・ラウンド32（最初のノックアウト）6/28開始。対戦カードは確定後に差し替え
  {
    id: "m-r32",
    utcDate: "2026-06-28T23:00:00Z",
    stage: "ラウンド32",
    homeCode: "BRA",
    awayCode: "ENG",
    venue: "対戦カードは確定後に更新",
    status: "SCHEDULED",
  },
  // 決勝 現地7/19 15:00 ET → JST 7/20 04:00。対戦カードは確定後に差し替え
  {
    id: "m-final",
    utcDate: "2026-07-19T19:00:00Z",
    stage: "決勝",
    homeCode: "ARG",
    awayCode: "FRA",
    venue: "ニュージャージー（決勝）",
    city: "ニュージャージー",
    stadium: "メットライフ・スタジアム",
    status: "SCHEDULED",
  },
];
