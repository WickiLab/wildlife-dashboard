import {
  Activity,
  AlertTriangle,
  Crosshair,
  Map as MapIcon,
  Radio,
  Settings,
} from 'lucide-react';
import { MODULE_TABS } from '../../lib/wildtracks/constants';

const TAB_ICONS = {
  tracking: MapIcon,
  alerts: AlertTriangle,
  analytics: Activity,
  ops: Crosshair,
};

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="flex h-full w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center space-x-3">
          <div className="rounded-xl bg-emerald-500 p-2 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <Radio className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-white">STE WildTracks</h1>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-400">
              Live Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-2 mt-4 text-xs font-semibold uppercase text-slate-500">
          Modules
        </div>

        <div className="space-y-2">
          {MODULE_TABS.map((item) => {
            const Icon = TAB_ICONS[item.id];

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left transition ${
                  activeTab === item.id
                    ? 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center space-x-3 rounded-xl px-4 py-2 text-slate-400 transition hover:bg-slate-900 hover:text-slate-200">
          <Settings className="h-5 w-5" />
          <span>System Settings</span>
        </button>
      </div>
    </div>
  );
}