import type { Episode } from '../../lib/types';
import useFetch from './useFetch';

export default function useSearchEpisodes(query: string): {
  episodes: Episode[] | null;
  isLoading: boolean;
} {
  const result = useFetch<Episode[]>(
    `/api/episodes/search?query=${query.replace(/ /g, '%20')}`
  );

  return {
    episodes: result.data,
    isLoading: result.isLoading,
  };
}
