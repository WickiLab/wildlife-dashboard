import './globals.css';
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: 'STE WildTracks',
  description: 'Live elephant real time tracking dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}