"use client";

import { motion, type Variants } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Activity, Clock, Target, TrendingUp } from "lucide-react";
import { useCounter } from "@/hooks/use-counter";
import type { Analytics } from "@/types";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

function StatCard({
  title,
  value,
  suffix = "",
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  color: "primary" | "blue" | "green" | "orange";
}) {
  const count = useCounter(Math.round(value));
  const colorMap = {
    primary: "text-primary bg-primary/20",
    blue: "text-blue-500 bg-blue-500/20",
    green: "text-green-500 bg-green-500/20",
    orange: "text-orange-500 bg-orange-500/20",
  };
  return (
    <motion.div variants={item}>
      <article className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={`p-2 rounded-lg ${colorMap[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-4xl font-black tracking-tight">
          {count}{suffix}
        </div>
      </article>
    </motion.div>
  );
}

export function AnalyticsClient({ analytics }: { analytics: Analytics }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-4xl font-black tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-lg">Measure your progress. Optimize your flow.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Hours" value={analytics.total_hours} suffix="h" icon={Clock} color="primary" />
        <StatCard title="Completion Rate" value={analytics.completion_rate} suffix="%" icon={Target} color="green" />
        <StatCard title="Active Courses" value={analytics.active_courses} icon={Activity} color="blue" />
        <StatCard title="Current Streak" value={analytics.learning_streak} suffix="d" icon={TrendingUp} color="orange" />
      </div>

      <motion.div variants={item}>
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Weekly Learning Hours
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.weekly_hours}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {analytics.weekly_hours.map((_, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={
                        i === analytics.weekly_hours.length - 1
                          ? "hsl(262 83% 58%)"
                          : "hsl(262 83% 58% / 0.5)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
