export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-10 w-40 rounded-xl bg-white/5" />
          <div className="h-5 w-56 rounded-xl bg-white/5" />
        </div>
        <div className="h-10 w-72 rounded-xl bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
