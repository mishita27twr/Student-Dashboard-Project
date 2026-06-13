export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  description: string;
  lessons_completed: number;
  total_lessons: number;
  last_accessed_at: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  learning_streak: number;
  total_hours: number;
  active_courses: number;
  courses_completed: number;
  joined_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  earned: boolean;
  earned_at: string | null;
}

export interface Analytics {
  total_hours: number;
  active_courses: number;
  completion_rate: number;
  learning_streak: number;
  weekly_hours: { day: string; hours: number }[];
  monthly_hours: number;
}

export interface DashboardSummary {
  greeting: string;
  user_name: string;
  learning_streak: number;
  total_hours: number;
  active_courses: number;
  completion_rate: number;
  weekly_goal_hours: number;
  weekly_completed_hours: number;
}

export interface ActivityDay {
  date: string;
  count: number;
}
