// 「みんなの優勝予想」ページのデータ。
// 世界中の解説者・元選手・監督・ジャーナリスト・データモデルが
// 実際に公表した2026W杯の優勝予想だけを、出典付きで掲載する。
// すべて一次情報（記事・動画・SNS）で裏取り済み。出典なしは載せない。

export type Region = "欧州" | "南米・スペイン語圏" | "米国・グローバル" | "日本・アジア" | "データ予測";

export interface Prediction {
  name: string; // 人物・モデル名（日本語表記）
  role: string; // 何の人か（経歴・媒体・国籍 or モデル運営）
  country: string; // その人物・媒体の拠点国
  flag: string; // 絵文字フラグ（無ければ空）
  region: Region; // 集計・グルーピング用の地域区分
  pick: string; // 優勝予想国（日本語名）
  pickFlag?: string; // 予想国の旗（任意）
  detail: string; // 予想内容の要約（自前の言葉・40〜70字）
  source: string; // 出典URL（一次情報）
  sourceLabel: string; // 出典の媒体名・時期
}

// 出典付きで裏が取れた予想のみ。世界中の識者・モデルの公表予想を並列リサーチで収集し、
// 一次情報（記事・動画・SNS）で裏取りできたものだけを掲載。
export const predictions: Prediction[] = [
  // ── データ予測（統計モデル・スーパーコンピューター）──
  {
    name: "Optaスーパーコンピューター",
    role: "統計予測モデル（英Stats Perform運営。全試合を多数回シミュレート）",
    country: "イギリス",
    flag: "🇬🇧",
    region: "データ予測",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "開幕前の最新シミュレーションでスペインを優勝確率16.0%の筆頭に。フランス12.5%、イングランド10.7%、王者アルゼンチン10.1%が続くと算出。",
    source: "https://www.si.com/soccer/supercomputer-predicts-2026-world-cup-winner",
    sourceLabel: "Sports Illustrated経由・2026年4月",
  },
  {
    name: "CasinoHawksスーパーコンピューター",
    role: "統計予測モデル（国際ランク・調子・市場オッズで各試合を1万回試行）",
    country: "イギリス",
    flag: "🇬🇧",
    region: "データ予測",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "ランキング・フォーム・オッズを基に各試合を1万回シミュレートし、最終予測でスペインに54%の高い優勝確率を与えた。",
    source: "https://www.si.com/soccer/supercomputer-predicts-2026-world-cup-winner-before-draw",
    sourceLabel: "Sports Illustrated経由・2025年12月",
  },
  {
    name: "Jeffbetスーパーコンピューター",
    role: "統計予測モデル（英ブックメーカー運営。GiveMeSportが紹介）",
    country: "イギリス",
    flag: "🇬🇧",
    region: "データ予測",
    pick: "イングランド",
    pickFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    detail:
      "全トーナメントをシミュレートし、決勝でイングランドがポルトガルを1-0で破り初優勝と予測。長年の決勝の呪いを断つと結論づけた。",
    source: "https://www.givemesport.com/supercomputer-predicts-2026-world-cup-football-soccer/",
    sourceLabel: "GiveMeSport・2025年11月",
  },
  {
    name: "Bracket2026 予測モデル",
    role: "データ予測モデル（FIFAランク40%・ELO35%・過去3大会25%の加重式）",
    country: "アメリカ",
    flag: "🇺🇸",
    region: "データ予測",
    pick: "アルゼンチン",
    pickFlag: "🇦🇷",
    detail:
      "FIFAランク・ELO・過去成績を加重したモデルでアルゼンチンを僅差の最有力に。亜・西・仏が1%台で並ぶ大混戦と算出した。",
    source: "https://bracket2026.com/en/predictions",
    sourceLabel: "Bracket2026・2026年",
  },
  {
    name: "ヨアヒム・クレメント",
    role: "ドイツ人エコノミスト。独自モデルで過去3大会の優勝国を的中させた予測家",
    country: "ドイツ",
    flag: "🇩🇪",
    region: "データ予測",
    pick: "オランダ",
    pickFlag: "🇳🇱",
    detail:
      "2014独・2018仏・2022亜を的中させた経済モデルが、今回は伏兵オランダの優勝を予測。決勝でポルトガルを破る筋書きと示した。",
    source:
      "https://www.sbs.com.au/news/article/this-economist-predicted-three-world-cup-winners-hes-backed-an-underdog-for-2026/4t8h0snpt",
    sourceLabel: "SBS News・2026年5月",
  },

  // ── 欧州の識者 ──
  {
    name: "ジェイミー・キャラガー",
    role: "元イングランド代表DF／Sky Sports解説者",
    country: "イングランド",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    region: "欧州",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "決勝でフランスがポルトガルを下すと予想。準決勝でスペインとイングランドが敗退し、フランスが3度目の戴冠を果たすと見る。",
    source: "https://www.givemesport.com/jamie-carragher-predicts-2026-world-cup-full-football-soccer/",
    sourceLabel: "GiveMeSport・2026年4月",
  },
  {
    name: "ゲイリー・リネカー",
    role: "元イングランド代表FW／ポッドキャスト『The Rest is Football』",
    country: "イングランド",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    region: "欧州",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "スペインを本命に指名。10年ほど前のように連続でメジャータイトルを獲る再現が可能で、最も倒すべき相手だと評価した。",
    source:
      "https://www.goal.com/en/lists/gary-lineker-world-cup-favourites-england-spain-france-thomas-tuchel/bltf4b139312ea58fc2",
    sourceLabel: "Goal／The Rest is Football・2026年3月",
  },
  {
    name: "アーセン・ベンゲル",
    role: "元アーセナル監督／現FIFAグローバル開発責任者",
    country: "フランス",
    flag: "🇫🇷",
    region: "欧州",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "フランスを「超本命」と断言。世界レベルのストライカーが他国より多く、その層の厚さが決定的な差になると主張した。",
    source:
      "https://www.goal.com/en/lists/arsene-wenger-world-cup-favourites-verdict-england-major-tournament-curse-2026/bltbb5be6f2ef77b045",
    sourceLabel: "Goal・2025年12月",
  },
  {
    name: "ジョゼ・モウリーニョ",
    role: "現ベンフィカ監督／元チェルシー・レアル等監督",
    country: "ポルトガル",
    flag: "🇵🇹",
    region: "欧州",
    pick: "ポルトガル",
    pickFlag: "🇵🇹",
    detail:
      "ポルトガルは何でも成し遂げられる世代だと評価。ブラジルやアルゼンチンを認めつつ、自国が優勝できると断言した。",
    source:
      "https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/mourinho-already-has-his-pick-to-win-the-world-cup-2026-05-09",
    sourceLabel: "beIN Sports／Sport Week・2026年5月",
  },
  {
    name: "ローター・マテウス",
    role: "1990年W杯優勝の元西ドイツ代表主将／解説者",
    country: "ドイツ",
    flag: "🇩🇪",
    region: "欧州",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "スペインを最も完成されたチームと評価し優勝予想。決勝でイングランドを破ると見て、ドイツは準決勝でスペインに敗退と予想した。",
    source:
      "https://www.90min.de/wie-weit-kommt-deutschland-wer-wird-weltmeister-lothar-matthaus-tippt-die-wm-2026",
    sourceLabel: "90min.de・2026年初頭",
  },
  {
    name: "バスティアン・シュバインシュタイガー",
    role: "2014年W杯優勝の元ドイツ代表MF／解説者",
    country: "ドイツ",
    flag: "🇩🇪",
    region: "欧州",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "現時点で最強はフランスと明言し本命に指名。次点をスペインとし、ドイツは優勝候補筆頭ではないと慎重な見方を示した。",
    source:
      "https://www.goal.com/de/listen/aktuell-die-staerkste-mannschaft-nicht-spanien-bastian-schweinsteiger-nennt-seinen-absoluten-top-favoriten-fuer-die-wm-2026/bltf5beef37d39a11a1",
    sourceLabel: "Goal.de／SPORTbible・2026年2月",
  },
  {
    name: "ルート・フリット",
    role: "1988年欧州王者の元オランダ代表／元チェルシー監督",
    country: "オランダ",
    flag: "🇳🇱",
    region: "欧州",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "フランス・スペイン・アルゼンチンを本命に挙げ、その筆頭にフランスを置いた。オランダとポルトガルはダークホース扱い。",
    source:
      "https://www.dazn.com/en-US/news/soccer/fifa-world-cup-26-netherlands-ruud-gullit/132c0cz54drz61of4cz1dv6g9q",
    sourceLabel: "DAZN・2026年5月",
  },
  {
    name: "フランク・モンクハウス",
    role: "Flashscoreのベッティングアナリスト／サッカージャーナリスト",
    country: "イギリス",
    flag: "🇬🇧",
    region: "欧州",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "直近2大会連続で決勝に進んだ実績を根拠にフランスの優勝を支持。デシャン監督最後の大会を有終の美で飾ると予想した。",
    source:
      "https://europeangaming.eu/portal/latest-news/2026/05/27/205470/world-cup-predictions-2026-winner-odds-favourites-expert-forecasts/",
    sourceLabel: "European Gaming／Flashscore・2026年5月",
  },

  // ── 南米・スペイン語圏の識者 ──
  {
    name: "カフー",
    role: "元ブラジル代表DF／W杯2度優勝（1994・2002）",
    country: "ブラジル",
    flag: "🇧🇷",
    region: "南米・スペイン語圏",
    pick: "ブラジル",
    pickFlag: "🇧🇷",
    detail:
      "5度の世界王者として、ブラジルは2026年も優勝候補の筆頭格で大会に臨むと断言した。",
    source:
      "https://www.cnnbrasil.com.br/esportes/futebol/cafu-ve-brasil-como-favorito-para-copa-de-2026-e-enaltece-neymar/",
    sourceLabel: "CNN Brasil・2025年2月",
  },
  {
    name: "ラダメル・ファルカオ",
    role: "元コロンビア代表FW／伝説的ストライカー",
    country: "コロンビア",
    flag: "🇨🇴",
    region: "南米・スペイン語圏",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "ラミン・ヤマルら若く成熟した選手を擁するスペインを、優勝の最有力候補に挙げた。",
    source:
      "https://www.eltiempo.com/amp/deportes/futbol-internacional/falcao-garcia-revela-sus-candidatos-para-el-mundial-y-da-sus-expectativas-con-la-seleccion-colombia-3548528",
    sourceLabel: "El Tiempo・2026年4月",
  },
  {
    name: "ウーゴ・サンチェス",
    role: "元メキシコ代表FW／レアル・マドリードのレジェンド",
    country: "メキシコ",
    flag: "🇲🇽",
    region: "南米・スペイン語圏",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "母国の優勝を願いつつも、現実的にはスペインが優勝すると予想。3位4位は亜・仏になると見立てた。",
    source: "https://www.si.com/mx/mundial-2026/hugo-sanchez-pone-a-espana-como-favorita-al-mundial-2026",
    sourceLabel: "Sports Illustrated MX・2026年5月",
  },
  {
    name: "イバン・レネ・バレンシアーノ",
    role: "元コロンビア代表FW／著名解説者",
    country: "コロンビア",
    flag: "🇨🇴",
    region: "南米・スペイン語圏",
    pick: "コロンビア",
    pickFlag: "🇨🇴",
    detail:
      "ラジオで「コロンビアは私にとって決勝進出国。必ずそうなる」と、自国の決勝進出を断言した。",
    source:
      "https://www.infobae.com/colombia/deportes/2026/03/03/ivan-valenciano-se-une-a-las-voces-que-piden-a-falcao-en-la-seleccion-colombia-para-el-mundial-2026-lo-conoce-todo-el-mundo/",
    sourceLabel: "Infobae Colombia・2026年3月",
  },
  {
    name: "オスカル・ルジェリ",
    role: "元アルゼンチン代表DF／1986年W杯優勝・ESPN F90解説者",
    country: "アルゼンチン",
    flag: "🇦🇷",
    region: "南米・スペイン語圏",
    pick: "アルゼンチン",
    pickFlag: "🇦🇷",
    detail:
      "西・仏・英・独・伯と並ぶ候補に挙げつつ、世代交代した母国アルゼンチンに最も期待を寄せた。",
    source:
      "https://bolavip.com/ar/mundial/ademas-de-la-seleccion-argentina-oscar-ruggeri-menciono-a-5-paises-como-candidatos-a-ganar-el-mundial-2026",
    sourceLabel: "Bolavip・2026年4月",
  },
  {
    name: "ディエゴ・フォルラン",
    role: "元ウルグアイ代表FW／2010年W杯MVP",
    country: "ウルグアイ",
    flag: "🇺🇾",
    region: "南米・スペイン語圏",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "優勝候補は疑いなくスペインとアルゼンチンの二強だと明言。母国より両国を上位に置いた。",
    source:
      "https://bolavip.com/ar/seleccion/diego-forlan-el-grupo-de-argentina-en-el-mundial-es-facil-y-condiciona-al-de-uruguay-y-espana",
    sourceLabel: "Bolavip・2026年1月",
  },
  {
    name: "カルロス・バルデラマ",
    role: "元コロンビア代表MF／「エル・ピベ」の愛称で知られるレジェンド",
    country: "コロンビア",
    flag: "🇨🇴",
    region: "南米・スペイン語圏",
    pick: "コロンビア",
    pickFlag: "🇨🇴",
    detail:
      "「この世代はすべてを備えている」とし、コロンビアを決勝に進む国だと迷わず予想した。",
    source:
      "https://www.eltiempo.com/deportes/futbol-internacional/pibe-valderrama-dio-un-arriesgado-pronostico-para-la-seleccion-colombia-en-el-mundial-de-la-fifa-2026-esta-tiene-todo-ya-es-hora-3497332",
    sourceLabel: "El Tiempo・2025年10月",
  },
  {
    name: "ホルヘ・バルダーノ",
    role: "元アルゼンチン代表FW／1986年W杯優勝・著名解説者",
    country: "アルゼンチン",
    flag: "🇦🇷",
    region: "南米・スペイン語圏",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "西・葡・仏・亜を最も手強い4カ国とし、ヤマルを擁するスペインが「頭一つ抜けている」と評した。",
    source:
      "https://www.lanacion.com.ar/deportes/futbol/jorge-valdano-sobre-los-favoritos-del-mundial-espana-portugal-francia-y-argentina-son-las-nid14052026/",
    sourceLabel: "La Nación・2026年5月",
  },

  // ── 米国・グローバルの識者 ──
  {
    name: "ジェームズ・ベンジ",
    role: "CBSスポーツのサッカー記者（全試合シミュレーション記事を執筆）",
    country: "アメリカ",
    flag: "🇺🇸",
    region: "米国・グローバル",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "全試合を予想する企画で、フランスが決勝でイングランドを2-0で下し優勝と予測。ムバッペらの攻撃は止められないと評した。",
    source:
      "https://www.cbssports.com/soccer/news/2026-fifa-world-cup-predictions-picking-every-game-usmnt-messi-ronaldo-france-champions/",
    sourceLabel: "CBS Sports・2026年",
  },
  {
    name: "ジョー・プリンス＝ライト",
    role: "NBCスポーツのサッカー担当記者",
    country: "アメリカ",
    flag: "🇺🇸",
    region: "米国・グローバル",
    pick: "アルゼンチン",
    pickFlag: "🇦🇷",
    detail:
      "アルゼンチンを優勝候補の筆頭に。南米予選の強さを挙げ、メッシ最後のW杯で大舞台に応えれば戴冠もありうると予測した。",
    source:
      "https://www.nbcsports.com/soccer/news/2026-world-cup-predictions-with-one-year-to-go-here-are-some-very-early-predictions",
    sourceLabel: "NBC Sports・2025年11月",
  },
  {
    name: "クリス・モーガン",
    role: "Yardbarkerのスポーツライター（W杯26予測企画を執筆）",
    country: "アメリカ",
    flag: "🇺🇸",
    region: "米国・グローバル",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "ニューヨーク近郊の決勝でスペインがブラジルを破り優勝と予測。ブラジルは詰めの場面で乱れがちと評しスペインを推した。",
    source: "https://www.yardbarker.com/soccer/articles/26_predictions_for_the_2026_world_cup/s1__43809934",
    sourceLabel: "Yardbarker・2026年5月",
  },
  {
    name: "ESPN記者20人パネル",
    role: "ESPNの世界各地サッカー記者20名による合議制パワーランキング",
    country: "アメリカ",
    flag: "🇺🇸",
    region: "米国・グローバル",
    pick: "スペイン",
    pickFlag: "🇪🇸",
    detail:
      "開幕30日前のパワーランキングでスペインを1位に選出（1位票12）。2位仏、3位亜、4位英、5位伯と続いた。",
    source:
      "https://www.espn.com/soccer/story/_/id/48677225/fifa-world-cup-power-rankings-spain-brazil-germany-england-argentina",
    sourceLabel: "ESPN・2026年5月",
  },

  // ── 日本・アジアの識者 ──
  {
    name: "本田圭佑",
    role: "元日本代表MF／NHK解説者・実業家",
    country: "日本",
    flag: "🇯🇵",
    region: "日本・アジア",
    pick: "フランス",
    pickFlag: "🇫🇷",
    detail:
      "W杯解説就任会見で「希望は日本、一択」と願望を語りつつ、優勝確率が最も高い国としては実力面からフランスを挙げた。",
    source: "https://web.gekisaka.jp/news/japan/detail/?451842-451842-fl=",
    sourceLabel: "ゲキサカ・2026年5月",
  },
];

// ── 集計ヘルパー ──────────────────────────────
// 優勝予想国ごとの票数を多い順に返す。
export function tallyByCountry(list: Prediction[] = predictions) {
  const map = new Map<string, { country: string; flag: string; count: number }>();
  for (const p of list) {
    const key = p.pick;
    const cur = map.get(key);
    if (cur) {
      cur.count += 1;
    } else {
      map.set(key, { country: p.pick, flag: p.pickFlag ?? "", count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

// 地域区分の表示順。
export const regionOrder: Region[] = [
  "データ予測",
  "欧州",
  "南米・スペイン語圏",
  "米国・グローバル",
  "日本・アジア",
];
