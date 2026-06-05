"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Pick = "H" | "D" | "A";

export interface StoryData {
  id: string;
  stage: string;
  homeName: string; // 日本語表記
  awayName: string;
  homeEn: string; // 英語表記（JAPAN等）
  awayEn: string;
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

/* ───────────────────── フォント読み込み（Google Fonts → FontFace） ───────────────────── */
// 任意のGoogle FontsファミリをCanvasで使えるよう読み込む。失敗時はシステムフォントへフォールバック。
const fontCache = new Map<string, Promise<void>>();
function ensureFont(family: string, axis?: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const key = family + (axis ?? "");
  const cached = fontCache.get(key);
  if (cached) return cached;
  const p = (async () => {
    try {
      if (document.fonts?.check?.(`32px "${family}"`)) return;
      const fam = family.replace(/ /g, "+");
      const url = `https://fonts.googleapis.com/css2?family=${fam}${
        axis ? `:${axis}` : ""
      }&display=swap`;
      const css = await fetch(url).then((r) => r.text());
      const m = css.match(/url\((https:[^)]+\.woff2)\)/);
      if (!m) return;
      const ff = new FontFace(family, `url(${m[1]})`);
      await ff.load();
      document.fonts.add(ff);
    } catch {
      /* システムフォントで代替 */
    }
  })();
  fontCache.set(key, p);
  return p;
}

// 各スタイルが必要とするフォント
const STYLE_FONTS: Record<string, [string, string?][]> = {
  construct: [["Anton"]],
  holo: [["Anton"], ["Orbitron", "wght@800"]],
  swiss: [["Archivo Black"]],
  memphis: [["Unbounded", "wght@800"]],
  deco: [["Cinzel", "wght@700"]],
  ide: [["Archivo Black"]],
  brut: [["Archivo Black"]],
  vogue: [["Bodoni Moda", "opsz,wght@96,700"]],
  frame: [["Fraunces", "opsz,wght@72,600"]],
  mag: [["Anton"]],
};
function ensureStyleFonts(key: string): Promise<unknown> {
  const list = STYLE_FONTS[key] ?? [];
  return Promise.all(list.map(([f, a]) => ensureFont(f, a)));
}

/* ───────────────────── Canvasフォント文字列 ───────────────────── */
const F = {
  anton: (s: number) => `${s}px "Anton","Arial Narrow",sans-serif`,
  archivo: (s: number) => `${s}px "Archivo Black","Arial Black",sans-serif`,
  unbounded: (s: number) => `${s}px "Unbounded","Arial Black",sans-serif`,
  cinzel: (s: number) => `${s}px "Cinzel",Georgia,serif`,
  orbitron: (s: number) => `${s}px "Orbitron",Arial,sans-serif`,
  bodoni: (s: number) => `${s}px "Bodoni Moda","Didot","Times New Roman",serif`,
  fraunces: (s: number) => `${s}px "Fraunces",Georgia,serif`,
  jp: (w: number, s: number) =>
    `${w} ${s}px "Hiragino Sans","Noto Sans JP",sans-serif`,
};

/* ───────────────────── 汎用ヘルパー ───────────────────── */
type Ctx2D = CanvasRenderingContext2D;

function roundRect(ctx: Ctx2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function setLS(ctx: Ctx2D, v: string) {
  try {
    (ctx as Ctx2D & { letterSpacing: string }).letterSpacing = v;
  } catch {
    /* 非対応ブラウザは無視 */
  }
}

function fit(
  ctx: Ctx2D,
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

function polyPath(ctx: Ctx2D, cx: number, cy: number, r: number, n: number, rot = 0) {
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const a = rot + (i / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function starPath(
  ctx: Ctx2D,
  cx: number,
  cy: number,
  R: number,
  r: number,
  n: number,
  rot = -Math.PI / 2
) {
  ctx.beginPath();
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = rot + (i / (n * 2)) * Math.PI * 2;
    const x = cx + Math.cos(a) * rad;
    const y = cy + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function grain(
  ctx: Ctx2D,
  x: number,
  y: number,
  w: number,
  h: number,
  count: number,
  color: string,
  alpha: number,
  maxR: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const rx = x + Math.random() * w;
    const ry = y + Math.random() * h;
    ctx.beginPath();
    ctx.arc(rx, ry, Math.random() * maxR + 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// 雑誌表紙のダミーバーコード（縦線群）
function barcode(ctx: Ctx2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  let cx = x;
  let i = 0;
  while (cx < x + w) {
    const bw = 1 + ((i * 7 + 3) % 5);
    if (i % 2 === 0) ctx.fillRect(cx, y, bw, h);
    cx += bw + 2;
    i++;
  }
  ctx.restore();
}

/* ───────────────────── 描画コンテキスト ───────────────────── */
interface DrawCtx {
  ctx: Ctx2D;
  homeCode: string;
  awayCode: string;
  homeEn: string;
  awayEn: string;
  homeName: string;
  awayName: string;
  homeFlag: string;
  awayFlag: string;
  stage: string;
  date: string;
  time: string;
  jp: boolean;
  pick: Pick | null;
  scoreOn: boolean;
  score: { h: number; a: number };
  winner: "home" | "away" | "draw" | null;
}

const HEAD = "Win / Loss Prediction";
const MYLABEL = "MY 予想";

function captionOf(c: DrawCtx): string {
  if (c.winner === "home") return `${c.homeEn} WIN`;
  if (c.winner === "away") return `${c.awayEn} WIN`;
  if (c.winner === "draw") return "DRAW";
  return "MAKE YOUR PICK";
}
const scoreStr = (c: DrawCtx) => `${c.score.h} – ${c.score.a}`;
function hashtags(c: DrawCtx) {
  return `#FIFAWORLDCUP26${c.jp ? "   #SAMURAIBLUE" : ""}`;
}

/* ═══════════════════════ ① CONSTRUCT（構成主義 / 赤黒・対角） ═══════════════════════ */
function drawConstruct(c: DrawCtx) {
  const { ctx } = c;
  const INK = "#161616";
  const RED = "#E63223";
  const CREAM = "#F2F0E6";
  const dim = "rgba(242,240,230,0.4)";

  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  // コーナーから放射する構成線
  ctx.save();
  ctx.strokeStyle = "rgba(242,240,230,0.09)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 13; i++) {
    const a = (i / 13) * (Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(40, 120);
    ctx.lineTo(40 + Math.cos(a) * 1600, 120 + Math.sin(a) * 1600);
    ctx.stroke();
  }
  ctx.restore();

  // 巨大な赤い円（右下）
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(900, 1120, 430, 0, Math.PI * 2);
  ctx.fill();

  // オーバーライン
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  setLS(ctx, "10px");
  ctx.fillStyle = CREAM;
  ctx.font = F.anton(40);
  ctx.fillText("FIFA WORLD CUP 2026", 96, 300);
  setLS(ctx, "0px");

  // 見出し
  ctx.fillStyle = CREAM;
  ctx.font = F.anton(58);
  ctx.fillText(HEAD.toUpperCase(), 96, 372);

  // MY 予想 タグ
  ctx.fillStyle = RED;
  ctx.fillRect(96, 400, 230, 58);
  ctx.fillStyle = CREAM;
  ctx.font = F.jp(800, 32);
  ctx.fillText(MYLABEL, 116, 441);

  // 対戦コード（対角配置・勝者を強調）
  const hs = fit(ctx, c.homeCode, 760, F.anton, 200, 90);
  ctx.font = F.anton(hs);
  ctx.textAlign = "left";
  ctx.fillStyle = c.winner === "away" ? dim : CREAM;
  ctx.fillText(c.homeCode, 90, 680);
  ctx.fillStyle = "rgba(242,240,230,0.7)";
  ctx.font = F.jp(700, 30);
  ctx.fillText(`${c.homeFlag} ${c.homeName}`, 96, 732);

  const as = fit(ctx, c.awayCode, 760, F.anton, 200, 90);
  ctx.font = F.anton(as);
  ctx.textAlign = "right";
  ctx.fillStyle = c.winner === "home" ? dim : CREAM;
  ctx.fillText(c.awayCode, 988, 1010);
  ctx.fillStyle = "rgba(242,240,230,0.85)";
  ctx.font = F.jp(700, 30);
  ctx.fillText(`${c.awayName} ${c.awayFlag}`, 988, 1062);

  // VS（斜め）
  ctx.save();
  ctx.translate(545, 820);
  ctx.rotate(-0.12);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = RED;
  ctx.font = F.anton(118);
  ctx.fillText("VS", 0, 0);
  ctx.restore();

  // ヒーロー帯（クリーム・平行四辺形）
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.moveTo(40, 1180);
  ctx.lineTo(1040, 1150);
  ctx.lineTo(1040, 1380);
  ctx.lineTo(40, 1410);
  ctx.closePath();
  ctx.fill();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (c.scoreOn) {
    ctx.fillStyle = INK;
    ctx.font = F.anton(150);
    ctx.fillText(scoreStr(c), 540, 1288);
    const cap = captionOf(c);
    const cs = fit(ctx, cap, 900, F.anton, 84, 44);
    ctx.fillStyle = CREAM; // 赤い円の上でも読めるようクリーム
    ctx.font = F.anton(cs);
    ctx.fillText(cap, 540, 1500);
  } else {
    const cap = captionOf(c);
    const cs = fit(ctx, cap, 920, F.anton, 124, 60);
    ctx.fillStyle = INK;
    ctx.font = F.anton(cs);
    ctx.fillText(cap, 540, 1288);
  }
  ctx.textBaseline = "alphabetic";

  // フッター
  ctx.textAlign = "center";
  ctx.fillStyle = dim;
  ctx.font = F.jp(600, 30);
  const info = `${c.stage}  ${c.date} ${c.time} JST`;
  const isz = fit(ctx, info, 940, (s) => F.jp(600, s), 30, 20);
  ctx.font = F.jp(600, isz);
  ctx.fillText(info, 540, 1576);
  setLS(ctx, "6px");
  ctx.fillStyle = CREAM;
  ctx.font = F.anton(34);
  ctx.fillText(hashtags(c), 540, 1632);
  setLS(ctx, "0px");
}

/* ═══════════════════════ ② HOLO（プリズム箔 / トレカ） ═══════════════════════ */
function drawHolo(c: DrawCtx) {
  const { ctx } = c;
  const BG = "#0B0D17";
  const PURPLE = "#7B5CFF";
  const CYAN = "#21E6C1";
  const WHITE = "#EAEEFB";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // 屈折箔（虹色の斜めストライプ・加算合成）
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = -12; i < 34; i++) {
    const hue = (i * 17 + 200) % 360;
    ctx.fillStyle = `hsla(${hue},90%,60%,0.075)`;
    ctx.save();
    ctx.translate(540, 960);
    ctx.rotate(-0.62);
    ctx.fillRect(-1500 + i * 92, -1600, 46, 3200);
    ctx.restore();
  }
  ctx.restore();

  // 上部シーン光
  const rg = ctx.createRadialGradient(540, 430, 30, 540, 430, 720);
  rg.addColorStop(0, "rgba(123,92,255,0.30)");
  rg.addColorStop(1, "rgba(123,92,255,0)");
  ctx.fillStyle = rg;
  ctx.fillRect(0, 80, W, 960);

  // カード枠（二重・グラデ罫）
  const fg = ctx.createLinearGradient(70, 250, 1010, 1670);
  fg.addColorStop(0, PURPLE);
  fg.addColorStop(0.5, CYAN);
  fg.addColorStop(1, PURPLE);
  ctx.strokeStyle = fg;
  ctx.lineWidth = 5;
  roundRect(ctx, 70, 250, W - 140, 1420, 44);
  ctx.stroke();
  ctx.strokeStyle = "rgba(234,238,251,0.25)";
  ctx.lineWidth = 2;
  roundRect(ctx, 92, 272, W - 184, 1376, 34);
  ctx.stroke();

  // レアリティ★（左上）
  ctx.fillStyle = CYAN;
  for (let i = 0; i < 3; i++) {
    starPath(ctx, 150 + i * 46, 332, 17, 7.5, 5);
    ctx.fill();
  }

  // オーバーライン
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  setLS(ctx, "6px");
  ctx.fillStyle = "rgba(234,238,251,0.75)";
  ctx.font = F.orbitron(26);
  ctx.fillText("FIFA WORLD CUP · 2026", 940, 342);
  setLS(ctx, "0px");

  // 見出し＋MYラベル
  ctx.textAlign = "center";
  setLS(ctx, "3px");
  ctx.fillStyle = WHITE;
  ctx.font = F.orbitron(34);
  ctx.fillText(HEAD.toUpperCase(), 540, 470);
  setLS(ctx, "0px");
  ctx.fillStyle = CYAN;
  ctx.font = F.jp(800, 30);
  ctx.fillText(MYLABEL, 540, 522);

  // エンブレム（六角＋星）
  ctx.save();
  const eg = ctx.createLinearGradient(440, 560, 640, 720);
  eg.addColorStop(0, PURPLE);
  eg.addColorStop(1, CYAN);
  ctx.fillStyle = eg;
  polyPath(ctx, 540, 645, 92, 6, Math.PI / 6);
  ctx.fill();
  ctx.fillStyle = BG;
  starPath(ctx, 540, 645, 50, 21, 5);
  ctx.fill();
  ctx.restore();

  // 対戦コード行
  const codeY = 900;
  ctx.textAlign = "center";
  ctx.font = "78px sans-serif";
  ctx.fillText(c.homeFlag, 270, codeY - 96);
  ctx.fillText(c.awayFlag, 810, codeY - 96);

  const drawCode = (code: string, x: number, win: boolean) => {
    const sz = fit(ctx, code, 360, F.anton, 132, 64);
    ctx.save();
    if (win) {
      ctx.shadowColor = CYAN;
      ctx.shadowBlur = 28;
      ctx.fillStyle = WHITE;
    } else {
      ctx.fillStyle = "rgba(234,238,251,0.6)";
    }
    ctx.font = F.anton(sz);
    ctx.fillText(code, x, codeY);
    ctx.restore();
  };
  drawCode(c.homeCode, 270, c.winner === "home");
  drawCode(c.awayCode, 810, c.winner === "away");
  ctx.fillStyle = CYAN;
  ctx.font = F.orbitron(40);
  ctx.fillText("VS", 540, codeY - 26);

  // ヒーロー（スコア or 勝敗）
  ctx.textAlign = "center";
  if (c.scoreOn) {
    const hg = ctx.createLinearGradient(300, 1080, 780, 1280);
    hg.addColorStop(0, PURPLE);
    hg.addColorStop(0.5, WHITE);
    hg.addColorStop(1, CYAN);
    ctx.fillStyle = hg;
    ctx.font = F.anton(260);
    ctx.fillText(scoreStr(c), 540, 1260);
    const cap = captionOf(c);
    const cs = fit(ctx, cap, 880, F.anton, 78, 44);
    ctx.fillStyle = CYAN;
    ctx.font = F.anton(cs);
    ctx.fillText(cap, 540, 1360);
  } else {
    const cap = captionOf(c);
    const hg = ctx.createLinearGradient(180, 1120, 900, 1260);
    hg.addColorStop(0, PURPLE);
    hg.addColorStop(0.5, WHITE);
    hg.addColorStop(1, CYAN);
    const cs = fit(ctx, cap, 860, F.anton, 130, 56);
    ctx.fillStyle = hg;
    ctx.font = F.anton(cs);
    ctx.fillText(cap, 540, 1240);
  }

  // 試合情報
  ctx.fillStyle = "rgba(234,238,251,0.6)";
  ctx.font = F.jp(600, 30);
  const info = `${c.stage}  ${c.date} ${c.time} JST`;
  const isz = fit(ctx, info, 820, (s) => F.jp(600, s), 30, 20);
  ctx.font = F.jp(600, isz);
  ctx.fillText(info, 540, 1470);

  // シリアルプレート（右下）
  ctx.textAlign = "right";
  setLS(ctx, "3px");
  ctx.fillStyle = CYAN;
  ctx.font = F.orbitron(30);
  ctx.fillText("№ 01 / 32", 956, 1606);
  setLS(ctx, "0px");
  // ハッシュタグ（左下）
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(234,238,251,0.7)";
  ctx.font = F.orbitron(24);
  ctx.fillText(hashtags(c), 124, 1606);

  // 微粒ノイズ（金属質感）
  grain(ctx, 92, 272, W - 184, 1376, 520, WHITE, 0.05, 1.4);
}

/* ═══════════════════════ ③ SWISS（ブルーノート / スイス・タイポ） ═══════════════════════ */
function drawSwiss(c: DrawCtx) {
  const { ctx } = c;
  const PAPER = "#E8E2D0";
  const INK = "#16110D";
  const VERM = "#C8341B";
  const NAVY = "#1F3A93";
  const M = 100;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // 大きな藍色の円（右下・はみ出し）
  ctx.fillStyle = NAVY;
  ctx.beginPath();
  ctx.arc(1080, 1700, 360, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // オーバーライン
  setLS(ctx, "8px");
  ctx.fillStyle = INK;
  ctx.font = F.archivo(28);
  ctx.fillText("FIFA WORLD CUP 2026", M, 300);
  setLS(ctx, "0px");

  // 見出し
  ctx.font = F.archivo(56);
  ctx.fillText(HEAD.toUpperCase(), M, 372);

  // 細い罫
  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(M, 408);
  ctx.lineTo(W - M, 408);
  ctx.stroke();

  // 巨大なチーム名（縦に積む・勝者を朱に）
  const n1 = fit(ctx, c.homeEn, W - M * 2, F.archivo, 120, 54);
  ctx.fillStyle = c.winner === "home" ? VERM : INK;
  ctx.font = F.archivo(n1);
  ctx.fillText(c.homeEn, M, 560);
  ctx.fillStyle = "rgba(22,17,13,0.55)";
  ctx.font = F.jp(700, 30);
  ctx.fillText(`${c.homeFlag} ${c.homeName}`, M, 606);

  ctx.fillStyle = INK;
  ctx.font = F.archivo(40);
  ctx.fillText("VS", M, 706);

  const n2 = fit(ctx, c.awayEn, W - M * 2, F.archivo, 120, 54);
  ctx.fillStyle = c.winner === "away" ? VERM : INK;
  ctx.font = F.archivo(n2);
  ctx.fillText(c.awayEn, M, 838);
  ctx.fillStyle = "rgba(22,17,13,0.55)";
  ctx.font = F.jp(700, 30);
  ctx.fillText(`${c.awayFlag} ${c.awayName}`, M, 884);

  // MY 予想 ラベル
  ctx.fillStyle = NAVY;
  ctx.fillRect(M, 960, 18, 56);
  ctx.fillStyle = INK;
  ctx.font = F.jp(800, 34);
  ctx.fillText(MYLABEL, M + 36, 1002);

  // 朱のバンド（ヒーロー）
  const bandY = 1050;
  ctx.fillStyle = VERM;
  ctx.fillRect(M, bandY, W - M * 2, 320);
  ctx.fillStyle = "#FBF4E4";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (c.scoreOn) {
    ctx.font = F.archivo(170);
    ctx.fillText(scoreStr(c), W / 2, bandY + 150);
    ctx.font = F.archivo(40);
    const cap = captionOf(c);
    const cs = fit(ctx, cap, W - M * 2 - 60, F.archivo, 40, 26);
    ctx.font = F.archivo(cs);
    ctx.fillText(cap, W / 2, bandY + 270);
  } else {
    const cap = captionOf(c);
    const cs = fit(ctx, cap, W - M * 2 - 60, F.archivo, 96, 44);
    ctx.font = F.archivo(cs);
    ctx.fillText(cap, W / 2, bandY + 160);
  }
  ctx.textBaseline = "alphabetic";

  // 情報＋ハッシュタグ
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = F.jp(600, 30);
  ctx.fillText(`${c.stage}  ${c.date} ${c.time} JST`, M, 1470);
  ctx.fillStyle = NAVY;
  setLS(ctx, "2px");
  ctx.font = F.archivo(30);
  ctx.fillText(hashtags(c), M, 1528);
  setLS(ctx, "0px");
}

/* ═══════════════════════ ④ MEMPHIS（80sメンフィス・ポップ） ═══════════════════════ */
function drawMemphis(c: DrawCtx) {
  const { ctx } = c;
  const BG = "#F7E8D5";
  const PINK = "#FF4FA3";
  const CYAN = "#22C1C3";
  const YEL = "#FFD23F";
  const INK = "#1A1A1A";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // 背景の幾何（散らし）
  ctx.save();
  // ストライプ帯（右上コーナー・見出しに被らない位置）
  ctx.translate(600, 150);
  ctx.rotate(-0.3);
  ctx.fillStyle = INK;
  for (let i = 0; i < 13; i++) {
    ctx.fillRect(i * 52, 0, 24, 108);
  }
  ctx.restore();
  // ジグザグ
  ctx.strokeStyle = CYAN;
  ctx.lineWidth = 10;
  ctx.beginPath();
  let zx = 120;
  ctx.moveTo(zx, 1620);
  for (let i = 0; i < 8; i++) {
    zx += 50;
    ctx.lineTo(zx, 1600 + (i % 2 ? 40 : 0));
  }
  ctx.stroke();
  // 円・三角・点（散らし）
  ctx.fillStyle = YEL;
  ctx.beginPath();
  ctx.arc(940, 330, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PINK;
  polyPath(ctx, 150, 1180, 80, 3, -Math.PI / 2);
  ctx.fill();
  ctx.fillStyle = CYAN;
  ctx.beginPath();
  ctx.arc(980, 1150, 46, 0, Math.PI * 2);
  ctx.fill();
  // ドミノ風の点（見出しを避けて左下に配置）
  ctx.save();
  ctx.fillStyle = INK;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(150 + i * 34, 1330, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // オーバーライン＋見出し
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = INK;
  ctx.font = F.unbounded(26);
  ctx.fillText("FIFA WORLD CUP 2026", 90, 300);
  ctx.font = F.unbounded(50);
  ctx.fillText("WIN / LOSS", 90, 372);
  ctx.fillStyle = PINK;
  ctx.fillText("PREDICTION", 90, 432);

  // MY 予想（黄ブロック）
  ctx.fillStyle = YEL;
  roundRect(ctx, 90, 470, 240, 64, 14);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = F.jp(800, 34);
  ctx.fillText(MYLABEL, 116, 514);

  // 対戦コード（傾いた色ブロック）
  const block = (
    code: string,
    flag: string,
    cx: number,
    cy: number,
    rot: number,
    fill: string,
    win: boolean
  ) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.fillStyle = fill;
    roundRect(ctx, -190, -90, 380, 180, 22);
    ctx.fill();
    if (win) {
      ctx.lineWidth = 8;
      ctx.strokeStyle = INK;
      ctx.stroke();
    }
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const sz = fit(ctx, code, 320, F.unbounded, 96, 44);
    ctx.font = F.unbounded(sz);
    ctx.fillText(code, 0, -6);
    ctx.font = "44px sans-serif";
    ctx.fillText(flag, 0, 56);
    ctx.restore();
  };
  block(c.homeCode, c.homeFlag, 300, 720, -0.06, PINK, c.winner === "home");
  block(c.awayCode, c.awayFlag, 780, 800, 0.06, CYAN, c.winner === "away");
  // VS バッジ
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(540, 770, 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = BG;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = F.unbounded(40);
  ctx.fillText("VS", 540, 772);
  ctx.textBaseline = "alphabetic";

  // ヒーロー
  ctx.textAlign = "center";
  if (c.scoreOn) {
    const s = scoreStr(c);
    ctx.fillStyle = YEL;
    ctx.font = F.unbounded(170);
    ctx.fillText(s, 540 + 8, 1190 + 8); // 影
    ctx.fillStyle = INK;
    ctx.fillText(s, 540, 1190);
    const cap = captionOf(c);
    const cs = fit(ctx, cap, 900, F.unbounded, 66, 34);
    ctx.fillStyle = PINK;
    ctx.font = F.unbounded(cs);
    ctx.fillText(cap, 540, 1310);
  } else {
    const cap = captionOf(c);
    ctx.save();
    ctx.translate(540, 1180);
    ctx.rotate(-0.03);
    ctx.fillStyle = INK;
    roundRect(ctx, -470, -90, 940, 180, 90);
    ctx.fill();
    ctx.fillStyle = YEL;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const cs = fit(ctx, cap, 840, F.unbounded, 92, 40);
    ctx.font = F.unbounded(cs);
    ctx.fillText(cap, 0, 4);
    ctx.restore();
    ctx.textBaseline = "alphabetic";
  }

  // 情報＋ハッシュタグ
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = F.jp(700, 30);
  ctx.fillText(`${c.stage}  ${c.date} ${c.time} JST`, 540, 1450);
  ctx.fillStyle = PINK;
  ctx.font = F.unbounded(28);
  ctx.fillText(hashtags(c), 540, 1512);
}

/* ═══════════════════════ ⑤ DECO（アール・デコ・ゴールド） ═══════════════════════ */
function drawDeco(c: DrawCtx) {
  const { ctx } = c;
  const GOLD = "#C9A14A";
  const LIGHT = "#E8D8A8";
  const cx = W / 2;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0E1A24");
  bg.addColorStop(1, "#0A141C");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // サンバースト（上部中央から扇状）
  ctx.save();
  ctx.strokeStyle = "rgba(201,161,74,0.16)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 36; i++) {
    const a = -Math.PI / 2 + (i / 36 - 0.5) * Math.PI * 1.7;
    ctx.beginPath();
    ctx.moveTo(cx, 360);
    ctx.lineTo(cx + Math.cos(a) * 1700, 360 + Math.sin(a) * 1700);
    ctx.stroke();
  }
  ctx.restore();

  // ステップ枠
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  roundRect(ctx, 70, 250, W - 140, 1420, 8);
  ctx.stroke();
  ctx.strokeStyle = "rgba(201,161,74,0.5)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, 92, 272, W - 184, 1376, 6);
  ctx.stroke();

  const chevron = (y: number) => {
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = cx - 180; x <= cx + 180; x += 40) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + 20, y - 14);
      ctx.lineTo(x + 40, y);
    }
    ctx.stroke();
  };

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // オーバーライン
  setLS(ctx, "10px");
  ctx.fillStyle = LIGHT;
  ctx.font = F.cinzel(30);
  ctx.fillText("FIFA WORLD CUP · MMXXVI", cx, 360);
  setLS(ctx, "0px");
  chevron(392);

  // 見出し
  ctx.fillStyle = GOLD;
  ctx.font = F.cinzel(46);
  const hd = fit(ctx, HEAD.toUpperCase(), 860, F.cinzel, 46, 30);
  ctx.font = F.cinzel(hd);
  ctx.fillText(HEAD.toUpperCase(), cx, 470);

  // MY 予想
  ctx.fillStyle = LIGHT;
  ctx.font = F.jp(700, 30);
  ctx.fillText(MYLABEL, cx, 524);

  // 対戦コード（中央・◆区切り）
  ctx.font = "64px sans-serif";
  ctx.fillText(c.homeFlag, cx - 280, 640);
  ctx.fillText(c.awayFlag, cx + 280, 640);
  ctx.fillStyle = GOLD;
  ctx.font = F.cinzel(40);
  ctx.fillText("◆", cx, 760);

  const sideCode = (code: string, x: number, win: boolean) => {
    const sz = fit(ctx, code, 360, F.cinzel, 104, 54);
    ctx.fillStyle = win ? LIGHT : "rgba(201,161,74,0.7)";
    ctx.font = F.cinzel(sz);
    ctx.fillText(code, x, 770);
  };
  sideCode(c.homeCode, cx - 280, c.winner === "home");
  sideCode(c.awayCode, cx + 280, c.winner === "away");

  ctx.fillStyle = "rgba(232,216,168,0.7)";
  ctx.font = F.jp(600, 26);
  ctx.fillText(c.homeName, cx - 280, 818);
  ctx.fillText(c.awayName, cx + 280, 818);

  // ヒーロー枠
  const fx = cx - 360;
  const fy = 920;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2.5;
  roundRect(ctx, fx, fy, 720, 360, 6);
  ctx.stroke();
  // 角飾り
  ctx.fillStyle = GOLD;
  [
    [fx, fy],
    [fx + 720, fy],
    [fx, fy + 360],
    [fx + 720, fy + 360],
  ].forEach(([px, py]) => {
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.textBaseline = "middle";
  if (c.scoreOn) {
    ctx.fillStyle = LIGHT;
    ctx.font = F.cinzel(170);
    ctx.fillText(scoreStr(c), cx, fy + 150);
    const cap = captionOf(c);
    const cs = fit(ctx, cap, 640, F.cinzel, 50, 28);
    ctx.fillStyle = GOLD;
    ctx.font = F.cinzel(cs);
    ctx.fillText(cap, cx, fy + 290);
  } else {
    const cap = captionOf(c);
    const cs = fit(ctx, cap, 640, F.cinzel, 88, 36);
    ctx.fillStyle = LIGHT;
    ctx.font = F.cinzel(cs);
    ctx.fillText(cap, cx, fy + 180);
  }
  ctx.textBaseline = "alphabetic";

  chevron(1360);

  // 情報＋ハッシュタグ
  ctx.fillStyle = "rgba(232,216,168,0.8)";
  ctx.font = F.jp(600, 28);
  ctx.fillText(`${c.stage}  ${c.date} ${c.time} JST`, cx, 1456);
  setLS(ctx, "4px");
  ctx.fillStyle = GOLD;
  ctx.font = F.cinzel(28);
  ctx.fillText(hashtags(c), cx, 1512);
  setLS(ctx, "0px");
}

/* ═══════════════════════ ⑥ IDE（i-D風 / ストリート・ウインク） ═══════════════════════ */
function drawIde(c: DrawCtx) {
  const { ctx } = c;
  const BG = "#F2EDE3";
  const INK = "#141414";
  const RED = "#E5202E";
  const BLUE = "#1A57D6";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  // マストヘッド＋ウインク
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = F.archivo(140);
  ctx.fillText("WCUP", 78, 360);
  ctx.fillStyle = RED;
  ctx.font = F.archivo(90);
  ctx.fillText(";)", 712, 344);

  // キッカー
  setLS(ctx, "3px");
  ctx.fillStyle = BLUE;
  ctx.font = F.archivo(26);
  ctx.fillText("THE PREDICTION ISSUE / No. 026", 82, 410);
  setLS(ctx, "0px");

  // バーコード右上
  barcode(ctx, 812, 250, 190, 64, INK);

  // 主役：対戦カード
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  const codes = `${c.homeCode}  ${c.awayCode}`;
  const cz = fit(ctx, codes, 920, F.archivo, 150, 80);
  ctx.font = F.archivo(cz);
  ctx.fillText(codes, 540, 770);
  ctx.font = "58px sans-serif";
  ctx.fillText(c.homeFlag, 300, 856);
  ctx.fillText(c.awayFlag, 780, 856);
  ctx.fillStyle = RED;
  ctx.font = F.archivo(54);
  ctx.fillText("VS", 540, 856);

  if (c.scoreOn) {
    ctx.fillStyle = RED;
    ctx.font = F.archivo(210);
    ctx.fillText(scoreStr(c), 540, 1130);
  }

  // キャプション帯
  ctx.fillStyle = INK;
  ctx.fillRect(120, 1190, 840, 116);
  ctx.fillStyle = BG;
  const cap = captionOf(c);
  const cs = fit(ctx, cap, 780, F.archivo, 72, 38);
  ctx.font = F.archivo(cs);
  ctx.textBaseline = "middle";
  ctx.fillText(cap, 540, 1250);
  ctx.textBaseline = "alphabetic";

  // コバーライン（左・赤丸ブレット）
  ctx.textAlign = "left";
  const tease = ["MY 予想", `${c.homeName} × ${c.awayName}`, c.stage];
  tease.forEach((t, i) => {
    const y = 1394 + i * 56;
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(96, y - 9, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = F.jp(700, 30);
    ctx.fillText(t, 118, y);
  });

  // 右下：Win/Loss＋日付
  ctx.textAlign = "right";
  ctx.fillStyle = BLUE;
  ctx.font = F.jp(700, 26);
  ctx.fillText("WIN / LOSS PREDICTION", 984, 1394);
  ctx.fillStyle = INK;
  ctx.font = F.jp(600, 26);
  ctx.fillText(`${c.date} ${c.time} JST`, 984, 1448);

  // フッター
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  setLS(ctx, "3px");
  ctx.font = F.archivo(28);
  ctx.fillText(hashtags(c), 540, 1580);
  setLS(ctx, "0px");

  grain(ctx, 0, 0, W, H, 300, INK, 0.04, 1.1);
}

/* ═══════════════════════ ⑦ BRUT（032c風 / ブルータル・レッド） ═══════════════════════ */
function drawBrut(c: DrawCtx) {
  const { ctx } = c;
  const RED = "#E1000F";
  const WHITE = "#FFFFFF";
  const BLACK = "#000000";

  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  // マストヘッド小＋MY予想
  ctx.textAlign = "left";
  ctx.fillStyle = WHITE;
  setLS(ctx, "4px");
  ctx.font = F.archivo(34);
  ctx.fillText("WORLD CUP", 70, 322);
  setLS(ctx, "0px");
  ctx.textAlign = "right";
  ctx.fillStyle = BLACK;
  ctx.font = F.jp(800, 28);
  ctx.fillText("MY 予想", 1010, 322);

  // 主役：縦に引き伸ばした国コード
  const drawStretch = (code: string, cy: number, win: boolean) => {
    const sz = fit(ctx, code, 1000, F.archivo, 290, 120);
    ctx.save();
    ctx.translate(540, cy);
    ctx.scale(1, 2.05);
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = win ? WHITE : BLACK;
    ctx.font = F.archivo(sz);
    ctx.fillText(code, 0, 0);
    ctx.restore();
  };
  drawStretch(c.homeCode, 700, c.winner === "home");
  drawStretch(c.awayCode, 1170, c.winner === "away");

  // スコア（右下・黒アウトライン）
  if (c.scoreOn) {
    ctx.textAlign = "right";
    ctx.lineWidth = 4;
    ctx.strokeStyle = BLACK;
    ctx.fillStyle = RED;
    ctx.font = F.archivo(140);
    ctx.fillText(scoreStr(c), 1010, 1452);
    ctx.strokeText(scoreStr(c), 1010, 1452);
  }

  // キャプション（黒・左下）
  ctx.textAlign = "left";
  ctx.fillStyle = BLACK;
  const cap = captionOf(c);
  const cs = fit(ctx, cap, 600, F.archivo, 84, 40);
  ctx.font = F.archivo(cs);
  ctx.fillText(cap, 70, 1452);

  // 最下部：Win/Loss＋号＋ハッシュタグ
  ctx.fillStyle = WHITE;
  ctx.font = F.jp(600, 24);
  ctx.textAlign = "left";
  ctx.fillText(`WIN / LOSS PREDICTION · ${c.stage} · ${c.date} ${c.time} JST`, 70, 1556);
  ctx.textAlign = "right";
  setLS(ctx, "2px");
  ctx.font = F.archivo(24);
  ctx.fillText(hashtags(c), 1010, 1610);
  setLS(ctx, "0px");
}

/* ═══════════════════════ ⑧ VOGUE（Didot / オートクチュール） ═══════════════════════ */
function drawVogue(c: DrawCtx) {
  const { ctx } = c;
  const BG = "#F7F4EF";
  const INK = "#14110F";
  const GOLD = "#9E7C3C";
  const WINE = "#7A1020";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // マストヘッド（Didot）
  ctx.fillStyle = INK;
  const mz = fit(ctx, "PREDICTION", 1000, F.bodoni, 170, 84);
  ctx.font = F.bodoni(mz);
  ctx.fillText("PREDICTION", 540, 404);

  // 金の細罫
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(170, 452);
  ctx.lineTo(910, 452);
  ctx.stroke();

  // キッカー（イタリック小）
  ctx.fillStyle = GOLD;
  ctx.font = `italic 28px "Bodoni Moda",serif`;
  ctx.fillText("Win / Loss Prediction — MY 予想", 540, 512);

  // 主役：英語国名
  ctx.fillStyle = INK;
  const vs = `${c.homeEn} — ${c.awayEn}`;
  const vz = fit(ctx, vs, 940, F.bodoni, 92, 40);
  ctx.font = F.bodoni(vz);
  ctx.fillText(vs, 540, 760);
  ctx.font = "52px sans-serif";
  ctx.fillText(`${c.homeFlag}        ${c.awayFlag}`, 540, 838);

  // スコア（金・上品）
  if (c.scoreOn) {
    ctx.fillStyle = GOLD;
    ctx.font = F.bodoni(200);
    ctx.fillText(scoreStr(c), 540, 1180);
  }

  // 勝者キャプション（ワイン）
  ctx.fillStyle = WINE;
  const cap = captionOf(c);
  const cz = fit(ctx, cap, 860, F.bodoni, 72, 36);
  ctx.font = F.bodoni(cz);
  ctx.fillText(cap, 540, c.scoreOn ? 1320 : 1140);

  // 下部：号・日付
  ctx.fillStyle = INK;
  ctx.font = `italic 26px "Bodoni Moda",serif`;
  ctx.fillText(`No. 026 · ${c.stage} · ${c.date} ${c.time} JST`, 540, 1466);
  setLS(ctx, "3px");
  ctx.font = F.bodoni(26);
  ctx.fillText(hashtags(c), 540, 1524);
  setLS(ctx, "0px");
}

/* ═══════════════════════ ⑨ FRAME（黄色ボーダー / ドキュメンタリー表紙） ═══════════════════════ */
function drawFrame(c: DrawCtx) {
  const { ctx } = c;
  const DARK = "#111418";
  const WHITE = "#FFFFFF";
  const YEL = "#FFCC00";
  const RED = "#E64A2E";

  ctx.fillStyle = DARK;
  ctx.fillRect(0, 0, W, H);

  // 黄色枠
  const bw = 46;
  ctx.fillStyle = YEL;
  ctx.fillRect(40, 40, W - 80, bw);
  ctx.fillRect(40, H - 40 - bw, W - 80, bw);
  ctx.fillRect(40, 40, bw, H - 80);
  ctx.fillRect(W - 40 - bw, 40, bw, H - 80);

  // マストヘッド（上枠）
  ctx.textBaseline = "middle";
  ctx.fillStyle = DARK;
  ctx.textAlign = "left";
  ctx.font = F.fraunces(38);
  ctx.fillText("WORLD CUP", 70, 40 + bw / 2);
  ctx.textAlign = "right";
  ctx.font = F.fraunces(24);
  ctx.fillText("THE MATCHDAY ISSUE", W - 70, 40 + bw / 2);
  ctx.textBaseline = "alphabetic";

  // キッカー
  ctx.textAlign = "center";
  ctx.fillStyle = YEL;
  setLS(ctx, "3px");
  ctx.font = F.jp(700, 26);
  ctx.fillText("WIN / LOSS PREDICTION ・ MY 予想", 540, 360);
  setLS(ctx, "0px");

  // 主役：対戦カード
  ctx.font = "50px sans-serif";
  ctx.fillText(c.homeFlag, 300, 560);
  ctx.fillText(c.awayFlag, 780, 560);
  const drawC = (code: string, x: number, win: boolean) => {
    const sz = fit(ctx, code, 360, F.fraunces, 128, 64);
    ctx.fillStyle = win ? YEL : WHITE;
    ctx.font = F.fraunces(sz);
    ctx.fillText(code, x, 690);
  };
  drawC(c.homeCode, 300, c.winner === "home");
  drawC(c.awayCode, 780, c.winner === "away");
  ctx.fillStyle = RED;
  ctx.font = F.fraunces(46);
  ctx.fillText("VS", 540, 672);

  if (c.scoreOn) {
    ctx.fillStyle = WHITE;
    ctx.font = F.fraunces(230);
    ctx.fillText(scoreStr(c), 540, 1040);
  }
  ctx.fillStyle = YEL;
  const cap = captionOf(c);
  const ks = fit(ctx, cap, 840, F.fraunces, 84, 40);
  ctx.font = F.fraunces(ks);
  ctx.fillText(cap, 540, c.scoreOn ? 1200 : 1010);

  // バーコード＋ハッシュタグ（枠内下部）
  barcode(ctx, 440, 1340, 200, 58, WHITE);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = F.jp(600, 26);
  ctx.fillText(hashtags(c), 540, 1300);

  // 下枠：号・日付
  ctx.textBaseline = "middle";
  ctx.fillStyle = DARK;
  ctx.textAlign = "left";
  ctx.font = F.fraunces(24);
  ctx.fillText(`No. 026 · ${c.stage} · ${c.date} ${c.time} JST`, 80, H - 40 - bw / 2);
  ctx.textBaseline = "alphabetic";

  grain(ctx, 86, 86, W - 172, H - 172, 240, WHITE, 0.04, 1.0);
}

/* ═══════════════════════ ⑩ MAG（特集号 / 超特大見出し） ═══════════════════════ */
function drawMag(c: DrawCtx) {
  const { ctx } = c;
  const BG = "#EDE8DF";
  const INK = "#111111";
  const RED = "#D81E2C";
  const BLUE = "#1B6FB3";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  // マストヘッド
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = F.archivo(54);
  ctx.fillText("WORLD CUP", 80, 318);
  // 特集ラベル（赤帯）
  ctx.fillStyle = RED;
  ctx.fillRect(80, 348, 248, 56);
  ctx.fillStyle = BG;
  ctx.font = F.archivo(28);
  ctx.fillText("SPECIAL ISSUE", 98, 388);
  // 号
  ctx.textAlign = "right";
  ctx.fillStyle = INK;
  ctx.font = F.archivo(28);
  ctx.fillText("No. 026", 1000, 318);

  // 超特大見出し
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  const head = "どっちが勝つ？";
  const hz = fit(ctx, head, 960, (s) => F.jp(900, s), 150, 70);
  ctx.font = F.jp(900, hz);
  ctx.fillText(head, 540, 624);

  // キッカー
  ctx.fillStyle = RED;
  setLS(ctx, "3px");
  ctx.font = F.archivo(30);
  ctx.fillText("WIN / LOSS PREDICTION", 540, 694);
  setLS(ctx, "0px");
  ctx.fillStyle = BLUE;
  ctx.font = F.jp(800, 32);
  ctx.fillText("MY 予想", 540, 744);

  // 対戦カード
  ctx.fillStyle = INK;
  ctx.font = "54px sans-serif";
  ctx.fillText(`${c.homeFlag}          ${c.awayFlag}`, 540, 884);
  const codes = `${c.homeCode}   ${c.awayCode}`;
  const cz = fit(ctx, codes, 900, F.archivo, 118, 60);
  ctx.font = F.archivo(cz);
  ctx.fillText(codes, 540, 1012);
  ctx.fillStyle = RED;
  ctx.font = F.archivo(46);
  ctx.fillText("VS", 540, 944);

  if (c.scoreOn) {
    ctx.fillStyle = INK;
    ctx.font = F.archivo(180);
    ctx.fillText(scoreStr(c), 540, 1232);
  }
  ctx.fillStyle = RED;
  const cap = captionOf(c);
  const ks = fit(ctx, cap, 900, F.archivo, 84, 42);
  ctx.font = F.archivo(ks);
  ctx.fillText(cap, 540, c.scoreOn ? 1364 : 1206);

  // 下部：号・日付＋バーコード＋ハッシュタグ
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = F.jp(600, 28);
  ctx.fillText(`${c.stage} · ${c.date} ${c.time} JST`, 80, 1474);
  barcode(ctx, 80, 1504, 220, 54, INK);
  ctx.textAlign = "right";
  setLS(ctx, "2px");
  ctx.font = F.archivo(28);
  ctx.fillStyle = INK;
  ctx.fillText(hashtags(c), 1000, 1544);
  setLS(ctx, "0px");
}

const DRAWERS: Record<string, (c: DrawCtx) => void> = {
  construct: drawConstruct,
  holo: drawHolo,
  swiss: drawSwiss,
  memphis: drawMemphis,
  deco: drawDeco,
  ide: drawIde,
  brut: drawBrut,
  vogue: drawVogue,
  frame: drawFrame,
  mag: drawMag,
};

// スタイル一覧（ピッカー用）
const STYLES: { key: string; name: string; sub: string; sw: [string, string, string] }[] = [
  { key: "construct", name: "構成主義", sub: "RED AGITPROP", sw: ["#161616", "#E63223", "#F2F0E6"] },
  { key: "holo", name: "ホロ箔", sub: "PRIZM RARE", sw: ["#0B0D17", "#7B5CFF", "#21E6C1"] },
  { key: "swiss", name: "スイス", sub: "BLUE NOTE", sw: ["#E8E2D0", "#C8341B", "#1F3A93"] },
  { key: "memphis", name: "メンフィス", sub: "80s POP", sw: ["#F7E8D5", "#FF4FA3", "#22C1C3"] },
  { key: "deco", name: "アールデコ", sub: "GOLD FINAL", sw: ["#0E1A24", "#C9A14A", "#E8D8A8"] },
  { key: "ide", name: "i-D風", sub: "STREET WINK", sw: ["#F2EDE3", "#E5202E", "#1A57D6"] },
  { key: "brut", name: "032c風", sub: "BRUTAL RED", sw: ["#E1000F", "#FFFFFF", "#000000"] },
  { key: "vogue", name: "VOGUE風", sub: "DIDOT COUTURE", sw: ["#F7F4EF", "#9E7C3C", "#7A1020"] },
  { key: "frame", name: "黄枠探検", sub: "YELLOW BORDER", sw: ["#111418", "#FFCC00", "#E64A2E"] },
  { key: "mag", name: "特集号", sub: "BIG HEADLINE", sw: ["#EDE8DF", "#D81E2C", "#1B6FB3"] },
];

/* ═══════════════════════ コンポーネント本体 ═══════════════════════ */
export default function StoryShare({ data }: { data: StoryData }) {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<Pick | null>(null);
  const [scoreOn, setScoreOn] = useState(false);
  const [score, setScore] = useState<{ h: number; a: number }>({ h: 1, a: 0 });
  const [styleKey, setStyleKey] = useState<string>("construct");
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
      const st = localStorage.getItem("storyStyle");
      if (st && DRAWERS[st]) setStyleKey(st);
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

  const selectStyle = (key: string) => {
    setStyleKey(key);
    try {
      localStorage.setItem("storyStyle", key);
    } catch {
      /* noop */
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const winner: DrawCtx["winner"] = scoreOn
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
            : null;

    const c: DrawCtx = {
      ctx,
      homeCode: data.homeCode.toUpperCase(),
      awayCode: data.awayCode.toUpperCase(),
      homeEn: (data.homeEn || data.homeCode).toUpperCase(),
      awayEn: (data.awayEn || data.awayCode).toUpperCase(),
      homeName: data.homeName,
      awayName: data.awayName,
      homeFlag: data.homeFlag,
      awayFlag: data.awayFlag,
      stage: data.stage,
      date: data.date,
      time: data.time,
      jp: data.jp,
      pick,
      scoreOn,
      score,
      winner,
    };

    ctx.save();
    ctx.clearRect(0, 0, W, H);
    setLS(ctx, "0px");
    (DRAWERS[styleKey] ?? drawConstruct)(c);
    ctx.restore();
  }, [data, pick, scoreOn, score, styleKey]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    draw();
    ensureStyleFonts(styleKey).then(() => {
      if (!cancelled) draw();
    });
    return () => {
      cancelled = true;
    };
  }, [open, draw, styleKey]);

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
    a.download = `wcup-yosou-${data.id}-${styleKey}.png`;
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
            <div className="sticky top-0 z-10 bg-jpnavy text-white px-4 py-3 flex items-center justify-between">
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

              <div className="mb-3">
                <div className="text-[11px] font-bold text-muted mb-1.5">
                  ③ デザインを選ぶ（全10種・アートグラフィック／雑誌カバー）
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {STYLES.map((s) => {
                    const active = styleKey === s.key;
                    return (
                      <button
                        key={s.key}
                        onClick={() => selectStyle(s.key)}
                        aria-pressed={active}
                        className={`shrink-0 w-[88px] rounded-xl border-2 overflow-hidden text-left transition-all ${
                          active
                            ? "border-jpred ring-2 ring-jpred/30"
                            : "border-line hover:border-jpnavy/40"
                        }`}
                      >
                        <div
                          className="h-10 flex"
                          style={{ background: s.sw[0] }}
                        >
                          <span
                            className="flex-1"
                            style={{ background: s.sw[1] }}
                          />
                          <span
                            className="flex-1"
                            style={{ background: s.sw[2] }}
                          />
                        </div>
                        <div className="px-1.5 py-1">
                          <div className="text-[11px] font-bold leading-tight">
                            {s.name}
                          </div>
                          <div className="text-[8px] text-muted tracking-wide">
                            {s.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
