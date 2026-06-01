import Link from "next/link";

export const metadata = {
  title: "オフライン｜100倍Wカップ",
};

export default function OfflinePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">📡</div>
      <h1 className="text-2xl font-bold mb-2">オフラインです</h1>
      <p className="text-muted text-sm leading-relaxed mb-6">
        インターネットに接続できないようです。
        <br />
        接続を確認して、もう一度お試しください。
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 rounded-full bg-jpnavy text-white font-medium"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
