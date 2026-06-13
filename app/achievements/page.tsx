import { getAchievements } from "@/services/analytics";
import { AchievementsClient } from "@/components/dashboard/achievements-client";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const achievements = await getAchievements();
  return <AchievementsClient achievements={achievements} />;
}
