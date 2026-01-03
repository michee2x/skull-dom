'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if current path matches EXACTLY for docs root
  // Or starts with for potentially nested (but simplified for now match exact behavior of previous)
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`block transition-colors ${isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}
    >
      {children}
    </Link>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-6 py-12 flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block pr-8 shrink-0">
        <div className="sticky top-24 space-y-8">
          <div className="skeleton-box-sm p-4">
            <h4 className="font-bold mb-4 text-sm text-white">Getting Started</h4>
            <ul className="space-y-3 text-sm">
              <li><NavLink href="/docs">Introduction</NavLink></li>
              <li><NavLink href="/docs/configuration">Animations & Config</NavLink></li>
            </ul>
          </div>
          <div className="skeleton-box-sm p-4">
            <h4 className="font-bold mb-4 text-sm text-white">Frameworks</h4>
            <ul className="space-y-3 text-sm">
              <li><NavLink href="/docs/react">React</NavLink></li>
              <li><NavLink href="/docs/vue">Vue</NavLink></li>
              <li><NavLink href="/docs/svelte">Svelte</NavLink></li>
              <li><NavLink href="/docs/solid">SolidJS</NavLink></li>
              <li><NavLink href="/docs/vanilla">Vanilla / HTML</NavLink></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-12 w-full">
        {children}
      </div>
    </div>
  );
}
