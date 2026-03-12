import { ChevronRight, X } from 'lucide-react';
import { STATUS_STYLES } from '../../lib/wildtracks/constants';

export default function SelectedEntityPanel({
  elephant,
  sriLankaTime,
  setSelectedEntityId,
  onOpenProfile,
}) {
  if (!elephant) return null;

  const isDanger = elephant.status === 'danger';
  const statusTheme = STATUS_STYLES[elephant.status];

  return (
    <div className="relative mt-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
      <button
        onClick={() => setSelectedEntityId(null)}
        className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mb-4 pr-8">
        <div className="mb-1 flex items-center space-x-3">
          <h2 className="text-xl font-bold text-white">Elephant: {elephant.name}</h2>
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${statusTheme.chip}`}
          >
            {elephant.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
          <span>
            <strong className="text-slate-300">Tag ID:</strong> {elephant.id}
          </span>
          <span>
            <strong className="text-slate-300">Age:</strong> {elephant.age}
          </span>
          <span>
            <strong className="text-slate-300">Gender:</strong> {elephant.gender}
          </span>
          <span>
            <strong className="text-slate-300">Herd:</strong> {elephant.herd}
          </span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="mb-1 text-xs text-slate-500">Status</div>
          <div className={`font-semibold ${elephant.activity === 'Moving' ? 'text-emerald-400' : 'text-slate-300'}`}>
            {elephant.activity}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="mb-1 text-xs text-slate-500">Speed</div>
          <div className="font-semibold text-white">{elephant.speed.toFixed(1)} km/h</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="mb-1 text-xs text-slate-500">Last Update</div>
          <div className="font-semibold text-white">{sriLankaTime} LK</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="mb-1 text-xs text-slate-500">Location</div>
          <div className="mt-0.5 text-xs font-semibold tracking-tight text-white">
            {elephant.lat.toFixed(4)}, {elephant.lng.toFixed(4)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onOpenProfile}
          className="flex items-center space-x-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          <span>[View Full Profile]</span>
          <ChevronRight className="h-4 w-4" />
        </button>

        {isDanger && (
          <button className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(136,19,55,0.35)] transition hover:bg-rose-500">
            Dispatch Team
          </button>
        )}
      </div>
    </div>
  );
}