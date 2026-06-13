"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Calendar, Clock, BookOpen, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function ProfileClient({ profile }: { profile: User }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={item}>
        <h1 className="text-4xl font-black tracking-tight mb-2">Profile</h1>
        <p className="text-muted-foreground text-lg">Your identity in the OS.</p>
      </motion.div>

      <motion.div variants={item}>
        <article className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/40 via-purple-500/20 to-transparent" />
          <div className="px-8 pb-8 pt-0 sm:flex justify-between items-end">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12 text-center sm:text-left">
              <div className="w-32 h-32 rounded-full border-4 border-background shadow-2xl bg-card overflow-hidden shrink-0">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
                    {profile.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <h2 className="text-3xl font-black tracking-tight">{profile.name}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5 text-sm"><Mail className="w-4 h-4" /> {profile.email}</span>
                  <span className="flex items-center gap-1.5 text-sm"><Calendar className="w-4 h-4" /> Joined {new Date(profile.joined_at).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </motion.div>

      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard icon={Clock} label="Total Learning Time" value={`${profile.total_hours} Hours`} color="blue" />
        <StatsCard icon={Flame} label="Current Streak" value={`${profile.learning_streak} Days`} color="orange" />
        <StatsCard icon={BookOpen} label="Active Courses" value={String(profile.active_courses)} color="primary" />
        <StatsCard icon={BookOpen} label="Completed Courses" value={String(profile.courses_completed)} color="green" />
      </motion.div>
    </motion.div>
  );
}

function StatsCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: "blue" | "orange" | "primary" | "green";
}) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    primary: "text-primary bg-primary/10 border-primary/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
  };
  return (
    <motion.div variants={item} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <article className="bg-card/20 backdrop-blur-xl border border-border/50 rounded-2xl flex items-center p-6 gap-6">
        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border", colors[color])}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-black tracking-tight">{value}</p>
        </div>
      </article>
    </motion.div>
  );
}
