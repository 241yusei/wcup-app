import Image from "next/image";
import { news } from "@/data/news";
import NewsTabs from "./NewsTabs";

export default function NewsPage() {
  const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">ニュース</h1>
          <p className="text-muted">
            大会の最新情報も、思わず人に話したくなる面白ネタも。タブで切り替え。
          </p>
        </div>
        <Image
          src="/mascot-ball-side.png"
          alt=""
          width={101}
          height={204}
          className="hidden sm:block shrink-0 drop-shadow-lg"
        />
      </header>
      <NewsTabs items={sorted} />
    </div>
  );
}
