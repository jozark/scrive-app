export type EpisodeFromAPIId = {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  html_description: string;
  id: string;
  images: ImagesFromEpisodesFromAPI[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  show: {
    available_markets: string[];
    copyrights: [];
    description: string;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    html_description: string;
    id: string;
    images: ImagesFromEpisodesFromAPI[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    total_episodes: number;
    type: string;
    uri: string;
  };
  type: string;
  uri: string;
};

export type EpisodesFromAPISearch = {
  episodes: {
    href: string;
    items: EpisodeFromAPISearch[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
};

export type EpisodeFromAPISearch = Omit<EpisodeFromAPIId, 'show'>;

export type ImagesFromEpisodesFromAPI = {
  height: number;
  url: string;
  width: number;
};

export type Episode = {
  id: string;
  releaseDate: string;
  title: string;
  show: string;
  image: string;
  duration: number;
  uri: string;
  description: string;
};
