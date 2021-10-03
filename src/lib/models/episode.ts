import type {
  Episode,
  EpisodesFromAPISearch,
  EpisodeFromAPISearch,
  EpisodeFromAPIId,
} from '../types';

import fetch from 'node-fetch';
export async function searchEpisode(
  query: string,
  token: string
): Promise<Episode[]> {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=episode`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const episodes: EpisodesFromAPISearch = await response.json();

  const formattedEpisodes: Promise<Episode[]> = Promise.all(
    episodes.episodes.items.map(async (episode: EpisodeFromAPISearch) => {
      const smallestImage = episode.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, episode.images[0]);

      const showName = await getShowName(episode.id, token);
      return {
        id: episode.id,
        releaseDate: episode.release_date,
        title: episode.name,
        show: showName,
        image: smallestImage.url,
        duration: episode.duration_ms,
        uri: episode.uri,
        description: episode.description,
      };
    })
  );
  return formattedEpisodes;
}

async function getShowName(id: string, token: string): Promise<string> {
  const response = await fetch(`https://api.spotify.com/v1/episodes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const episode: EpisodeFromAPIId = await response.json();
  return episode.show.name;
}
