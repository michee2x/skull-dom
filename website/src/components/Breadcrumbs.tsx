'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname?.split('/').filter((x) => x) || [];

  // Don't show on home page
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-sm text-neutral-400 mb-6">
      <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-neutral-600" />
            {isLast ? (
              <span className="text-white font-medium capitalize">
                {value.replace(/-/g, ' ')}
              </span>
            ) : (
              <Link href={to} className="hover:text-white transition-colors capitalize">
                {value.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
