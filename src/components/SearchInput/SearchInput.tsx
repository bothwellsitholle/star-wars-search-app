import { Search, X } from 'lucide-react';
import type { KeyboardEvent, RefObject } from 'react';
import { cn } from '../../lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onOpen: () => void;
  isDropdownOpen: boolean;
  activeDescendantId: string | undefined;
  listboxId: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  onClear,
  onOpen,
  isDropdownOpen,
  activeDescendantId,
  listboxId,
  inputRef,
}: SearchInputProps) => (
  <div
    className={cn(
      'flex items-center gap-2 rounded-2xl border-2 bg-theme-input px-4 py-3 shadow-theme transition-all duration-200',
      isDropdownOpen
        ? 'border-brand-accent shadow-[0_0_0_3px_rgba(124,111,224,0.15)]'
        : 'border-theme hover:border-brand-accent/40',
    )}
  >
    <Search className="h-5 w-5 shrink-0 text-brand-muted" aria-hidden="true" />

    <input
      ref={inputRef}
      type="text"
      role="combobox"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      aria-label="Search Star Wars characters"
      aria-autocomplete="list"
      aria-controls={listboxId}
      aria-expanded={isDropdownOpen}
      aria-activedescendant={activeDescendantId}
      placeholder="e.g. Luke, Vader, Yoda…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="min-w-0 flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-muted/60 focus:outline-none"
    />

    {value && (
      <button
        type="button"
        onClick={onClear}
        aria-label="Clear search"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-border/20 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-accent"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    )}

    <button
      type="button"
      aria-label="Open suggestions"
      onClick={onOpen}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent text-white shadow-sm transition-colors hover:bg-brand-accent-hover focus-visible:outline-2 focus-visible:outline-brand-accent"
    >
      <Search className="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
);
