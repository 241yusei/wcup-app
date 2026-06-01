import Link from "next/link";
import { Match } from "@/lib/types";
import { getTeam } from "@/data/teams";
import { jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import ReminderButton from "./ReminderButton";

function TeamSide({ code, align }: { code: string; align: "l" | "r" }) {
  const t = getTeam(code);
  return (
    <Link
      href={t ? `/teams/${code}` : "#"}
      className={`flex items-center gap-2 flex-1 ${
        align === "r" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span className="text-2xl">{t?.flag ?? "🏳️"}</span>
      <span className="font-bold leading-tight">{t?.name ?? code}</span>
    </Link>
  );
}

export default function MatchCard({ match }: { match: Match }) {
  const hint = jstWatchHint(match.utcDate);
  const finished = match.status === "FINISHED";
  const jpInvolved = match.homeCode === "JPN" || match.awayCode === "JPN";
  const home = getTeam(match.homeCode);
  const away = getTeam(match.awayCode);

  return (
    <div
      className={`bg-surface rounded-2xl border p-4 ${
        jpInvolved ? "border-jpred ring-1 ring-jpred/30" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between mb-3 text-xs text-muted">
        <span className="font-medium">
          {match.stage}
          {match.group ? `・組${match.group}` : ""}
        </span>
        <div className="flex items-center gap-2">
          {hint && <span className="text-jpred font-medium">{hint}</span>}
          <span className="font-mono text-base font-bold text-foreground">
            {jstTimeLabel(match.utcDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <TeamSide code={match.homeCode} align="l" />
        <div className="px-2 text-center min-w-14">
          {finished ? (
            <div className="text-xl font-bold">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <div className="text-sm text-muted font-medium">vs</div>
          )}
        </div>
        <TeamSide code={match.awayCode} align="r" />
      </div>

      {/* 会場（地域・スタジアム） */}
      {(match.city || match.stadium || match.venue) && (
        <div className="mt-3 flex items-start gap-1.5 text-xs text-muted">
          <span aria-hidden>📍</span>
          <span>
            {match.city ?? match.venue}
            {match.stadium && (
              <span className="text-foreground/70">・{match.stadium}</span>
            )}
          </span>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between gap-2">
        <Link
          href={`/matches/${match.id}`}
          className="text-xs font-bold text-jpnavy hover:underline"
        >
          📋 試合の見どころ →
        </Link>
        {!finished && (
          <ReminderButton
            uid={match.id}
            title={`⚽ ${home?.name ?? match.homeCode} vs ${away?.name ?? match.awayCode}`}
            utcStart={match.utcDate}
            location={match.stadium ?? match.city ?? match.venue}
          />
        )}
      </div>
    </div>
  );
}
