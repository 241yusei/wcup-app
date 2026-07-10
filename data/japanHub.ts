// 「日本戦を100倍楽しむ」特集ハブのコンテンツ。
// 対戦3カ国の攻略ガイドと、日本代表の現在地・突破条件をまとめる。
// すべて一次情報でファクトチェック済み。

export interface OpponentGuide {
  code: string; // NED / TUN / SWE
  style: string; // スタイルを一言（例：超攻撃型）
  styleDesc: string;
  dangerMen: { name: string; pos: string; club: string; why: string }[];
  weakness: string[]; // 日本が突くべき弱点
  matchup: string; // 日本から見た相性・難易度
  sources?: string[];
}

export interface JapanInfo {
  format: string; // グループF突破条件の説明
  scenario: string; // 現実的なシナリオ
  fifaRank?: number;
  form: string;
  strength: string;
  asOf: string;
  watchTips: string[];
  knockoutOutlook?: string; // 突破後のトーナメント展望
  sources?: string[];
}

// 日本代表のチームスタッツ（独立2エージェントの二重ファクトチェックで一致した値のみ採用）。
export interface JapanStat {
  label: string;
  value: string;
  sub?: string; // 補足（達成年・選手名など）
}
export const japanStats: JapanStat[] = [
  { label: "W杯出場", value: "通算8回目", sub: "1998年から8大会連続" },
  { label: "W杯最高成績", value: "ベスト16", sub: "2002・10・18・22年（突破歴なし）" },
  { label: "W杯通算成績", value: "7勝6分12敗", sub: "得点25・失点33（本大会全25試合）" },
  { label: "FIFAランク", value: "18位", sub: "2026年4月時点・アジア最上位" },
  { label: "2026予選成績", value: "7勝2分1敗", sub: "最終予選30得点3失点・グループ1位" },
  { label: "歴代最多出場", value: "152試合", sub: "遠藤保仁" },
  { label: "歴代最多得点", value: "75点", sub: "釜本邦茂（FIFA公認記録）" },
  { label: "直近の躍進", value: "ブラジルに3-2", sub: "2025年10月・史上初勝利（0-2から逆転）" },
];
// 二重チェックで補足が必要な項目（正直に明示）。
export const japanStatsCaveats: string[] = [
  "W杯通算成績は実際に開催された過去7大会分（2026は8大会連続出場）。",
  "FIFAランクは2026年6月の更新で変動の可能性があります。",
];

// 対戦3カ国の攻略ガイド（リサーチ反映・所属クラブも個別裏取り済み）。
export const opponentGuides: OpponentGuide[] = [
  {
    code: "NED",
    style: "超攻撃型・ポゼッション支配",
    styleDesc:
      "コーマン体制の4-2-3-1。デ・ヨング軸の中盤でボールを支配し、ファン・ダイクが最終ラインを統率する総合力No.1の強豪。",
    dangerMen: [
      {
        name: "コディ・ハクポ",
        pos: "FW",
        club: "リバプール",
        why: "左サイドから決定機を作る主力。得点力とスピードが日本の脅威。",
      },
      {
        name: "フィルジル・ファン・ダイク",
        pos: "DF",
        club: "リバプール",
        why: "世界最高峰のCB。空中戦と対人で日本前線を封じる守備の核。",
      },
    ],
    weakness: [
      "1トップが不安定。最有力のデパイは怪我明けで本調子が不透明で、点取り屋の人選に迷いがある。",
      "主力と控えの実力差が大きく、先発が崩れた時の安定感に欠ける。",
    ],
    matchup:
      "日本から見て格上。ただし組織的プレスとカウンターがハマれば一発の勝機はある。",
    sources: [
      "https://www.rotowire.com/soccer/article/2026-world-cup-group-f-preview-netherlands-japan-sweden-and-tunisia-lineups-odds-predictions-and-tactics-112643",
    ],
  },
  {
    code: "TUN",
    style: "堅守速攻・カウンター型",
    styleDesc:
      "ラムーシ体制で4-2-3-1/4-3-3。コンパクトな守備ブロックを敷き、奪ってから速く出る現実的なスタイル。",
    dangerMen: [
      {
        name: "ハンニバル・メイブリ",
        pos: "MF",
        club: "マンチェスター・ユナイテッド",
        why: "技術と推進力に優れた創造的MF。ドリブルで局面を打開できる。",
      },
      {
        name: "エリエス・スキリ",
        pos: "MF",
        club: "アイントラハト・フランクフルト",
        why: "守備の整理役で主将。強烈なミドルも持つ中盤の司令塔。",
      },
    ],
    weakness: [
      "セットプレー以外の攻撃が単調で、流れからの得点力が乏しい。先制すれば手詰まりに陥らせやすい。",
      "組織された欧州型の質の高い相手に苦戦する傾向。日本が保持して主導権を握れば崩せる。",
    ],
    matchup:
      "日本から見て勝機あり（互角〜やや有利）。3戦で最も勝点を計算したい相手。",
    sources: [
      "https://www.olympics.com/en/news/fifa-world-cup-2026-tunisia-players-full-squad-list-key-stats-schedule",
    ],
  },
  {
    code: "SWE",
    style: "直線的アタック・二枚看板依存型",
    styleDesc:
      "ポッター体制の3-4-2-1。攻撃的WBで縦に速く、イサク＆ヨケレスの強力2トップに託す。破壊力はあるが守備に脆さ。",
    dangerMen: [
      {
        name: "ヴィクトル・ヨケレス",
        pos: "FW",
        club: "アーセナル",
        why: "本大会屈指のCF。スピードと広い射程の決定力で一瞬で沈める。",
      },
      {
        name: "アレクサンデル・イサク",
        pos: "FW",
        club: "リバプール",
        why: "技術が滑らかな万能型。ヨケレスと連携し中央から仕留める。",
      },
    ],
    weakness: [
      "守備が脆い（予選で12失点）。サイドで揺さぶれば最終ラインの綻びを突ける。",
      "ヨケレス依存が過度で、彼を消せば攻撃が機能不全に陥りやすい。徹底マークが有効。",
    ],
    matchup:
      "日本から見て互角。2トップを抑えきれるか次第で勝点を分け合う一戦になりやすい。",
    sources: [
      "https://www.olympics.com/en/news/fifa-world-cup-2026-sweden-great-escape-graham-potter-all-players-full-squad-list-key-stats-schedule",
    ],
  },
];

export function getOpponentGuide(code: string): OpponentGuide | undefined {
  return opponentGuides.find((g) => g.code === code);
}

// 日本代表の現在地・突破条件（リサーチ反映・一次情報で裏取り済み）。
export const japanInfo: JapanInfo = {
  format:
    "各組の上位2チーム（計24）が自動でラウンド32（最初のノックアウト）へ。さらに12組の3位のうち成績上位8チームも勝ち上がれる新フォーマットのため、3位でも突破のチャンスがある（3位の順位は勝ち点→得失点差→総得点の順で比較）。",
  scenario:
    "優勝候補オランダが本命。日本は相性の良いチュニジアに勝ち、スウェーデンと勝点を分け合い、オランダ戦の出来次第で2位を狙うのが王道。仮に2位を逃しても、3位枠での突破を十分に狙える位置にいる。",
  fifaRank: 18,
  form:
    "2026年3月、ウェンブリーでイングランドに1-0で勝利（アジア勢がイングランドを破った史上初の試合）。同ウィンドウでスコットランドにも勝利。5月31日にはアイスランドに1-0で快勝し、遠藤航が約3カ月半ぶり、冨安健洋が約2年ぶりに代表復帰した。事前合宿は暑熱対策でメキシコ・モンテレイ、拠点は米ナッシュビル。",
  strength:
    "森保監督の基本布陣は3-4-2-1（ボール保持時は3-2-4-1化し、7人を相手陣に押し込む超攻撃的な狙い）。必要な場面ではローブロックを敷く現実路線も併せ持つ。主力の三笘薫を負傷で欠くなか、久保建英を攻撃の軸に据える。予選は16試合で54得点・3失点と圧倒した。",
  asOf: "2026年7月9日時点・FIFAランクは4月発表時点",
  knockoutOutlook:
    "グループF2位で史上初のラウンド32進出を果たした日本は、6/29（現地）ヒューストン・NRGスタジアムでブラジルと対戦。29分に佐野海舟が先制し前半をリードで折り返す大健闘を見せたが、後半56分にカゼミロに追いつかれ、アディショナルタイム90+5分に途中出場のマルティネッリに決勝点を許し2-1で逆転負け。ラウンド32での敗退となった。森保一監督は「監督としての力不足で申し訳ない」と涙を見せつつ「世界一を目指す気持ちを持ち続ければ必ずそこに辿り着ける」と前を向き、冨安健洋は「世界のトップと対等に戦うにはまだ足りないものがある」と課題を口にした。日本を破ったブラジルもラウンド16でノルウェーに敗れ大会を去っている。",
  watchTips: [
    "初戦オランダ戦（6/15・日本時間 朝5:00／アーリントン）が最大のヤマ。優勝候補級の相手に序盤で勝点を取れれば、組1位突破が一気に現実味を帯びる注目の一戦。",
    "3バックの『両ウイングバック』に注目。本来は守備の選手が攻め上がり、攻撃時は前線に7人が並ぶ超攻撃的サッカー。攻守の切り替えの速さがこのチームの面白さ。",
    "攻撃の鍵は久保建英のドリブルと崩し。前田大然のスピードが噛み合えば、強豪相手でも一発のチャンスが生まれる。ここを見れば日本の調子がわかる。",
  ],
  sources: [
    "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/groups-how-teams-qualify-tie-breakers",
    "https://www.aljazeera.com/sports/2026/5/22/japans-world-cup-2026-team-preview-players-to-watch-group-squad",
  ],
};
