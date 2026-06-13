import { getUserProfile } from "@/services/user";
import { ProfileClient } from "@/components/dashboard/profile-client";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await getUserProfile();
  return <ProfileClient profile={profile} />;
}
