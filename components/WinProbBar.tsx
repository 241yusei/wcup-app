// 勝敗確率の目安バー。FIFAランキングから算出する簡易モデル（AIではない）。
// 数値はあくまで“事前の力関係の目安”であり、結果を保証するものではない。

function calc(rankHome?: number, rankAway?: number) {
  if (!rankHome || !rankAway) return null;
  const sHome = 1 / rankHome;
  const sAway = 1 / rankAway;
  const pHomeRaw = sHome / (sHome + sAway);
  const pAwayRaw = sAway / (sHome + sAway);
  // 力が拮抗するほど引き分けの目を厚く（最大約28%）。
  const draw = 0.28 * (1 - Math.abs(pHomeRaw - pAwayRaw));
  const rest = 1 - draw;
  const home = pHomeRaw * rest;
  const pct = (x: number) => Math.round(x * 100);
  // 合計100%に丸め込む。
  const h = pct(home);
  let d = pct(draw);
  let a = 100 - h - d;
  if (a < 0) {
    a = 0;
    d = 100 - h;
  }
  return { home: h, draw: d, away: a };
}

export default function WinProbBar({
  homeName,
  awayName,
  homeFlag,
  awayFlag,
  rankHome,
  rankAway,
}: {
  homeName: string;
  awayName: string;
  homeFlag: string;
  awayFlag: string;
  rankHome?: number;
  rankAway?: number;
}) {
  const p = calc(rankHome, rankAway);
  if (!p) return null;

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-bold flex items-center gap-1">
          <span>{homeFlag}</span>
          {homeName} <span className="text-jpnavy font-mono">{p.home}%</span>
        </span>
        <span className="text-muted font-mono">引分 {p.draw}%</span>
        <span className="font-bold flex items-center gap-1">
          <span className="text-jpred font-mono">{p.away}%</span>
          {awayName} <span>{awayFlag}</span>
        </span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-line">
        <div className="bg-jpnavy" style={{ width: `${p.home}%` }} />
        <div className="bg-muted/40" style={{ width: `${p.draw}%` }} />
        <div className="bg-jpred" style={{ width: `${p.away}%` }} />
      </div>
      <p className="text-[11px] text-muted mt-2 leading-relaxed">
        ※ FIFAランキングから算出した
        <strong>事前の力関係の目安</strong>
        です（簡易モデル）。サッカーは番狂わせが醍醐味——数字はあくまで参考に。
      </p>
    </div>
  );
}
