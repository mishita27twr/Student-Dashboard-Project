import type { User } from "@/types";

export async function getUserProfile(): Promise<User> {
  return {
    id: "1",
    name: "Mishita",
    email: "mishita@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mishita",
    learning_streak: 12,
    total_hours: 124.5,
    active_courses: 4,
    courses_completed: 5,
    joined_at: "2024-01-15T00:00:00Z",
  };
}
