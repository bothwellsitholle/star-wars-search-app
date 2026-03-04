import { useQuery } from '@tanstack/react-query';
import { searchPeople } from '../api/people';
import { MIN_QUERY_LENGTH } from '../constants';

/* Key behaviours:
- Only fires when query is 2+ characters (per spec)
- Cancels in-flight request on every keystroke
- Deduplicates concurrent requests for the same query key
- Caches results for 5 minutes */
export const useCharacterSearch = (query: string) => {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ['characters', trimmed],
    queryFn: async ({ signal }) => searchPeople(trimmed, signal),
    enabled: trimmed.length >= MIN_QUERY_LENGTH,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
