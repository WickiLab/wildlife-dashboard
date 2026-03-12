import './globals.css';
import 'leaflet/dist/leaflet.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'STE WildTracks',
  description: 'Live elephant real time tracking dashboard',
} satisfies import('next').Metadata;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
} satisfies import('next').Viewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
