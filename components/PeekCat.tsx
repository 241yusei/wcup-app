import Image from "next/image";
import Link from "next/link";

// 隠しキャラ「ボールネコのゲン」。画面の右下からこっそり覗く。
// タップ/クリックで「ゲンの玄人解説」へ。PCではホバーで全身が「ひょこっ」と出る。
export default function PeekCat() {
  return (
    <div className="fixed bottom-16 md:bottom-0 right-2 z-40 pointer-events-none">
      <Link
        href="/gen"
        title="ゲンの玄人解説"
        aria-label="ゲンの玄人解説を見る"
        className="group pointer-events-auto flex flex-col items-end gap-1 translate-y-[20%] sm:translate-y-[44%] sm:hover:translate-y-[6%] active:translate-y-[12%] transition-transform duration-500 ease-out"
      >
        <span className="bg-jpnavy text-white text-[10px] font-bold rounded-full px-2 py-1 shadow-lg whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          🐾 ゲンの解説 ›
        </span>
        <Image
          src="/char-ball.png"
          alt=""
          width={120}
          height={193}
          className="h-20 sm:h-32 w-auto select-none drop-shadow-xl"
        />
      </Link>
    </div>
  );
}
