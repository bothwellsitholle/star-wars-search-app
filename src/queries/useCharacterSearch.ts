import { useQuery } from '@tanstack/react-query';
import { searchPeople } from '../api/people';
import { MIN_QUERY_LENGTH } from '../constants';

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
