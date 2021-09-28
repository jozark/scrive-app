import type { Episode, Note } from '../../lib/types';
import useLocalStorage from './useLocalStorage';

export default function useEpisodes(): {
  episodeData: Episode[];
  addEpisodeData: (episode: Episode) => void;
  removeEpisodeData: (episode: Episode) => void;
  addEpisodeNotes: (title: string, note: Note) => void;
} {
  const [episodeData, setEpisodeData] = useLocalStorage<Episode[]>(
    'episodes',
    []
  );

  function addEpisodeData(episode: Episode) {
    setEpisodeData([...episodeData, episode]);
  }

  function addEpisodeNotes(title: string, note: Note) {
    const newData = episodeData.map((e) => {
      if (e.title === title) {
        e.notes?.push(note);
        // e.notes = [...e.notes?, note ]
        // why isnt this working?
        console.log('inside', e.notes);
      }
      return e;
    });
    setEpisodeData(newData);
  }

  function removeEpisodeData(episode: Episode) {
    setEpisodeData(episodeData.filter((b) => b !== episode));
  }

  return { episodeData, addEpisodeData, removeEpisodeData, addEpisodeNotes };
}
