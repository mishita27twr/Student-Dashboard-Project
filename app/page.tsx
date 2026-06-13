import { getDashboardSummary, getActivityFeed } from "@/services/analytics";
import { getCourses } from "@/services/courses";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [summary, activity, courses] = await Promise.all([
    getDashboardSummary(),
    getActivityFeed(),
    getCourses(),
  ]);

  return (
    <DashboardClient summary={summary} activity={activity} courses={courses} />
  );
}
