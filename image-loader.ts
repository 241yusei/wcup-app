// 静的書き出し（GitHub Pages）用のカスタム画像ローダー。
// next/image の src に basePath を付与する（unoptimized では付かないため）。
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (/^https?:\/\//.test(src)) return src; // 外部URLはそのまま
  return `${bp}${src.startsWith("/") ? "" : "/"}${src}`;
}
