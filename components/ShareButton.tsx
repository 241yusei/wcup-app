"use client";

// SNSシェアボタン。Web Share APIが使えれば共有シート、なければX(旧Twitter)の投稿画面を開く。
export default function ShareButton({
  text,
  label = "シェア",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav && typeof nav.share === "function") {
      try {
        await nav.share({ text, url });
        return;
      } catch {
        /* キャンセル等。フォールバックへ */
      }
    }
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={share}
      className={
        className ??
        "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-jpnavy text-jpnavy hover:bg-jpnavy hover:text-white transition-colors"
      }
    >
      <span aria-hidden>📣</span>
      {label}
    </button>
  );
}
