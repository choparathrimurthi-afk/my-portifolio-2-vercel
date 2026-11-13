import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  brandName: string;
  onContactClick: () => void;
}

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ brandName, onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#f2f4f7]/95 backdrop-blur-md border-b border-[#d8dfe9]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#0b1324] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e40af]"
        >
          {brandName}
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3f4b5e]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#0b1324] hover:underline underline-offset-4 decoration-[#1e40af] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e40af]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu toggle on small viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#0b1324] rounded-lg hover:bg-[#16223b] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#d8dfe9] bg-white text-[#3f4b5e] hover:text-[#0b1324] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#d8dfe9] bg-white px-6 py-4 flex flex-col gap-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-[#3f4b5e] hover:text-[#0b1324] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="mt-1 w-full py-2.5 px-4 text-sm font-medium text-white bg-[#0b1324] rounded-lg hover:bg-[#16223b] text-center cursor-pointer"
          >
            Get in Touch
          </button>
        </nav>
      )}
    </header>
  );
}
