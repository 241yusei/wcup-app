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
    title: "吉田麻也の“花道” アイスランド戦で先発→13分で腕章を遠藤へ",
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
      "再開を遅らせると相手ボールになる“新5秒ルール”など、今大会は細かなルール改正が話題。守護神の鈴木彩艶は『最悪のコーナーは避けたい。時間がなければすぐ蹴ってタッチラインを割るのも一つの戦術』と適応の構えを語った。",
    sourceName: "ゲキサカ",
    sourceUrl: "https://web.gekisaka.jp/news/japan/detail/?452700-452700-fl=",
    date: "2026-06-01",
    tag: "豆知識",
  },
];
