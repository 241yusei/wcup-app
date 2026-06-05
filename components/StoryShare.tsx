"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Pick = "H" | "D" | "A";

export interface StoryData {
  id: string;
  stage: string;
  homeName: string;
  awayName: string;
  homeCode: string; // NED 等
  awayCode: string; // JPN 等
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  jp: boolean;
}

const W = 1080;
const H = 1920;

// パレット（Stadium Night）
const C = {
  white: "#F7FAFF",
  cyan: "#25E6C8",
  blue: "#2B7CFF",
  red: "#D7282F",
  mute: "rgba(247,250,255,.55)",
  mute2: "rgba(247,250,255,.6)",
};

// Anton（極太コンデンス）をCanvasに読み込む。失敗時はシステムフォントにフォールバック。
let antonPromise: Promise<void> | null = null;
function ensureAnton(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (antonPromise) return antonPromise;
  antonPromise = (async () => {
    try {
      const f = document.fonts;
      if (f && f.check && f.check("64px Anton")) return;
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Anton&display=swap"
      ).then((r) => r.text());
      const m = css.match(/url\((https:[^)]+\.woff2)\)/);
      if (!m) return;
      const ff = new FontFace("Anton", `url(${m[1]})`);
      await ff.load();
      document.fonts.add(ff);
    } catch {
      /* システムフォントで代替 */
    }
  })();
  return antonPromise;
}

const A = (size: number) => `${size}px Anton, "Arial Narrow", Arial, sans-serif`;
const J = (w: number, size: number) =>
  `${w} ${size}px "Hiragino Sans","Noto Sans JP",sans-serif`;

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

function fit(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxW: number,
  fontFn: (s: number) => string,
  start: number,
  min: number
) {
  let s = start;
  ctx.font = fontFn(s);
  while (ctx.measureText(text).width > maxW && s > min) {
    s -= 4;
    ctx.font = fontFn(s);
  }
  return s;
}

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

    const winner =
      (scoreOn
        ? score.h > score.a
          ? "home"
          : score.h < score.a
            ? "away"
            : "draw"
        : pick === "H"
          ? "home"
          : pick === "A"
            ? "away"
            : pick === "D"
              ? "draw"
              : null) || null;

    // 背景
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#0b1f44");
    g.addColorStop(0.55, "#07162E");
    g.addColorStop(1, "#050f22");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // 上部グロー
    const rg = ctx.createRadialGradient(W / 2, 240, 30, W / 2, 240, 760);
    rg.addColorStop(0, "rgba(43,124,255,.22)");
    rg.addColorStop(1, "rgba(43,124,255,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, 980);

    // 対角の光ライン（Kick of Light）
    ctx.save();
    ctx.strokeStyle = "rgba(37,230,200,.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-60, 840);
    ctx.lineTo(1140, 560);
    ctx.stroke();
    ctx.strokeStyle = "rgba(247,250,255,.18)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-60, 890);
    ctx.lineTo(1140, 610);
    ctx.stroke();
    ctx.restore();

    // 背番号風ゴースト数字（はみ出し）
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = C.white;
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
    ctx.font = A(760);
    ctx.fillText("26", 1190, 1880);
    ctx.restore();

    ctx.textBaseline = "alphabetic";

    // オーバーライン
    ctx.textAlign = "left";
    ctx.fillStyle = C.cyan;
    ctx.font = A(44);
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "8px";
    } catch {
      /* noop */
    }
    ctx.fillText("FIFA WORLD CUP 2026", 90, 300);
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
    } catch {
      /* noop */
    }

    // 見出し
    ctx.fillStyle = C.white;
    ctx.font = J(800, 62);
    ctx.fillText("私の勝敗予想", 90, 384);
    ctx.fillStyle = C.blue;
    ctx.fillRect(94, 404, 150, 8);

    // チーム行
    ctx.textAlign = "center";
    ctx.font = "94px sans-serif";
    ctx.fillText(data.homeFlag, 270, 600);
    ctx.fillText(data.awayFlag, 810, 600);
    ctx.fillStyle = C.cyan;
    ctx.font = A(70);
    ctx.fillText("VS", 540, 590);
    // コード（勝者を白・敗者をくすませる）
    const hc = fit(ctx, data.homeCode, 360, A, 120, 60);
    ctx.fillStyle = winner === "home" ? C.white : C.mute2;
    ctx.font = A(hc);
    ctx.fillText(data.homeCode, 270, 742);
    const ac = fit(ctx, data.awayCode, 360, A, 120, 60);
    ctx.fillStyle = winner === "away" ? C.white : C.mute2;
    ctx.font = A(ac);
    ctx.fillText(data.awayCode, 810, 742);
    // 国名
    ctx.fillStyle = C.mute;
    ctx.font = J(600, 28);
    ctx.fillText(data.homeName, 270, 792);
    ctx.fillText(data.awayName, 810, 792);

    // ヒーロー
    if (scoreOn) {
      ctx.fillStyle = C.mute;
      ctx.font = J(700, 38);
      ctx.fillText("予想スコア", 540, 968);
      ctx.font = A(300);
      const sy = 1200;
      ctx.fillStyle = score.h >= score.a ? C.cyan : C.white;
      if (score.h < score.a) ctx.fillStyle = C.white;
      ctx.fillStyle = score.h > score.a ? C.cyan : C.white;
      ctx.fillText(String(score.h), 392, sy);
      ctx.fillStyle = C.white;
      ctx.fillText("–", 540, sy);
      ctx.fillStyle = score.a > score.h ? C.cyan : C.white;
      ctx.fillText(String(score.a), 688, sy);
      const cap =
        score.h === score.a
          ? "引き分け予想"
          : `${score.h > score.a ? data.homeName : data.awayName} の勝ち！`;
      const cs = fit(ctx, cap, 920, (s) => J(800, s), 54, 34);
      ctx.fillStyle = score.h === score.a ? C.white : C.blue;
      ctx.font = J(800, cs);
      ctx.fillText(cap, 540, 1320);
    } else {
      ctx.fillStyle = C.mute;
      ctx.font = J(700, 38);
      ctx.fillText("わたしの予想", 540, 1000);
      let cap = "まだ予想していません";
      let col = C.mute;
      let sz = 64;
      if (pick === "H") {
        cap = `${data.homeName} 勝利！`;
        col = C.cyan;
        sz = 88;
      } else if (pick === "A") {
        cap = `${data.awayName} 勝利！`;
        col = C.cyan;
        sz = 88;
      } else if (pick === "D") {
        cap = "引き分け";
        col = C.white;
        sz = 88;
      }
      const fs = fit(ctx, cap, 940, (s) => J(900, s), sz, 36);
      ctx.fillStyle = col;
      ctx.font = J(900, fs);
      ctx.fillText(cap, 540, 1140);
    }

    // 試合情報
    ctx.fillStyle = C.mute;
    ctx.font = J(600, 32);
    const info = `${data.stage} ・ ${data.date} ${data.time} JST`;
    const isz = fit(ctx, info, 960, (s) => J(600, s), 32, 22);
    ctx.font = J(600, isz);
    ctx.fillText(info, 540, 1450);

    // フッター
    ctx.fillStyle = C.white;
    ctx.font = A(50);
    ctx.fillText("100倍Wカップ", 540, 1565);
    ctx.fillStyle = C.cyan;
    ctx.font = J(600, 30);
    ctx.fillText(
      `#FIFAワールドカップ${data.jp ? "  #日本代表" : ""}`,
      540,
      1618
    );

    // 日の丸レッドの“点”（アクセント）
    if (data.jp) {
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(W / 2, 1668, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 細い外枠
    ctx.strokeStyle = "rgba(247,250,255,.1)";
    ctx.lineWidth = 2;
    roundRect(ctx, 24, 24, W - 48, H - 48, 36);
    ctx.stroke();
  }, [data, pick, scoreOn, score]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    draw();
    ensureAnton().then(() => {
      if (!cancelled) draw();
    });
    return () => {
      cancelled = true;
    };
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
        /* キャンセル */
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

              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  className="rounded-xl shadow-md"
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
