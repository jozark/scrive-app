import type { Episode } from '../../lib/types';
import useLocalStorage from './useLocalStorage';

export default function useEpisodes(): {
  episodeData: Episode[];
  addEpisodeData: (episode: Episode) => void;
  removeEpisodeData: (episode: Episode) => void;
} {
  const [episodeData, setEpisodeData] = useLocalStorage<Episode[]>(
    'episodes',
    []
  );

  function addEpisodeData(episode: Episode) {
    setEpisodeData([...episodeData, episode]);
  }

  function removeEpisodeData(episode: Episode) {
    setEpisodeData(episodeData.filter((b) => b !== episode));
  }

  return { episodeData, addEpisodeData, removeEpisodeData };
}
