import { Sparkles } from 'lucide-react';
import heroBgDesktop from '../../assets/hero-desktop.jpg';
import heroBgMobile from '../../assets/hero-mobile.jpg';

export const HeroSection = () => (
  <section aria-label="Page hero" className="relative z-10 mt-15 pb-8 pt-10 text-center">
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 bg-cover bg-center sm:hidden"
      style={{ backgroundImage: `url(${heroBgMobile})` }}
    />
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 hidden bg-cover bg-right-top sm:block"
      style={{ backgroundImage: `url(${heroBgDesktop})` }}
    />
    <div aria-hidden="true" className="hero-pattern fixed inset-0 z-0 bg-[#1A0F2E]/65" />

    <div className="mx-auto max-w-2xl px-4">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-star/25 bg-brand-star/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.15em] text-brand-star">
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        STAR WARS UNIVERSE
      </div>

      <h1 className="font-sora text-4xl font-bold text-white sm:text-5xl">Character Search</h1>
      <p className="mt-3 text-sm text-brand-muted sm:text-base">
        Search the galaxy's most wanted across the SWAPI database
      </p>
    </div>
  </section>
);
