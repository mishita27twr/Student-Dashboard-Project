import type { Analytics, DashboardSummary, ActivityDay, Achievement } from "@/types";

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return `Good Morning, ${name} ☀️`;
  if (hour >= 12 && hour < 17) return `Good Afternoon, ${name} ☀️`;
  if (hour >= 17 && hour < 21) return `Good Evening, ${name} 🌆`;
  return `Good Night, ${name} 🌙`;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return {
    greeting: getGreeting("Mishita"),
    user_name: "Mishita",
    learning_streak: 12,
    total_hours: 124.5,
    active_courses: 4,
    completion_rate: 62,
    weekly_goal_hours: 10,
    weekly_completed_hours: 8,
  };
}

export async function getAnalytics(): Promise<Analytics> {
  return {
    total_hours: 124,
    active_courses: 4,
    completion_rate: 62,
    learning_streak: 12,
    weekly_hours: [
      { day: "Mon", hours: 2.5 },
      { day: "Tue", hours: 1.8 },
      { day: "Wed", hours: 3.2 },
      { day: "Thu", hours: 0.9 },
      { day: "Fri", hours: 2.1 },
      { day: "Sat", hours: 3.8 },
      { day: "Sun", hours: 1.5 },
    ],
    monthly_hours: 36.5,
  };
}

export async function getActivityFeed(): Promise<ActivityDay[]> {
  const activity: ActivityDay[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const baseWeight = (364 - i) / 364;
    const rand = Math.random();
    let count = 0;
    if (rand < 0.35 + baseWeight * 0.1) count = 0;
    else if (rand < 0.55) count = 1;
    else if (rand < 0.75) count = 2;
    else if (rand < 0.88) count = 3;
    else if (rand < 0.95) count = 4;
    else count = 5;
    activity.push({ date: dateStr, count });
  }
  return activity;
}

export async function getAchievements(): Promise<Achievement[]> {
  return [
    { id: "1", title: "React Master", description: "Completed all advanced React pattern modules with 90%+ score", icon_name: "Award", earned: true, earned_at: "2024-05-20T10:00:00Z" },
    { id: "2", title: "12 Day Streak", description: "Maintained a consistent 12-day learning streak", icon_name: "Flame", earned: true, earned_at: "2024-06-11T23:59:00Z" },
    { id: "3", title: "5 Courses Completed", description: "Successfully completed 5 full courses", icon_name: "Trophy", earned: true, earned_at: "2024-06-01T12:00:00Z" },
    { id: "4", title: "Speed Learner", description: "Finished a course in under 7 days", icon_name: "Zap", earned: true, earned_at: "2024-04-15T08:30:00Z" },
    { id: "5", title: "Night Owl", description: "Completed 10+ sessions after 10PM", icon_name: "Moon", earned: true, earned_at: "2024-05-10T23:00:00Z" },
    { id: "6", title: "TypeScript Ninja", description: "Achieve 95%+ on all TypeScript challenges", icon_name: "Sword", earned: false, earned_at: null },
    { id: "7", title: "100 Hours", description: "Log 100 total learning hours", icon_name: "Clock", earned: false, earned_at: null },
    { id: "8", title: "Perfect Week", description: "Complete daily goals every day for 7 days", icon_name: "Star", earned: false, earned_at: null },
    { id: "9", title: "Animation Wizard", description: "Complete all animation course modules", icon_name: "Wand2", earned: false, earned_at: null },
    { id: "10", title: "Full Stack Hero", description: "Complete courses in both frontend and backend tracks", icon_name: "Shield", earned: false, earned_at: null },
  ];
}
