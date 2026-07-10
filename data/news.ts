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

  // ─── ついに開幕！大会序盤＆日本代表の直近ニュース（ファクトチェック済み 2026-06-12）───
  {
    id: "w1",
    category: "serious",
    title: "W杯2026開幕 メキシコがアステカで南アフリカに2-0、開幕戦史上最多3枚の退場",
    summary:
      "6月11日、メキシコ市エスタディオ・アステカで開幕戦が行われ、地元メキシコが南アフリカを2-0で撃破。前半9分にJ・キニョネスが大会第1号ゴール、後半にR・ヒメネスが追加点。一方で南アフリカ2枚・メキシコ1枚の計3枚のレッドカードが出る荒れた展開で、これはW杯開幕戦史上最多。メキシコは開幕戦8度目で初白星を挙げた。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/match/_/gameId/760415/south-africa-mexico",
    date: "2026-06-11",
    tag: "大会情報",
  },
  {
    id: "w2",
    category: "fun",
    title: "頭蓋骨骨折から生還した男 ヒメネスのW杯初ゴールに涙",
    summary:
      "開幕戦で追加点を決めたメキシコのR・ヒメネス（35）は、2020年にアーセナル戦で頭蓋骨を骨折し命の危険すらあった重傷から復帰した苦労人。今年3月には父を亡くしたばかりで、ゴール後は天を指して亡き父に捧げた。大会最初の感動ストーリーとして世界中で話題に。番狂わせにも復活劇にも、必ず物語がある。",
    sourceName: "CBS Sports",
    sourceUrl:
      "https://www.cbssports.com/soccer/news/how-mexico-star-raul-jimenez-overcame-skull-fracture-loss-of-father-world-cup-2026/",
    date: "2026-06-11",
    tag: "面白ネタ",
  },
  {
    id: "w3",
    category: "fun",
    title: "開会式はシャキーラら出演 アステカが史上初の「3度目の開幕戦」",
    summary:
      "改修されたアステカ・スタジアムは1970年・1986年に続き、史上初となる3度目のW杯開幕戦の舞台に。開幕戦の90分前から8万人超を前に開会式が行われ、シャキーラ、バーナ・ボーイ、J・バルヴィンらが花火と光のショーで祝祭を演出した。決勝のハーフタイムショー（BTS・マドンナら）と並ぶ、今大会の「ショー化」の象徴。",
    sourceName: "Al Jazeera",
    sourceUrl:
      "https://www.aljazeera.com/sports/2026/6/9/world-cup-opening-ceremony-whos-performing-when-it-starts-how-to-watch",
    date: "2026-06-11",
    tag: "豆知識",
  },
  {
    id: "w4",
    category: "serious",
    title: "日本代表、ベースキャンプ地ナッシュビルに到着 遠藤航が英語であいさつ",
    summary:
      "日本代表は6月8日（日本時間9日）にメキシコ・モンテレイを発ち、ベースキャンプ地の米テネシー州ナッシュビルに到着。歓迎式では尺八による君が代演奏などが行われ、主将・遠藤航が英語で「この町からW杯の旅を始められて嬉しい」とあいさつした。初戦オランダ戦（6/15）へ向け本格始動。",
    sourceName: "産経新聞",
    sourceUrl: "https://news.yahoo.co.jp/articles/ec866a88f3f52c57e33ada05a91ae1438370a23f",
    date: "2026-06-09",
    tag: "日本代表",
  },
  {
    id: "w5",
    category: "serious",
    title: "ナッシュビルで初練習 別メニュー続いた遠藤航が全体練習に合流",
    summary:
      "日本代表は6月10日、ナッシュビルSCの施設でベースキャンプ初練習を実施。負傷明けで別メニュー調整が続いていた遠藤航がスパイクを履いて全体練習に合流し、初戦へ向け好材料に。長友佑都は日の丸と背番号5入りのヘアバンドを着用、南野拓実はボール回しで球出し役を務めた。オランダ戦まで残り4日。",
    sourceName: "超WORLDサッカー！",
    sourceUrl: "https://web.ultra-soccer.jp/news/all/23512/",
    date: "2026-06-11",
    tag: "日本代表",
  },
  {
    id: "w6",
    category: "serious",
    title: "初戦の相手オランダ、最終調整でウズベキスタンに2-1辛勝 クーマン「同じ布陣で臨む」",
    summary:
      "日本の初戦相手オランダは現地6月8日、ウズベキスタン（FIFAランク50位）との強化試合をガクポのPK2得点で2-1と辛勝。決定機を逃す展開にファンからは「緩い」との声も上がった。クーマン監督は日本戦も「同じ布陣で臨むことになる」と明言。相手の手の内が見えたことは日本にとって小さくない材料。",
    sourceName: "サッカー批評Web",
    sourceUrl: "https://news.yahoo.co.jp/articles/ac06311bbdf5954105001165bc6b5afedddc7195",
    date: "2026-06-10",
    tag: "日本代表",
  },
  {
    id: "w7",
    category: "serious",
    title: "オランダ正GKフェルブルッヘン、負傷も日本戦出場へ前向き",
    summary:
      "オランダの正GKフェルブルッヘン（ブライトン、23歳＝三笘薫の同僚）がウズベキスタン戦で股関節を痛めて交代。だがクーマン監督は「日曜の日本戦ではプレーできると思う」「激しく接触しただけ」と起用に前向きな見方を示した。日本にとっては相手守備の不安要素が薄まる可能性もあり、初戦の注目点の一つ。",
    sourceName: "サッカーダイジェストWeb",
    sourceUrl: "https://www.soccerdigestweb.com/news/detail/id=191846",
    date: "2026-06-11",
    tag: "日本代表",
  },
  {
    id: "w8",
    category: "fun",
    title: "田中碧が酷暑に本音「俺、汗かけないんすよ」 ダラスは予想35度",
    summary:
      "MF田中碧が、自身が発汗しにくい体質であることを「俺、汗かけないんすよ…見てくださいよ」と吐露。オランダ戦が行われるダラスのAT&Tスタジアムは現地午後3時開始で予想気温35度前後の酷暑が見込まれる。同会場は最新の空調設備を備え暑さ軽減が図られているが、選手のコンディション管理が勝敗を分ける鍵に。",
    sourceName: "Qoly",
    sourceUrl:
      "https://topics.smt.docomo.ne.jp/amp/article/qoly/sports/qoly-4a26c41ca3b86c155aee2d97eb2dfe9b50d114d7",
    date: "2026-06-09",
    tag: "面白ネタ",
  },
  {
    id: "w9",
    category: "fun",
    title: "公式球「トリオンダ」は“充電”が必要 内蔵センサーが毎秒500回計測",
    summary:
      "アディダスの公式球トリオンダ（=「三つの波」、開催3カ国を象徴）はバッテリー内蔵で、試合前に専用ステーションでのワイヤレス充電が必要。約90分で満充電、実戦で約6時間使用できる。内蔵の500Hzセンサーがボールへの接触やスピンを毎秒500回計測し、オフサイドやハンドの判定を支援する。ボールが“通信機器”になる時代。",
    sourceName: "Yahoo Sports",
    sourceUrl: "https://sports.yahoo.com/articles/2026-fifa-world-cup-ball-171931236.html",
    date: "2026-06-07",
    tag: "テクノロジー",
  },
  {
    id: "w10",
    category: "serious",
    title: "全104試合でセミ自動オフサイドを初導入 出場選手は全員3Dスキャン",
    summary:
      "男子W杯で初めて全104試合にセミ自動オフサイド技術（SAOT）を導入。12台のカメラが各選手を毎秒50枚撮影し、明確なオフサイド（判定の閾値は10cm）は副審の耳元へ直接通知される。出場全選手はあらかじめ3Dスキャンされアバター化。VARを経由せず副審が素早く判定できるのが従来との違いで、試合のテンポにも影響しそう。",
    sourceName: "FourFourTwo",
    sourceUrl:
      "https://www.fourfourtwo.com/competition/every-new-fifa-rule-at-the-2026-world-cup-goalkeeper-timeout-ban-five-second-countdowns-and-var-offsides-whats-changed",
    date: "2026-06-11",
    tag: "テクノロジー",
  },
  {
    id: "w11",
    category: "serious",
    title: "決勝チケットが200万ドル超に高騰 ダイナミックプライシングを当局が調査",
    summary:
      "今大会で本格導入された需要連動型のダイナミックプライシングが批判を浴びている。平均価格は約1,300ドル、決勝は安い席でも1万ドル、一部の転売価格は200万ドル超に。元FIFAガバナンス責任者が「利益優先」と批判し、ニューヨーク・ニュージャージー両州の司法長官が調査に乗り出した。「庶民の祭典」の理念が揺らいでいる。",
    sourceName: "NPR",
    sourceUrl: "https://www.npr.org/2026/05/28/nx-s1-5836514/2026-world-cup-fifa-ticket-prices",
    date: "2026-05-28",
    tag: "大会運営",
  },
  {
    id: "w12",
    category: "fun",
    title: "ハーランドのノルウェー、28年ぶりW杯出場 予選37得点で突破",
    summary:
      "得点王エルリング・ハーランド擁するノルウェーが1998年以来28年ぶりにW杯へ。欧州予選を8戦全勝、欧州最多の37得点で突破し、ハーランド個人も予選16得点で欧州得点王（2位の2倍）。本大会はグループIでフランス・セネガル・イラクと同組。長く「無冠の名手」を抱えた国の悲願の復帰は、今大会の隠れた見どころ。",
    sourceName: "Olympics.com",
    sourceUrl:
      "https://www.olympics.com/en/news/fifa-world-cup-2026-norway-all-players-full-squad-list-key-stats-and-schedule",
    date: "2026-06-09",
    tag: "海外選手",
  },

  // ─── 大会2日目・最新情報（ファクトチェック済み 2026-06-12）───
  {
    id: "20260612-1",
    category: "serious",
    title: "韓国がチェコに2-1逆転勝利 ファン・インボムが1G1A",
    summary:
      "グループA第2試合（6/12）、韓国がグアダラハラでチェコに2-1の逆転勝利。59分にチェコのクレイチーが先制するも、67分にファン・インボムが同点弾、80分に途中出場のオ・ヒョンギュが決勝ゴールを決め逆転した。ファン・インボムは1ゴール1アシストの大活躍。日本と同じグループFではないが、アジア勢の快勝として注目される。",
    sourceName: "Yahoo!ニュース",
    sourceUrl: "https://news.yahoo.co.jp/articles/ea9cff0a1e80a9a8d635e424e9815980ac5b097b",
    date: "2026-06-12",
    tag: "試合結果",
  },
  {
    id: "20260612-2",
    category: "serious",
    title: "南野拓実、負傷離脱も「メンター」として日本代表に合流",
    summary:
      "左ひざ前十字靭帯断裂で26人枠から外れた南野拓実が「メンター」の立場でナッシュビルの日本代表ベースキャンプに合流。6月9日の練習に姿を現し、チームとランニングをこなした。森保監督は「チームを勝たせる存在になってほしい」と期待を語った。精神的支柱としてピッチ外からオランダ戦を支える。",
    sourceName: "サッカーキング",
    sourceUrl: "https://www.soccer-king.jp/news/japan/national/20260609/2169294.html",
    date: "2026-06-12",
    tag: "日本代表",
  },
  {
    id: "20260612-3",
    category: "serious",
    title: "オランダのDF ティンバー、股関節負傷でW杯2026全日程欠場確定",
    summary:
      "アーセナルのDF ユリエン・ティンバー（24）が股関節の故障から回復できず、W杯2026の欠場が確定。代替招集はルツァレル・ヘールトルーイダ（サンダーランド）に決定した。日本の初戦相手オランダにとって守備の主力が不在。日本にとっては好材料となるか、オランダ戦の注目点のひとつ。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/story/_/id/49001511/netherlands-arsenal-defender-jurrien-timber-miss-world-cup-injury",
    date: "2026-06-11",
    tag: "日本代表",
  },
  {
    id: "20260612-4",
    category: "serious",
    title: "スペインのヤマルとN・ウィリアムスが全体練習に復帰 初戦はベンチスタートの見通し",
    summary:
      "負傷で別メニュー調整が続いていたスペインのラミン・ヤマルとニコ・ウィリアムスが6月11日、チャタヌーガのベースキャンプで全体練習に合流。初戦（6/15、対カーボベルデ）ではスタメンを外れベンチスタートの見通しだが、2人の復帰でスペインの戦力は整いつつある。優勝候補の動向として注目。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/story/_/id/49031484/spain-world-cup-2026-lamine-yamal-nico-williams-injury",
    date: "2026-06-11",
    tag: "海外選手",
  },
  {
    id: "20260612-5",
    category: "fun",
    title: "開幕式に「ラブブ」コスチュームが登場 W杯×ポップカルチャーが世界でバズる",
    summary:
      "アステカスタジアムの開幕式で、人気キャラクター「ラブブ（Labubu）」を模したコスチュームをまとったマスコットがW杯トロフィーのぬいぐるみを持って登場。Xでトレンド入りするなど、サッカーとポップカルチャーの意外なコラボが世界中で話題に。今大会の「エンタメ化」を象徴する一幕として語り継がれそう。",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/sports/soccer/live-blog/fifa-world-cup-2026-opening-ceremonies-june-11-live-updates-rcna349400",
    date: "2026-06-11",
    tag: "面白ネタ",
  },

  // ─── 大会3日目（6/12〜13）最新試合結果 ───
  {
    id: "20260613-1",
    category: "serious",
    title: "バログン2発でUSAがパラグアイを4-1撃破 地元W杯最高のスタート",
    summary:
      "6/12（現地）、ロサンゼルスのSoFiスタジアムでグループD第1節。アメリカのFWフォラリン・バログン（アーセナル）が開始7分から2得点のブレイスで試合を決定づけ、終盤ジオ・レイナも加点し4-1の快勝。パラグアイはマウリシオの1点のみ。32年ぶりに自国開催となるW杯でUSAが最高のスタートを切った。バログンは得点ランキング単独トップへ。",
    sourceName: "CBS Sports",
    sourceUrl: "https://www.cbssports.com/soccer/news/usa-paraguay-live-updates-world-cup-2026-score-result/live/",
    date: "2026-06-12",
    tag: "試合結果",
  },
  {
    id: "20260613-2",
    category: "serious",
    title: "カナダがカナダの地でW杯初ポイント トロントでボスニアと1-1",
    summary:
      "6/12、BMOフィールド（トロント）でグループB第1節。ボスニアのルキッチが代表初ゴールで先制するも、カナダはラリンが78分に同点弾。共催国カナダが自国開催のW杯でついに勝ち点1を獲得した。試合はカナダのホームゲームとして歴史的な1戦に。次節カナダはカタールと、ボスニアはスイスとそれぞれ対戦する。",
    sourceName: "CBC",
    sourceUrl: "https://www.cbc.ca/sports/livestory/fifa-world-cup-2026-canada-vs-bosnia-and-herzegovina-june-12-live-updates-9.7222390",
    date: "2026-06-12",
    tag: "試合結果",
  },

  // ─── 日本代表 初戦（ファクトチェック済み 2026-06-15）───
  {
    id: "20260615-jpn",
    category: "serious",
    title: "日本、強豪オランダと2-2ドロー 2度追いつき価値ある勝点1 鎌田が土壇場同点弾",
    summary:
      "6/15（日本時間）、ダラスのAT&TスタジアムでグループF初戦。日本はFIFAランク8位のオランダと2-2で引き分けた。後半50分にファン・ダイクに先制を許すも、57分に久保建英のパスから中村敬斗が日本の大会1号ゴールで同点。64分にサマービルへ勝ち越されたが、88分に伊東純也のCKを小川航基が頭で合わせ、鎌田大地に当たったボールがネットを揺らし土壇場で再び追いついた。2度のビハインドを跳ね返す粘りで勝点1を獲得。久保は負傷交代と気がかりも残った。",
    sourceName: "スポーツ報知",
    sourceUrl: "https://news.yahoo.co.jp/articles/7a5a3f1099b1829ec9ae3b17194d38eceb68275e",
    date: "2026-06-15",
    tag: "試合結果",
  },
  {
    id: "20260615-grpf",
    category: "serious",
    title: "グループF混戦へ スウェーデンがチュニジアに5-1快勝 首位発進",
    summary:
      "日本と同じグループFのもう1試合では、スウェーデンがチュニジアを5-1で撃破。ヤシン・アヤリが2得点、イサク、ヨケレス、スバンベリも続いた。第1節を終えてグループFはスウェーデンが勝点3で首位、日本とオランダが勝点1、チュニジアが0。日本は第2戦でそのチュニジア（6/21・モンテレイ）と対戦する。ここで勝点3を取れば突破が大きく近づく。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/story/_/id/49064457/sweden-tunisia-live-world-cup-2026",
    date: "2026-06-15",
    tag: "試合結果",
  },

  // ─── 第2節〜各組第1節 総まとめ（ファクトチェック済み 2026-06-20）───
  {
    id: "20260620-qualified",
    category: "serious",
    title: "メキシコとアメリカが最速で決勝T進出 ともに2連勝で各組首位",
    summary:
      "開催国の2チームが一足先に突破を決めた。メキシコは韓国を1-0、アメリカはオーストラリアを2-0で下し、ともに2連勝・勝点6でグループ首位に。48チーム・新フォーマット最初の大会で、上位2位＋成績上位の3位8チームがラウンド32へ進む。一方トルコ・ハイチはすでに敗退濃厚と明暗が分かれた。",
    sourceName: "NPR",
    sourceUrl: "https://www.npr.org/2026/06/19/g-s1-129056/mexico-becomes-first-country-to-reach-knockout-stage-of-world-cup",
    date: "2026-06-20",
    tag: "試合結果",
  },
  {
    id: "20260620-messi",
    category: "serious",
    title: "メッシがW杯初ハットトリック アルゼンチンがアルジェリアを3-0",
    summary:
      "前回王者アルゼンチンのリオネル・メッシが、アルジェリア戦で自身W杯史上初となるハットトリックを達成し3-0で快勝。通算W杯得点を16に伸ばし、歴代最多記録を持つミロスラフ・クローゼに並んだ。38歳にして衰え知らずのレジェンドが、連覇へ向け最高の発進を切った。",
    sourceName: "Sky Sports",
    sourceUrl: "https://www.skysports.com/football/argentina-vs-algeria/report/549784",
    date: "2026-06-20",
    tag: "試合結果",
  },
  {
    id: "20260620-capeverde",
    category: "serious",
    title: "大波乱 W杯初出場カーボベルデがスペインと0-0 優勝候補を完封",
    summary:
      "人口約50万人、W杯初出場のカーボベルデが、優勝候補で欧州王者のスペインを相手に0-0のドローを演じる大金星。40歳の守護神ヴォジーニャが再三の好守でゴールを死守した。新フォーマットで増えた“小国”が、さっそく大会に旋風を巻き起こしている。",
    sourceName: "Sky Sports",
    sourceUrl: "https://www.skysports.com/football/spain-vs-cape-verde/report/549780",
    date: "2026-06-20",
    tag: "試合結果",
  },
  {
    id: "20260620-stars",
    category: "serious",
    title: "ムバッペは仏代表歴代最多得点者に ハーランドもW杯デビューで2発",
    summary:
      "スター候補も順調だ。フランスのキリアン・ムバッペはセネガル戦で2得点し、ジルーを抜いて代表歴代最多得点者に。28年ぶり出場ノルウェーのアーリング・ハーランドもイラク戦（4-1）でW杯デビュー2得点。カナダのジョナサン・デイビッドはカタール戦でハットトリックを記録し、得点ランキングでメッシと並んでトップに立った。",
    sourceName: "Al Jazeera",
    sourceUrl: "https://www.aljazeera.com/sports/2026/6/16/mbappe-brace-fires-france-to-3-1-win-over-senegal-in-world-cup-2026-opener",
    date: "2026-06-20",
    tag: "試合結果",
  },
  {
    id: "20260620-upsets",
    category: "fun",
    title: "波乱と劇的弾の連続 オーストリアは後半AT12分のPKで36年ぶり白星",
    summary:
      "第1節は番狂わせとドラマの宝庫に。オーストリアはヨルダン戦の後半アディショナルタイム12分、VAR判定のPKをアルナウトビッチが沈めて36年ぶりのW杯勝利。コートジボワールは終了間際のアマド・ディアロ弾でエクアドルの19戦無敗を止めた。DRコンゴはポルトガルと1-1で初の勝点をもぎ取り、ガーナもパナマを土壇場の一撃で下した。",
    sourceName: "Al Jazeera",
    sourceUrl: "https://www.aljazeera.com/sports/2026/6/17/austria-vs-jordan-fifa-world-cup-2026-marko-arnautovic-goal-penalty-football",
    date: "2026-06-20",
    tag: "試合結果",
  },

  // ─── 日本代表 第2戦・グループF第2節（ファクトチェック済み 2026-06-21）───
  {
    id: "20260621-jpn",
    category: "serious",
    title: "日本がチュニジアに4-0完勝 上田2発 W杯1試合4得点は史上初",
    summary:
      "6/21（日本時間）、モンテレイでのグループF第2戦で日本がチュニジアを4-0と圧倒。前半4分、中村敬斗のクロスを鎌田大地が押し込み日本W杯最速ゴール、31分に上田綺世、後半69分に伊東純也、83分に再び上田が決めた。日本がW杯1試合で4得点を挙げたのは史上初で、アジア勢初の快挙。勝点4とし、グループF突破へ大きく前進した（この試合は通算1000試合目のW杯マッチ）。チュニジアは敗退が決まった。",
    sourceName: "Sky Sports",
    sourceUrl: "https://www.skysports.com/football/tunisia-vs-japan/549801",
    date: "2026-06-21",
    tag: "試合結果",
  },
  {
    id: "20260621-grpf",
    category: "serious",
    title: "グループF オランダが5-1でスウェーデンを撃破し首位 日本は2位で突破争い",
    summary:
      "もう1試合はオランダがスウェーデンを5-1で粉砕。ブロビーとハクポが各2得点、サマービルも決めた（スウェーデンはエランガの1点）。第2節終了時点でグループFはオランダ・日本がともに勝点4（得失点差で蘭が首位、日本2位）、スウェーデン3、チュニジア0。最終節は日本×スウェーデン、チュニジア×オランダ（ともに6/26）。日本は引き分け以上で突破がほぼ確定する状況に。",
    sourceName: "Sky Sports",
    sourceUrl: "https://www.skysports.com/football/netherlands-vs-sweden/549800",
    date: "2026-06-21",
    tag: "試合結果",
  },
  {
    id: "20260621-ger",
    category: "serious",
    title: "ドイツも決勝T進出 ウンダフが94分弾でコートジボワールに2-1逆転",
    summary:
      "グループEではドイツが2連勝で決勝トーナメント進出を決めた。コートジボワールにケシエの先制を許す苦しい展開も、途中出場のデニス・ウンダフが68分と後半アディショナル94分に決めて2-1の逆転勝ち。ウンダフはわずか出場56分で3得点と大会の主役級の活躍。エクアドルとキュラソーは0-0で、キュラソーがW杯初勝点を獲得した。",
    sourceName: "Sky Sports",
    sourceUrl: "https://www.skysports.com/football/germany-vs-ivory-coast/549798",
    date: "2026-06-21",
    tag: "試合結果",
  },

  // ─── 第3節総まとめ・グループステージ最終結果（ファクトチェック済み 2026-06-27）───
  {
    id: "20260626-jpn",
    category: "serious",
    title: "日本、スウェーデンと1-1で引き分け グループF2位で初のラウンド32へ",
    summary:
      "6/26（JST）グループF最終節。日本は56分に前田大然が先制するも、62分にスウェーデンのエランガに同点弾を許し1-1のドロー。両チームが勝点5・4で突破確定。日本はグループF2位で史上初のラウンド32（決勝T1回戦）進出を果たした。同時刻のもう1試合ではオランダがチュニジアを3-1（スヒリOG・ブロビー・ファン・ヘッケ）で下し首位通過。日本の次戦はブラジル（6/29）。",
    sourceName: "Al Jazeera",
    sourceUrl: "https://www.aljazeera.com/sports/2026/6/26/japan-draw-1-1-with-sweden-at-world-cup-to-finish-second-in-group-f",
    date: "2026-06-26",
    tag: "試合結果",
  },
  {
    id: "20260626-messi",
    category: "serious",
    title: "メッシが通算6得点で得点トップ独走 アルゼンチンはグループJ全勝首位",
    summary:
      "グループJ最終節（6/27）、アルゼンチンはヨルダンを3-1で下し3連勝でグループ首位通過。メッシが80分に追加点を決め、大会通算6得点に。同時刻のアルジェリア対オーストリアは3-3の乱打戦。マフレズが2発を決めたアルジェリアは前半リードから追いつかれ、カラジジッチの94分弾で追いつかれる劇的展開となったが、両チームとも突破した。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/match/_/gameId/760480/jordan-argentina",
    date: "2026-06-27",
    tag: "試合結果",
  },
  {
    id: "20260626-dembele",
    category: "serious",
    title: "デンベレが第3節でハットトリック フランスがグループI3戦全勝",
    summary:
      "グループI最終節（6/27）、フランスはノルウェーを4-1で撃破しグループ首位で完全突破。ウスマン・デンベレが7・20・32分と3発のハットトリック。ドゥエが90+4分に追加点を決めた。グループ通算4得点のデンベレは得点ランキングで単独2位に浮上。同時刻のセネガル対イラクはセネガルが5-0の大勝で突破を決めた。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/match/_/gameId/760483/norway-france",
    date: "2026-06-27",
    tag: "試合結果",
  },
  {
    id: "20260625-groups",
    category: "serious",
    title: "グループステージ全48試合が完了 12組の1位・2位と8強3位が決定",
    summary:
      "グループ最終節が終了し、48チームから32チームが出揃った。各組1位：MEX・SUI・BRA・USA・GER・NED・BEL・ESP・FRA・ARG・COL・ENG。サプライズはカーボベルデ（H組2位）とDRコンゴ（K組3位で8強3位入り）のアフリカ勢躍進。コートジボワール（E組2位）とパラグアイ（D組3位）も突破。一方チュニジア・イラク・クウェートなど8チームが得点0のまま敗退した。",
    sourceName: "FIFA公式",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings",
    date: "2026-06-27",
    tag: "試合結果",
  },
  {
    id: "20260625-ecuador",
    category: "fun",
    title: "エクアドルがドイツを2-1撃破 コートジボワールも初の決勝T進出",
    summary:
      "グループE最終節では激震が走った。エクアドルがサネの先制点（2分）をアンギュロとプラタの2発で逆転しドイツを2-1で破る番狂わせ。エクアドルは3位で突破。同時刻にコートジボワールがキュラソーをペペのブレイスで2-0と粉砕しW杯史上初の決勝T進出を果たした。ドイツはグループ首位通過を守ったが最終節の黒星は誤算だった。",
    sourceName: "Al Jazeera",
    sourceUrl: "https://www.aljazeera.com/sports/2026/6/25/ecuador-edge-germany-2-1-to-squeeze-into-world-cup-last-32",
    date: "2026-06-25",
    tag: "試合結果",
  },
  {
    id: "20260628-r32",
    category: "serious",
    title: "ラウンド32開幕！カナダがエウスタキオの劇弾で南アフリカを1-0撃破",
    summary:
      "6/28（現地）、W杯史上初のラウンド32（決勝T1回戦）が開幕。SoFiスタジアム（LA）でカナダが南アフリカと対戦し、後半アディショナル90+2分にスティーヴン・エウスタキオが劇的決勝弾を決め1-0で勝利。カナダがW杯ノックアウトステージ初勝利を飾った。48チームの新フォーマットで新設されたこのラウンドはW杯史上初の試みで、グループ3位8チームも出場権を得ており、小国・新興国に大きなチャンスが与えられている。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/match/_/gameId/760488/south-africa-canada",
    date: "2026-06-29",
    tag: "試合結果",
  },
  {
    id: "20260629-jpnbra",
    category: "serious",
    title: "ブラジル 2-1 日本 前半は互角も後半に逆転 ラウンド32で日本敗退",
    summary:
      "6/29（現地）、ヒューストン・NRGスタジアムのラウンド32でブラジルと対戦した日本は、29分に佐野海舟が値千金の先制点。前半をリードで折り返す大健闘を見せたが、後半開始早々の56分にカゼミロのヘッドで追いつかれると、アディショナルタイム90+5分に途中出場のマルティネッリに決勝点を許し2-1で逆転負け。鈴木彩艶がヴィニシウス・ジュニオールの決定機をポスト直撃のセーブで防ぐ好プレーもあったが、及ばなかった。日本はラウンド32で大会を終えた。森保一監督は「監督としての力不足で申し訳ない」と涙ながらに語りつつ、「世界一を目指す気持ちを持ち続ければ、必ずそこに辿り着ける」と前を向いた。冨安健洋は「世界のトップと対等に戦うにはまだ足りないものがあると痛感した」と悔しさをにじませた。海外メディアからは日本の前半の内容を称賛する声が相次いだ。",
    sourceName: "JFA公式／NHK",
    sourceUrl: "https://www.jfa.jp/samuraiblue/news/00036487/",
    date: "2026-06-29",
    tag: "日本代表",
  },
  {
    id: "20260629-par",
    category: "fun",
    title: "ドイツがまさかのPK戦敗退 パラグアイが史上最大級の金星",
    summary:
      "ラウンド32、ボストン（フォックスボロ）でドイツとパラグアイが対戦。エンシソの先制点をハフェルツが53分に追いつき1-1のまま延長でも決着つかず、PK戦の末パラグアイが4-3で勝利。ドイツにとって史上初のW杯PK戦敗退という歴史的な番狂わせとなった。同日、モンテレイではオランダがモロッコとPK戦の末3-2で敗退。ブヌーの好セーブとサイバリの決勝キックでモロッコが8強進出への望みをつないだ。",
    sourceName: "Sky Sports／Al Jazeera",
    sourceUrl: "https://www.skysports.com/football/news/12098/13558811/",
    date: "2026-06-29",
    tag: "試合結果",
  },
  {
    id: "20260701-bel",
    category: "fun",
    title: "ベルギーが延長125分の劇的PK弾でセネガル撃破 W杯史上最も遅い決勝点に",
    summary:
      "シアトルで行われたラウンド32、ベルギーは86分までセネガルに0-2とリードを許す絶体絶命の展開から、ルカクとティーレマンスの連続ゴールで追いつき延長へ。延長後半のアディショナルタイム、125分に与えられたPKをティーレマンスが決め3-2で劇的勝利。この決勝点はW杯史上最も遅い時間帯に記録されたゴールと報じられた。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/",
    date: "2026-07-01",
    tag: "試合結果",
  },
  {
    id: "20260705-brahaaland",
    category: "serious",
    title: "ハーランドの2発でブラジル撃破 ネイマールが代表引退を電撃発表",
    summary:
      "ラウンド16、ニューヨーク/ニュージャージーでノルウェーがブラジルと対戦。終盤の79分・90分にエルリング・ハーランドが立て続けに決めてブラジルを2-1で撃破。ブラジルはアディショナルタイムにネイマールのPKで1点を返すのが精一杯で、1990年大会以来という早い段階での敗退となった。試合直後、感極まった様子のネイマールが代表引退を表明。ブラジル代表歴代最多となる通算80得点を記録して現役代表キャリアに幕を下ろした。日本を破ったブラジルがこの試合で姿を消したことで、日本ファンの間でも複雑な反応が広がった。",
    sourceName: "ESPN",
    sourceUrl: "https://www.espn.com/soccer/story/_/id/49216087/",
    date: "2026-07-05",
    tag: "試合結果",
  },
  {
    id: "20260706-ronaldo",
    category: "serious",
    title: "ロナウド最後のW杯か スペインが土壇場で下しポルトガル敗退",
    summary:
      "ラウンド16、アーリントン（ダラス）でスペインとポルトガルが対戦。0-0で迎えたアディショナルタイム90+1分、85分投入の途中出場メリノが決勝点を挙げスペインが1-0で勝利。ポルトガルは敗退し、クリスティアーノ・ロナウドにとって本大会が最後のW杯になるとの見方が大勢を占めている。またスペインGKウナイ・シモンは無失点記録を609分に伸ばし、イタリア大会（1990年）のワルテル・ゼンガが持つ517分の記録を更新した。",
    sourceName: "Olympics.com",
    sourceUrl: "https://www.olympics.com/",
    date: "2026-07-06",
    tag: "試合結果",
  },
  {
    id: "20260707-messi",
    category: "serious",
    title: "0-2から大逆転 メッシのアルゼンチンが劇的な準々決勝進出",
    summary:
      "ラウンド16、アトランタでアルゼンチンとエジプトが対戦。前半にPKを失敗するなど苦しんだメッシだったが、0-2とリードされた終盤の79分からアルゼンチンが3得点を挙げる大逆転。メッシ自身も83分に決めてW杯通算21得点目（歴代記録を更新中）を記録し、3-2で準々決勝進出を決めた。この試合はW杯史上通算3000点目のゴールが生まれた一戦としても話題に。",
    sourceName: "CBS Sports",
    sourceUrl: "https://www.cbssports.com/soccer/",
    date: "2026-07-07",
    tag: "試合結果",
  },
  {
    id: "20260708-goldenboot",
    category: "fun",
    title: "得点王争いが大混戦 メッシ・ムバッペ・ハーランドが7点以上で並走",
    summary:
      "ラウンド16終了時点で、メッシ・ムバッペ・ハーランドの3人がそろって7得点以上をマーク。1大会で3人が同時に7点以上を記録するのはW杯史上初めてという記録づくめの展開に。準々決勝以降、誰が単独トップに抜け出すのか大会終盤最大の見どころとなっている。",
    sourceName: "100倍Wカップ編集部",
    sourceUrl: "/stats",
    date: "2026-07-08",
    tag: "大会情報",
  },
  {
    id: "20260709-qf1",
    category: "serious",
    title: "準々決勝開幕 フランスがモロッコを2-0で下しベスト4進出",
    summary:
      "7/9、ボストン（フォックスボロ）で準々決勝の初戦が行われ、フランスがモロッコを2-0で下しベスト4進出。ムバッペが得点に絡み、得点ランキングトップ争いにも弾みをつけた。残る準々決勝3試合はスペイン対ベルギー（7/10・LA）、ノルウェー対イングランド（7/11・マイアミ）、アルゼンチン対スイス（7/11・カンザスシティ）の順で行われる。",
    sourceName: "FIFA公式",
    sourceUrl: "https://www.fifa.com/",
    date: "2026-07-09",
    tag: "試合結果",
  },
];
