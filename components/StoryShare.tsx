"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Pick = "H" | "D" | "A";

export interface StoryData {
  id: string;
  stage: string;
  homeName: string;
  awayName: string;
  homeFlag: string;
  awayFlag: string;
  date: string; // 例 6/15(月)
  time: string; // 例 05:00
  jp: boolean;
}

const W = 1080;
const H = 1920;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function winnerText(d: StoryData, h: number, a: number) {
  if (h > a) return `${d.homeName} の勝ち！`;
  if (h < a) return `${d.awayName} の勝ち！`;
  return "引き分け";
}

const FONT = "'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif";

export default function StoryShare({ data }: { data: StoryData }) {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<Pick | null>(null);
  const [scoreOn, setScoreOn] = useState(false);
  const [score, setScore] = useState<{ h: number; a: number }>({ h: 1, a: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      const sv = localStorage.getItem(`score:${data.id}`);
      if (sv && /^\d-\d$/.test(sv)) {
        const [h, a] = sv.split("-").map(Number);
        setScore({ h, a });
        setScoreOn(true);
      }
      const v = localStorage.getItem(`pred:${data.id}`);
      if (v === "H" || v === "D" || v === "A") setPick(v);
    } catch {
      /* noop */
    }
  }, [data.id]);

  const sync = () => {
    try {
      window.dispatchEvent(new Event("fav-changed"));
    } catch {
      /* noop */
    }
  };

  // 勝敗だけ選ぶ（スコアは解除）
  const choose = (p: Pick) => {
    const next = pick === p ? null : p;
    setPick(next);
    setScoreOn(false);
    try {
      localStorage.removeItem(`score:${data.id}`);
      if (next) localStorage.setItem(`pred:${data.id}`, next);
      else localStorage.removeItem(`pred:${data.id}`);
    } catch {
      /* noop */
    }
    sync();
  };

  // スコアを上下（勝敗も自動で連動）
  const bump = (team: "h" | "a", delta: number) => {
    setScoreOn(true);
    setScore((prev) => {
      const nv = Math.max(0, Math.min(9, prev[team] + delta));
      const next = { ...prev, [team]: nv };
      const dp: Pick = next.h > next.a ? "H" : next.h < next.a ? "A" : "D";
      setPick(dp);
      try {
        localStorage.setItem(`score:${data.id}`, `${next.h}-${next.a}`);
        localStorage.setItem(`pred:${data.id}`, dp);
      } catch {
        /* noop */
      }
      return next;
    });
    sync();
  };

  const clearScore = () => {
    setScoreOn(false);
    try {
      localStorage.removeItem(`score:${data.id}`);
    } catch {
      /* noop */
    }
    sync();
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#17284f");
    g.addColorStop(1, "#0d1730");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const cols = [
      "#d7282f", "#e8820c", "#e8c30c", "#4caf50", "#1aa3a3",
      "#2f6fed", "#8e44ad", "#e84393", "#7f8c8d", "#e4dfd0",
    ];
    const bw = W / cols.length;
    cols.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * bw, 0, bw, 20);
      ctx.fillRect(i * bw, H - 20, bw, 20);
    });

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "rgba(255,255,255,.7)";
    ctx.font = `600 44px ${FONT}`;
    ctx.fillText("⚽ 私の", W / 2, 210);
    ctx.fillStyle = "#fff";
    ctx.font = `800 96px ${FONT}`;
    ctx.fillText("ワールドカップ予想", W / 2, 320);

    const cx = 80, cy = 430, cw = W - 160, ch = 820;
    ctx.fillStyle = "#fbfaf5";
    roundRect(ctx, cx, cy, cw, ch, 44);
    ctx.fill();

    ctx.fillStyle = "#6b6657";
    ctx.font = `600 36px ${FONT}`;
    ctx.fillText(data.stage, W / 2, cy + 84);

    ctx.font = `96px ${FONT}`;
    ctx.fillText(data.homeFlag, W / 2 - 280, cy + 250);
    ctx.fillText(data.awayFlag, W / 2 + 280, cy + 250);
    ctx.fillStyle = "#9a948a";
    ctx.font = `800 60px ${FONT}`;
    ctx.fillText("VS", W / 2, cy + 240);
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `700 44px ${FONT}`;
    ctx.fillText(data.homeName, W / 2 - 280, cy + 340);
    ctx.fillText(data.awayName, W / 2 + 280, cy + 340);
    ctx.fillStyle = "#14224f";
    ctx.font = `700 40px ${FONT}`;
    ctx.fillText(`${data.date} ${data.time}（日本時間）`, W / 2, cy + 450);

    if (scoreOn) {
      // スコア予想
      ctx.fillStyle = "#6b6657";
      ctx.font = `600 38px ${FONT}`;
      ctx.fillText("わたしの予想スコア", W / 2, cy + 560);
      ctx.fillStyle = "#14224f";
      ctx.font = `800 130px ${FONT}`;
      ctx.fillText(`${score.h} - ${score.a}`, W / 2, cy + 700);
      const r = score.h === score.a ? "#7f8c8d" : "#d7282f";
      ctx.fillStyle = r;
      ctx.font = `700 46px ${FONT}`;
      ctx.fillText(winnerText(data, score.h, score.a), W / 2, cy + 770);
    } else {
      ctx.fillStyle = "#6b6657";
      ctx.font = `600 38px ${FONT}`;
      ctx.fillText("わたしの予想は…", W / 2, cy + 600);
      const label =
        pick === "H"
          ? `${data.homeName} 勝利！`
          : pick === "A"
            ? `${data.awayName} 勝利！`
            : pick === "D"
              ? "引き分け"
              : "まだ予想していません";
      const color = pick === "D" || pick === null ? "#7f8c8d" : "#14224f";
      ctx.font = `800 64px ${FONT}`;
      const pw = Math.min(cw - 60, ctx.measureText(label).width + 120);
      const ph = 134;
      const px = W / 2 - pw / 2;
      const py = cy + 640;
      ctx.fillStyle = color;
      roundRect(ctx, px, py, pw, ph, 67);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillText(label, W / 2, py + 90);
    }

    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.font = `800 50px ${FONT}`;
    ctx.fillText("100倍Wカップ", W / 2, H - 190);
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.font = `500 36px ${FONT}`;
    ctx.fillText(
      `#FIFAワールドカップ${data.jp ? " #日本代表" : ""}`,
      W / 2,
      H - 120
    );
  }, [data, pick, scoreOn, score]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(draw, 60);
      return () => clearTimeout(t);
    }
  }, [open, draw]);

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => {
      const c = canvasRef.current;
      if (!c) return resolve(null);
      c.toBlob((b) => resolve(b), "image/png");
    });

  const save = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wcup-yosou-${data.id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const file = new File([blob], "wcup-yosou.png", { type: "image/png" });
    const nav = navigator as Navigator & {
      canShare?: (d: { files: File[] }) => boolean;
    };
    if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
      try {
        await nav.share({
          files: [file],
          text: "私のワールドカップ予想 ⚽ #FIFAワールドカップ",
        });
        return;
      } catch {
        /* キャンセル等 */
      }
    }
    save();
  };

  const Stepper = ({
    team,
    flag,
    name,
    value,
  }: {
    team: "h" | "a";
    flag: string;
    name: string;
    value: number;
  }) => (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[11px] font-bold flex items-center gap-1">
        <span>{flag}</span>
        <span className="truncate max-w-[70px]">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => bump(team, -1)}
          className="w-8 h-8 rounded-full border border-jpnavy/40 text-jpnavy font-bold text-lg leading-none active:bg-jpnavy/10"
          aria-label="減らす"
        >
          −
        </button>
        <span className="w-7 text-center text-2xl font-extrabold tabular-nums">
          {scoreOn ? value : "—"}
        </span>
        <button
          onClick={() => bump(team, 1)}
          className="w-8 h-8 rounded-full border border-jpnavy/40 text-jpnavy font-bold text-lg leading-none active:bg-jpnavy/10"
          aria-label="増やす"
        >
          ＋
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-jpred text-white hover:opacity-90 transition-opacity"
      >
        📲 予想をストーリーズに
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
          <button
            aria-label="閉じる"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative w-full sm:max-w-sm bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-jpnavy text-white px-4 py-3 flex items-center justify-between">
              <div className="font-bold text-sm">📲 私のワールドカップ予想</div>
              <button
                onClick={() => setOpen(false)}
                aria-label="閉じる"
                className="text-white/80 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              {/* 勝敗 */}
              <div className="mb-3">
                <div className="text-[11px] font-bold text-muted mb-1.5">
                  ① 勝敗をサクッと（タップ）
                </div>
                <div className="flex gap-1.5">
                  {(
                    [
                      ["H", `${data.homeFlag} 勝`],
                      ["D", "引分"],
                      ["A", `${data.awayFlag} 勝`],
                    ] as [Pick, string][]
                  ).map(([p, label]) => (
                    <button
                      key={p}
                      onClick={() => choose(p)}
                      className={`flex-1 rounded-lg py-2 text-xs font-bold border transition-colors ${
                        !scoreOn && pick === p
                          ? "bg-jpnavy text-white border-jpnavy"
                          : "bg-surface border-jpnavy/30 hover:border-jpnavy"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* スコア */}
              <div className="mb-3 rounded-xl border border-line bg-surface p-3">
                <div className="text-[11px] font-bold text-muted mb-2 flex items-center justify-between">
                  <span>② スコアまで予想する（任意）</span>
                  {scoreOn && (
                    <button
                      onClick={clearScore}
                      className="text-[11px] text-jpred underline"
                    >
                      クリア
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Stepper team="h" flag={data.homeFlag} name={data.homeName} value={score.h} />
                  <span className="text-xl font-bold text-muted">-</span>
                  <Stepper team="a" flag={data.awayFlag} name={data.awayName} value={score.a} />
                </div>
              </div>

              {/* プレビュー */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  className="rounded-xl border border-line shadow-md"
                  style={{ width: "250px", height: "auto" }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={share}
                  className="py-2.5 rounded-full bg-jpred text-white font-bold text-sm"
                >
                  📲 シェアする
                </button>
                <button
                  onClick={save}
                  className="py-2.5 rounded-full border border-jpnavy text-jpnavy font-bold text-sm"
                >
                  ⬇️ 画像を保存
                </button>
              </div>
              <p className="text-[11px] text-muted mt-2 text-center leading-relaxed">
                保存した画像を、インスタのストーリーズやXに投稿しよう。
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
