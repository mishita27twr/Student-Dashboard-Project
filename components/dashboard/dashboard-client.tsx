"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, Target, CheckCircle2, PlayCircle, Trophy } from "lucide-react";
import type { DashboardSummary, ActivityDay, Course } from "@/types";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function DashboardClient({
  summary,
  activity,
  courses,
}: {
  summary: DashboardSummary;
  activity: ActivityDay[];
  courses: Course[];
}) {
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const values: Record<string, number> = {};
      courses.forEach((c) => { values[c.id] = c.progress; });
      setProgressValues(values);
    }, 100);
    return () => clearTimeout(timer);
  }, [courses]);

  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const weeklyPct = Math.round((summary.weekly_completed_hours / summary.weekly_goal_hours) * 100);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Hero */}
      <motion.div variants={item} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">{summary.greeting}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your mission control is ready. You have {summary.active_courses} active courses and a {summary.learning_streak}-day streak. Keep pushing.
        </p>
      </motion.div>

      {/* Bento stats */}
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item} whileHover={{ scale: 1.02 }}>
          <article className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Learning Streak</p>
              <p className="text-3xl font-bold tracking-tight">{summary.learning_streak} Days</p>
            </div>
          </article>
        </motion.div>

        <motion.div variants={item} whileHover={{ scale: 1.02 }}>
          <article className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Hours</p>
              <p className="text-3xl font-bold tracking-tight">{summary.total_hours}h</p>
            </div>
          </article>
        </motion.div>

        <motion.div variants={item} whileHover={{ scale: 1.02 }} className="md:col-span-2">
          <article className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Weekly Goal</p>
                  <p className="text-lg font-bold">{summary.weekly_completed_hours} / {summary.weekly_goal_hours}h</p>
                </div>
              </div>
              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.min(100, weeklyPct)}%</span>
                </div>
                <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, weeklyPct)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <motion.section variants={item} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Continue Learning</h2>
            <Link href="/courses" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="grid gap-4">
            {inProgress.slice(0, 3).map((course) => (
              <Link key={course.id} href="/courses">
                <article className="bg-card/20 hover:bg-card/40 backdrop-blur-md border border-border/50 rounded-xl transition-colors cursor-pointer group p-5 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-background border border-primary/20 flex items-center justify-center shrink-0">
                    <PlayCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {course.lessons_completed}/{course.total_lessons} lessons</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressValues[course.id] ?? 0}%` }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{course.progress}%</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Right: Heatmap + Recent Badge */}
        <motion.aside variants={item} className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Activity Heatmap</h2>
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-4">
              <div className="flex flex-wrap gap-1 justify-center max-h-40 overflow-hidden">
                {activity.slice(-80).map((day, i) => {
                  const intensity = Math.min(day.count, 4);
                  const opacities = ["opacity-5", "opacity-30", "opacity-50", "opacity-80", "opacity-100"];
                  return (
                    <div
                      key={i}
                      title={`${day.date}: ${day.count} sessions`}
                      className={`w-3 h-3 rounded-sm bg-primary ${opacities[intensity]} hover:ring-1 hover:ring-white transition-all`}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {["opacity-5","opacity-30","opacity-50","opacity-80","opacity-100"].map((op) => (
                    <div key={op} className={`w-3 h-3 rounded-sm bg-primary ${op}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Recent Badges</h2>
              <Link href="/achievements" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <article className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="font-bold">React Master</p>
                <p className="text-sm text-muted-foreground">Completed all React modules</p>
              </div>
            </article>
          </section>
        </motion.aside>
      </div>
    </motion.div>
  );
}
