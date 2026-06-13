export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-12 w-2/3 rounded-2xl bg-white/5" />
        <div className="h-5 w-1/2 rounded-xl bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-white/5" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-7 w-40 rounded-xl bg-white/5" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-white/5" />
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-7 w-40 rounded-xl bg-white/5" />
          <div className="h-56 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
