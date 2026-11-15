"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Award,
  Flame,
  ExternalLink,
  RefreshCw,
  Trophy,
  CheckCircle2,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               PLATFORM LOGOS                               */
/* -------------------------------------------------------------------------- */

function LeetCodeLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382z"
        fill="#FFA116"
      />
    </svg>
  );
}

function CodeforcesLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="2" y="10" width="5" height="12" rx="1.5" fill="#FFC107" />
      <rect x="9.5" y="3" width="5" height="19" rx="1.5" fill="#2196F3" />
      <rect x="17" y="7" width="5" height="15" rx="1.5" fill="#F44336" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 INTERFACES                                 */
/* -------------------------------------------------------------------------- */

interface LeetCodeStats {
  username: string;
  realName: string;
  avatar: string;
  country: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  currentStreak: number;
  maxStreak: number;
  activeDaysCount: number;
  calendarDates: Record<string, number>;
}

interface CFRatingPoint {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
}

interface CFTagCount {
  tag: string;
  count: number;
}

interface CodeforcesStats {
  handle: string;
  avatar: string;
  rank: string;
  maxRank: string;
  rating: number;
  maxRating: number;
  contribution: number;
  totalSolved: number;
  totalSubmissions: number;
  contestsCount: number;
  ratingHistory: CFRatingPoint[];
  topTags: CFTagCount[];
  calendarDates: Record<string, number>;
}

/* -------------------------------------------------------------------------- */
/*                               REAL DEFAULTS                                */
/* -------------------------------------------------------------------------- */

const DEFAULT_LEETCODE_STATS: LeetCodeStats = {
  username: "notshvet-exe",
  realName: "Shvet Ghare",
  avatar: "https://assets.leetcode.com/users/7tGmwCw5i4/avatar_1794573761.png",
  country: "India",
  totalSolved: 362,
  totalQuestions: 4114,
  easySolved: 137,
  totalEasy: 953,
  mediumSolved: 193,
  totalMedium: 2081,
  hardSolved: 32,
  totalHard: 951,
  acceptanceRate: 58.0,
  ranking: 393441,
  contributionPoints: 0,
  currentStreak: 15,
  maxStreak: 101,
  activeDaysCount: 174,
  calendarDates: {},
};

const DEFAULT_CODEFORCES_STATS: CodeforcesStats = {
  handle: "notshvet.exe",
  avatar: "/images/codeforces-avatar.jpg",
  rank: "Unrated",
  maxRank: "Unrated",
  rating: 0,
  maxRating: 0,
  contribution: 0,
  totalSolved: 5,
  totalSubmissions: 8,
  contestsCount: 0,
  ratingHistory: [],
  topTags: [
    { tag: "Math", count: 3 },
    { tag: "Implementation", count: 2 },
    { tag: "Binary Search", count: 1 },
    { tag: "Strings", count: 1 },
    { tag: "Brute Force", count: 1 },
  ],
  calendarDates: { "2026-11-15": 8 },
};

/* -------------------------------------------------------------------------- */
/*                           DATA UTILITIES & STREAKS                         */
/* -------------------------------------------------------------------------- */

function calculateStreaksFromCalendar(calendar: Record<string, number>): {
  currentStreak: number;
  maxStreak: number;
  activeDaysCount: number;
} {
  const timestamps = Object.keys(calendar)
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0)
    .sort((a, b) => a - b);

  if (timestamps.length === 0) {
    return { currentStreak: 15, maxStreak: 101, activeDaysCount: 174 };
  }

  const daySet = new Set<number>();
  timestamps.forEach((ts) => {
    daySet.add(Math.floor(ts / 86400));
  });

  const sortedDays = Array.from(daySet).sort((a, b) => a - b);
  let maxStreak = 0;
  let curr = 0;
  let prevDay: number | null = null;

  for (const day of sortedDays) {
    if (prevDay === null) {
      curr = 1;
    } else if (day === prevDay + 1) {
      curr++;
    } else if (day > prevDay + 1) {
      curr = 1;
    }
    if (curr > maxStreak) maxStreak = curr;
    prevDay = day;
  }

  const latestDay = sortedDays[sortedDays.length - 1];
  let currentStreak = 0;
  let check = latestDay;
  while (daySet.has(check)) {
    currentStreak++;
    check--;
  }

  return {
    currentStreak: Math.max(1, currentStreak),
    maxStreak: Math.max(maxStreak, 101),
    activeDaysCount: sortedDays.length,
  };
}

function buildCalendarGrid(
  dateCountMap: Record<string, number>,
  weeksCount = 20
): Array<Array<{ date: string; count: number; level: number }>> {
  const today = new Date();
  const dayOfWeek = today.getUTCDay();
  
  const startDate = new Date(today);
  startDate.setUTCDate(today.getUTCDate() - ((weeksCount - 1) * 7 + dayOfWeek));
  startDate.setUTCHours(0, 0, 0, 0);

  const grid: Array<Array<{ date: string; count: number; level: number }>> = [];

  for (let r = 0; r < 7; r++) {
    const row: Array<{ date: string; count: number; level: number }> = [];
    for (let c = 0; c < weeksCount; c++) {
      const curDate = new Date(startDate);
      curDate.setUTCDate(startDate.getUTCDate() + (c * 7 + r));
      const dateStr = curDate.toISOString().split("T")[0];
      const count = dateCountMap[dateStr] || 0;

      let level = 0;
      if (count > 0) {
        if (count === 1) level = 1;
        else if (count <= 3) level = 2;
        else level = 3;
      }

      row.push({ date: dateStr, count, level });
    }
    grid.push(row);
  }

  return grid;
}

function getCFRankColor(rank: string): { text: string; bg: string; border: string } {
  const r = rank.toLowerCase();
  if (r.includes("legendary") || r.includes("international grandmaster") || r.includes("grandmaster")) {
    return { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" };
  }
  if (r.includes("master")) {
    return { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" };
  }
  if (r.includes("candidate master")) {
    return { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" };
  }
  if (r.includes("expert")) {
    return { text: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" };
  }
  if (r.includes("specialist")) {
    return { text: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/30" };
  }
  if (r.includes("pupil")) {
    return { text: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" };
  }
  if (r.includes("newbie")) {
    return { text: "text-neutral-400", bg: "bg-neutral-500/10", border: "border-neutral-500/30" };
  }
  return { text: "text-neutral-400", bg: "bg-neutral-500/10", border: "border-neutral-500/30" };
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function LeetCodeSection() {
  const [activeTab, setActiveTab] = useState<"all" | "leetcode" | "codeforces">("all");
  const [lcStats, setLcStats] = useState<LeetCodeStats>(DEFAULT_LEETCODE_STATS);
  const [cfStats, setCfStats] = useState<CodeforcesStats>(DEFAULT_CODEFORCES_STATS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cfAvatarSrc, setCfAvatarSrc] = useState<string>(DEFAULT_CODEFORCES_STATS.avatar);

  const lcUsername = "notshvet-exe";
  const cfHandle = "notshvet.exe";

  /* ------------------------------------------------------------------------ */
  /*                          LIVE DATA SYNCHRONIZATION                       */
  /* ------------------------------------------------------------------------ */

  const fetchAllStats = async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    }

    // 1. Fetch LeetCode Real Details
    try {
      const p1 = fetch(`https://leetcode-api-faisalshohag.vercel.app/${lcUsername}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      const p2 = fetch(`https://alfa-leetcode-api.onrender.com/${lcUsername}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      const [dataMain, dataProfile] = await Promise.all([p1, p2]);

      if (dataMain && typeof dataMain.totalSolved === "number") {
        let cal: Record<string, number> = {};
        if (dataMain.submissionCalendar) {
          if (typeof dataMain.submissionCalendar === "string") {
            try {
              cal = JSON.parse(dataMain.submissionCalendar);
            } catch (err) {
              console.warn("Could not parse submission calendar:", err);
            }
          } else if (typeof dataMain.submissionCalendar === "object") {
            cal = dataMain.submissionCalendar;
          }
        }

        const dateMap: Record<string, number> = {};
        for (const [ts, cnt] of Object.entries(cal)) {
          const dt = new Date(Number(ts) * 1000);
          const key = dt.toISOString().split("T")[0];
          dateMap[key] = (dateMap[key] || 0) + Number(cnt);
        }

        const streakInfo = calculateStreaksFromCalendar(cal);

        setLcStats((prev) => ({
          ...prev,
          totalSolved: dataMain.totalSolved,
          totalQuestions: dataMain.totalQuestions || 4114,
          easySolved: dataMain.easySolved ?? prev.easySolved,
          totalEasy: dataMain.totalEasy ?? prev.totalEasy,
          mediumSolved: dataMain.mediumSolved ?? prev.mediumSolved,
          totalMedium: dataMain.totalMedium ?? prev.totalMedium,
          hardSolved: dataMain.hardSolved ?? prev.hardSolved,
          totalHard: dataMain.totalHard ?? prev.totalHard,
          acceptanceRate:
            parseFloat(dataMain.acceptanceRate) ||
            Math.round((dataMain.totalSolved / (dataMain.totalSubmissions?.[0]?.submissions || 468)) * 1000) / 10 ||
            prev.acceptanceRate,
          ranking: dataMain.ranking || prev.ranking,
          contributionPoints:
            dataMain.contributionPoint || dataMain.contributionPoints || prev.contributionPoints,
          currentStreak: streakInfo.currentStreak,
          maxStreak: streakInfo.maxStreak,
          activeDaysCount: streakInfo.activeDaysCount,
          calendarDates: Object.keys(dateMap).length > 0 ? dateMap : prev.calendarDates,
          avatar: dataProfile?.avatar || prev.avatar,
          realName: dataProfile?.name || prev.realName,
          country: dataProfile?.country || prev.country,
        }));
      } else if (dataProfile) {
        setLcStats((prev) => ({
          ...prev,
          avatar: dataProfile.avatar || prev.avatar,
          realName: dataProfile.name || prev.realName,
          country: dataProfile.country || prev.country,
          ranking: dataProfile.ranking || prev.ranking,
        }));
      }
    } catch (e) {
      console.warn("LeetCode API sync error:", e);
    }

    // 2. Fetch Codeforces Real Details
    try {
      const [infoRes, ratingRes, statusRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`https://codeforces.com/api/user.rating?handle=${cfHandle}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`https://codeforces.com/api/user.status?handle=${cfHandle}&from=1&count=200`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);

      if (infoRes && infoRes.status === "OK" && infoRes.result?.[0]) {
        const u = infoRes.result[0];
        const ratingHistory: CFRatingPoint[] = ratingRes?.status === "OK" ? ratingRes.result || [] : [];
        const submissions: Array<{
          id: number;
          creationTimeSeconds: number;
          verdict: string;
          problem: { contestId?: number; index?: string; name: string; tags?: string[] };
        }> = statusRes?.status === "OK" ? statusRes.result || [] : [];

        const accepted = submissions.filter((s) => s.verdict === "OK");
        const uniqueSolvedSet = new Set(accepted.map((s) => s.problem.name));
        const totalSolved = uniqueSolvedSet.size > 0 ? uniqueSolvedSet.size : DEFAULT_CODEFORCES_STATS.totalSolved;

        const cfDateMap: Record<string, number> = {};
        submissions.forEach((s) => {
          if (s.creationTimeSeconds) {
            const dt = new Date(s.creationTimeSeconds * 1000);
            const key = dt.toISOString().split("T")[0];
            cfDateMap[key] = (cfDateMap[key] || 0) + 1;
          }
        });

        const tagMap: Record<string, number> = {};
        accepted.forEach((s) => {
          (s.problem.tags || []).forEach((t) => {
            const formatted = t.charAt(0).toUpperCase() + t.slice(1);
            tagMap[formatted] = (tagMap[formatted] || 0) + 1;
          });
        });

        const topTags = Object.entries(tagMap)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setCfStats({
          handle: u.handle || cfHandle,
          avatar: "/images/codeforces-avatar.jpg",
          rank: u.rank ? u.rank.charAt(0).toUpperCase() + u.rank.slice(1) : "Unrated",
          maxRank: u.maxRank ? u.maxRank.charAt(0).toUpperCase() + u.maxRank.slice(1) : "Unrated",
          rating: u.rating || 0,
          maxRating: u.maxRating || 0,
          contribution: u.contribution || 0,
          totalSolved,
          totalSubmissions: submissions.length > 0 ? submissions.length : DEFAULT_CODEFORCES_STATS.totalSubmissions,
          contestsCount: ratingHistory.length,
          ratingHistory,
          topTags: topTags.length > 0 ? topTags : DEFAULT_CODEFORCES_STATS.topTags,
          calendarDates: Object.keys(cfDateMap).length > 0 ? cfDateMap : DEFAULT_CODEFORCES_STATS.calendarDates,
        });

        setCfAvatarSrc("/images/codeforces-avatar.jpg");
      }
    } catch (e) {
      console.warn("Codeforces API sync error:", e);
    }

    setIsRefreshing(false);
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      await fetchAllStats(false);
      if (ignore) return;
    })();
    return () => {
      ignore = true;
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                  ACTUAL CALENDAR MATRICES (RESPONSIVE WIDE)              */
  /* ------------------------------------------------------------------------ */

  const weeksCount = activeTab === "all" ? 20 : 52;

  const lcGrid = useMemo(() => {
    return buildCalendarGrid(lcStats.calendarDates, weeksCount);
  }, [lcStats.calendarDates, weeksCount]);

  const cfGrid = useMemo(() => {
    return buildCalendarGrid(cfStats.calendarDates, weeksCount);
  }, [cfStats.calendarDates, weeksCount]);

  const cfRankStyle = getCFRankColor(cfStats.rank);
  const lcSolvedPercent = ((lcStats.totalSolved / lcStats.totalQuestions) * 100).toFixed(1);

  return (
    <section
      id="leetcode"
      className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-32 overflow-hidden"
    >
      {/* Background Watermark 06 */}
      <div className="absolute bottom-[-5%] left-[-5%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-80">
        <span className="font-sans font-black text-[clamp(200px,38vw,600px)] text-neutral-100 dark:text-neutral-900/30 transition-colors duration-700 block -translate-x-[15%] translate-y-[15%]">
          06
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4 flex items-center gap-2"
            >
              <span>05 / COMPETITIVE CODING</span>
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            </motion.p>
            <h2 className="font-sans font-black text-[clamp(40px,9vw,100px)] tracking-tighter uppercase leading-[0.8] text-black dark:text-white">
              CODING
            </h2>
            <h3 className="font-sans font-black text-[clamp(28px,6vw,70px)] tracking-tighter uppercase leading-[0.85] text-accent mt-2">
              STATISTICS
            </h3>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Selector Tabs */}
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none font-mono text-[10px] tracking-wider uppercase">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-2 transition-all ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-accent to-cyan-400 text-black font-black shadow-sm"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setActiveTab("leetcode")}
                className={`px-3 py-2 transition-all ${
                  activeTab === "leetcode"
                    ? "bg-accent text-black font-bold shadow-sm"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                LEETCODE
              </button>
              <button
                onClick={() => setActiveTab("codeforces")}
                className={`px-3 py-2 transition-all ${
                  activeTab === "codeforces"
                    ? "bg-cyan-400 text-black font-bold shadow-sm"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                CODEFORCES
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchAllStats(true)}
              disabled={isRefreshing}
              aria-label="Refresh competitive programming statistics"
              title="Refresh live stats from official APIs"
              className="p-3 border border-neutral-200 dark:border-neutral-800 hover:border-accent dark:hover:border-accent hover:bg-neutral-50 dark:hover:bg-neutral-950 text-neutral-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw
                size={14}
                className={`${isRefreshing ? "animate-spin text-accent" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/*               COLUMN-WISE PLATFORM CARDS GRID                       */}
        {/* =================================================================== */}
        <div className="relative w-full">
          {/* Option 1: Laser Seam Divider (Visible on desktop when ALL platforms are shown) */}
          {activeTab === "all" && (
            <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center justify-between pointer-events-none z-20">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#C3E41D]" />
              <div className="w-[2px] h-full bg-gradient-to-b from-accent via-cyan-400 to-accent opacity-80 shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
              <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 dark:bg-black border border-neutral-700/80 backdrop-blur-md font-mono text-[8px] font-black tracking-[0.25em] text-white flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-neutral-300">DUAL</span>
                <span className="text-cyan-400">ARENA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00E5FF]" />
            </div>
          )}

          <div
            className={
              activeTab === "all"
                ? "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10 w-full"
                : "w-full relative z-10"
            }
          >
            {/* =============================================================== */}
            {/*                   COLUMN 1: LEETCODE SECTION                    */}
            {/* =============================================================== */}
            <AnimatePresence mode="popLayout">
              {(activeTab === "all" || activeTab === "leetcode") && (
                <motion.div
                  key="leetcode-column"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col gap-6 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-900 p-6 sm:p-8"
                >
                  {/* 1. Header: Profile Identity */}
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-900">
                    <div className="flex items-center gap-4">
                      {/* LeetCode User Avatar */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-accent/80 bg-neutral-200 dark:bg-neutral-900 flex-shrink-0">
                        <Image
                          src={lcStats.avatar || "https://assets.leetcode.com/users/7tGmwCw5i4/avatar_1794573761.png"}
                          alt={lcStats.realName || lcStats.username}
                          fill
                          unoptimized
                          sizes="64px"
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://avatars.githubusercontent.com/u/202398354?v=4";
                          }}
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-black text-lg sm:text-xl text-black dark:text-white tracking-tight">
                            {lcStats.realName}
                          </h4>
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {lcStats.country}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          @{lcStats.username}
                        </p>
                      </div>
                    </div>

                    {/* LeetCode Platform Badge */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#FFA116]/10 text-[#FFA116] border border-[#FFA116]/30">
                        <LeetCodeLogo className="w-3.5 h-3.5" />
                        LEETCODE
                      </span>
                      <span className="font-mono text-[9px] text-neutral-400">
                        SOLVER ENGINE
                      </span>
                    </div>
                  </div>

                  {/* 2. STATS & METRICS (Adaptive Wide Split when single) */}
                  <div
                    className={
                      activeTab === "all"
                        ? "flex flex-col gap-6"
                        : "grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                    }
                  >
                    {/* Hero Stats Block */}
                    <div
                      className={`p-5 sm:p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 relative overflow-hidden ${
                        activeTab !== "all" ? "lg:col-span-7 flex flex-col justify-between" : ""
                      }`}
                    >
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-4">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                              TOTAL PROBLEMS SOLVED
                            </span>
                            <div className="flex items-baseline gap-3">
                              <span className="font-sans font-black text-4xl sm:text-5xl tracking-tighter text-black dark:text-white">
                                {lcStats.totalSolved}
                              </span>
                              <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wider">
                                / {lcStats.totalQuestions} AVAILABLE
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-accent/20 text-black dark:text-accent font-bold border border-accent/40">
                              {lcSolvedPercent}% SOLVED
                            </span>
                          </div>
                        </div>

                        {/* Multi-segment Stacked Rectangular Progress Bar */}
                        <div className="space-y-1.5 mb-5">
                          <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-900 flex overflow-hidden rounded-none p-[2px]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(lcStats.easySolved / lcStats.totalQuestions) * 100 * 3.5}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="h-full bg-emerald-500 mr-0.5"
                              title={`Easy: ${lcStats.easySolved}`}
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(lcStats.mediumSolved / lcStats.totalQuestions) * 100 * 3.5}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-amber-500 mr-0.5"
                              title={`Medium: ${lcStats.mediumSolved}`}
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(lcStats.hardSolved / lcStats.totalQuestions) * 100 * 3.5}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="h-full bg-rose-500"
                              title={`Hard: ${lcStats.hardSolved}`}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-none bg-emerald-500 inline-block" /> Easy ({lcStats.easySolved})
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-none bg-amber-500 inline-block" /> Medium ({lcStats.mediumSolved})
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-none bg-rose-500 inline-block" /> Hard ({lcStats.hardSolved})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3 Difficulty Rectangular Cards */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900">
                          <span className="block font-mono text-[9px] uppercase font-bold text-emerald-500 mb-1">
                            EASY
                          </span>
                          <div className="flex items-baseline justify-between mb-1.5">
                            <span className="font-sans font-black text-lg text-black dark:text-white">
                              {lcStats.easySolved}
                            </span>
                            <span className="font-mono text-[9px] text-neutral-400">
                              /{lcStats.totalEasy}
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(lcStats.easySolved / lcStats.totalEasy) * 100}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7 }}
                              className="h-full bg-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900">
                          <span className="block font-mono text-[9px] uppercase font-bold text-amber-500 mb-1">
                            MEDIUM
                          </span>
                          <div className="flex items-baseline justify-between mb-1.5">
                            <span className="font-sans font-black text-lg text-black dark:text-white">
                              {lcStats.mediumSolved}
                            </span>
                            <span className="font-mono text-[9px] text-neutral-400">
                              /{lcStats.totalMedium}
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(lcStats.mediumSolved / lcStats.totalMedium) * 100}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7 }}
                              className="h-full bg-amber-500"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900">
                          <span className="block font-mono text-[9px] uppercase font-bold text-rose-500 mb-1">
                            HARD
                          </span>
                          <div className="flex items-baseline justify-between mb-1.5">
                            <span className="font-sans font-black text-lg text-black dark:text-white">
                              {lcStats.hardSolved}
                            </span>
                            <span className="font-mono text-[9px] text-neutral-400">
                              /{lcStats.totalHard}
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(lcStats.hardSolved / lcStats.totalHard) * 100}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7 }}
                              className="h-full bg-rose-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metric Highlights Grid */}
                    <div
                      className={`grid grid-cols-2 gap-3 ${
                        activeTab !== "all" ? "lg:col-span-5" : "sm:grid-cols-4"
                      }`}
                    >
                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-accent mb-2">
                          <Award size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            GLOBAL RANK
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          #{lcStats.ranking.toLocaleString("en-US")}
                        </span>
                      </div>

                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-accent mb-2">
                          <Target size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            ACCURACY
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {lcStats.acceptanceRate}%
                        </span>
                      </div>

                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-accent mb-2">
                          <Flame size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            MAX STREAK
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {lcStats.maxStreak} Days
                        </span>
                      </div>

                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-accent mb-2">
                          <Sparkles size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            ACTIVE DAYS
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {lcStats.activeDaysCount} Days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. ACTUAL LEETCODE CONSISTENCY HEATMAP */}
                  <div className="p-4 sm:p-5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 w-full overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-accent" />
                        <span className="font-mono text-[10px] uppercase font-bold text-black dark:text-white tracking-wider">
                          LEETCODE ACTIVITY GRID ({weeksCount} WEEKS)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[8px] text-neutral-400">
                        <span>LESS</span>
                        <div className="w-2.5 h-2.5 bg-neutral-200 dark:bg-neutral-900" />
                        <div className="w-2.5 h-2.5 bg-accent/40" />
                        <div className="w-2.5 h-2.5 bg-accent" />
                        <span>MORE</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto pb-1 scrollbar-thin">
                      <div className={`flex flex-col gap-1 w-full ${activeTab === "all" ? "min-w-max" : ""}`}>
                        {lcGrid.map((row, rIdx) => (
                          <div
                            key={rIdx}
                            className={`flex gap-1 ${
                              activeTab === "all" ? "" : "w-full justify-between"
                            }`}
                          >
                            {row.map((cell, cIdx) => {
                              let bgClass = "bg-neutral-200 dark:bg-neutral-900";
                              if (cell.level === 1) bgClass = "bg-accent/35";
                              else if (cell.level === 2) bgClass = "bg-accent/70";
                              else if (cell.level === 3) bgClass = "bg-accent";

                              return (
                                <motion.div
                                  key={cIdx}
                                  whileHover={{ scale: 1.35 }}
                                  className={`${
                                    activeTab === "all"
                                      ? "w-3 h-3 sm:w-3.5 sm:h-3.5"
                                      : "flex-1 min-w-[10px] max-w-[20px] aspect-square rounded-[1px]"
                                  } transition-colors duration-200 ${bgClass}`}
                                  title={`${cell.date}: ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Footer Link */}
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                      STATUS: ACTIVE SOLVER
                    </span>
                    <a
                      href={`https://leetcode.com/u/${lcStats.username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-[10px] tracking-[0.15em] px-4 py-2 uppercase transition-all hover:bg-accent dark:hover:bg-accent hover:text-black dark:hover:text-black"
                    >
                      LEETCODE PROFILE <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =============================================================== */}
            {/*                  COLUMN 2: CODEFORCES SECTION                   */}
            {/* =============================================================== */}
            <AnimatePresence mode="popLayout">
              {(activeTab === "all" || activeTab === "codeforces") && (
                <motion.div
                  key="codeforces-column"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col gap-6 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-900 p-6 sm:p-8"
                >
                  {/* 1. Header: Profile Identity */}
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-900">
                    <div className="flex items-center gap-4">
                      {/* Codeforces User Avatar with verified local image */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-cyan-500/80 bg-neutral-200 dark:bg-neutral-900 flex-shrink-0">
                        <Image
                          src={cfAvatarSrc}
                          alt={cfStats.handle}
                          fill
                          unoptimized
                          sizes="64px"
                          className="object-cover"
                          onError={() => {
                            setCfAvatarSrc("/images/codeforces-avatar.jpg");
                          }}
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-cyan-500 border-2 border-white dark:border-black" />
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-black text-lg sm:text-xl text-black dark:text-white tracking-tight">
                            {cfStats.handle}
                          </h4>
                        </div>
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1.5">
                          <span>RANK:</span>
                          <span className={`font-bold ${cfRankStyle.text}`}>
                            {cfStats.rank.toUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Codeforces Platform Badge with official 3-bars logo */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
                        <CodeforcesLogo className="w-3.5 h-3.5" />
                        CODEFORCES
                      </span>
                      <span className="font-mono text-[9px] text-neutral-400">
                        ROUND CONTESTANT
                      </span>
                    </div>
                  </div>

                  {/* 2. STATS & METRICS (Adaptive Wide Split when single) */}
                  <div
                    className={
                      activeTab === "all"
                        ? "flex flex-col gap-6"
                        : "grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                    }
                  >
                    {/* Hero Stats & Milestone Block */}
                    <div
                      className={`p-5 sm:p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 relative overflow-hidden ${
                        activeTab !== "all" ? "lg:col-span-7 flex flex-col justify-between" : ""
                      }`}
                    >
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-4">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                              TOTAL PROBLEMS SOLVED
                            </span>
                            <div className="flex items-baseline gap-3">
                              <span className="font-sans font-black text-4xl sm:text-5xl tracking-tighter text-black dark:text-white">
                                {cfStats.totalSolved}
                              </span>
                              <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wider">
                                / {cfStats.totalSubmissions} SUBMISSIONS
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 font-bold border border-cyan-500/40">
                              {Math.round((cfStats.totalSolved / Math.max(1, cfStats.totalSubmissions)) * 100)}% SUCCESS
                            </span>
                          </div>
                        </div>

                        {/* Rating / Milestone Banner */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                            <span className="font-mono text-[9px] uppercase text-neutral-400">
                              CURRENT COMPETITIVE RATING
                            </span>
                            <div className="flex items-baseline justify-between mt-1">
                              <span
                                className={`font-sans font-black text-2xl sm:text-3xl tracking-tight ${
                                  cfStats.rating > 0 ? cfRankStyle.text : "text-neutral-400"
                                }`}
                              >
                                {cfStats.rating > 0 ? cfStats.rating : "UNRATED"}
                              </span>
                              <span className="font-mono text-[9px] text-neutral-500">
                                PEAK: {cfStats.maxRating > 0 ? cfStats.maxRating : "—"}
                              </span>
                            </div>
                          </div>

                          <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                            <span className="font-mono text-[9px] uppercase text-neutral-400">
                              TARGET DIVISION MILESTONE
                            </span>
                            <div className="flex items-baseline justify-between mt-1">
                              <span className="font-sans font-black text-xl sm:text-2xl tracking-tight text-cyan-400 dark:text-cyan-400">
                                {cfStats.rating < 1200
                                  ? "PUPIL (1200)"
                                  : cfStats.rating < 1400
                                  ? "SPECIALIST (1400)"
                                  : "EXPERT (1600)"}
                              </span>
                              <span className="font-mono text-[9px] text-neutral-500">DIV 3 / 2</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Solved Topics Tags */}
                      <div className="space-y-1.5">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                          SOLVED PROBLEM DOMAINS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cfStats.topTags.map((item, idx) => (
                            <span
                              key={idx}
                              className="font-mono text-[9px] px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5"
                            >
                              <span>{item.tag}</span>
                              <span className="text-cyan-500 font-bold">({item.count})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metric Highlights Grid */}
                    <div
                      className={`grid grid-cols-2 gap-3 ${
                        activeTab !== "all" ? "lg:col-span-5" : "sm:grid-cols-4"
                      }`}
                    >
                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-cyan-500 mb-2">
                          <CheckCircle2 size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            ACCEPTED
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {cfStats.totalSolved} Tasks
                        </span>
                      </div>

                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-cyan-500 mb-2">
                          <Layers size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            ATTEMPTS
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {cfStats.totalSubmissions} Total
                        </span>
                      </div>

                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-cyan-500 mb-2">
                          <Trophy size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            CONTESTS
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {cfStats.contestsCount} Rounds
                        </span>
                      </div>

                      <div className="p-4 bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-cyan-500 mb-2">
                          <BarChart3 size={16} />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                            SOLVE RATE
                          </span>
                        </div>
                        <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight">
                          {Math.round((cfStats.totalSolved / Math.max(1, cfStats.totalSubmissions)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. ACTUAL CODEFORCES CONSISTENCY HEATMAP */}
                  <div className="p-4 sm:p-5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 w-full overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-cyan-500" />
                        <span className="font-mono text-[10px] uppercase font-bold text-black dark:text-white tracking-wider">
                          CODEFORCES ACTIVITY GRID ({weeksCount} WEEKS)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[8px] text-neutral-400">
                        <span>LESS</span>
                        <div className="w-2.5 h-2.5 bg-neutral-200 dark:bg-neutral-900" />
                        <div className="w-2.5 h-2.5 bg-cyan-500/40" />
                        <div className="w-2.5 h-2.5 bg-cyan-500" />
                        <span>MORE</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto pb-1 scrollbar-thin">
                      <div className={`flex flex-col gap-1 w-full ${activeTab === "all" ? "min-w-max" : ""}`}>
                        {cfGrid.map((row, rIdx) => (
                          <div
                            key={rIdx}
                            className={`flex gap-1 ${
                              activeTab === "all" ? "" : "w-full justify-between"
                            }`}
                          >
                            {row.map((cell, cIdx) => {
                              let bgClass = "bg-neutral-200 dark:bg-neutral-900";
                              if (cell.level === 1) bgClass = "bg-cyan-500/35";
                              else if (cell.level === 2) bgClass = "bg-cyan-500/70";
                              else if (cell.level === 3) bgClass = "bg-cyan-500";

                              return (
                                <motion.div
                                  key={cIdx}
                                  whileHover={{ scale: 1.35 }}
                                  className={`${
                                    activeTab === "all"
                                      ? "w-3 h-3 sm:w-3.5 sm:h-3.5"
                                      : "flex-1 min-w-[10px] max-w-[20px] aspect-square rounded-[1px]"
                                  } transition-colors duration-200 ${bgClass}`}
                                  title={`${cell.date}: ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Footer Link */}
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                      CODEFORCES ENGINE
                    </span>
                    <a
                      href={`https://codeforces.com/profile/${cfStats.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-[10px] tracking-[0.15em] px-4 py-2 uppercase transition-all hover:bg-cyan-500 hover:text-black dark:hover:bg-cyan-500 dark:hover:text-black"
                    >
                      CODEFORCES PROFILE <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Named alias export for flexibility
export { LeetCodeSection as CodingStatsSection };
