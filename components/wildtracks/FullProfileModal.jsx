import {
  Activity,
  Battery,
  Heart,
  Map as MapIcon,
  MapPin,
  Thermometer,
  X,
} from 'lucide-react';

export default function FullProfileModal({
  open,
  elephant,
  sriLankaTime,
  onClose,
}) {
  if (!open || !elephant) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-white">Elephant Profile</h2>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 text-slate-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex w-full flex-col gap-6 md:w-1/3">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 text-slate-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center">
                  <MapIcon className="mb-2 h-12 w-12 opacity-50" />
                  <span className="text-sm font-medium">Photo Unavailable</span>
                  <span className="mt-1 text-xs">ID: {elephant.id}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
                <h3 className="mb-4 border-b border-slate-700 pb-2 text-lg font-bold text-white">
                  Identity
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name</span>
                    <span className="font-medium text-white">{elephant.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tag ID</span>
                    <span className="font-medium text-white">{elephant.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Age</span>
                    <span className="font-medium text-white">{elephant.age} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gender</span>
                    <span className="font-medium text-white">{elephant.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Weight</span>
                    <span className="font-medium text-white">{elephant.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Herd</span>
                    <span className="font-medium text-emerald-400">{elephant.herd}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6 md:w-2/3">
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Current Status
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                    <div className="mb-1 text-xs text-slate-500">Activity</div>
                    <div className="text-lg font-semibold text-white">{elephant.activity}</div>
                  </div>

                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                    <div className="mb-1 text-xs text-slate-500">Speed</div>
                    <div className="text-lg font-semibold text-white">
                      {elephant.speed.toFixed(1)} km/h
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                    <div className="mb-1 text-xs text-slate-500">Last Update</div>
                    <div className="text-lg font-semibold text-emerald-400">{sriLankaTime} LK</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Tracking Data
                  </h3>

                  <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-800 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-400">
                        <MapPin className="mr-2 h-4 w-4" />
                        Latitude
                      </div>
                      <div className="font-mono text-sm text-white">
                        {elephant.lat.toFixed(5)}° N
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-400">
                        <MapPin className="mr-2 h-4 w-4" />
                        Longitude
                      </div>
                      <div className="font-mono text-sm text-white">
                        {elephant.lng.toFixed(5)}° E
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-700 pt-2">
                      <div className="flex items-center text-slate-400">
                        <Battery className="mr-2 h-4 w-4" />
                        Tag Battery
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-20 rounded-full bg-slate-950">
                          <div
                            className={`h-2 rounded-full ${
                              elephant.battery > 20 ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${elephant.battery}%` }}
                          />
                        </div>
                        <span className="text-sm text-white">{elephant.battery}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Health Vitals
                  </h3>

                  <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-800 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-400">
                        <Heart className="mr-2 h-4 w-4 text-rose-400" />
                        Heart Rate
                      </div>
                      <div className="text-sm text-white">
                        <span className="text-lg font-bold">{elephant.heartRate}</span> bpm
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-400">
                        <Thermometer className="mr-2 h-4 w-4 text-amber-400" />
                        Body Temp
                      </div>
                      <div className="text-sm text-white">
                        <span className="text-lg font-bold">{elephant.bodyTemp}</span> °C
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-700 pt-2">
                      <div className="flex items-center text-slate-400">
                        <Activity className="mr-2 h-4 w-4 text-blue-400" />
                        Stress Level
                      </div>
                      <div className="text-sm font-medium text-emerald-400">Normal</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Movement History
                </h3>

                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
                  <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                    <div className="absolute inset-0 opacity-20 [background:radial-gradient(ellipse_at_center,_rgba(148,163,184,0.35),_transparent_65%)]" />
                    <svg
                      className="h-full w-full p-4"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        points="0,20 20,25 40,15 60,30 80,10 100,20"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="100" cy="20" r="3" fill="#10b981" />
                    </svg>
                    <div className="absolute bottom-2 left-3 text-[10px] text-slate-500">
                      Last 24 Hours Timeline
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-800 bg-slate-900 p-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-2 font-medium text-white transition hover:bg-slate-700"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}