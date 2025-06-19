import {
  type Character,
  type CharacterDisplay,
  type FilmDisplay,
  type StarshipDisplay,
  type Starship,
  type Planet,
  type HomeWorldDisplay,
} from "~/types/character.type";
import { nullCheck } from "~/utils";
import { extractValues } from "~/utils/common";
export const extractCharacterData = (data: Character) => {
  let res: CharacterDisplay | null = null;
  const properties = [
    "eye_color",
    "eye_color",
    "gender",
    "height",
    "mass",
    "hair_color",
    "homeworld",
    "films",
    "starships",
    "url",
    "name",
  ];
  if (!nullCheck(data)) {
    res = { ...extractValues(data, properties) };
  }
  return res;
};

export const extractStarshipData = (data: Starship) => {
  let res: StarshipDisplay | null = null;
  const properties = ["name", "url", "manufacturer", "cost_in_credits"];
  if (!nullCheck(data)) {
    res = { ...extractValues(data, properties) };
  }
  return res;
};

export const extractFilmsData = (data: Character) => {
  let res: FilmDisplay | null = null;
  const properties = ["url", "title", "episode_id", "director"];
  if (!nullCheck(data)) {
    res = { ...extractValues(data, properties) };
  }
  return res;
};

export const extractHomeWorld = (data: Planet) => {
  let res: HomeWorldDisplay | null = null;
  const properties = ["name", "url", "population"];
  if (!nullCheck(data)) {
    res = { ...extractValues(data, properties) };
  }
  return res;
};
