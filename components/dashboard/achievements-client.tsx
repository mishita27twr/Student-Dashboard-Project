"use client";

import { motion, type Variants } from "framer-motion";
import { Trophy, Star, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export function AchievementsClient({ achievements }: { achievements: Achievement[] }) {
  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      <motion.div variants={item}>
        <h1 className="text-4xl font-black tracking-tight">Achievements</h1>
        <p className="text-muted-foreground text-lg">Your hall of fame. Collect them all.</p>
      </motion.div>

      {/* Hero stat */}
      <motion.div variants={item}>
        <div className="bg-gradient-to-br from-yellow-500/10 to-card/40 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-8 relative overflow-hidden md:w-2/3">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 to-transparent opacity-50 blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-yellow-500 font-bold tracking-widest text-sm uppercase mb-2">Total Earned</p>
              <div className="text-5xl font-black flex items-baseline gap-2">
                {earned.length}
                <span className="text-2xl text-muted-foreground font-medium">/ {achievements.length}</span>
              </div>
            </div>
            <div className="w-24 h-24 rounded-full bg-yellow-500/20 border-4 border-yellow-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.3)]">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
        </div>
      </motion.div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight border-b border-border/50 pb-2 inline-flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" /> Earned Badges
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {earned.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </section>

      <section className="space-y-6 opacity-60">
        <h2 className="text-2xl font-bold tracking-tight border-b border-border/50 pb-2 inline-flex items-center gap-2">
          <Lock className="w-5 h-5" /> Locked
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {locked.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function BadgeCard({ badge }: { badge: Achievement }) {
  const isEarned = badge.earned;
  return (
    <motion.div
      variants={item}
      whileHover={isEarned ? { scale: 1.05, y: -5 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <article
        className={cn(
          "h-full backdrop-blur-xl border rounded-2xl overflow-hidden text-center flex flex-col items-center p-6 relative",
          isEarned
            ? "bg-card/40 border-white/5 shadow-lg hover:border-yellow-500/30 hover:shadow-yellow-500/10"
            : "bg-card/10 border-white/5 grayscale saturate-0"
        )}
      >
        {isEarned && (
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
        )}
        <div
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10 transition-transform duration-500",
            isEarned
              ? "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(234,179,8,0.4)] group-hover:rotate-12"
              : "bg-white/10"
          )}
        >
          {isEarned ? (
            <Trophy className="w-10 h-10 text-yellow-950" />
          ) : (
            <Lock className="w-8 h-8 text-white/40" />
          )}
        </div>
        <h3 className="font-bold tracking-tight mb-1 text-sm">{badge.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">{badge.description}</p>
        {isEarned && badge.earned_at && (
          <p className="text-[10px] font-medium text-yellow-500/80 mt-4 uppercase tracking-wider">
            Earned {new Date(badge.earned_at).toLocaleDateString()}
          </p>
        )}
      </article>
    </motion.div>
  );
}
