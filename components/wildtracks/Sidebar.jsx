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

function TabButton({ item, activeTab, setActiveTab, compact = false }) {
  const Icon = TAB_ICONS[item.id];

  return (
    <button
      key={item.id}
      onClick={() => setActiveTab(item.id)}
      className={`flex items-center rounded-xl transition ${
        compact
          ? `min-w-fit flex-1 flex-col justify-center gap-1 px-3 py-2 text-[11px] ${
              activeTab === item.id
                ? 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`
          : `w-full space-x-3 px-4 py-3 text-left ${
              activeTab === item.id
                ? 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`
      }`}
    >
      <Icon className={compact ? 'h-4 w-4' : 'h-5 w-5'} />
      <span className="font-medium">{item.label}</span>
    </button>
  );
}

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="border-b border-slate-800 bg-slate-950/95 px-3 py-3 backdrop-blur lg:hidden">
        <div className="mb-3 flex items-center space-x-3">
          <div className="rounded-xl bg-emerald-500 p-2 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <Radio className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-white">STE WildTracks</h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400">
              Live Intelligence
            </p>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MODULE_TABS.map((item) => (
            <TabButton
              key={item.id}
              item={item}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              compact
            />
          ))}
        </nav>
      </div>

      <aside className="hidden h-full w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur lg:flex">
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
          <div className="mb-2 mt-4 text-xs font-semibold uppercase text-slate-500">Modules</div>

          <div className="space-y-2">
            {MODULE_TABS.map((item) => (
              <TabButton
                key={item.id}
                item={item}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button className="flex w-full items-center space-x-3 rounded-xl px-4 py-2 text-slate-400 transition hover:bg-slate-900 hover:text-slate-200">
            <Settings className="h-5 w-5" />
            <span>System Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
