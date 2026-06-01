"use client";
import { useEffect, useState } from "react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PWARegister() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // サービスワーカー登録
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // インストール促進バナー（Android/Chrome系）
    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      try {
        if (!localStorage.getItem("pwa-dismissed")) setShow(true);
      } catch {
        setShow(true);
      }
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  if (!show || !deferred) return null;

  const install = async () => {
    setShow(false);
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      /* noop */
    }
    setDeferred(null);
  };

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem("pwa-dismissed", "1");
    } catch {
      /* noop */
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 sm:left-auto sm:right-4 sm:w-80">
      <div className="rounded-2xl border border-line bg-surface shadow-lg p-4 flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          📲
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm">アプリとして追加</div>
          <p className="text-xs text-muted leading-snug">
            ホーム画面に追加すると、毎回サッと開けます。
          </p>
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={install}
            className="text-xs font-bold px-3 py-1.5 rounded-full bg-jpnavy text-white"
          >
            追加
          </button>
          <button
            onClick={dismiss}
            className="text-[11px] text-muted hover:underline"
          >
            あとで
          </button>
        </div>
      </div>
    </div>
  );
}
