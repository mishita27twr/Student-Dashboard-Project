"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Bell, Laptop, Shield } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const COLORS = [
  { name: "Purple", value: "262 83% 58%", hex: "#8b5cf6" },
  { name: "Blue",   value: "221 83% 53%", hex: "#3b82f6" },
  { name: "Green",  value: "142 71% 45%", hex: "#22c55e" },
  { name: "Orange", value: "24 95% 53%",  hex: "#f97316" },
];

export function SettingsClient() {
  const [activeColor, setActiveColor] = useState(COLORS[0].value);
  const [emailNotifs,  setEmailNotifs]  = useState(true);
  const [pushNotifs,   setPushNotifs]   = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", activeColor);
  }, [activeColor]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={item}>
        <h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground text-lg">Configure your learning environment.</p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <motion.nav variants={item} className="space-y-2 hidden md:block">
          <div className="p-3 bg-white/5 rounded-xl font-medium flex items-center gap-3 text-primary"><Laptop className="w-4 h-4" /> Appearance</div>
          <div className="p-3 hover:bg-white/5 rounded-xl font-medium flex items-center gap-3 text-muted-foreground cursor-pointer transition-colors"><Bell className="w-4 h-4" /> Notifications</div>
          <div className="p-3 hover:bg-white/5 rounded-xl font-medium flex items-center gap-3 text-muted-foreground cursor-pointer transition-colors"><Shield className="w-4 h-4" /> Privacy</div>
        </motion.nav>

        <div className="space-y-8">
          {/* Accent Color */}
          <motion.div variants={item}>
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Accent Color</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose the primary color for your dashboard.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color.value)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      activeColor === color.value
                        ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
                        : "hover:scale-110 opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    data-testid={`color-${color.name.toLowerCase()}`}
                    aria-label={`Set ${color.name} accent`}
                  >
                    {activeColor === color.value && (
                      <div className="w-4 h-4 rounded-full bg-white/50" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div variants={item}>
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage how we contact you.</p>
              </div>
              <div className="space-y-6">
                <ToggleRow
                  label="Email Notifications"
                  description="Receive daily learning reminders."
                  checked={emailNotifs}
                  onChange={setEmailNotifs}
                  testId="switch-email"
                />
                <ToggleRow
                  label="Push Notifications"
                  description="Receive milestone alerts in browser."
                  checked={pushNotifs}
                  onChange={setPushNotifs}
                  testId="switch-push"
                />
                <ToggleRow
                  label="Weekly Report"
                  description="Detailed breakdown of your progress."
                  checked={weeklyReport}
                  onChange={setWeeklyReport}
                  testId="switch-report"
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold tracking-wide hover:bg-primary/90 transition-colors"
              data-testid="btn-save-settings"
            >
              {saved ? "Saved!" : "Save Preferences"}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  testId,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  testId: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-base font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        data-testid={testId}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-primary" : "bg-white/20"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
