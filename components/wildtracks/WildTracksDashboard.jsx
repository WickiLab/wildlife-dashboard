'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  Download,
  MapPin,
  PlayCircle,
  Radio,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

import ElephantListPanel from './ElephantListPanel';
import FullProfileModal from './FullProfileModal';
import HabitatUtilizationCard from './HabitatUtilizationCard';
import LiveMap from './LiveMap';
import SelectedEntityPanel from './SelectedEntityPanel';
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import TopBar from './TopBar';

import {
  INITIAL_ELEPHANTS,
  INITIAL_RANGERS,
} from '../../lib/wildtracks/constants';
import {
  formatSriLankaTime,
  simulateElephantStep,
} from '../../lib/wildtracks/utils';

export default function WildTracksDashboard() {
  const [role, setRole] = useState('manager');
  const [activeTab, setActiveTab] = useState('tracking');
  const [elephants, setElephants] = useState(INITIAL_ELEPHANTS);
  const [alerts, setAlerts] = useState([]);
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const [time, setTime] = useState(new Date());
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRegion, setFilterRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const simulationInterval = setInterval(() => {
      const now = new Date();
      setTime(now);

      setElephants((prev) => {
        const generatedAlerts = [];

        const next = prev.map((elephant) => {
          const updated = simulateElephantStep(elephant);

          if (updated.status === 'danger' && elephant.status !== 'danger') {
            generatedAlerts.push({
              id: `alert-${Date.now()}-${elephant.id}-${Math.random().toString(36).slice(2, 9)}`,
              title: `${elephant.name} entered high-risk zone!`,
              time: formatSriLankaTime(now),
              severity: 'critical',
              elephantId: elephant.id,
            });
          }

          return updated;
        });

        if (generatedAlerts.length > 0) {
          setAlerts((current) => [...generatedAlerts.reverse(), ...current].slice(0, 5));
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(simulationInterval);
  }, []);

  const liveSelectedEntity = useMemo(
    () => elephants.find((elephant) => elephant.id === selectedEntityId) ?? null,
    [elephants, selectedEntityId]
  );

  const filteredElephants = useMemo(() => {
    return elephants.filter((elephant) => {
      const matchesStatus =
        filterStatus === 'All' || elephant.activity === filterStatus;
      const matchesRegion =
        filterRegion === 'All' || elephant.region === filterRegion;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        elephant.name.toLowerCase().includes(q) ||
        elephant.id.toLowerCase().includes(q);

      return matchesStatus && matchesRegion && matchesSearch;
    });
  }, [elephants, filterStatus, filterRegion, searchQuery]);

  const kpis = useMemo(() => {
    const activeAlerts = alerts.filter((alert) => alert.severity === 'critical').length;
    const dangerousElephants = elephants.filter((elephant) => elephant.status === 'danger').length;

    return {
      tracked: elephants.length,
      alerts: activeAlerts + dangerousElephants,
      atRisk: dangerousElephants,
    };
  }, [elephants, alerts]);

  const sriLankaTime = formatSriLankaTime(time);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        <TopBar
          role={role}
          setRole={setRole}
          alertsCount={kpis.alerts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="custom-scrollbar flex-1 overflow-y-auto p-6">
          {role !== 'ranger' && (
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              <StatCard
                title="Actively Tracked"
                value={kpis.tracked}
                subtitle="Live collars"
                icon={Radio}
                tone="emerald"
              />
              <StatCard
                title="Conflict Alerts"
                value={kpis.alerts}
                subtitle="Requires action"
                icon={ShieldAlert}
                tone="rose"
                trend="up"
              />
              <StatCard
                title="Near Settlements"
                value={kpis.atRisk}
                subtitle="Within 5km radius"
                icon={AlertTriangle}
                tone="amber"
              />
              <StatCard
                title="Patrol Units"
                value={INITIAL_RANGERS.length}
                subtitle="Active in field"
                icon={ShieldCheck}
                tone="blue"
              />
            </div>
          )}

          <div className="flex flex-col gap-6 xl:flex-row">
            {(role === 'manager' || role === 'researcher') && (
              <div className="order-2 flex w-full flex-shrink-0 flex-col gap-6 xl:order-1 xl:w-[22rem]">
                <ElephantListPanel
                  filteredElephants={filteredElephants}
                  selectedEntityId={selectedEntityId}
                  setSelectedEntityId={setSelectedEntityId}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  filterRegion={filterRegion}
                  setFilterRegion={setFilterRegion}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                <HabitatUtilizationCard />
              </div>
            )}

            <div className="order-1 min-w-0 flex-1 xl:order-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center text-lg font-semibold text-white">
                  <Activity className="mr-2 h-5 w-5 text-emerald-500" />
                  Live Operational Map (Sri Lanka)
                </h2>

                {role === 'researcher' && (
                  <div className="flex space-x-2">
                    <button className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Playback 24h
                    </button>
                    <button className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </button>
                  </div>
                )}
              </div>

              <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
                <div className="pointer-events-none absolute left-4 top-4 z-[400] flex flex-wrap gap-2">
                  <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950/85 px-3 py-2 shadow-lg backdrop-blur">
                    <MapPin className="mr-2 h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-white">Esri Satellite Base</span>
                  </div>

                  <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950/85 px-3 py-2 shadow-lg backdrop-blur">
                    <Clock className="mr-2 h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-white">
                      Sri Lanka Time • {sriLankaTime}
                    </span>
                  </div>
                </div>

                {!mapReady && (
                  <div className="absolute inset-0 z-[300] flex items-center justify-center text-slate-500">
                    Initializing Geo-Spatial Engine...
                  </div>
                )}

                <LiveMap
                  elephants={elephants}
                  rangers={INITIAL_RANGERS}
                  selectedEntityId={selectedEntityId}
                  setSelectedEntityId={setSelectedEntityId}
                  onReady={setMapReady}
                />
              </div>

              <SelectedEntityPanel
                elephant={liveSelectedEntity}
                sriLankaTime={sriLankaTime}
                setSelectedEntityId={setSelectedEntityId}
                onOpenProfile={() => setShowFullProfile(true)}
              />
            </div>
          </div>
        </main>
      </div>

      <FullProfileModal
        open={showFullProfile}
        elephant={liveSelectedEntity}
        sriLankaTime={sriLankaTime}
        onClose={() => setShowFullProfile(false)}
      />
    </div>
  );
}