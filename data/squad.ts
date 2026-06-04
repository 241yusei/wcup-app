// 2026 W杯 日本代表 正式26名のメンバー名簿。
// 背番号・氏名・ポジション・所属クラブはJFA公式（samuraiblue/worldcup_2026）に基づく。
// 年齢・身長・代表歴・役割・プレースタイルは一次情報でリサーチして補完。
// ※ 顔写真は実在本人の生成画像ではなく、ポジション/背番号ベースの非実在カード表現。

export type Pos = "GK" | "DF" | "MF" | "FW";

export interface SquadPlayer {
  number: number;
  name: string;
  enName?: string;
  position: Pos;
  club: string; // 日本語表記
  clubFlag: string; // 所属クラブの国・地域の旗
  age?: number; // 2026年6月時点
  height?: number; // cm
  caps?: string; // 国際Aマッチ出場数（おおよそ）
  goals?: string; // 代表得点（主にFW）
  role?: string; // 役割の一言
  style?: string; // プレースタイル・見どころ
}

export const manager = "森保一";

// JFA公式の26名（researchで age/height/caps/role/style を補完）。
export const squad: SquadPlayer[] = [
  // GK
  { number: 1, name: "鈴木彩艶", enName: "Zion Suzuki", position: "GK", club: "パルマ", clubFlag: "🇮🇹", age: 23, height: 190, caps: "約24試合", role: "守護神", style: "190cmの長身から繰り出す反射神経とビッグセーブが武器。足元の技術も高く、後方からのビルドアップの起点になれる現代型GK。" },
  { number: 12, name: "大迫敬介", enName: "Keisuke Osako", position: "GK", club: "サンフレッチェ広島", clubFlag: "🇯🇵", age: 26, height: 190, caps: "約11試合", role: "国内組の正GK候補", style: "J屈指のシュートストップ能力を持つ広島の守護神。安定したセービングと冷静な判断で、Jリーグから代表に上り詰めた実力派。" },
  { number: 23, name: "早川友基", enName: "Tomoki Hayakawa", position: "GK", club: "鹿島アントラーズ", clubFlag: "🇯🇵", age: 27, height: 187, caps: "約2試合", role: "新進気鋭の第3GK", style: "2025年JリーグMVPに輝いた鹿島の正守護神。安定感とハイボール処理に定評があり、遅咲きで代表入りを掴んだ努力の人。" },
  // DF
  { number: 2, name: "菅原由勢", enName: "Yukinari Sugawara", position: "DF", club: "ヴェルダー・ブレーメン", clubFlag: "🇩🇪", age: 25, height: 179, caps: "約20試合", role: "攻撃的右サイドバック", style: "愛知出身。オランダ・イングランドを経てドイツへ。攻め上がりの推進力とクロスが持ち味で、右サイドを上下動するモダンなSB。" },
  { number: 3, name: "谷口彰悟", enName: "Shogo Taniguchi", position: "DF", club: "シント＝トロイデン", clubFlag: "🇧🇪", age: 34, height: 185, caps: "約38試合", role: "最終ラインの統率者", style: "高い戦術理解と正確なフィードで守備を組み立てる司令塔型CB。カタールW杯も経験した、ライン統率の要となる落ち着いた存在。" },
  { number: 4, name: "板倉滉", enName: "Ko Itakura", position: "DF", club: "アヤックス", clubFlag: "🇳🇱", age: 29, height: 186, caps: "約39試合", role: "守備の主軸CB", style: "対人の強さと読みの鋭さを兼ね備えた代表守備の中心。元はボランチで、足元の技術と空中戦の両方で計算できる二刀流CB。" },
  { number: 5, name: "長友佑都", enName: "Yuto Nagatomo", position: "DF", club: "FC東京", clubFlag: "🇯🇵", age: 39, height: 170, caps: "約144試合", role: "ベテランの精神的支柱", style: "5度目のW杯に挑む日本サッカーの生き字引。無尽蔵のスタミナと経験値で、ピッチ内外からチームを鼓舞するレジェンド左SB。" },
  { number: 16, name: "渡辺剛", enName: "Tsuyoshi Watanabe", position: "DF", club: "フェイエノールト", clubFlag: "🇳🇱", age: 29, height: 186, caps: "約10試合", role: "高さに強いCB", style: "空中戦の強さとフィジカルが武器のCB。ベルギーを経てオランダの名門で主軸に成長中。対人守備で違いを出せるストッパー。" },
  { number: 20, name: "瀬古歩夢", enName: "Ayumu Seko", position: "DF", club: "ル・アーヴル", clubFlag: "🇫🇷", age: 25, height: 186, caps: "約10試合", role: "マルチに守れる若手CB", style: "センターバックもボランチもこなす視野の広さが魅力。フランス1部で揉まれ、ビルドアップ能力と冷静な対応で評価を高めている。" },
  { number: 21, name: "伊藤洋輝", enName: "Hiroki Ito", position: "DF", club: "バイエルン・ミュンヘン", clubFlag: "🇩🇪", age: 27, height: 188, caps: "約23試合", role: "左利きのCB／左SB", style: "欧州王者バイエルン所属の左利きDF。長い距離を一発で通すロングフィードと懐の深い守備で、左サイドに幅と精度をもたらす。" },
  { number: 22, name: "冨安健洋", enName: "Takehiro Tomiyasu", position: "DF", club: "アヤックス", clubFlag: "🇳🇱", age: 27, height: 188, caps: "約42試合", role: "守備の柱（万能型）", style: "CB・右SB・左SBを高水準でこなす万能ディフェンダー。対人守備の強さは世界級で、相手エースを封じる対応力が最大の武器。" },
  { number: 25, name: "鈴木淳之介", enName: "Junnosuke Suzuki", position: "DF", club: "コペンハーゲン", clubFlag: "🇩🇰", age: 22, height: 180, caps: "約3試合", role: "期待の若手DF", style: "湘南からデンマークへ羽ばたいた左利きの若手DF。CB・SB・ボランチをこなす万能性と、果敢な対人・運ぶ力でブレイク中の伸び盛り。" },
  // MF
  { number: 6, name: "遠藤航", enName: "Wataru Endo", position: "MF", club: "リバプール", clubFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", age: 33, height: 178, caps: "約73試合", role: "中盤の番人（主将）", style: "守備範囲の広さとボール奪取が武器の守備的MF。日本の心臓にして主将。プレミアの強豪リバプールで揉まれた経験が代表の安定感を支える。" },
  { number: 7, name: "田中碧", enName: "Ao Tanaka", position: "MF", club: "リーズ・ユナイテッド", clubFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", age: 27, height: 180, caps: "約38試合", role: "司令塔", style: "攻守をつなぐパスとゲームメイクが持ち味のセントラルMF。展開力に加えゴール前へ飛び込む嗅覚もあり、得点もこなす中盤の万能型。" },
  { number: 8, name: "久保建英", enName: "Takefusa Kubo", position: "MF", club: "レアル・ソシエダ", clubFlag: "🇪🇸", age: 25, height: 173, caps: "約49試合", role: "攻撃の核", style: "元バルサ育ちの天才ドリブラー。右サイドから左足でカットインして仕掛ける形が代名詞。日本の攻撃を牽引するエースの一人。" },
  { number: 10, name: "堂安律", enName: "Ritsu Doan", position: "MF", club: "アイントラハト・フランクフルト", clubFlag: "🇩🇪", age: 27, height: 172, caps: "約65試合", role: "勝負師（背番号10）", style: "正確な左足とドリブルで仕掛ける攻撃的MF。大舞台に強く、カタールW杯ではドイツ・スペイン相手にゴール。背番号10の勝負強さが魅力。" },
  { number: 13, name: "中村敬斗", enName: "Keito Nakamura", position: "MF", club: "ランス", clubFlag: "🇫🇷", age: 25, height: 180, caps: "約25試合", role: "左の仕掛け人", style: "左サイドから切れ込んで決める得点感覚が光るアタッカー。少ない出場機会で2桁ゴールと高い決定力を誇る、近年急成長の左ウイング。" },
  { number: 14, name: "伊東純也", enName: "Junya Ito", position: "MF", club: "ヘンク", clubFlag: "🇧🇪", age: 33, height: 176, caps: "約69試合", role: "スピードスター", style: "圧倒的なスピードと右サイドの突破が武器のウインガー。爆発的な加速で相手を置き去りにし、正確なクロスでチャンスを量産するベテラン。" },
  { number: 15, name: "鎌田大地", enName: "Daichi Kamada", position: "MF", club: "クリスタル・パレス", clubFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", age: 29, height: 180, caps: "約49試合", role: "頭脳派プレーメーカー", style: "視野の広さと技術でゲームを操る知性派MF。トップ下から守備的MFまでこなし、24-25季はクリスタル・パレスのFAカップ初優勝に貢献。" },
  { number: 17, name: "鈴木唯人", enName: "Yuito Suzuki", position: "MF", club: "フライブルク", clubFlag: "🇩🇪", age: 24, height: 175, caps: "約6試合", role: "新世代の技巧派", style: "ドリブルとアイデアで違いを生む攻撃的MF。デンマークでの活躍を経てドイツ1部フライブルクへステップアップした、伸びしろの楽しみな若手。" },
  { number: 19, name: "小川航基", enName: "Koki Ogawa", position: "MF", club: "NECナイメヘン", clubFlag: "🇳🇱", age: 28, height: 186, caps: "約15試合", role: "高さの的（本職FW）", style: "本来は長身ストライカー。186cmの高さと得点力が武器で、代表でも高効率に得点。今大会はMF登録だが前線の起点として機能する。" },
  { number: 24, name: "佐野海舟", enName: "Kaishu Sano", position: "MF", club: "マインツ", clubFlag: "🇩🇪", age: 25, height: 176, caps: "約13試合", role: "ボール奪取役", style: "豊富な運動量と球際の強さで中盤を制圧するアンカー型。遠藤の後継と目される守備の要で、相手の攻撃の芽を摘むデュエルの強さが持ち味。" },
  // FW
  { number: 9, name: "後藤啓介", enName: "Keisuke Goto", position: "FW", club: "シント＝トロイデン", clubFlag: "🇧🇪", age: 20, height: 191, caps: "約4試合", goals: "約0点", role: "超新星", style: "191cmの長身を生かすポストプレーと高さが武器の若手ストライカー。21歳未満でW杯メンバー入りした未来のエース候補。ベルギーで得点を量産中。" },
  { number: 11, name: "前田大然", enName: "Daizen Maeda", position: "FW", club: "セルティック", clubFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", age: 28, height: 173, caps: "約27試合", goals: "約4点", role: "スピードスター", style: "50m6秒を切る快足と無尽蔵のスタミナで前線から走り回るFW。セルティックでは24-25季リーグ16ゴール。プレスとカウンターで違いを作る。" },
  { number: 18, name: "上田綺世", enName: "Ayase Ueda", position: "FW", club: "フェイエノールト", clubFlag: "🇳🇱", age: 27, height: 182, caps: "約39試合", goals: "約16点", role: "点取り屋（9番格）", style: "高い決定力とジャンプ力を兼ね備えた本格派センターフォワード。オランダ1部で得点王級の活躍を見せ、代表でも約16得点。日本の9番格。" },
  { number: 26, name: "塩貝健人", enName: "Kento Shiogai", position: "FW", club: "ヴォルフスブルク", clubFlag: "🇩🇪", age: 21, height: 180, caps: "約1試合", goals: "約0点", role: "超新星", style: "慶應大からドイツに渡った異色のエリート。2026年3月のスコットランド戦でA代表デビューし伊東の決勝点をアシストしたサプライズ選出の若手。" },
];

export const posMeta: Record<Pos, { label: string; full: string; icon: string; color: string }> = {
  GK: { label: "GK", full: "ゴールキーパー", icon: "🧤", color: "#1aa3a3" },
  DF: { label: "DF", full: "ディフェンダー", icon: "🛡️", color: "#2f6fed" },
  MF: { label: "MF", full: "ミッドフィルダー", icon: "🎯", color: "#8e44ad" },
  FW: { label: "FW", full: "フォワード", icon: "⚡", color: "#d7282f" },
};

export const posOrder: Pos[] = ["GK", "DF", "MF", "FW"];
