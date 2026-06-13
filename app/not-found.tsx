import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <div className="text-8xl font-black text-white/5">404</div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground">
          This route does not exist in the learning OS.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
      >
        <Home className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
