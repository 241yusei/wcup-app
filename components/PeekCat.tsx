import Image from "next/image";

// 隠しキャラ：画面の右下からこっそり覗くボールネコ。
// 普段は頭だけ。マウスを乗せると「ひょこっ」と全身を出す小さな仕掛け（CSSホバーのみ）。
export default function PeekCat() {
  return (
    <div
      className="pointer-events-none fixed bottom-0 right-2 sm:right-4 z-30 hidden sm:block"
      aria-hidden
    >
      <div
        className="group pointer-events-auto cursor-pointer translate-y-[64%] hover:translate-y-[6%] transition-transform duration-500 ease-out"
        title="みーつけた"
      >
        <Image
          src="/char-ball.png"
          alt=""
          width={120}
          height={193}
          className="h-32 w-auto select-none drop-shadow-xl"
        />
      </div>
    </div>
  );
}
