// 因縁の表示セクション。試合詳細ページに差し込む「夜の章」。
// 紺色の夜空デザインで、情報ページの中に物語の時間をつくる。

import { MatchStory } from "@/data/stories";

export default function StorySection({ story }: { story: MatchStory }) {
  return (
    <section className="mb-10 rounded-2xl overflow-hidden border-2 border-jpnavy relative">
      {/* 夜空ヘッダー */}
      <div className="bg-jpnavy text-white p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 20%, white, transparent), radial-gradient(1.5px 1.5px at 40% 70%, white, transparent), radial-gradient(1px 1px at 85% 60%, white, transparent), radial-gradient(1px 1px at 10% 80%, white, transparent), radial-gradient(1.5px 1.5px at 60% 45%, white, transparent)",
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="text-xs text-white/60 tracking-widest mb-2">
            🌙 因縁 — {story.chapter}
          </div>
          <h2 className="text-2xl font-bold leading-snug mb-3">{story.title}</h2>
          <p className="text-sm text-white/85 leading-relaxed border-l-2 border-jpred pl-3">
            {story.hook}
          </p>
        </div>
      </div>

      <div className="bg-surface p-6 space-y-8">
        {/* プロローグ（トリオン語り） */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-jpnavy">
            <span aria-hidden>🐾</span> トリオンが語る、この一戦の前夜
          </div>
          <div className="space-y-3">
            {story.prologue.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* 登場人物 */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-jpnavy">
            <span aria-hidden>🎭</span> 登場人物
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {story.characters.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-line bg-background p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-white bg-jpred rounded-full px-2 py-0.5">
                    {c.role}
                  </span>
                  <span className="text-xs text-muted">{c.team}</span>
                </div>
                <div className="font-bold text-sm mb-0.5">{c.name}</div>
                <p className="text-xs text-muted leading-relaxed">{c.line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 伏線（観戦中の注目点） */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-jpnavy">
            <span aria-hidden>🔮</span> 張られた伏線 — 試合中ここを見ろ
          </div>
          <div className="space-y-2.5">
            {story.foreshadows.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-line bg-background p-3.5 flex gap-3"
              >
                <span className="text-xl shrink-0" aria-hidden>
                  {f.icon}
                </span>
                <div>
                  <div className="font-bold text-sm mb-0.5">{f.title}</div>
                  <p className="text-xs text-muted leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 結末予想 */}
        <div className="rounded-xl bg-jpnavy/5 border border-jpnavy/20 p-4">
          <div className="text-sm font-bold text-jpnavy mb-1.5">
            🐾 トリオンの読み — 結末はこうなる
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{story.ending}</p>
        </div>

        {/* 観戦後の一言 */}
        <div className="rounded-xl border border-dashed border-jpred/40 p-4">
          <div className="text-xs font-bold text-jpred mb-1.5">
            💬 観戦後、これを言えば株が上がる
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {story.afterTalk}
          </p>
        </div>
      </div>
    </section>
  );
}
