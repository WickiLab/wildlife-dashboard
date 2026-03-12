import { Search } from 'lucide-react';
import {
  ACTIVITY_FILTERS,
  REGIONS,
  STATUS_STYLES,
} from '../../lib/wildtracks/constants';

export default function ElephantListPanel({
  filteredElephants,
  selectedEntityId,
  setSelectedEntityId,
  filterStatus,
  setFilterStatus,
  filterRegion,
  setFilterRegion,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/85 shadow-xl sm:h-[450px]">
      <div className="border-b border-slate-800 bg-slate-900/70 p-4">
        <h3 className="mb-3 flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-white">
          Sidebar – List Panel
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
            {filteredElephants.length} Tracked
          </span>
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950 p-1">
            {ACTIVITY_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg py-1.5 text-xs transition ${
                  filterStatus === status
                    ? 'bg-slate-800 font-medium text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none transition focus:border-emerald-500"
          >
            <option value="All">All Regions</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search Elephant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-8 pr-3 text-xs text-slate-300 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-2">
        {filteredElephants.map((elephant) => {
          const statusTheme = STATUS_STYLES[elephant.status];

          return (
            <div
              key={elephant.id}
              onClick={() => setSelectedEntityId(elephant.id)}
              className={`cursor-pointer rounded-xl border p-3 transition-all ${
                selectedEntityId === elephant.id
                  ? 'border-emerald-500/30 bg-emerald-500/10 shadow-inner'
                  : 'border-transparent bg-slate-950/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium text-white">{elephant.name}</span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">
                      {elephant.id}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {elephant.herd} • {elephant.age}y
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${statusTheme.chip}`}>
                    {elephant.status}
                  </span>
                  <span className="mt-1 text-[10px] text-slate-500">
                    {elephant.activity} ({elephant.speed.toFixed(1)} km/h)
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredElephants.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-500">
            No elephants match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}