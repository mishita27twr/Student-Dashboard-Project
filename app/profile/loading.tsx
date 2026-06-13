export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-10 w-36 rounded-xl bg-white/5" />
        <div className="h-5 w-48 rounded-xl bg-white/5" />
      </div>
      <div className="h-64 w-full rounded-2xl bg-white/5" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 rounded-xl bg-white/5" />
        <div className="h-32 rounded-xl bg-white/5" />
        <div className="h-32 rounded-xl bg-white/5" />
        <div className="h-32 rounded-xl bg-white/5" />
      </div>
    </div>
  );
}
