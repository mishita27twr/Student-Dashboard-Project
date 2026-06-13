export default function Loading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="space-y-2">
        <div className="h-10 w-56 rounded-xl bg-white/5" />
        <div className="h-5 w-72 rounded-xl bg-white/5" />
      </div>
      <div className="h-32 rounded-2xl bg-white/5" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
