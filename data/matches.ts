import { Match } from "@/lib/types";

// football-data.org のAPIキー未設定時に使うフォールバック日程。
// 2026本大会の実際の組み合わせ抽選（2025/12/5）に基づく対戦カード。
// 日時・会場は運用時に公式の確定情報へ差し替えること。utcDateはUTC。
export const fallbackMatches: Match[] = [
  // 開幕戦（メキシコ・アステカ）
  {
    id: "m-open",
    utcDate: "2026-06-11T19:00:00Z",
    stage: "グループステージ第1節",
    group: "A",
    homeCode: "MEX",
    awayCode: "RSA",
    venue: "メキシコシティ（開幕戦）",
    status: "SCHEDULED",
  },
  // グループC マルキーカード
  {
    id: "m-c1",
    utcDate: "2026-06-14T22:00:00Z",
    stage: "グループステージ第1節",
    group: "C",
    homeCode: "BRA",
    awayCode: "MAR",
    venue: "ロサンゼルス",
    status: "SCHEDULED",
  },
  // グループL マルキーカード（2018準決勝の再戦）
  {
    id: "m-l1",
    utcDate: "2026-06-15T19:00:00Z",
    stage: "グループステージ第1節",
    group: "L",
    homeCode: "ENG",
    awayCode: "CRO",
    venue: "ボストン",
    status: "SCHEDULED",
  },

  // グループF（日本）第1節
  {
    id: "m-f1a",
    utcDate: "2026-06-13T18:00:00Z",
    stage: "グループステージ第1節",
    group: "F",
    homeCode: "NED",
    awayCode: "JPN",
    venue: "シアトル",
    status: "SCHEDULED",
  },
  {
    id: "m-f1b",
    utcDate: "2026-06-13T21:00:00Z",
    stage: "グループステージ第1節",
    group: "F",
    homeCode: "SWE",
    awayCode: "TUN",
    venue: "サンフランシスコ",
    status: "SCHEDULED",
  },
  // グループF 第2節
  {
    id: "m-f2a",
    utcDate: "2026-06-19T18:00:00Z",
    stage: "グループステージ第2節",
    group: "F",
    homeCode: "JPN",
    awayCode: "TUN",
    venue: "ロサンゼルス",
    status: "SCHEDULED",
  },
  {
    id: "m-f2b",
    utcDate: "2026-06-19T21:00:00Z",
    stage: "グループステージ第2節",
    group: "F",
    homeCode: "NED",
    awayCode: "SWE",
    venue: "バンクーバー",
    status: "SCHEDULED",
  },
  // グループF 第3節（同時刻キックオフ）
  {
    id: "m-f3a",
    utcDate: "2026-06-24T19:00:00Z",
    stage: "グループステージ第3節",
    group: "F",
    homeCode: "JPN",
    awayCode: "SWE",
    venue: "サンフランシスコ",
    status: "SCHEDULED",
  },
  {
    id: "m-f3b",
    utcDate: "2026-06-24T19:00:00Z",
    stage: "グループステージ第3節",
    group: "F",
    homeCode: "TUN",
    awayCode: "NED",
    venue: "シアトル",
    status: "SCHEDULED",
  },

  // 決勝トーナメント（対戦は組み合わせ確定後に差し替え）
  {
    id: "m-r32",
    utcDate: "2026-06-29T23:00:00Z",
    stage: "ラウンド32",
    homeCode: "BRA",
    awayCode: "ENG",
    venue: "マイアミ（対戦は仮）",
    status: "SCHEDULED",
  },
  {
    id: "m-final",
    utcDate: "2026-07-19T19:00:00Z",
    stage: "決勝",
    homeCode: "ARG",
    awayCode: "FRA",
    venue: "ニュージャージー（決勝）",
    status: "SCHEDULED",
  },
];
