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

function predInfo(d: StoryData, pick: Pick | null) {
  if (pick === "H") return { label: `${d.homeName} 勝利！`, color: "#14224f" };
  if (pick === "A") return { label: `${d.awayName} 勝利！`, color: "#14224f" };
  if (pick === "D") return { label: "引き分け", color: "#7f8c8d" };
  return { label: "まだ予想していません", color: "#7f8c8d" };
}

const FONT = "'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif";

export default function StoryShare({ data }: { data: StoryData }) {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<Pick | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(`pred:${data.id}`);
      if (v === "H" || v === "D" || v === "A") setPick(v);
    } catch {
      /* noop */
    }
  }, [data.id]);

  const choose = (p: Pick) => {
    const next = pick === p ? null : p;
    setPick(next);
    try {
      if (next) localStorage.setItem(`pred:${data.id}`, next);
      else localStorage.removeItem(`pred:${data.id}`);
      window.dispatchEvent(new Event("fav-changed"));
    } catch {
      /* noop */
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 背景
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#17284f");
    g.addColorStop(1, "#0d1730");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // 上下のCOLORSストライプ
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

    // タイトル
    ctx.fillStyle = "rgba(255,255,255,.7)";
    ctx.font = `600 44px ${FONT}`;
    ctx.fillText("⚽ 私の", W / 2, 210);
    ctx.fillStyle = "#fff";
    ctx.font = `800 96px ${FONT}`;
    ctx.fillText("ワールドカップ予想", W / 2, 320);

    // 試合カード
    const cx = 80, cy = 430, cw = W - 160, ch = 800;
    ctx.fillStyle = "#fbfaf5";
    roundRect(ctx, cx, cy, cw, ch, 44);
    ctx.fill();

    ctx.fillStyle = "#6b6657";
    ctx.font = `600 36px ${FONT}`;
    ctx.fillText(data.stage, W / 2, cy + 84);

    // 国旗
    ctx.font = `96px ${FONT}`;
    ctx.fillText(data.homeFlag, W / 2 - 280, cy + 260);
    ctx.fillText(data.awayFlag, W / 2 + 280, cy + 260);
    // VS
    ctx.fillStyle = "#9a948a";
    ctx.font = `800 60px ${FONT}`;
    ctx.fillText("VS", W / 2, cy + 250);
    // 国名
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `700 46px ${FONT}`;
    ctx.fillText(data.homeName, W / 2 - 280, cy + 350);
    ctx.fillText(data.awayName, W / 2 + 280, cy + 350);
    // 日時
    ctx.fillStyle = "#14224f";
    ctx.font = `700 42px ${FONT}`;
    ctx.fillText(`${data.date} ${data.time}（日本時間）`, W / 2, cy + 470);

    // 予想ラベル
    ctx.fillStyle = "#6b6657";
    ctx.font = `600 38px ${FONT}`;
    ctx.fillText("わたしの予想は…", W / 2, cy + 580);
    const { label, color } = predInfo(data, pick);
    ctx.font = `800 60px ${FONT}`;
    const pw = Math.min(cw - 60, ctx.measureText(label).width + 120);
    const ph = 130;
    const px = W / 2 - pw / 2;
    const py = cy + 620;
    ctx.fillStyle = color;
    roundRect(ctx, px, py, pw, ph, 65);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(label, W / 2, py + 88);

    // フッター
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
  }, [data, pick]);

  useEffect(() => {
    if (open) {
      // フォント反映を待って描画
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
              {/* 予想を選ぶ */}
              <div className="mb-3">
                <div className="text-[11px] font-bold text-muted mb-1.5">
                  勝敗を選ぶと画像に反映されます（タップ）
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
                        pick === p
                          ? "bg-jpnavy text-white border-jpnavy"
                          : "bg-surface border-jpnavy/30 hover:border-jpnavy"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* プレビュー（縦9:16） */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  className="rounded-xl border border-line shadow-md"
                  style={{ width: "260px", height: "auto" }}
                />
              </div>

              {/* 操作 */}
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
                <br />
                （対応端末では「シェア」から直接ストーリーズへ）
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
