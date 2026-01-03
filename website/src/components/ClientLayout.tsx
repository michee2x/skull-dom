'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './ThemeProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      {/* Navbar to Content Wrap */}
      {/* Navbar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || pathname !== '/'
            ? 'bg-black/80 backdrop-blur-md border-b border-neutral-800 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <img src="/skull-logo.png" alt="SkullDOM" className="w-8 h-8 rounded-md" />
            <span className="text-white">SkullDOM</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/examples" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Examples
            </Link>
            <a
              href="https://github.com/michee2x/skull-dom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
                href="https://github.com/michee2x/skull-dom"
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden text-neutral-400 hover:text-white transition-colors"
            >
                <Github className="w-5 h-5" strokeWidth={2} />
            </a>
            
            {pathname?.startsWith('/docs') ? (
              <>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden btn-primary text-xs px-3 py-2"
                >
                  {isMobileMenuOpen ? 'Close' : 'Menu'}
                </button>
                <Link href="/docs" className="hidden md:block">
                  <button className="btn-primary text-xs px-3 py-2 md:text-sm md:px-5 md:py-2">
                    Get Started
                  </button>
                </Link>                                                                                            
              </>
            ) : (
              <Link href="/docs">
                <button className="btn-primary text-xs px-3 py-2 md:text-sm md:px-5 md:py-2">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile Docs Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-300 md:hidden flex flex-col p-6 overflow-y-auto",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="space-y-8">
          <div>
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Getting Started</h4>
            <ul className="space-y-4 text-base">
              <li><Link href="/docs" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">Introduction</Link></li>
              <li><Link href="/docs/configuration" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">Animations & Config</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Frameworks</h4>
            <ul className="space-y-4 text-base">
              <li><Link href="/docs/react" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">React</Link></li>
              <li><Link href="/docs/vue" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">Vue</Link></li>
              <li><Link href="/docs/svelte" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">Svelte</Link></li>
              <li><Link href="/docs/solid" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">SolidJS</Link></li>
              <li><Link href="/docs/vanilla" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">Vanilla / HTML</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Examples</h4>
            <ul className="space-y-4 text-base">
              <li><Link href="/examples" className="block text-neutral-300 hover:text-white transition-colors border-b border-neutral-800 pb-2">Live Examples</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="pt-16">
          {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-12 transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-8 mb-8">
            {/* Large SKULLDOM text */}
            <h2 className="text-6xl md:text-7xl lg:text-[16em] font-bold tracking-tight text-white" style={{ fontFamily: 'HeaderFont' }}>
              SKULLDOM
            </h2>
            
            {/* Social Links */}
            <div className="flex gap-6">
                <a href="#" className="text-neutral-400 hover:text-white font-medium text-sm transition-colors">Twitter</a>
                <a href="#" className="text-neutral-400 hover:text-white font-medium text-sm transition-colors">GitHub</a>
                <a href="#" className="text-neutral-400 hover:text-white font-medium text-sm transition-colors">Discord</a>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-neutral-800">
            <span className="text-gray-400 text-sm">© {new Date().getFullYear()} SkullDOM. MIT License.</span>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}
