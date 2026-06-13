import { getCourses } from "@/services/courses";
import { CoursesClient } from "@/components/dashboard/courses-client";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getCourses();
  return <CoursesClient courses={courses} />;
}
