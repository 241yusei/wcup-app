// 非実在の汎用マスコット・アバター（実在の本人似顔ではない）。
// 背番号/シードとポジションからパラメータを決め、髪型・色・アクセサリーを
// 振り分けて「チビキャラ」を生成する。選手版（ユニフォーム）とコーチ版（スーツ）。

type Pos = "GK" | "DF" | "MF" | "FW";
type Variant = "player" | "coach";

const SKIN = ["#f6d3b0", "#eebd96", "#f3c9a3", "#e6b083"];
const HAIR = ["#1a1a1a", "#2b2118", "#3a2a1a", "#4a3420", "#5a4631", "#6b6657"];
const POS_COLOR: Record<Pos, string> = {
  GK: "#1aa3a3",
  DF: "#2f6fed",
  MF: "#8e44ad",
  FW: "#d7282f",
};

function hash(n: number, salt: number) {
  return Math.abs((n * 73 + salt * 31 + 7) % 997);
}

function Hair({ style, color }: { style: number; color: string }) {
  switch (style % 6) {
    case 0:
      return <path d="M27 44 Q27 18 50 18 Q73 18 73 44 Q73 30 50 30 Q27 30 27 44 Z" fill={color} />;
    case 1:
      return (
        <>
          <path d="M28 46 Q27 17 50 17 Q73 17 72 46 Q68 33 61 32 Q59 24 50 24 Q41 24 39 32 Q32 33 28 46 Z" fill={color} />
          <rect x="29" y="38" width="6" height="11" rx="3" fill={color} />
          <rect x="65" y="38" width="6" height="11" rx="3" fill={color} />
        </>
      );
    case 2:
      return <path d="M27 45 Q27 17 50 17 Q73 17 73 45 Q70 31 52 31 L52 22 L48 22 L48 31 Q30 31 27 45 Z" fill={color} />;
    case 3:
      return <path d="M26 47 Q26 16 50 16 Q74 16 74 47 Q66 33 50 33 Q34 33 26 47 Z" fill={color} />;
    case 4:
      return (
        <>
          <circle cx="50" cy="18" r="7" fill={color} />
          <path d="M28 44 Q28 19 50 19 Q72 19 72 44 Q70 31 50 31 Q30 31 28 44 Z" fill={color} />
        </>
      );
    default:
      return (
        <>
          <path d="M29 45 Q29 22 50 22 Q71 22 71 45 Q66 34 50 34 Q34 34 29 45 Z" fill={color} />
          <path d="M44 22 Q50 8 56 22 Q50 18 44 22 Z" fill={color} />
        </>
      );
  }
}

export default function PlayerAvatar({
  number,
  position = "MF",
  size = 72,
  isCaptain = false,
  variant = "player",
  seed,
}: {
  number?: number;
  position?: Pos;
  size?: number;
  isCaptain?: boolean;
  variant?: Variant;
  seed?: number;
}) {
  const s = seed ?? number ?? 0;
  const skin = SKIN[hash(s, 1) % SKIN.length];
  const hair = HAIR[hash(s, 2) % HAIR.length];
  const hairStyle = hash(s, 3);
  const accent = variant === "coach" ? "#14224f" : POS_COLOR[position];
  const uid = `${variant}-${position}-${s}`;
  const tie = hash(s, 4) % 2 === 0 ? "#d7282f" : "#2f6fed";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="アバター（イメージ）">
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#bg-${uid})`} stroke={accent} strokeOpacity="0.45" />

      {variant === "coach" ? (
        <>
          {/* スーツのジャケット */}
          <path d="M26 100 Q26 78 50 78 Q74 78 74 100 Z" fill="#2b2f3a" />
          {/* シャツ */}
          <path d="M42 79 L50 100 L58 79 Z" fill="#fbfaf5" />
          {/* 襟（ラペル） */}
          <path d="M44 79 L50 90 L42 86 Z" fill="#3a3f4c" />
          <path d="M56 79 L50 90 L58 86 Z" fill="#3a3f4c" />
          {/* ネクタイ */}
          <path d="M50 81 L47 86 L50 99 L53 86 Z" fill={tie} />
        </>
      ) : (
        <>
          {/* サムライブルーのユニフォーム */}
          <path d="M26 100 Q26 78 50 78 Q74 78 74 100 Z" fill="#14224f" />
          <path d="M43 79 L50 86 L57 79 Z" fill="#fbfaf5" />
          <path d="M50 86 L50 100" stroke={accent} strokeWidth="3" />
          {number !== undefined && (
            <text x="50" y="97" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fbfaf5">
              {number}
            </text>
          )}
          {position === "GK" && (
            <>
              <ellipse cx="27" cy="84" rx="6" ry="7" fill={accent} stroke="#0f7d7d" strokeWidth="1" />
              <ellipse cx="73" cy="84" rx="6" ry="7" fill={accent} stroke="#0f7d7d" strokeWidth="1" />
            </>
          )}
          {isCaptain && (
            <g>
              <rect x="22" y="80" width="11" height="7" rx="2" fill="#d7282f" />
              <text x="27.5" y="86" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff">C</text>
            </g>
          )}
        </>
      )}

      {/* 首 */}
      <rect x="45" y="60" width="10" height="11" rx="3" fill={skin} />
      {/* 頭 */}
      <circle cx="50" cy="44" r="24" fill={skin} />
      <circle cx="28" cy="46" r="4" fill={skin} />
      <circle cx="72" cy="46" r="4" fill={skin} />
      <Hair style={hairStyle} color={hair} />
      {/* チーク */}
      <ellipse cx="38" cy="52" rx="4" ry="2.6" fill="#f0918a" opacity="0.55" />
      <ellipse cx="62" cy="52" rx="4" ry="2.6" fill="#f0918a" opacity="0.55" />
      {/* 瞳 */}
      <circle cx="41" cy="46" r="4.2" fill="#2a2320" />
      <circle cx="59" cy="46" r="4.2" fill="#2a2320" />
      <circle cx="42.4" cy="44.6" r="1.4" fill="#fff" />
      <circle cx="60.4" cy="44.6" r="1.4" fill="#fff" />
      {/* 口 */}
      <path d="M45 55 Q50 59.5 55 55" stroke="#b5675a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}
