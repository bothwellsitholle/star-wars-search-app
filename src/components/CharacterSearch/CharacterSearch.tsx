import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { CharacterCard } from '../CharacterCard';
import { SearchInput } from '../SearchInput';
import { SuggestionDropdown } from '../SuggestionDropdown';
import { MIN_QUERY_LENGTH } from '../../constants';
import { Key } from '../../enums';
import { useDebounce } from '../../hooks/useDebounce';
import { useCharacterSearch } from '../../queries/useCharacterSearch';
import type { Person } from '../../schemas/people.schema';

export const CharacterSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedCharacter, setSelectedCharacter] = useState<Person | null>(null);

  const debouncedQuery = useDebounce(inputValue, 100); // Ideally I would use 300ms in production, but I have reduced it to 100ms to make the request cancellation in the network tab more visible when typing.
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const getOptionId = useCallback((i: number) => `${listboxId}-opt-${i}`, [listboxId]);

  const { data: suggestions = [], isLoading, isError } = useCharacterSearch(debouncedQuery);

  useEffect(() => {
    if (selectedCharacter) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCharacter]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setSelectedCharacter(null);
    if (value.trim().length >= MIN_QUERY_LENGTH) {
      setIsDropdownOpen(true);
      setActiveIndex(-1);
    } else {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }
  }, []);

  const handleSelect = useCallback((person: Person) => {
    setSelectedCharacter(person);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
  }, []);

  const handleOpen = useCallback(() => {
    if (debouncedQuery.trim().length >= MIN_QUERY_LENGTH) {
      setIsDropdownOpen(true);
      setActiveIndex(-1);
    }
    inputRef.current?.focus();
  }, [debouncedQuery]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setSelectedCharacter(null);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownOpen) return;
      switch (e.key) {
        case Key.ArrowDown:
          e.preventDefault();
          setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
          break;
        case Key.ArrowUp:
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
          break;
        case Key.Enter: {
          e.preventDefault();
          const target = activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];
          if (target) handleSelect(target);
          break;
        }
        case Key.Escape:
          e.preventDefault();
          setIsDropdownOpen(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          break;
        default:
          break;
      }
    },
    [isDropdownOpen, suggestions, activeIndex, handleSelect],
  );

  const activeDescendantId = activeIndex >= 0 ? getOptionId(activeIndex) : undefined;

  return (
    <main className="relative z-10 flex-1">
      <div className="mx-auto max-w-2xl px-4">
        <div className="-mt-5">
          <div className="rounded-2xl border border-[#7971DC]/30 bg-theme-card p-6 shadow-[0_8px_40px_rgba(121,113,220,0.15),0_2px_16px_rgba(121,113,220,0.1)]">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-theme-muted">
              Search Characters
            </p>

            <div
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsDropdownOpen(false);
                  setActiveIndex(-1);
                }
              }}
            >
              <SearchInput
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClear={handleClear}
                onOpen={handleOpen}
                isDropdownOpen={isDropdownOpen}
                activeDescendantId={activeDescendantId}
                listboxId={listboxId}
                inputRef={inputRef}
              />
              {isDropdownOpen && (
                <SuggestionDropdown
                  suggestions={suggestions}
                  isLoading={isLoading}
                  isError={isError}
                  activeIndex={activeIndex}
                  query={debouncedQuery}
                  listboxId={listboxId}
                  onSelect={handleSelect}
                  getOptionId={getOptionId}
                />
              )}
            </div>
          </div>
        </div>

        {selectedCharacter && (
          <div ref={cardRef} className="mt-6 pb-12">
            <CharacterCard person={selectedCharacter} />
          </div>
        )}

        {!selectedCharacter && (
          <p className="mt-6 pb-12 text-center text-xs text-purple-200">
            Type 2+ characters to search · Select a result to view details
          </p>
        )}
      </div>
    </main>
  );
};
