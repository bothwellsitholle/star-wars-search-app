import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorFallback = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-brand-dark px-4 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-error/15">
      <AlertTriangle className="h-10 w-10 text-brand-error" aria-hidden="true" />
    </div>

    <div className="space-y-2">
      <h1 className="font-sora text-2xl font-semibold text-brand-light">Something went wrong</h1>
      <p className="max-w-sm text-sm text-brand-muted">
        An unexpected error occurred. Reload the page to try again.
      </p>
    </div>

    <button
      type="button"
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
    >
      <RefreshCw className="h-4 w-4" aria-hidden="true" />
      Reload page
    </button>
  </div>
);
