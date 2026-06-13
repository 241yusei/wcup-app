import { Player } from "@/lib/types";

// 注目選手の配置イメージ（ピッチ図）。公式スタメンではなく、各国図鑑の
// 注目選手をポジションからざっくり配置した観戦の予習用ビジュアル。

type Side = "home" | "away";

// ポジション文字列 → 自陣からの距離（％）。home=左→右に攻める想定。
function roleX(position: string, side: Side): number {
  const p = position.toUpperCase();
  let base: number;
  if (p.includes("GK")) base = 6;
  else if (p.includes("DF") || p.includes("CB") || p.includes("SB")) base = 20;
  else if (p.includes("FW") || p.includes("ST") || p.includes("CF") || p.includes("WG"))
    base = 45;
  else base = 33; // MF など
  return side === "home" ? base : 100 - base;
}

function PitchSide({
  players,
  side,
  color,
}: {
  players: Player[];
  side: Side;
  color: string;
}) {
  // 同ポジションは縦に振り分ける。
  const byX = new Map<number, Player[]>();
  for (const pl of players) {
    const x = roleX(pl.position, side);
    if (!byX.has(x)) byX.set(x, []);
    byX.get(x)!.push(pl);
  }
  const nodes: { x: number; y: number; pl: Player }[] = [];
  for (const [x, group] of byX) {
    group.forEach((pl, i) => {
      const y = ((i + 1) / (group.length + 1)) * 100;
      nodes.push({ x, y, pl });
    });
  }
  return (
    <>
      {nodes.map(({ x, y, pl }) => (
        <div
          key={pl.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span
            className="w-7 h-7 rounded-full border-2 border-white shadow flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {pl.position.replace(/[^A-Za-z]/g, "").slice(0, 2) || "★"}
          </span>
          <span className="mt-0.5 text-[9px] font-bold bg-background/80 rounded px-1 leading-tight whitespace-nowrap max-w-20 truncate">
            {pl.name}
          </span>
        </div>
      ))}
    </>
  );
}

export default function FormationPitch({
  homeName,
  awayName,
  homeFlag,
  awayFlag,
  homePlayers,
  awayPlayers,
  homeColor = "#14224f",
  awayColor = "#d7282f",
}: {
  homeName: string;
  awayName: string;
  homeFlag: string;
  awayFlag: string;
  homePlayers: Player[];
  awayPlayers: Player[];
  homeColor?: string;
  awayColor?: string;
}) {
  if (!homePlayers.length && !awayPlayers.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold mb-2">
        <span>
          {homeFlag} {homeName}
        </span>
        <span>
          {awayName} {awayFlag}
        </span>
      </div>
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-line"
        style={{
          aspectRatio: "16 / 9",
          background:
            "repeating-linear-gradient(90deg, #2f8f4e 0 8%, #2c8549 8% 16%)",
        }}
      >
        {/* ライン */}
        <div className="absolute inset-3 rounded-md border border-white/40" />
        <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-px bg-white/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/40" />
        <PitchSide players={homePlayers} side="home" color={homeColor} />
        <PitchSide players={awayPlayers} side="away" color={awayColor} />
      </div>
      <p className="text-[11px] text-muted mt-2 leading-relaxed">
        ※ 公式スタメンではなく、
        <strong>各国の注目選手をポジションから配置した予習用イメージ</strong>
        です。実際の先発・布陣は試合当日に発表されます。
      </p>
    </div>
  );
}
