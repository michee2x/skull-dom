import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkullDOM - Automagic Skeleton Screens',
  description: 'Zero config. Zero manual styles. Automatically generated skeleton screens for any HTML.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white transition-colors">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
