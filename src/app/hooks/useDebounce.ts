import { useEffect } from 'react';

export default function useDebounce<T>(
  effect: () => void,
  dependencies: T,
  delay: number
): void {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [{ ...(dependencies || []) }, delay]);
}
