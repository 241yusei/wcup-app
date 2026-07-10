// 得点ランキング（ゴールデンブーツ・レース）。
// ※実際の得点を手動集計したフォールバック表示。公式の最新スタッツは
//   DAZN／FIFA公式で確認のこと。実APIが繋がれば現在順位が自動で埋まる設計。

export interface ScorerNote {
  asOf: string;
  caveat: string;
}

export const scorerMeta: ScorerNote = {
  asOf: "2026年7月9日時点（準々決勝第1試合終了まで反映）",
  caveat:
    "実際の得点を手動集計したゴールデンブーツ・レースの暫定ランキングです（2得点以上の選手を掲載）。一部選手は情報源により得点数が食い違うため、備考に注記しています。本命ウォッチリストは大会前評価にもとづく編集部の見立てです。",
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
    goals: 8,
    note: "グループ初戦でハットトリック。ラウンド16のエジプト戦は0-2を追う展開から同点弾＋アシストで大逆転に貢献し通算8得点で得点ランキング首位に並ぶ。",
  },
  {
    player: "キリアン・ムバッペ",
    teamCode: "FRA",
    goals: 8,
    note: "ラウンド32のスウェーデン戦で2発、ラウンド16のパラグアイ戦でPKを決め、準々決勝モロッコ戦でも得点。メッシと並ぶ通算8得点でアシスト数の差でトップの声も。",
  },
  {
    player: "アーリング・ハーランド",
    teamCode: "NOR",
    goals: 7,
    note: "グループ突破後もラウンド16のブラジル戦で終盤に2発（79'・90'）を叩き込みブラジルを撃破。通算7得点で単独3位。",
  },
  {
    player: "ハリー・ケイン",
    teamCode: "ENG",
    goals: 6,
    note: "ラウンド32のDRコンゴ戦で2発、ラウンド16のメキシコ戦でもゴール＋アシストと勝ち上がりのキーマン。通算6得点。",
  },
  {
    player: "ウスマン・デンベレ",
    teamCode: "FRA",
    goals: 4,
    note: "グループステージでハットトリックを記録。フランスの2列目からの得点源。",
  },
  {
    player: "マルコ・オヤルサバル",
    teamCode: "ESP",
    goals: 4,
    note: "ラウンド32のオーストリア戦で2発。ラウンド16のポルトガル戦を含む5試合で計4得点。",
  },
  {
    player: "ヴィニシウス・ジュニオール",
    teamCode: "BRA",
    goals: 4,
    note: "5試合で4得点も、ブラジルはラウンド16でノルウェーに1-2で敗れ大会を去った。",
  },
  {
    player: "イスマイラ・サール",
    teamCode: "SEN",
    goals: 4,
    note: "出場4試合で4得点。セネガルはラウンド32でベルギーに延長の末に敗退。",
  },
  {
    player: "フリアン・キニョネス",
    teamCode: "MEX",
    goals: 4,
    note: "5試合で4得点、メキシコ史上タイ記録に並ぶ活躍もラウンド16でイングランドに逆転負け。",
  },
  {
    player: "ロメル・ルカク",
    teamCode: "BEL",
    goals: 4,
    note: "情報源により2〜4得点と幅あり（要確認）。ラウンド16のアメリカ戦4-1の大勝に貢献。",
  },
  {
    player: "ジュード・ベリンガム",
    teamCode: "ENG",
    goals: 4,
    note: "情報源により2〜4得点と幅あり（要確認）。ラウンド16のメキシコ戦で98秒間に2発の速攻ブレイスを記録し通算4点との報道。",
  },
  {
    player: "デニス・ウンダフ",
    teamCode: "GER",
    goals: 3,
    note: "ラウンド32のコートジボワール戦で途中出場から2発。ドイツはパラグアイにPK戦で敗れ大会を去った。",
  },
  {
    player: "カイ・ハフェルツ",
    teamCode: "GER",
    goals: 3,
    note: "グループステージから決勝Tにかけて計3得点。",
  },
  {
    player: "コディ・ハクポ",
    teamCode: "NED",
    goals: 3,
    note: "グループステージでブレイスを含む活躍も、オランダはラウンド32でモロッコにPK戦で敗退。",
  },
  {
    player: "ブライアン・ブロビー",
    teamCode: "NED",
    goals: 3,
    note: "スウェーデン戦・チュニジア戦で得点。オランダはラウンド32で敗退。",
  },
  {
    player: "フォラリン・バログン",
    teamCode: "USA",
    goals: 3,
    note: "開幕戦のパラグアイ戦で2発。アメリカはラウンド16でベルギーに1-4で大敗し敗退。",
  },
  {
    player: "マテウス・クーニャ",
    teamCode: "BRA",
    goals: 3,
    note: "ラウンド16までで計3得点も、ブラジルはノルウェーに敗れ大会を去った。",
  },
  {
    player: "ジョナサン・デイビッド",
    teamCode: "CAN",
    goals: 3,
    note: "グループステージでハットトリックも、カナダはラウンド16でモロッコに0-3で完敗。",
  },
  {
    player: "クリスティアーノ・ロナウド",
    teamCode: "POR",
    goals: 3,
    note: "ラウンド32のクロアチア戦でPKを決めるも、ポルトガルはラウンド16でスペインに0-1で敗退。本大会がロナウド最後のW杯になるとの見方が大勢。",
  },
  {
    player: "イスマエル・サイバリ",
    teamCode: "MAR",
    goals: 3,
    note: "モロッコの勝ち上がりに貢献した3得点。準々決勝は負傷で欠場との報道。",
  },
  {
    player: "ヨアネ・ウィサ",
    teamCode: "COD",
    goals: 3,
    note: "グループ・決勝Tを通じて計3得点。",
  },
  {
    player: "イライジャ・ジャスト",
    teamCode: "NZL",
    goals: 3,
    note: "グループステージ・決勝T進出争いで計3得点。",
  },
  {
    player: "レアンドロ・トロッサール",
    teamCode: "BEL",
    goals: 3,
    note: "情報源により2〜4得点と幅あり（要確認）。ラウンド16のアメリカ戦4-1に絡む活躍。",
  },
  {
    player: "ヨハン・マンザンビ",
    teamCode: "SUI",
    goals: 3,
    note: "情報源により3〜4得点と幅あり（要確認）。スイスはラウンド16をPK戦で突破。",
  },
  {
    player: "ルーベン・バルガス",
    teamCode: "SUI",
    goals: 3,
    note: "信頼度がやや低い情報（単独ソース）。ラウンド16のコロンビア戦でPK戦の決勝キックを決めた（この得点はゴールデンブーツ集計対象外）。",
  },
  {
    player: "ネイマール",
    teamCode: "BRA",
    goals: 2,
    note: "ラウンド16のノルウェー戦でアディショナルタイムにPKを決めるも1-2で敗退。試合後に代表引退を表明し、ブラジル代表歴代最多得点（通算80点）でキャリアを終えた。",
  },
  {
    player: "鎌田 大地",
    teamCode: "JPN",
    goals: 2,
    note: "オランダ戦の同点弾＋チュニジア戦の先制弾。日本はラウンド32でブラジルに敗退。",
  },
  {
    player: "上田 綺世",
    teamCode: "JPN",
    goals: 2,
    note: "チュニジア戦で2得点（4-0の快勝）。日本はラウンド32でブラジルに敗退。",
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
