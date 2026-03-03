import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { MOCK_PEOPLE } from '../test/mocks/handlers';
import { useCharacterSearch } from './useCharacterSearch';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useCharacterSearch', () => {
  it('is disabled when query is fewer than 2 characters', () => {
    const { result } = renderHook(() => useCharacterSearch('L'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.isFetching).toBe(false);
  });

  it('returns matching characters for a valid query', async () => {
    const { result } = renderHook(() => useCharacterSearch('lu'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe('Luke Skywalker');
  });

  it('returns an empty array when no characters match', async () => {
    const { result } = renderHook(() => useCharacterSearch('zzz'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(0);
  });

  it('is disabled for a single character', () => {
    const { result } = renderHook(() => useCharacterSearch('a'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
  });

  it('trims whitespace from the query before searching', async () => {
    const { result } = renderHook(() => useCharacterSearch('  lu  '), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].name).toBe(MOCK_PEOPLE[0].name);
  });
});
