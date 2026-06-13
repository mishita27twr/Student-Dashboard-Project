import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";

const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 78,
    icon_name: "Code2",
    description: "Master advanced React concepts including compound components, render props, custom hooks, and performance optimization techniques.",
    lessons_completed: 8,
    total_lessons: 10,
    last_accessed_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Next.js Mastery",
    progress: 45,
    icon_name: "Layers",
    description: "Build production-ready applications with Next.js App Router, server components, streaming, and advanced deployment patterns.",
    lessons_completed: 5,
    total_lessons: 12,
    last_accessed_at: new Date(Date.now() - 172800000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "UI Animation Fundamentals",
    progress: 92,
    icon_name: "Sparkles",
    description: "Learn the principles of motion design and implement stunning animations with Framer Motion, CSS transitions, and GSAP.",
    lessons_completed: 11,
    total_lessons: 12,
    last_accessed_at: new Date(Date.now() - 43200000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "TypeScript Essentials",
    progress: 31,
    icon_name: "FileType",
    description: "Deep dive into TypeScript's type system — generics, conditional types, mapped types, decorators, and advanced utility types.",
    lessons_completed: 4,
    total_lessons: 13,
    last_accessed_at: new Date(Date.now() - 259200000).toISOString(),
    created_at: new Date().toISOString(),
  },
];

function hasSupabaseConfig(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getCourses(): Promise<Course[]> {
  if (!hasSupabaseConfig()) return MOCK_COURSES;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) return MOCK_COURSES;
  return data as Course[];
}

export async function getCourse(id: string): Promise<Course | null> {
  if (!hasSupabaseConfig()) {
    return MOCK_COURSES.find((c) => c.id === id) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return MOCK_COURSES.find((c) => c.id === id) ?? null;
  return data as Course;
}
