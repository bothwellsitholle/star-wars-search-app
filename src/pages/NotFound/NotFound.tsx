export const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--theme-bg-body)]">
    <h1 className="font-sora text-5xl font-bold text-brand-accent">404</h1>
    <p className="text-[var(--theme-text-muted)]">Page not found.</p>
    <a
      href="/"
      className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-hover"
    >
      Go home
    </a>
  </div>
);
