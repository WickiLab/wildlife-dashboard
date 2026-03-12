import { ZONES } from './constants';

const sriLankaTimeFormatter = new Intl.DateTimeFormat('en-LK', {
  timeZone: 'Asia/Colombo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function formatSriLankaTime(date) {
  return sriLankaTimeFormatter.format(date);
}

// Calculates distance between two coordinates using the Haversine formula
export function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dp / 2) * Math.sin(dp / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Determines the elephant's threat status based on its location
export function getZoneStatus(lat, lng) {
  const inDangerZone = ZONES.some((zone) => {
    if (zone.type !== 'danger') return false;
    return getDistanceInMeters(lat, lng, zone.lat, zone.lng) <= zone.r;
  });

  if (inDangerZone) return 'danger';

  const inSafeZone = ZONES.some((zone) => {
    if (zone.type !== 'safe') return false;
    return (
      lat >= zone.minLat &&
      lat <= zone.maxLat &&
      lng >= zone.minLng &&
      lng <= zone.maxLng
    );
  });

  if (inSafeZone) return 'safe';
  
  // If neither in a defined safe zone nor a danger zone, set to warning
  return 'warning';
}

// Generates a random nearby coordinate to walk towards
function getNextTarget(lat, lng) {
  return {
    targetLat: lat + (Math.random() - 0.5) * 0.05, // Adjusted for smaller, more realistic steps
    targetLng: lng + (Math.random() - 0.5) * 0.05,
  };
}

// Main simulation tick function for an individual elephant
export function simulateElephantStep(elephant) {
  let { lat, lng, targetLat, targetLng, history, activity, speed, battery, heartRate, bodyTemp } = elephant;

  // 1. Handle Movement & Activity States
  if (activity === 'Resting') {
    if (Math.random() < 0.05) { // 5% chance to wake up and start moving
      activity = 'Moving';
      speed = Number((2 + Math.random()).toFixed(1));
      const next = getNextTarget(lat, lng);
      targetLat = next.targetLat;
      targetLng = next.targetLng;
    } else {
      speed = 0;
    }
  } else {
    // Elephant is moving
    let dLat = targetLat - lat;
    let dLng = targetLng - lng;
    let distDeg = Math.hypot(dLat, dLng);

    // If reached destination (or very close)
    if (distDeg < 0.005) {
      if (Math.random() < 0.3) { // 30% chance to rest upon arriving
        activity = 'Resting';
        speed = 0;
      } else { // 70% chance to pick a new destination
        const next = getNextTarget(lat, lng);
        targetLat = next.targetLat;
        targetLng = next.targetLng;
        speed = Number((2 + Math.random()).toFixed(1));

        dLat = targetLat - lat;
        dLng = targetLng - lng;
        distDeg = Math.hypot(dLat, dLng);
      }
    }

    // Process physical move
    if (activity === 'Moving' && distDeg > 0) {
      const speedMultiplier = speed * 0.0002;
      lat += (dLat / distDeg) * speedMultiplier;
      lng += (dLng / distDeg) * speedMultiplier;
    }
  }

  // 2. Manage Location History Trail
  const newHistory = [...history, { lat, lng }];
  if (newHistory.length > 20) newHistory.shift(); // Keep only the last 20 coordinates

  // 3. Simulate Vitals and Battery
  // Slowly drain the collar battery (0.01% per tick)
  battery = Math.max(0, battery - 0.01);

  // Fluctuate heart rate based on current activity
  const baseHR = activity === 'Moving' ? 34 : 26;
  const hrVariance = (Math.random() - 0.5) * 6; // Fluctuate up to +/- 3 bpm
  heartRate = Math.round(Math.max(20, Math.min(45, baseHR + hrVariance)));

  // Fluctuate body temperature slightly (+/- 0.1 degree)
  const tempVariance = (Math.random() - 0.5) * 0.2;
  bodyTemp = Number(Math.max(35.8, Math.min(37.2, bodyTemp + tempVariance)).toFixed(1));

  // 4. Return the updated elephant object
  return {
    ...elephant,
    lat,
    lng,
    targetLat,
    targetLng,
    history: newHistory,
    status: getZoneStatus(lat, lng), // Recalculate threat status based on new position
    activity,
    speed,
    battery: Number(battery.toFixed(2)),
    heartRate,
    bodyTemp,
  };
}