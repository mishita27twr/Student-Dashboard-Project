"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, X, Play, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import type { Course } from "@/types";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
const GRADIENTS = [
  "from-blue-500/20",
  "from-purple-500/20",
  "from-emerald-500/20",
  "from-orange-500/20",
  "from-pink-500/20",
];

export function CoursesClient({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const selected = courses.find((c) => c.id === selectedId) ?? null;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div variants={item}>
          <h1 className="text-4xl font-black tracking-tight">Courses</h1>
          <p className="text-muted-foreground text-lg">Expand your knowledge universe.</p>
        </motion.div>
        <motion.div variants={item} className="w-full md:w-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search courses..."
            className="pl-10 w-full md:w-72 h-10 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-courses"
          />
        </motion.div>
      </div>

      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No courses found matching &quot;{search}&quot;
          </div>
        ) : (
          filtered.map((course, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              gradient={GRADIENTS[idx % GRADIENTS.length]}
              onClick={() => setSelectedId(course.id)}
            />
          ))
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-xl bg-card/90 backdrop-blur-3xl border border-border/50 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-course"
            >
              <div className="relative h-40 bg-gradient-to-br from-primary/30 via-card to-card flex items-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{selected.title}</h2>
                <p className="text-muted-foreground mb-8">{selected.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Accessed</p>
                      <p className="font-medium text-sm">{new Date(selected.last_accessed_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-green-500/20 text-green-500">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Completion</p>
                      <p className="font-medium text-sm">{selected.lessons_completed} / {selected.total_lessons} Lessons</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Course Progress</span>
                    <span className="text-primary">{selected.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${selected.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <Play className="w-4 h-4" /> Resume Course
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CourseCard({
  course,
  gradient,
  onClick,
}: {
  course: Course;
  gradient: string;
  onClick: () => void;
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(course.progress), 150);
    return () => clearTimeout(t);
  }, [course.progress]);

  return (
    <motion.div variants={item} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
      <article
        className="cursor-pointer bg-card/20 hover:bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden h-full flex flex-col group relative"
        onClick={onClick}
        data-testid={`card-course-${course.id}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} via-transparent to-transparent opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`} />
        <div className="p-6 relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">{course.description}</p>
          <div className="mt-auto space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> {course.lessons_completed}/{course.total_lessons}</span>
              <span className="text-muted-foreground">{course.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
