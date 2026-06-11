import { NewsItem } from "@/lib/types";

// 編集者がキュレーションするニュース。全文転載はせず「見出し＋自前要約＋出典リンク」。
// sourceUrl は公式・一次ソースへのリンクを入れて運用する。
export const news: NewsItem[] = [
  {
    id: "n1",
    category: "serious",
    title: "日本代表、2026アウェイユニフォーム発表 コンセプトは「COLORS」",
    summary:
      "オフホワイトのボディに11色の途切れたピンストライプ。多様な個性が集まり一つの方向を目指す姿を表現。1995年以来のadidasトレフォイルロゴも復活。",
    sourceName: "JFA公式",
    sourceUrl: "https://www.jfa.jp/samuraiblue/news/00036145/",
    date: "2026-03-20",
    tag: "日本代表",
  },
  {
    id: "n2",
    category: "serious",
    title: "2026年大会は48チーム・104試合に拡大",
    summary:
      "出場国が32から48に拡大し、史上最大規模の大会へ。カナダ・メキシコ・アメリカの3カ国共催で、より多くの国にチャンスが広がる。",
    sourceName: "FIFA",
    sourceUrl: "https://www.fifa.com/",
    date: "2026-01-15",
    tag: "大会情報",
  },
  {
    id: "n3",
    category: "serious",
    title: "開幕戦はメキシコ・アステカ 史上初の3度目W杯開催",
    summary:
      "伝統のアステカ・スタジアムが開幕戦の舞台に。同会場は1970年・1986年に続き3度目のW杯開催となり、世界初の記録に。",
    sourceName: "FIFA",
    sourceUrl: "https://www.fifa.com/",
    date: "2026-02-10",
    tag: "大会情報",
  },
  {
    id: "f1",
    category: "fun",
    title: "なぜ日本代表は『青』なのか？ ユニフォーム小話",
    summary:
      "国旗は赤白なのに代表は青。海と空、日本の自然を象徴する説が有力で、いまや『サムライブルー』として定着。にわかでも語れる豆知識。",
    sourceName: "WWD JAPAN",
    sourceUrl: "https://www.wwdjapan.com/articles/1449759",
    date: "2026-04-02",
    tag: "ユニフォーム",
  },
  {
    id: "f2",
    category: "fun",
    title: "前回はここがバズった！本田圭佑の『解説』が大反響",
    summary:
      "2022年カタール大会では、歯に衣着せぬ本田圭佑の解説がSNSで爆発的に話題に。試合そのものより『誰の解説で見るか』が盛り上がりの鍵になることも。",
    sourceName: "ABEMA TIMES",
    sourceUrl: "https://times.abema.tv/",
    date: "2026-04-10",
    tag: "面白ネタ",
  },
  {
    id: "f3",
    category: "fun",
    title: "各国サポーターの熱狂文化図鑑",
    summary:
      "オランダのオレンジ軍団、ブラジルのサンバ、アルゼンチンの大合唱——。試合外のスタンドの光景もW杯の醍醐味。推し国のサポーター文化を知ると観戦が何倍も楽しい。",
    sourceName: "100倍Wカップ編集部",
    sourceUrl: "/teams",
    date: "2026-04-20",
    tag: "文化",
  },
  {
    id: "f4",
    category: "fun",
    title: "モロッコ旋風の象徴 試合後に母と喜ぶ選手たち",
    summary:
      "2022年、アフリカ勢初のベスト4に輝いたモロッコ。選手がピッチで母親と抱き合う姿が世界中で愛された。番狂わせには必ず『物語』がある。",
    sourceName: "100倍Wカップ編集部",
    sourceUrl: "/teams/MAR",
    date: "2026-04-25",
    tag: "面白ネタ",
  },

  // ─── 開幕直前の最新トピック（ファクトチェック済み・2026年6月時点）───
  {
    id: "n4",
    category: "serious",
    title: "日本代表26名決定 三笘薫は負傷で無念の落選、久保建英を軸に",
    summary:
      "森保監督は5月15日にW杯メンバー26名を発表。主力の三笘薫は5月9日のウルブズ戦で左ハムストリングを負傷し、大会期間中の復帰が難しく落選。攻撃は『唯一の世界クラス』久保建英を軸に組み立てる。南野拓実も昨年12月のACL負傷で間に合わず選外。",
    sourceName: "ABEMA TIMES",
    sourceUrl: "https://times.abema.tv/articles/-/10245759",
    date: "2026-05-15",
    tag: "日本代表",
  },
  {
    id: "n5",
    category: "serious",
    title: "冨安が2年ぶり・遠藤も負傷から復帰 守備に朗報",
    summary:
      "5月31日のアイスランド戦（1-0）で、冨安健洋が約2年ぶり、遠藤航も左足リスフラン靭帯断裂から約3カ月半ぶりに代表復帰。中盤の番人と守備の柱が戻り、初戦オランダ戦へ手応え。",
    sourceName: "サッカーキング",
    sourceUrl: "https://www.soccer-king.jp/news/japan/national/20260531/2165721.html",
    date: "2026-05-31",
    tag: "日本代表",
  },
  {
    id: "n6",
    category: "serious",
    title: "森保ジャパンの合言葉は「最高の景色を2026」",
    summary:
      "JFAは公式スローガン『最高の景色を2026 FOR OUR GREATEST STAGE』を掲示。日本の過去最高はベスト16で、悲願の『史上初のベスト8』突破が現実的な照準。森保監督はその先の優勝も口にしている。",
    sourceName: "JFA公式",
    sourceUrl: "http://www.jfa.jp/samuraiblue/for_our_greatest_stage_2026/",
    date: "2026-05-15",
    tag: "日本代表",
  },
  {
    id: "n7",
    category: "serious",
    title: "暑さ対策でメキシコ・モンテレイ合宿→拠点は米ナッシュビル",
    summary:
      "日本は事前合宿を高温のメキシコ・モンテレイ（ティグレスTC）で行い、暑熱順化と第2戦チュニジア戦の会場慣れを兼ねる。その後6月8日から米テネシー州ナッシュビルをベースキャンプに、ダラスの初戦・第3戦へ備える。",
    sourceName: "日本経済新聞",
    sourceUrl: "https://www.nikkei.com/article/DGXZQOKC032A00T00C26A6000000/",
    date: "2026-06-02",
    tag: "日本代表",
  },
  {
    id: "n8",
    category: "serious",
    title: "優勝候補はスペイン本命 Optaも16%で首位、ヤマルは初戦欠場見込み",
    summary:
      "ブックメーカーもデータも本命はEURO2024王者スペイン（Optaの優勝確率16.1%で1位、フランス13.0%、イングランド11.2%が続く）。ただし18歳の主役ラミン・ヤマルはハムストリング負傷で初戦の欠場が見込まれており、最大の波乱要因に。",
    sourceName: "The Analyst（Opta）",
    sourceUrl: "https://theanalyst.com/articles/who-will-win-2026-fifa-world-cup-predictions-opta-supercomputer",
    date: "2026-06-04",
    tag: "優勝予想",
  },
  {
    id: "n9",
    category: "serious",
    title: "日本のグループF日程・会場が確定（全試合・日本時間）",
    summary:
      "第1戦オランダ＝6/15(月)5:00・アーリントン（AT&Tスタジアム）、第2戦チュニジア＝6/21(日)13:00・モンテレイ（グアダルーペのEstadio BBVA／大会名Estadio Monterrey）、第3戦スウェーデン＝6/26(金)8:00・アーリントン。3戦中2戦がダラス近郊。",
    sourceName: "100倍Wカップ編集部",
    sourceUrl: "/schedule",
    date: "2026-06-01",
    tag: "大会情報",
  },

  // ─── 思わず話したくなるW杯2026 豆知識 ───
  {
    id: "f5",
    category: "fun",
    title: "長友のユニに特別な「レガシーパッチ」 5度目の出場者の証",
    summary:
      "FIFAは6月3日、W杯に通算5回以上出場する選手のユニフォームへ功績を称える『レガシーパッチ』を導入すると発表。39歳の長友佑都（5大会連続）が日本から対象に。初出場者向けの『デビューパッチ』も併せて新設される。",
    sourceName: "ゲキサカ",
    sourceUrl: "https://web.gekisaka.jp/news/worldcup/detail/?452743-452743-fl=",
    date: "2026-06-03",
    tag: "豆知識",
  },
  {
    id: "f6",
    category: "fun",
    title: "解説の本田圭佑、優勝予想は「希望は日本、確率はフランス」",
    summary:
      "今大会NHKで日本戦の解説を務める本田圭佑は、優勝を『希望は日本、一択』としつつ、確率が高い国にフランスを挙げ、得点王候補にムバッペを予想。日本を『歴代最強』と認めつつ『層は薄い』とも本音を語った。",
    sourceName: "Yahoo!ニュース",
    sourceUrl: "https://news.yahoo.co.jp/articles/ab3b88c0bfe9693f514070a0e42ba9973cd02016",
    date: "2026-06-04",
    tag: "面白ネタ",
  },
  {
    id: "f7",
    category: "fun",
    title: "吉田麻也の「花道」アイスランド戦で先発→13分で腕章を遠藤へ",
    summary:
      "壮行試合（5/31）で吉田麻也がキャプテンマークを巻いて先発。前半13分のボールアウト時に主将・遠藤航へ腕章を託して交代する、粋なセレモニーが用意された。吉田はその後、合宿にサポート役として合流した。",
    sourceName: "サッカーダイジェスト",
    sourceUrl: "https://www.soccerdigestweb.com/news/detail/id=191488",
    date: "2026-05-31",
    tag: "面白ネタ",
  },
  {
    id: "f8",
    category: "fun",
    title: "W杯の新ルールにGKも対応 鈴木彩艶「割るのも一つの戦術」",
    summary:
      "再開を遅らせると相手ボールになる「新5秒ルール」など、今大会は細かなルール改正が話題。守護神の鈴木彩艶は『最悪のコーナーは避けたい。時間がなければすぐ蹴ってタッチラインを割るのも一つの戦術』と適応の構えを語った。",
    sourceName: "ゲキサカ",
    sourceUrl: "https://web.gekisaka.jp/news/japan/detail/?452700-452700-fl=",
    date: "2026-06-01",
    tag: "豆知識",
  },

  // ─── サッカーと地政学・W杯の裏側（木崎伸也取材・ファクトチェック済み 2026-06-08）───
  {
    id: "g1",
    category: "fun",
    title: "史上初！W杯決勝にBTS・マドンナ・シャキーラ——スーパーボウル方式のハーフタイムショー",
    summary:
      "2026年W杯決勝（7月19日・メットライフ・スタジアム）で史上初のハーフタイムショーが実施される。BTS・マドンナ・シャキーラが出演し、コールドプレーのクリス・マーティンがプロデュース。ハーフタイムは約24分に延長予定。「サッカーのW杯がスーパーボウル化する」と賛否が分かれている。",
    sourceName: "Al Jazeera",
    sourceUrl:
      "https://www.aljazeera.com/news/2026/6/5/fifa-world-cup-2026-super-bowl-half-time-show-kits-football-talking-points",
    date: "2026-06-05",
    tag: "豆知識",
  },
  {
    id: "g2",
    category: "fun",
    title: "森保一、代表監督歴代最多71勝——「やんちゃな補欠」が歩んだ40年",
    summary:
      "森保一監督は日本代表監督として歴代最多71勝を達成。マツダFC時代は最低評価で入社し戦力外通告も経験した補欠選手だった。転機は21歳での結婚。広島でJ1を3度制覇後、就任当初の解任論を乗り越えて2期目担当（異例）。スポーツライター木崎伸也が2年半密着した『逆転監督 森保一』（文藝春秋）が発売前重版決定。",
    sourceName: "PR TIMES（文藝春秋）",
    sourceUrl:
      "https://prtimes.jp/main/html/rd/p/000000994.000043732.html",
    date: "2026-06-08",
    tag: "面白ネタ",
  },
  {
    id: "g3",
    category: "fun",
    title: "「スポーツウォッシング」とは——サッカーが外交の武器になる時代",
    summary:
      "人権問題を抱える国が「スポーツの祭典」で国際批判を薄める手法を『スポーツウォッシング』と呼ぶ。カタール2022（移民労働者問題）・サウジアラビア（プレミアリーグ買収）が典型例。一方モロッコは2022年ベスト4進出を足がかりに外交的地位を高め、2030年W杯共催権を獲得。小国がサッカーで「領土（影響圏）を広げる」時代が来た。",
    sourceName: "Business Insider Japan",
    sourceUrl:
      "https://www.businessinsider.jp/article/2603-soccer-and-geopolitics/",
    date: "2026-06-08",
    tag: "地政学",
  },
  {
    id: "g4",
    category: "fun",
    title: "習近平の「サッカー大国」の夢——数百億を注いでも代表は弱いまま",
    summary:
      "習近平はサッカー大国を中国共産党の目標に掲げ、2010年代の中国スーパーリーグへ数百億円規模の投資を実施。ブラジル代表MFのオスカルら世界的スターを破格の報酬で招聘したが、中国代表は今大会も出場ならず。「金を注いでも代表は強くならない」という逆説の教訓として世界に語り継がれている。",
    sourceName: "CEO Today",
    sourceUrl:
      "https://www.ceotodaymagazine.com/2024/10/the-rise-and-fall-of-the-chinese-super-league-lessons-from-a-spending-spree/",
    date: "2026-06-08",
    tag: "地政学",
  },
  {
    id: "g5",
    category: "serious",
    title: "W杯100周年（2030年）は6カ国開催——史上初の3大陸またぎフォーマット",
    summary:
      "2030年W杯の主催国はスペイン・ポルトガル・モロッコ。さらに1930年の第1回大会を開催したウルグアイ・アルゼンチン・パラグアイで100周年記念試合を実施する。欧州・アフリカ・南米の3大陸にまたがる史上初のフォーマットは、FIFA内部の勢力バランスを反映した政治的産物とも評される。",
    sourceName: "FIFA公式",
    sourceUrl:
      "https://www.fifa.com/en/tournaments/mens/worldcup/articles/world-cup-2030-spain-portugal-morocco-host-centenary-argentina-uruguay-paraguay",
    date: "2026-06-08",
    tag: "大会情報",
  },
  {
    id: "g6",
    category: "serious",
    title: "2034年W杯はサウジアラビア単独開催——2024年12月FIFA臨時総会で決定",
    summary:
      "2024年12月11日のFIFA臨時総会で2034年W杯のサウジアラビア単独開催が決定。有力な対抗馬が不在のまま事実上の信任投票となった。石油マネーによるスポーツウォッシング戦略の集大成と批判する声もある。2022年カタールに続く中東開催で、FIFAとオイルマネーの結びつきが鮮明になった。",
    sourceName: "Wikipedia（2034 FIFA World Cup）",
    sourceUrl: "https://en.wikipedia.org/wiki/2034_FIFA_World_Cup",
    date: "2026-06-08",
    tag: "地政学",
  },
  {
    id: "g7",
    category: "serious",
    title: "スイスで幹部14人が逮捕された日——2015年FIFAゲート事件とは",
    summary:
      "2015年5月、米司法省がFIFA幹部ら14人（役員9人・企業幹部5人）を約24年間にわたる汚職・マネーロンダリングで起訴。スイスのホテルで幹部が連行される衝撃的な展開となり、ブラッター会長（当時）も辞任に追い込まれた。W杯開催地決定に賄賂が横行していた実態が露呈し、現在のFIFAの信頼問題の起点となった事件。",
    sourceName: "Wikipedia（2015年FIFA汚職事件）",
    sourceUrl: "https://en.wikipedia.org/wiki/2015_FIFA_corruption_case",
    date: "2026-06-08",
    tag: "地政学",
  },

  // ─── ついに開幕！ 開幕日〜直前の最新トピック（ファクトチェック済み 2026-06-11）───
  {
    id: "n10",
    category: "serious",
    title: "ついに開幕！ 開幕戦はメキシコ×南アフリカ 日本時間6/12(金)4:00キックオフ",
    summary:
      "史上最大48チーム・3カ国共催のW杯2026がついに開幕。開幕戦はメキシコ×南アフリカで、舞台は改修を終えたメキシコシティのアステカ（大会名Estadio Mexico City）。同会場は1970・1986年に続き世界初の3度目W杯開幕戦。現地6/11 14:00（CT）＝日本時間6/12(金)午前4:00キックオフ。翌6/12には開催国アメリカ×パラグアイ、カナダ×（相手）も控える。",
    sourceName: "ESPN",
    sourceUrl:
      "https://www.espn.com/football/story/_/id/49007230/world-cup-2026-mexico-vs-south-africa-kickoff-how-watch-stats-team-news-fifa-opener",
    date: "2026-06-11",
    tag: "大会情報",
  },
  {
    id: "f9",
    category: "fun",
    title: "開幕戦は“16年越しの再会” オチョアは2010年と2026年の両方を知る唯一の男",
    summary:
      "南アフリカがメキシコと当たるのは、2010年大会の開幕戦でチャバララの伝説的ミドルが国を沸かせてから、ちょうど16年後。メキシコの守護神ギジェルモ・オチョア（40）は、両チーム合わせて2010年と2026年の両W杯メンバーに名を連ねる唯一の選手という、にわかでも語れる開幕戦の小ネタ。",
    sourceName: "FIFA公式",
    sourceUrl:
      "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/estadio-azteca-mexico-city-host-opening-match-world-cup-2026",
    date: "2026-06-11",
    tag: "面白ネタ",
  },
  {
    id: "f10",
    category: "fun",
    title: "開会式は史上初の3都市開催 シャキーラが大会公式ソング「Dai Dai」を披露",
    summary:
      "開会式はメキシコシティ（6/11）・トロント＆ロサンゼルス（6/12）の3都市で順次開催。メキシコシティではシャキーラがナイジェリアのバーナ・ボーイと公式ソング『Dai Dai』を歌い、J・バルヴィンやマナーらラテンの名手が集結（約16分半）。LAではケイティ・ペリーらが出演。演出は五輪式典も手がけたマルコ・バリッチ。決勝のハーフタイムショー導入と並び“W杯のショー化”が話題に。",
    sourceName: "Al Jazeera",
    sourceUrl:
      "https://www.aljazeera.com/sports/2026/6/9/world-cup-opening-ceremony-whos-performing-when-it-starts-how-to-watch",
    date: "2026-06-10",
    tag: "豆知識",
  },
  {
    id: "n11",
    category: "serious",
    title: "日本代表、ベースキャンプ地ナッシュビル入り 公開練習に約5000人",
    summary:
      "日本は現地6/8（日本時間6/9）にメキシコ・モンテレイでの暑熱順化を終え、ベースキャンプ地の米テネシー州ナッシュビルに到着。一般公開された練習には約5000人が来場し、遠藤航・鎌田大地・前田大然ら欧州主力組に現地のクラブサポーターからも声援が飛んだ。別調整中だった主将・遠藤も全体練習の一部に合流し、初戦オランダ戦（日本時間6/15）へ最終調整に入った。",
    sourceName: "日本経済新聞",
    sourceUrl:
      "https://www.nikkei.com/article/DGXZQODH10CXN0Q6A610C2000000/",
    date: "2026-06-10",
    tag: "日本代表",
  },
  {
    id: "n12",
    category: "serious",
    title: "開幕直前に各国で離脱者 モロッコは主力2人を負傷で緊急入れ替え",
    summary:
      "登録メンバーは初戦の24時間前まで負傷者の入れ替えが認められており、開幕直前に動きが相次いだ。モロッコは6/10にDFアゲルドとFWエッザルズリが負傷離脱し、サアダネとサビを追加招集。カナダも6/9にマルセロ・フローレスに代えてジェイデン・ネルソンを登録した。土壇場のコンディション争いも勝負を分ける。",
    sourceName: "Wikipedia（2026 FIFA World Cup squads）",
    sourceUrl: "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads",
    date: "2026-06-10",
    tag: "大会情報",
  },
  {
    id: "n13",
    category: "serious",
    title: "開催国アメリカに不安 強化試合でドイツに1-2黒星、初戦は6/12パラグアイ戦",
    summary:
      "開催国アメリカは開幕前最後の強化試合でドイツに1-2と敗戦。CBクリス・リチャーズが足首の負傷から復帰できておらず、守備に不安を残したまま現地6/12の初戦パラグアイ戦を迎える。ホームの後押しを力に変えられるかが、グループ突破の鍵を握る。",
    sourceName: "Yahoo Sports",
    sourceUrl:
      "https://sports.yahoo.com/soccer/live/2026-world-cup-news-live-updates-injuries-squads-storylines-as-the-tournament-looms-200000776.html",
    date: "2026-06-09",
    tag: "大会情報",
  },
];
