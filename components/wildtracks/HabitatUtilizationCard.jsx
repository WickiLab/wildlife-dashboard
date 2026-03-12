export default function HabitatUtilizationCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/85 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
        Habitat Utilization
      </h3>

      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-slate-400">Core Protected Area</span>
            <span className="text-emerald-400">65%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950">
            <div className="h-2 rounded-full bg-emerald-500" style={{ width: '65%' }} />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-slate-400">Buffer Zones</span>
            <span className="text-amber-400">25%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950">
            <div className="h-2 rounded-full bg-amber-500" style={{ width: '25%' }} />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-slate-400">High-Risk (Farms)</span>
            <span className="text-rose-400">10%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950">
            <div className="h-2 rounded-full bg-rose-500" style={{ width: '10%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}