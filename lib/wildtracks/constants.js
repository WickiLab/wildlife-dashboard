export const ZONES = [
  { id: 'z1', name: 'Wilpattu NP', type: 'safe', minLat: 8.2, maxLat: 8.6, minLng: 79.9, maxLng: 80.3, color: '#10b981' },
  { id: 'z2', name: 'Minneriya NP', type: 'safe', minLat: 7.9, maxLat: 8.1, minLng: 80.7, maxLng: 80.9, color: '#10b981' },
  { id: 'z3', name: 'Gal Oya NP', type: 'safe', minLat: 7.1, maxLat: 7.3, minLng: 81.3, maxLng: 81.6, color: '#10b981' },
  { id: 'z4', name: 'Yala / Udawalawe', type: 'safe', minLat: 6.3, maxLat: 6.6, minLng: 81.0, maxLng: 81.5, color: '#10b981' },
  { id: 'z5', name: 'Anuradhapura Villages', type: 'danger', lat: 8.35, lng: 80.4, r: 15000, color: '#f43f5e' },
  { id: 'z6', name: 'Polonnaruwa Villages', type: 'danger', lat: 7.94, lng: 81.0, r: 12000, color: '#f43f5e' },
  { id: 'z7', name: 'Ampara Villages', type: 'danger', lat: 7.28, lng: 81.67, r: 10000, color: '#f43f5e' },
  { id: 'z8', name: 'Monaragala Villages', type: 'danger', lat: 6.87, lng: 81.34, r: 14000, color: '#f43f5e' },
];

export const INITIAL_ELEPHANTS = [
  // Original Elephants
  { id: 'E-01', name: 'Rambo', lat: 8.4, lng: 80.1, targetLat: 8.36, targetLng: 80.3, speed: 2.1, status: 'warning', activity: 'Moving', history: [], age: 40, gender: 'Male', weight: 5100, herd: 'Lone Male', battery: 82, heartRate: 28, bodyTemp: 36.4, region: 'North Western' },
  { id: 'E-02', name: 'Bhathiya', lat: 8.45, lng: 80.05, targetLat: 8.45, targetLng: 80.05, speed: 0, status: 'safe', activity: 'Resting', history: [], age: 22, gender: 'Male', weight: 3900, herd: 'Wilpattu Beta', battery: 91, heartRate: 26, bodyTemp: 36.1, region: 'North Western' },
  { id: 'E-103', name: 'Maya', lat: 8.36, lng: 80.38, targetLat: 8.35, targetLng: 80.4, speed: 3.2, status: 'danger', activity: 'Moving', history: [], age: 25, gender: 'Female', weight: 4200, herd: 'North Savannah', battery: 85, heartRate: 34, bodyTemp: 36.6, region: 'North Central' },
  { id: 'E-56', name: 'Zola', lat: 8.3, lng: 79.9, targetLat: 8.4, targetLng: 80.0, speed: 1.5, status: 'safe', activity: 'Moving', history: [], age: 31, gender: 'Female', weight: 3800, herd: 'Wilpattu Matriarchs', battery: 44, heartRate: 30, bodyTemp: 36.5, region: 'North Western' },
  { id: 'E-03', name: 'Sumedha', lat: 8.0, lng: 80.8, targetLat: 7.95, targetLng: 80.85, speed: 2.2, status: 'safe', activity: 'Moving', history: [], age: 28, gender: 'Male', weight: 4800, herd: 'Minneriya Bulls', battery: 67, heartRate: 31, bodyTemp: 36.7, region: 'North Central' },
  { id: 'E-04', name: 'Raja', lat: 8.05, lng: 80.75, targetLat: 8.05, targetLng: 80.75, speed: 0, status: 'warning', activity: 'Resting', history: [], age: 45, gender: 'Male', weight: 5400, herd: 'Lone Tusker', battery: 20, heartRate: 25, bodyTemp: 36.2, region: 'North Central' },
  { id: 'E-77', name: 'E-77', lat: 7.96, lng: 80.98, targetLat: 7.94, targetLng: 81.0, speed: 2.8, status: 'danger', activity: 'Moving', history: [], age: 18, gender: 'Male', weight: 3200, herd: 'Minneriya Splinter', battery: 95, heartRate: 35, bodyTemp: 36.8, region: 'North Central' },
  { id: 'E-05', name: 'Senanayake', lat: 7.2, lng: 81.4, targetLat: 7.25, targetLng: 81.45, speed: 2.0, status: 'safe', activity: 'Moving', history: [], age: 38, gender: 'Male', weight: 5200, herd: 'Gal Oya Giants', battery: 73, heartRate: 29, bodyTemp: 36.3, region: 'Eastern' },
  { id: 'E-64', name: 'E-64', lat: 7.27, lng: 81.65, targetLat: 7.28, targetLng: 81.67, speed: 3.2, status: 'danger', activity: 'Moving', history: [], age: 14, gender: 'Male', weight: 2800, herd: 'Gal Oya Splinter', battery: 88, heartRate: 36, bodyTemp: 36.9, region: 'Eastern' },
  { id: 'E-06', name: 'Gemunu', lat: 6.4, lng: 81.2, targetLat: 6.4, targetLng: 81.2, speed: 0, status: 'safe', activity: 'Resting', history: [], age: 30, gender: 'Male', weight: 4600, herd: 'Yala Main', battery: 55, heartRate: 27, bodyTemp: 36.4, region: 'Southern' },
  { id: 'E-07', name: 'Kandula', lat: 6.45, lng: 81.05, targetLat: 6.5, targetLng: 81.1, speed: 2.3, status: 'warning', activity: 'Moving', history: [], age: 27, gender: 'Male', weight: 4400, herd: 'Udawalawe Herd', battery: 78, heartRate: 32, bodyTemp: 36.5, region: 'Southern' },

  // Added 10 New Elephants
  
  // Monaragala (Uva Region)
  { id: 'E-11', name: 'Saman', lat: 6.85, lng: 81.32, targetLat: 6.87, targetLng: 81.34, speed: 1.8, status: 'warning', activity: 'Moving', history: [], age: 20, gender: 'Male', weight: 3500, herd: 'Monaragala Roamers', battery: 88, heartRate: 30, bodyTemp: 36.4, region: 'Uva' },
  { id: 'E-12', name: 'Menika', lat: 6.88, lng: 81.35, targetLat: 6.89, targetLng: 81.36, speed: 2.5, status: 'danger', activity: 'Moving', history: [], age: 34, gender: 'Female', weight: 3100, herd: 'Monaragala Matriarchs', battery: 60, heartRate: 33, bodyTemp: 36.6, region: 'Uva' },
  
  // Ampara (Eastern Region)
  { id: 'E-13', name: 'Deega', lat: 7.29, lng: 81.66, targetLat: 7.28, targetLng: 81.67, speed: 3.0, status: 'danger', activity: 'Moving', history: [], age: 24, gender: 'Male', weight: 4100, herd: 'Ampara Bulls', battery: 45, heartRate: 35, bodyTemp: 36.8, region: 'Eastern' },
  { id: 'E-14', name: 'Kiri', lat: 7.25, lng: 81.68, targetLat: 7.25, targetLng: 81.68, speed: 0.0, status: 'warning', activity: 'Resting', history: [], age: 42, gender: 'Female', weight: 3950, herd: 'Ampara Matriarchs', battery: 92, heartRate: 28, bodyTemp: 36.2, region: 'Eastern' },
  
  // Gal Oya (Eastern Region)
  { id: 'E-15', name: 'Abhaya', lat: 7.15, lng: 81.45, targetLat: 7.20, targetLng: 81.40, speed: 1.2, status: 'safe', activity: 'Moving', history: [], age: 15, gender: 'Male', weight: 2600, herd: 'Gal Oya Giants', battery: 77, heartRate: 31, bodyTemp: 36.5, region: 'Eastern' },
  
  // Yala (Southern Region)
  { id: 'E-16', name: 'Nandi', lat: 6.35, lng: 81.30, targetLat: 6.35, targetLng: 81.30, speed: 0.0, status: 'safe', activity: 'Resting', history: [], age: 50, gender: 'Female', weight: 4000, herd: 'Yala Main', battery: 34, heartRate: 24, bodyTemp: 36.0, region: 'Southern' },
  { id: 'E-17', name: 'Tusker Raja', lat: 6.42, lng: 81.15, targetLat: 6.45, targetLng: 81.20, speed: 2.2, status: 'safe', activity: 'Moving', history: [], age: 38, gender: 'Male', weight: 5300, herd: 'Lone Tusker', battery: 81, heartRate: 29, bodyTemp: 36.3, region: 'Southern' },
  
  // Polonnaruwa (North Central Region)
  { id: 'E-18', name: 'Parakrama', lat: 7.92, lng: 80.95, targetLat: 7.94, targetLng: 81.00, speed: 2.6, status: 'warning', activity: 'Moving', history: [], age: 29, gender: 'Male', weight: 4500, herd: 'Polonnaruwa Splinter', battery: 59, heartRate: 32, bodyTemp: 36.7, region: 'North Central' },
  { id: 'E-19', name: 'Gajaba', lat: 7.95, lng: 81.02, targetLat: 7.95, targetLng: 81.02, speed: 0.0, status: 'danger', activity: 'Resting', history: [], age: 19, gender: 'Male', weight: 3400, herd: 'Lone Male', battery: 96, heartRate: 27, bodyTemp: 36.4, region: 'North Central' },
  
  // Anuradhapura (North Central Region)
  { id: 'E-20', name: 'Tissa', lat: 8.32, lng: 80.45, targetLat: 8.35, targetLng: 80.40, speed: 3.4, status: 'warning', activity: 'Moving', history: [], age: 26, gender: 'Male', weight: 4300, herd: 'North Savannah', battery: 71, heartRate: 34, bodyTemp: 36.6, region: 'North Central' }
];

export const INITIAL_RANGERS = [
  { id: 'R-01', name: 'Wilpattu Unit', lat: 8.42, lng: 80.05, status: 'patrol' },
  { id: 'R-02', name: 'Minneriya Response', lat: 8.0, lng: 80.85, status: 'standby' },
  { id: 'R-03', name: 'Yala Team Alpha', lat: 6.45, lng: 81.25, status: 'patrol' },
];

export const MODULE_TABS = [
  { id: 'tracking', label: 'Live Tracking' },
  { id: 'alerts', label: 'Conflict Alerts' },
  { id: 'analytics', label: 'Conservation Analytics' },
  { id: 'ops', label: 'Field Operations' },
];

export const ACTIVITY_FILTERS = ['All', 'Moving', 'Resting'];

export const REGIONS = [
  'North Western',
  'North Central',
  'Eastern',
  'Southern',
  'Uva', // Added Uva to accommodate Monaragala geographically
];

export const STATUS_STYLES = {
  safe: {
    dot: '#10b981',
    chip: 'bg-emerald-500/20 text-emerald-400',
  },
  warning: {
    dot: '#fbbf24',
    chip: 'bg-amber-500/20 text-amber-400',
  },
  danger: {
    dot: '#f43f5e',
    chip: 'bg-rose-500/20 text-rose-400',
  },
};