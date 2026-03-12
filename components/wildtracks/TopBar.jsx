import { Bell, Search, User } from 'lucide-react';

export default function TopBar({
  role,
  setRole,
  alertsCount,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/70 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 lg:max-w-md">
          <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Global search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 min-w-0 flex-1 border-none bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 sm:text-sm">View As:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none transition focus:border-emerald-500 sm:text-sm"
            >
              <option value="manager">HQ Manager</option>
              <option value="ranger">Field Ranger</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-3 sm:gap-4 sm:pl-4 lg:pl-6">
            <button className="relative text-slate-400 transition hover:text-white">
              <Bell className="h-5 w-5" />
              {alertsCount > 0 && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-slate-950 bg-rose-500" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
                <User className="h-4 w-4 text-slate-300" />
              </div>
              <div className="hidden md:block">
                <div className="mb-1 text-sm font-medium leading-none text-white">Jane Doe</div>
                <div className="text-xs leading-none text-emerald-400">Active Session</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
