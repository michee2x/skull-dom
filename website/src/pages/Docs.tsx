import { Link, Outlet, useLocation } from 'react-router-dom';

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  // Check if current path starts with the link path (for nested routes if needed) 
  // or exact match. For docs root, we want exact match. 
  // For subpages like /docs/react, we want exact match.
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`block transition-colors ${isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}
    >
      {children}
    </Link>
  );
}

export default function DocsLayout() {
  return (
    <div className="container mx-auto px-6 py-12 flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block pr-8 shrink-0">
        <div className="sticky top-24 space-y-8">
          <div className="skeleton-box-sm p-4">
            <h4 className="font-bold mb-4 text-sm text-white">Getting Started</h4>
            <ul className="space-y-3 text-sm">
              <li><NavLink to="/docs">Introduction</NavLink></li>
              <li><NavLink to="/docs/configuration">Animations & Config</NavLink></li>
            </ul>
          </div>
          <div className="skeleton-box-sm p-4">
            <h4 className="font-bold mb-4 text-sm text-white">Frameworks</h4>
            <ul className="space-y-3 text-sm">
              <li><NavLink to="/docs/react">React</NavLink></li>
              <li><NavLink to="/docs/vue">Vue</NavLink></li>
              <li><NavLink to="/docs/svelte">Svelte</NavLink></li>
              <li><NavLink to="/docs/solid">SolidJS</NavLink></li>
              <li><NavLink to="/docs/vanilla">Vanilla / HTML</NavLink></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content Area where sub-pages will render */}
      <div className="flex-1 lg:pl-12 w-full">
        <Outlet />
      </div>
    </div>
  );
}
