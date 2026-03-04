import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This func merges Tailwind class names and resolves conflicts automatically
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// This func separates text so the matching portion can be highlighted.
export const getHighlightSegments = (
  text: string,
  query: string,
): { before: string; match: string; after: string } | null => {
  if (!query.trim()) return null;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return null;

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + lowerQuery.length),
    after: text.slice(index + lowerQuery.length),
  };
};
