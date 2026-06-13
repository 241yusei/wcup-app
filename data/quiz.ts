// オンボーディング診断クイズ — データ層
// 問題・選択肢・点数・5段階レベル定義・推薦ページをすべてここで管理する。
// React に依存しない純データファイル。

export interface QuizAnswer {
  id: string;
  label: string; // 絵文字 + テキスト
  points: number; // 0–3
  tag?: string; // "social" | "solo" など任意のメタ
}

export interface QuizQuestion {
  id: string;
  question: string;
  note?: string; // サブテキスト（任意）
  answers: QuizAnswer[];
}

export type UserLevelId = "lv1" | "lv2" | "lv3" | "lv4" | "lv5";

export interface RecommendedPage {
  href: string;
  icon: string;
  title: string;
  reason: string; // "なぜこのページが合うか" の一行コピー
}

export interface UserLevel {
  id: UserLevelId;
  scoreMin: number;
  scoreMax: number;
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  welcomeMessage: string;
  recommendations: RecommendedPage[];
}

export interface QuizResult {
  levelId: UserLevelId;
  totalScore: number;
  answers: Record<string, string>; // questionId → answerId
  completedAt: string; // ISO timestamp
}

export const QUIZ_DONE_KEY = "quiz-done"; // "1" | "skipped"
export const QUIZ_RESULT_KEY = "quiz-result"; // JSON(QuizResult)

// ─── 5問 ────────────────────────────────────────────────────────────────────
// 合計: 0〜13点

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    question: "W杯、どのくらい楽しみにしてますか？",
    answers: [
      { id: "q1a", label: "🔥 カレンダーに全試合入れた！", points: 2 },
      { id: "q1b", label: "⚽ 日本戦だけは絶対見る", points: 1 },
      { id: "q1c", label: "👀 なんとなく気になってる", points: 1 },
      { id: "q1d", label: "🆕 正直よくわからないけど話題だから", points: 0 },
    ],
  },
  {
    id: "q2",
    question: "オフサイドって、説明できますか？",
    note: "日本代表戦を100倍楽しむカギかも。",
    answers: [
      { id: "q2a", label: "🎓 友達に図を描いて説明できる", points: 3 },
      {
        id: "q2b",
        label: "📖 なんとなく知ってる（「前に出てたらダメ」くらい）",
        points: 2,
      },
      {
        id: "q2c",
        label: "🤔 名前は聞いたことある、でもよくわからない",
        points: 1,
      },
      { id: "q2d", label: "❓ 初耳です", points: 0 },
    ],
  },
  {
    id: "q3",
    question: "サッカーを見るとき、どこを見てますか？",
    answers: [
      { id: "q3a", label: "🔭 ボールのない選手の動きやスペース", points: 3 },
      { id: "q3b", label: "🧩 注目選手やフォーメーションの変化", points: 2 },
      { id: "q3c", label: "⚽ ボールとゴール周辺の動き", points: 1 },
      { id: "q3d", label: "😅 あまり見たことがない", points: 0 },
    ],
  },
  {
    id: "q4",
    question: "次のうち、知っているものを選んでください",
    answers: [
      {
        id: "q4a",
        label: "✅ xG・プレッシング強度・ポジショナルプレー — 全部わかる",
        points: 3,
      },
      {
        id: "q4b",
        label: "🧠 4-3-3や4-2-3-1など、フォーメーションの違いはわかる",
        points: 2,
      },
      {
        id: "q4c",
        label: "📝 イエローカード・レッドカード・PK戦くらいはわかる",
        points: 1,
      },
      { id: "q4d", label: "🆕 これ全部はじめて見る言葉かも", points: 0 },
    ],
  },
  {
    id: "q5",
    question: "W杯、誰と見る予定ですか？",
    answers: [
      {
        id: "q5a",
        label: "🍺 みんなでパブリックビューイング！",
        points: 2,
        tag: "social",
      },
      {
        id: "q5b",
        label: "🏠 家族・友人とわいわい見たい",
        points: 1,
        tag: "social",
      },
      { id: "q5c", label: "📱 ひとりでじっくり見たい", points: 2, tag: "solo" },
      { id: "q5d", label: "🤷 まだ決まってない", points: 0 },
    ],
  },
];

// ─── 5段階レベル ──────────────────────────────────────────────────────────────
// スコア: 0–2 / 3–5 / 6–8 / 9–11 / 12–13

export const levels: UserLevel[] = [
  {
    id: "lv1",
    scoreMin: 0,
    scoreMax: 2,
    emoji: "🌱",
    name: "はじめてさん",
    tagline: "ルールより感動が先。それでいい。",
    description:
      "サッカーは初めてでも大丈夫。日本代表が勝てば嬉しい、それだけでW杯は楽しめます。",
    welcomeMessage:
      "サッカーの世界へようこそ！このアプリが100倍サポートします。",
    recommendations: [
      {
        href: "/guide",
        icon: "🧭",
        title: "100倍ガイド",
        reason: "まずここから！3分でルールと観戦のコツがわかる",
      },
      {
        href: "/japan",
        icon: "🇯🇵",
        title: "日本特集",
        reason: "日本代表の試合日程と見どころ。これだけ読めばOK",
      },
      {
        href: "/watch",
        icon: "📺",
        title: "どこで見る？",
        reason: "地上波・配信ガイド。無料で見る方法も",
      },
      {
        href: "/news",
        icon: "📰",
        title: "ニュース",
        reason: "友達に話せる面白ネタ、毎日更新中",
      },
      {
        href: "/teams",
        icon: "🌍",
        title: "各国図鑑",
        reason: "推し国・推し選手を1人だけ決めてみよう",
      },
    ],
  },
  {
    id: "lv2",
    scoreMin: 3,
    scoreMax: 5,
    emoji: "🇯🇵",
    name: "日本戦ファン",
    tagline: "日本が勝てば、それだけで幸せ。",
    description:
      "日本代表の試合はしっかり見る派。今回は久保建英を軸にした最強チームを応援しよう。",
    welcomeMessage: "日本代表を100倍楽しむ準備、できてますか？",
    recommendations: [
      {
        href: "/japan",
        icon: "🇯🇵",
        title: "日本特集",
        reason: "グループF突破条件・対戦国の攻略を全まとめ",
      },
      {
        href: "/squad",
        icon: "📋",
        title: "代表メンバー",
        reason: "サムライブルー26名。推し選手はここで見つかる",
      },
      {
        href: "/predictions",
        icon: "🔮",
        title: "勝敗予想",
        reason: "勝敗を予想して的中率を競おう",
      },
      {
        href: "/schedule",
        icon: "🕐",
        title: "試合日程",
        reason: "日本時間の日程。深夜試合はリマインダー登録を",
      },
      {
        href: "/news",
        icon: "📰",
        title: "ニュース",
        reason: "日本代表の最新情報をまとめ読み",
      },
    ],
  },
  {
    id: "lv3",
    scoreMin: 6,
    scoreMax: 8,
    emoji: "🌍",
    name: "W杯ファン",
    tagline: "日本だけじゃない。48カ国の物語を追う。",
    description:
      "日本戦以外も楽しめる観戦派。新興国の躍進や意外な強豪を発見するのがW杯の醍醐味。",
    welcomeMessage: "48カ国の中に、きっと新しい推しがいる。",
    recommendations: [
      {
        href: "/groups",
        icon: "📊",
        title: "グループ順位表",
        reason: "全12組の組み合わせと勝点。突破圏を一目で",
      },
      {
        href: "/teams",
        icon: "🏴",
        title: "各国図鑑",
        reason: "48カ国の戦術・注目選手・小ネタを網羅",
      },
      {
        href: "/bracket",
        icon: "🏆",
        title: "決勝トーナメント",
        reason: "日本の勝ち上がりロードを先取り予習",
      },
      {
        href: "/predictions",
        icon: "🔮",
        title: "識者の優勝予想",
        reason: "世界中の識者の本命はどこ？出典付きで総まとめ",
      },
      {
        href: "/guide",
        icon: "🔭",
        title: "サッカー深掘り",
        reason: "戦術キーワードを覚えると観戦の解像度が変わる",
      },
    ],
  },
  {
    id: "lv4",
    scoreMin: 9,
    scoreMax: 11,
    emoji: "🧠",
    name: "サッカー通",
    tagline: "フォーメーションの裏を読む、それが本当の楽しみ。",
    description:
      "フォーメーションも戦術も語れる上級観戦派。このアプリの通向けコンテンツを使い倒してほしい。",
    welcomeMessage:
      "あなたなら分かる — このアプリ、通の視点で使い倒してください。",
    recommendations: [
      {
        href: "/guide",
        icon: "🔭",
        title: "サッカー深掘り",
        reason: "通向けコンテンツ集。観戦の解像度をさらに上げる",
      },
      {
        href: "/guide",
        icon: "🐱",
        title: "トリオンの玄人解説",
        reason: "トリオンが忖度なしで語る本音分析",
      },
      {
        href: "/teams",
        icon: "🏴",
        title: "各国図鑑",
        reason: "各国の戦術詳細まで踏み込んで読める",
      },
      {
        href: "/predictions",
        icon: "🏆",
        title: "識者の優勝予想",
        reason: "統計モデルと識者予想を自分の読みと照らし合わせる",
      },
      {
        href: "/bracket",
        icon: "📊",
        title: "決勝トーナメント",
        reason: "組み合わせから優勝ロードを自分で読む",
      },
    ],
  },
  {
    id: "lv5",
    scoreMin: 12,
    scoreMax: 13,
    emoji: "🔭",
    name: "サッカーオタク",
    tagline: "W杯は4年に一度の祭典じゃない。全48チームの研究対象だ。",
    description:
      "年間を通してサッカーを見る本物のオタク。xGもプレッシング強度もお手の物。",
    welcomeMessage:
      "本物のサッカーオタク向けのコンテンツ、用意してあります。",
    recommendations: [
      {
        href: "/guide",
        icon: "🐱",
        title: "トリオンの玄人解説",
        reason: "忖度なしの強者目線。あなたの視点と照らし合わせて",
      },
      {
        href: "/guide",
        icon: "🔭",
        title: "サッカー深掘り",
        reason: "xG・ポジショナルプレー — 全セクション解禁",
      },
      {
        href: "/predictions",
        icon: "🏆",
        title: "識者の優勝予想",
        reason: "Optaモデル vs 現地記者の読み。あなたはどっちに賭ける？",
      },
      {
        href: "/bracket",
        icon: "📊",
        title: "決勝トーナメント",
        reason: "優勝ロードを自分で組み立てる",
      },
      {
        href: "/teams",
        icon: "🌍",
        title: "各国図鑑",
        reason: "ダークホース国の戦術を読み解く。48カ国の深掘り",
      },
    ],
  },
];

/** スコアに対応する UserLevel を返す（範囲外は lv1 を返す）*/
export function scoreToLevel(score: number): UserLevel {
  return (
    levels.find((l) => score >= l.scoreMin && score <= l.scoreMax) ?? levels[0]
  );
}
