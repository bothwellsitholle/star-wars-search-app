import { Moon, Sun } from 'lucide-react';
import { Theme } from '../../enums';
import { useTheme } from '../../hooks/useTheme';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-6 z-50 mx-4 rounded-2xl border border-[#7971DC]/40 bg-[#0E0820]/95 backdrop-blur-md">
      <nav aria-label="Main navigation" className="flex h-14 items-center justify-between px-5">
        <a
          href="/"
          aria-label="Procurified home"
          className="rounded outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0820]"
        >
          <span className="font-space-grotesk text-xl font-bold tracking-tight text-white">
            STAR<span className="text-brand-accent">WARS</span>
          </span>
        </a>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === Theme.Dark ? Theme.Light : Theme.Dark} mode`}
            className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-full text-white/80 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-brand-accent"
          >
            {theme === Theme.Dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <span className="hidden font-sora text-[10px] font-semibold tracking-[0.2em] text-white/80 sm:block">
            THEME
          </span>
        </div>
      </nav>
    </header>
  );
};
