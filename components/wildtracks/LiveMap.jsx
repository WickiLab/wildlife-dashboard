'use client';

import { useEffect, useRef } from 'react';
import { STATUS_STYLES, ZONES } from '../../lib/wildtracks/constants';

export default function LiveMap({
  elephants,
  rangers,
  selectedEntityId,
  setSelectedEntityId,
  onReady,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const leafletRef = useRef(null);
  const markersRef = useRef({});
  const trailsRef = useRef({});
  const rangerMarkersRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      if (!mapRef.current || mapInstance.current) return;

      const leafletModule = await import('leaflet');
      const L = leafletModule.default;
      leafletRef.current = L;

      if (cancelled || mapInstance.current) return;

      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView(
        [7.8731, 80.7718],
        7
      );

      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Tiles © Esri',
        }
      ).addTo(mapInstance.current);

      L.rectangle(
        [
          [-90, -180],
          [90, 180],
        ],
        {
          color: 'none',
          fillColor: '#0f172a',
          fillOpacity: 0.4,
          interactive: false,
        }
      ).addTo(mapInstance.current);

      ZONES.forEach((zone) => {
        if (zone.type === 'safe') {
          L.rectangle(
            [
              [zone.minLat, zone.minLng],
              [zone.maxLat, zone.maxLng],
            ],
            {
              color: zone.color,
              weight: 2,
              fillOpacity: 0.1,
              dashArray: '5, 5',
            }
          )
            .bindTooltip(zone.name, { direction: 'center' })
            .addTo(mapInstance.current);
        } else {
          L.circle([zone.lat, zone.lng], {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.15,
            radius: zone.r,
            weight: 2,
            dashArray: '4, 4',
          })
            .bindTooltip(zone.name, { direction: 'top' })
            .addTo(mapInstance.current);
        }
      });

      rangerMarkersRef.current = rangers.map((ranger) => {
        const iconHtml = `
          <div style="background-color:#3b82f6;border:2px solid white;width:14px;height:14px;border-radius:50%;box-shadow:0 0 10px #3b82f6;"></div>
          <div style="color:#93c5fd;font-size:10px;font-weight:bold;margin-top:4px;text-shadow:1px 1px 2px black;white-space:nowrap;">${ranger.name}</div>
        `;

        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: iconHtml,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        return L.marker([ranger.lat, ranger.lng], { icon }).addTo(mapInstance.current);
      });

      onReady?.(true);
    }

    initMap();

    return () => {
      cancelled = true;
      onReady?.(false);

      rangerMarkersRef.current.forEach((marker) => marker.remove());
      rangerMarkersRef.current = [];

      Object.values(markersRef.current).forEach((marker) => marker.remove());
      Object.values(trailsRef.current).forEach((trail) => trail.remove());

      markersRef.current = {};
      trailsRef.current = {};

      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [rangers, onReady]);

  useEffect(() => {
    const map = mapInstance.current;
    const L = leafletRef.current;

    if (!map || !L) return;

    const activeIds = new Set(elephants.map((elephant) => elephant.id));

    Object.keys(markersRef.current).forEach((id) => {
      if (!activeIds.has(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    Object.keys(trailsRef.current).forEach((id) => {
      if (!activeIds.has(id)) {
        trailsRef.current[id].remove();
        delete trailsRef.current[id];
      }
    });

    elephants.forEach((elephant) => {
      const color = STATUS_STYLES[elephant.status]?.dot ?? '#10b981';
      const isSelected = selectedEntityId === elephant.id;

      if (!trailsRef.current[elephant.id]) {
        trailsRef.current[elephant.id] = L.polyline(
          elephant.history.map((point) => [point.lat, point.lng]),
          {
            color,
            weight: 2,
            opacity: 0.65,
            dashArray: '4, 4',
          }
        ).addTo(map);
      } else {
        trailsRef.current[elephant.id].setLatLngs(
          elephant.history.map((point) => [point.lat, point.lng])
        );
        trailsRef.current[elephant.id].setStyle({ color });
      }

      const glow =
        elephant.status === 'danger'
          ? '0 0 15px 5px rgba(244,63,94,0.55)'
          : '0 0 5px rgba(0,0,0,0.5)';

      const iconHtml = `
        <div style="
          background-color:${color};
          border:${isSelected ? '3px solid white' : '2px solid #0f172a'};
          width:14px;
          height:14px;
          border-radius:50%;
          box-shadow:${glow};
          transition:all 0.3s ease;
        "></div>
        ${
          isSelected || elephant.status === 'danger'
            ? `
          <div style="
            background:rgba(15,23,42,0.9);
            color:white;
            font-size:10px;
            padding:2px 6px;
            border-radius:4px;
            margin-top:6px;
            margin-left:-10px;
            white-space:nowrap;
          ">${elephant.id}</div>
        `
            : ''
        }
      `;

      const icon = L.divIcon({
        className: 'elephant-icon',
        html: iconHtml,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      if (!markersRef.current[elephant.id]) {
        markersRef.current[elephant.id] = L.marker([elephant.lat, elephant.lng], { icon })
          .addTo(map)
          .on('click', () => setSelectedEntityId(elephant.id));
      } else {
        markersRef.current[elephant.id].setLatLng([elephant.lat, elephant.lng]);
        markersRef.current[elephant.id].setIcon(icon);
      }
    });
  }, [elephants, selectedEntityId, setSelectedEntityId]);

  return <div ref={mapRef} className="h-full w-full" />;
}