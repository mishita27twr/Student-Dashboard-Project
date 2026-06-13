import { getAnalytics } from "@/services/analytics";
import { AnalyticsClient } from "@/components/dashboard/analytics-client";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();
  return <AnalyticsClient analytics={analytics} />;
}
