import { TrendingUp } from 'lucide-react';

const TONES = {
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  rose: {
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
  amber: {
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  blue: {
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = 'emerald',
  trend,
}) {
  const theme = TONES[tone] ?? TONES.emerald;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/85 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <div className={`rounded-xl p-2 ${theme.iconBg}`}>
          <Icon className={`h-5 w-5 ${theme.iconColor}`} />
        </div>
      </div>

      <div className="text-2xl font-bold text-slate-100">{value}</div>

      <div className="mt-2 flex items-center text-xs">
        {trend === 'up' && <TrendingUp className="mr-1 h-3 w-3 text-rose-400" />}
        {trend === 'down' && (
          <TrendingUp className="mr-1 h-3 w-3 rotate-180 text-emerald-400" />
        )}
        <span className="text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}