export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-10 w-40 rounded-xl bg-white/5" />
        <div className="h-5 w-64 rounded-xl bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="h-96 rounded-xl bg-white/5" />
    </div>
  );
}
