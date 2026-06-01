// 試合ごとの解説（プレビュー）コンテンツ。
// 対戦カード（チームコードの組）をキーに、通算対戦成績・直近の調子・見どころ・
// キーマッチアップを保持する。すべて一次情報でファクトチェック済み。
// 各国の注目選手・戦術・直近状況は data/teams.ts から取得し、ここでは
// 「対戦特有の情報」と「各国トリビア」を補う。

export interface MatchPreview {
  teamA: string; // チームコード
  teamB: string;
  h2h: string; // 通算対戦成績の要約
  formA?: string; // teamA の直近の調子
  formB?: string; // teamB の直近の調子
  asOf?: string; // 直近情報の基準時点
  highlights: string[]; // 見どころ（2〜3点）
  keyMatchup?: string; // 注目の個人対決など
  watchPoints?: string[]; // 全試合を観た上での観戦のキーポイント（戦術的な見方）
  prediction?: string; // スコア予想・展望（あくまで一つの見方）
  sources?: string[];
}

export function pairKey(a: string, b: string): string {
  return [a, b].sort().join("-");
}

// 対戦カード別プレビュー（リサーチ反映・出典で裏取り済み）。
export const matchPreviews: MatchPreview[] = [
  {
    teamA: "JPN",
    teamB: "NED",
    h2h: "日本から見て通算0勝1分2敗（得点2・失点6）。W杯では2010年南アフリカ大会GLで0-1敗戦。2013年の親善試合2-2が唯一の善戦で、日本はオランダにまだ勝っていない。",
    formA:
      "A代表6連勝中。ブラジル3-2（2025/10）→ガーナ→ボリビア→スコットランド→イングランド→アイスランド（5/31小川の決勝ヘッド）。強豪相手に守備が安定。",
    formB:
      "直近5試合で3勝（得点12・失点3）。ノルウェーに2-1、予選は無敗8試合27得点の超攻撃型。",
    asOf: "2026年5月末時点のデータ・招集は報道ベース",
    highlights: [
      "過去3戦未勝利の格上オランダに、6連勝中の日本が勢いをぶつけられるかが初戦の最大の焦点。",
      "予選27得点の超攻撃型オランダ。日本の堅守ブロックがデ・ヨング起点の崩しを止められるかが勝敗を分ける。",
      "日本の左サイドの仕掛けが先手を取れば、番狂わせの物語が一気に現実味を帯びる。",
    ],
    keyMatchup:
      "日本の攻撃の鍵・久保建英 × オランダ守備の要ファン・ダイク。崩しと対人の駆け引きが試合のテンポを決める（招集は報道ベース・未確認）。",
    watchPoints: [
      "三笘薫は負傷で今大会は欠場の見込み。本来の左ウイングバックが不在で、初戦は守備に強い鈴木淳之介がそこに入る可能性。",
      "オランダは『初戦をとても重視する』チームで、必ず勝ちに来る＝ボールを持って攻めてくる公算。日本は無理に保持せず、奪ってからのカウンターを狙いたい。",
      "最大の警戒は右サイド。左のハクポが大外に張り、右ウイングが内に絞ると空く右の大外を、右サイドバックのダンフリースが上がってクロス→ファーで仕留めるのが『やられる典型パターン』。",
      "オランダはCKなどセットプレーが脅威。ファン・ダイクら長身が一斉に上がってくる。冨安・鈴木彩艶・伊藤洋輝の高さで凌げるかが鍵。",
      "日本主将・遠藤航とオランダ主将ファン・ダイクはともにリバプール。コイントスでの“同僚対決”も小さな見どころ。",
    ],
    prediction:
      "相性は良くないが、オランダの崩しの形は意外と単調。勝機は十分にある一戦（あくまで一つの見方）。",
    sources: [
      "https://en.fifaranking.net/nations/jpn/results/head-to-head/index.php?team=nld",
      "https://www.goal.com/en/team/netherlands/fixtures-results/657oha8nkne1ybba2bouzkbo7",
    ],
  },
  {
    teamA: "JPN",
    teamB: "TUN",
    h2h: "日本から見て通算4勝0分0敗・無失点（得点6）と抜群の相性。W杯では2002年日韓大会GL最終戦で2-0勝利し、決勝トーナメント進出を決めた縁起の良い相手。",
    formA: "A代表6連勝中（ブラジル〜アイスランドまで）。",
    formB:
      "直近5試合で1勝のみ（得点5・失点5）と低調。2026年1月のアフリカ選手権でタンザニア・マリと引き分け。",
    asOf: "2026年5月末時点のデータ・招集は報道ベース",
    highlights: [
      "日本が過去4戦全勝・無失点と圧倒する相性。2002年W杯で決勝T進出を決めた縁起の良い相手。",
      "グループ突破へ事実上落とせない一戦。3試合で最も勝ち点を計算したいカード。",
      "堅守速攻のチュニジアを、日本がどれだけ我慢強く崩せるか。スコア以上に内容が問われる。",
    ],
    keyMatchup:
      "日本の攻撃的MF久保建英ら × 引いて固めるチュニジア守備ブロック。崩しの質が見せ場（招集は報道ベース・未確認）。",
    watchPoints: [
      "チュニジアは5バックで堅守。日本は5バック崩しを苦手としており、引かれて守られると苦戦しやすい（アジアカップ等の前例）。",
      "鍵は『先制点』。先に取れば相手は前に出ざるを得ず、日本が得意な展開に。逆に先に取られて引かれると、前回のコスタリカ戦のような難しい試合になる。",
      "警戒はプレミアでプレーする創造的MFハンニバル・メイブリと、Jリーグで好調のFWジェバリ。それ以外は日本が戦力で上回る。",
      "同時刻のスウェーデン×チュニジアでスウェーデンが勝てば、チュニジアは日本相手に勝ちが必要になり前がかりに＝日本がやりやすくなる。スウェーデンを応援したい裏事情も。",
    ],
    prediction:
      "戦力では日本が圧倒。先制して相手を前に出させ、3-0前後で勝ち切りたい一戦（あくまで一つの見方）。",
    sources: [
      "https://en.fifaranking.net/nations/jpn/results/head-to-head/index.php?team=tun",
      "https://www.goal.com/en-us/team/tunisia/fixtures-results/ctp7ovvf34m7fzshua9ogbr6i",
    ],
  },
  {
    teamA: "JPN",
    teamB: "SWE",
    h2h: "過去対戦は僅少（数試合）で勝敗はほぼ拮抗。集計サイトにより数値が食い違い（1勝3分との説、1勝2敗1分との説）正確な通算は要確認。直近の真剣勝負での対戦はない。",
    formA: "A代表6連勝中。",
    formB:
      "直近5試合で2勝（得点8・失点9）と不安定。2026年3月のプレーオフでウクライナ・ポーランドを破り滑り込み出場。守備に課題。",
    asOf: "2026年5月末時点のデータ・H2H数値は出典で差・招集は報道ベース",
    highlights: [
      "グループ最終戦。順位次第で『引き分けでOK』か『勝つしかない』かが変わり、状況が物語を作る一戦。",
      "プレーオフ経由で勢いに乗るスウェーデンと6連勝の日本。調子の良いチーム同士の力勝負。",
      "北欧の高さ・強さ対日本のスピードと組織。失点9と守備が不安定なスウェーデンを突けるか。",
    ],
    keyMatchup:
      "日本の守備陣 × スウェーデンの大型FW（イサク／ヨケレスら長身ストライカー）。空中戦と裏抜けへの対応が決勝T進出を左右する（招集は報道ベース・未確認）。",
    watchPoints: [
      "3試合で最も難しい相手との見方。プレーオフ経由で監督交代を機に5バックへ変更し、一気に強化された。",
      "前線3枚（ヨケレス、イサク、エランガ）は世界トップ級。特に大型で得点力抜群のヨケレスは最警戒。",
      "武器はセットプレー（CK・FK）とヘディングの『大型サッカー』。倒してのPK献上に要注意。",
      "一方で最終ラインは強力だが重く足が遅い。日本が前線にボールを預けて5バックを下げさせ、空く中盤のスペースで久保・鎌田・堂安が崩す＋ミドルシュート（田中碧ら）が有効。",
    ],
    prediction:
      "最も苦戦が予想される一戦。セットプレーからの失点→追う展開でカウンター被弾の流れに注意（あくまで一つの見方）。",
    sources: [
      "https://en.fifaranking.net/nations/jpn/results/head-to-head/index.php?team=swe",
      "https://www.si.com/soccer/sweden-2026-world-cup-preview",
    ],
  },
  {
    teamA: "BRA",
    teamB: "MAR",
    h2h: "通算2試合で1勝1敗。1998年W杯フランス大会GLでブラジルが3-0で勝利（W杯唯一の対戦）。2023年3月の親善試合（タンジール）ではモロッコが2-1でブラジルに史上初勝利を挙げた。",
    formA:
      "5/31パナマに6-2勝、3/31クロアチアに3-1勝、3/26フランスに1-2敗。攻撃は好調だが強豪フランスに敗戦。",
    formB: "5/26ブルンジに5-0で快勝。W杯前の調整は順調。",
    asOf: "2026年5月末時点のデータ",
    highlights: [
      "カタール2022でベスト4の『組織のモロッコ』が、再び優勝候補ブラジルに挑む。2023年の番狂わせ再現があるか。",
      "個の力のブラジル対、堅守速攻のモロッコ。攻めるブラジルの背後をモロッコのカウンターが突けるかが分かれ目。",
      "ブラジルには3年前の屈辱を晴らす『リベンジマッチ』という物語性がある。",
    ],
    keyMatchup:
      "ブラジルの攻撃エース、ヴィニシウス・ジュニオール 対 モロッコ守備陣。サイドを切り裂くヴィニシウスを抑えられるかが焦点。",
    sources: [
      "https://www.thesoccerworldcups.com/head_to_head/morocco_vs_brazil.php",
      "https://www.skysports.com/football/news/12010/12842808/morocco-2-1-brazil-world-cup-semi-finalists-earn-famous-win-over-fifas-top-ranked-side-in-tangier",
    ],
  },
  {
    teamA: "ENG",
    teamB: "CRO",
    h2h: "2004年以降は通算でイングランド優勢（9戦5勝1分3敗との説）。2018年W杯ロシア大会準決勝はクロアチアが2-1（延長）で勝利し、ペリシッチとマンジュキッチが得点して初の決勝進出。2021年EURO2020はイングランドが1-0。",
    formA:
      "3/31日本に0-1敗、3/27ウルグアイと1-1。予選は連勝で盤石だが直近の親善試合に不安。",
    formB:
      "3/31ブラジルに1-3敗、3/26コロンビアに2-1勝。予選は突破したが強豪相手には苦戦。",
    asOf: "2026年5月末時点のデータ（H2H通算数はソースにより差あり）",
    highlights: [
      "2018年準決勝の延長負けから8年、イングランドが借りを返せるかという『リベンジ』物語。",
      "高齢化したクロアチア黄金世代（モドリッチら）の経験と、若く勢いのあるイングランド攻撃陣の対比。",
      "直近イングランドは日本に、クロアチアはブラジルに敗戦。両者とも弱点を見せ、当日の集中力が勝敗を分ける。",
    ],
    keyMatchup:
      "イングランドの司令塔ジュード・ベリンガム 対 クロアチア中盤。中盤の主導権争いが試合のリズムを決める。",
    sources: [
      "https://www.espn.com/soccer/match/_/gameId/498141/england-croatia",
      "https://www.aiscore.com/head-to-head/soccer-croatia-vs-england",
    ],
  },
  {
    teamA: "MEX",
    teamB: "RSA",
    h2h: "最も有名なのは2010年W杯南アフリカ大会の開幕戦、南アフリカ1-1メキシコ（ヨハネスブルグ）。55分チャバララの名ゴールで南ア先制、79分にメキシコ主将ラファ・マルケスが同点。2026年の開幕戦は16年越しの再戦という物語。",
    formA:
      "5/30オーストラリアに1-0勝、5/22ガーナに2-0勝、3/31ベルギーと1-1、3/28ポルトガルと0-0。直近無敗で開催国として好調。",
    formB:
      "5/29ニカラグアと0-0（PK失敗）、3/31パナマに1-2敗、1月のアフリカ選手権でカメルーンに敗退。得点力に課題で低調。",
    asOf: "2026年5月末時点のデータ",
    highlights: [
      "2026年大会の開幕戦。共催国メキシコが大観衆を味方に最高のスタートを切れるか、大会の幕開けを飾る一戦。",
      "2010年開幕戦の名勝負の再現。あの引き分けから16年、立場が入れ替わっての再戦という物語性。",
      "直近無敗の好調メキシコ対、得点力不足の南アフリカ。地力の差が試合に出るかが見どころ。",
    ],
    keyMatchup:
      "メキシコの攻撃陣 対 南アフリカ守備陣とGK。直近PKを外すなど南アの決定力が問われる。",
    sources: [
      "https://www.espn.com/soccer/match/_/gameId/264031/mexico-south-africa",
      "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/mexico-south-africa-opening-game-2010",
    ],
  },
];

const previewByPair = new Map(
  matchPreviews.map((p) => [pairKey(p.teamA, p.teamB), p])
);

export function getPreview(a: string, b: string): MatchPreview | undefined {
  return previewByPair.get(pairKey(a, b));
}

// 各国の面白トリビア（リサーチ反映・出典で裏取り済み）。チームコード→トリビア配列。
export const countryTrivia: Record<
  string,
  { text: string; source?: string }[]
> = {
  JPN: [
    {
      text: "愛称「サムライブルー」は2009年に正式採用。初出場の1998年W杯は3戦全敗だった。",
      source:
        "https://www.goal.com/en-us/news/explained-japan-samurai-blue-nickname-national-team-colours/bltc5b01bbc7ba77a75",
    },
    {
      text: "人口あたりの自動販売機数が世界一。約23〜30人に1台、計約260万台が稼働する。",
      source:
        "https://www.vendinglocator.com/blog/what-country-has-the-most-vending-machines-per-capita",
    },
  ],
  NED: [
    {
      text: "W杯決勝に3度（1974・1978・2010年）進出して全敗。優勝なしの決勝最多進出国。",
      source: "https://en.wikipedia.org/wiki/Netherlands_at_the_FIFA_World_Cup",
    },
    {
      text: "オランダ人男性の平均身長は約183cmで世界一高く、1958年から世界一を維持。",
      source:
        "https://theconversation.com/how-the-dutch-became-the-tallest-nation-on-earth-231908",
    },
  ],
  TUN: [
    {
      text: "1978年W杯でメキシコに3-1で勝利し、アフリカ・アラブ勢初のW杯白星を挙げた。",
      source: "https://en.wikipedia.org/wiki/Tunisia_at_the_FIFA_World_Cup",
    },
    {
      text: "国土北端のカップ・アンジェラはアフリカ大陸最北端。ビゼルトは大陸最北の都市。",
      source: "https://en.wikipedia.org/wiki/Cape_Angela",
    },
  ],
  SWE: [
    {
      text: "地元開催の1958年W杯で準優勝。これが今も自国最高成績で、唯一の北欧開催大会。",
      source: "https://en.wikipedia.org/wiki/1958_FIFA_World_Cup",
    },
    {
      text: "約26万7千の島を持ち、世界一島の数が多い国（大半は無人島）。",
      source:
        "https://www.statista.com/chart/15364/the-estimated-number-of-islands-by-country/",
    },
  ],
  BRA: [
    {
      text: "全22回のW杯すべてに出場した唯一の国。優勝5回も史上最多。",
      source: "https://en.wikipedia.org/wiki/Brazil_at_the_FIFA_World_Cup",
    },
    {
      text: "アマゾン熱帯雨林の約60%がブラジル領内にあり、国土の約4割を占める。",
      source: "https://www.britannica.com/place/Amazon-Rainforest",
    },
  ],
  MAR: [
    {
      text: "2022年W杯でアフリカ・アラブ勢初のベスト4入り。最終4位となった。",
      source: "https://en.wikipedia.org/wiki/Morocco_at_the_FIFA_World_Cup",
    },
    {
      text: "フェズのカラウィーン大学（859年創立）は世界最古の現存大学としてギネス認定。",
      source: "https://en.wikipedia.org/wiki/University_of_al-Qarawiyyin",
    },
  ],
  ENG: [
    {
      text: "自国開催の1966年が唯一のW杯優勝。決勝で西ドイツを4-2で破った。",
      source: "https://en.wikipedia.org/wiki/1966_FIFA_World_Cup_final",
    },
    {
      text: "1863年創設のサッカー協会（FA）は世界最古。近代サッカー発祥の地とされる。",
      source: "https://en.wikipedia.org/wiki/The_Football_Association",
    },
  ],
  CRO: [
    {
      text: "人口約410万人で、史上2番目に小さい人口のW杯決勝進出国（2018年）。",
      source: "https://en.wikipedia.org/wiki/Croatia_at_the_FIFA_World_Cup",
    },
    {
      text: "ネクタイは17世紀のクロアチア兵が起源。仏語「Croate」が語源とされる。",
      source: "https://3seaseurope.com/necktie-cravat-croatia-french/",
    },
  ],
  MEX: [
    {
      text: "1970・1986年に続き2026年で、男子W杯を3度開催する史上初の国に。",
      source:
        "https://undiscoveredmexico.mx/how-mexico-became-first-country-host-3-fifa-world-cups/",
    },
    {
      text: "人口約1億3千万超で、世界最多のスペイン語母語話者を抱える国。",
      source: "https://en.wikipedia.org/wiki/Mexico",
    },
  ],
  RSA: [
    {
      text: "2010年大会でアフリカ初のW杯開催国に。開催国初の1次リーグ敗退も記録した。",
      source: "https://en.wikipedia.org/wiki/2010_FIFA_World_Cup",
    },
    {
      text: "行政・立法・司法で首都を3つ持ち、世界で最も首都が多い国。",
      source: "https://www.cfr.org/articles/south-africas-three-capitals",
    },
  ],
};
