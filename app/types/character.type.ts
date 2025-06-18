export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string;
  vehicles: string;
  films: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: 4;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots?: string[];
  films?: string[];
  created: string;
  edited: string;
  url: string;
}
export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
export type CharacterDisplay = Partial<
  Pick<
    Character,
    | "eye_color"
    | "gender"
    | "hair_color"
    | "homeworld"
    | "films"
    | "starships"
    | "url"
    | "name"
    | "height"
    | "mass"
    | "birth_year"
  >
>;

export type FilmDisplay = Partial<
  Pick<Film, "url" | "title" | "episode_id" | "director">
>;
export type StarshipDisplay = Partial<
  Pick<Starship, "name" | "url" | "manufacturer" | "cost_in_credits">
>;

export type HomeWorldDisplay = Partial<
  Pick<Planet, "name" | "url" | "population">
>;
