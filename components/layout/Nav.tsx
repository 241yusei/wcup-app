"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "ホーム" },
  { href: "/schedule", label: "試合日程" },
  { href: "/teams", label: "各国図鑑" },
  { href: "/deep", label: "深掘り" },
  { href: "/predict", label: "優勝予想" },
  { href: "/news", label: "ニュース" },
  { href: "/guide", label: "100倍ガイド" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="bg-surface/90 backdrop-blur border-b border-line sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-3 h-16">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/mascot-v2.png"
            alt="ワールドカップ人間くん"
            width={144}
            height={144}
            className="h-9 w-9 rounded-full object-cover border border-line bg-background group-hover:scale-105 transition-transform"
            style={{ objectPosition: "50% 12%" }}
          />
          <span className="font-bold text-lg tracking-tight">
            <span className="text-jpred">100倍</span>
            <span className="text-jpnavy">Wカップ</span>
          </span>
        </Link>
        <nav className="flex gap-1 ml-auto overflow-x-auto no-scrollbar">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-jpnavy text-white"
                    : "text-muted hover:text-jpnavy hover:bg-line/60"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
