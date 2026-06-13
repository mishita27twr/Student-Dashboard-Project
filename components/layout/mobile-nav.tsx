"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart2,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-card/80 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <div className="font-bold text-lg flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          LearningOS
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-white/5 text-foreground"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden flex flex-col"
          >
            <div className="h-16 flex items-center justify-end px-4 border-b border-border/10">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-foreground"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-4 text-xl p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <item.icon
                      className={cn(
                        "w-6 h-6",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <span
                      className={
                        pathname === item.href
                          ? "font-bold text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
