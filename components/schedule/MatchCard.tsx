import Link from "next/link";
import { Match } from "@/lib/types";
import { getTeam } from "@/data/teams";
import { jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import { scoreMatch } from "@/lib/matchScore";
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
  const s = scoreMatch(match);
  const hint = jstWatchHint(match.utcDate);
  const finished = match.status === "FINISHED";
  const home = getTeam(match.homeCode);
  const away = getTeam(match.awayCode);

  return (
    <div
      className={`bg-surface rounded-2xl border p-4 ${
        s.jpInvolved ? "border-jpred ring-1 ring-jpred/30" : "border-line"
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

      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{
              backgroundColor:
                s.total >= 80
                  ? "#d7282f"
                  : s.total >= 60
                    ? "#e8820c"
                    : "#7f8c8d",
            }}
          >
            見るべき度 {s.total}
          </span>
          <span className="text-xs text-muted hidden sm:inline">{s.reason}</span>
        </div>
        {!finished && (
          <ReminderButton
            uid={match.id}
            title={`⚽ ${home?.name ?? match.homeCode} vs ${away?.name ?? match.awayCode}`}
            utcStart={match.utcDate}
            location={match.venue}
          />
        )}
      </div>
      <p className="text-xs text-muted mt-2 sm:hidden">{s.reason}</p>
    </div>
  );
}
