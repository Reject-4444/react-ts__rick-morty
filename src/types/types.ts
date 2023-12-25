interface Origin {
    name: string;
    url: string;
  }
  
  interface Location {
    name: string;
    url: string;
  }
  
  export interface CharactersType {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }
  
  export interface EpisodesType {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
  }

  export interface LocationsType {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }
  