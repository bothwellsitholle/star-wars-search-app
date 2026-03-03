import { AlertCircle, Users } from 'lucide-react';
import { getHighlightSegments } from '../../lib/utils';
import type { Person } from '../../schemas/people.schema';
import { Skeleton } from '../ui/skeleton';

interface SuggestionDropdownProps {
  suggestions: Person[];
  isLoading: boolean;
  isError: boolean;
  activeIndex: number;
  query: string;
  listboxId: string;
  onSelect: (person: Person) => void;
  getOptionId: (index: number) => string;
}

export const SuggestionDropdown = ({
  suggestions,
  isLoading,
  isError,
  activeIndex,
  query,
  listboxId,
  onSelect,
  getOptionId,
}: SuggestionDropdownProps) => (
  <div
    className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-theme bg-theme-card shadow-[0_8px_32px_var(--theme-shadow)] animate-slide-down"
    onMouseDown={(e) => e.preventDefault()}
  >
    {isLoading && (
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading suggestions"
        className="space-y-2.5 px-4 py-3"
      >
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )}

    {isError && !isLoading && (
      <div role="alert" className="flex items-center gap-2 px-4 py-3 text-sm text-brand-error">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        Failed to load suggestions. Check your connection.
      </div>
    )}

    {!isLoading && !isError && suggestions.length === 0 && (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 px-4 py-3 text-sm text-theme-muted"
      >
        <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
        No characters found for &ldquo;{query}&rdquo;
      </div>
    )}

    <ul
      id={listboxId}
      role="listbox"
      aria-label="Character suggestions"
      className="max-h-60 overflow-y-auto custom-scrollbar py-1"
    >
      {!isLoading &&
        !isError &&
        suggestions.map((person, index) => {
          const isActive = index === activeIndex;
          const segments = getHighlightSegments(person.name, query);

          return (
            <li
              key={person.url}
              id={getOptionId(index)}
              role="option"
              aria-selected={isActive}
              onClick={() => onSelect(person)}
              className={`cursor-pointer select-none px-4 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-brand-accent text-white' : 'text-theme-primary hover-theme'
              }`}
            >
              {segments ? (
                <span>
                  {segments.before}
                  <span
                    className={`font-semibold ${isActive ? 'text-white' : 'text-brand-accent'}`}
                  >
                    {segments.match}
                  </span>
                  {segments.after}
                </span>
              ) : (
                person.name
              )}
            </li>
          );
        })}
    </ul>

    {suggestions.length > 0 && !isLoading && (
      <div className="border-t border-theme px-4 py-1.5 text-right text-xs text-theme-muted opacity-60">
        {suggestions.length} result{suggestions.length !== 1 ? 's' : ''} · SWAPI
      </div>
    )}
  </div>
);
