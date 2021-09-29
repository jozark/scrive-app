import type { Episode, Note } from '../../lib/types';
import useLocalStorage from './useLocalStorage';

export default function useEpisodes(): {
  episodeData: Episode[];
  addEpisodeData: (episode: Episode) => void;
  removeEpisodeData: (episode: Episode) => void;
  addEpisodeNote: (title: string, note: Note) => void;
  updateEpisodeNote: (title: string, note: Note) => void;
} {
  const [episodeData, setEpisodeData] = useLocalStorage<Episode[]>(
    'episodes',
    []
  );

  function addEpisodeData(episode: Episode) {
    setEpisodeData([...episodeData, episode]);
  }

  function addEpisodeNote(id: string, newNote: Note) {
    console.log(episodeData, 'hier');
    const newData = episodeData.map((episode) => {
      if (episode.id === id) {
        episode.notes = [...episode.notes, newNote];
        console.log('inside', episode.notes);
      }
      return episode;
    });
    console.log(newData);
    setEpisodeData(newData);
  }

  function updateEpisodeNote(id: string, newNote: Note) {
    const newData = episodeData.map((episode) => {
      if (episode.id === id) {
        const newNotes = episode.notes.map((note) => {
          if (note.id === newNote.id) {
            return (note = newNote);
          }
          return note;
        });
        episode.notes = [...newNotes];
      }
      return episode;
    });
    setEpisodeData(newData);
  }

  function removeEpisodeData(episode: Episode) {
    setEpisodeData(episodeData.filter((b) => b !== episode));
  }

  return {
    episodeData,
    addEpisodeData,
    removeEpisodeData,
    addEpisodeNote,
    updateEpisodeNote,
  };
}
