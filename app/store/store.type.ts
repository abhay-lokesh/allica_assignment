import type { CharacterDisplay } from "~/types/character.type";

export interface FavoriteSlice {
  favorites: string[];
  addRemoveFavorite: (key: string) => void;
}

export interface CharacterSlice {
  characters: string[];
  characterNames: string[];
  characterMap: { [key: string]: CharacterDisplay };
  characterData: CharacterDisplay | null;
  initData: (data: CharacterDisplay[], pageSize: number) => void;
  filterCharacters: (keys: string[]) => void;
  setCharacterData: (data: CharacterDisplay) => void;
  clearCharacterData: () => void;
  updateCharacter: (value: string, param: keyof CharacterDisplay) => void;
  pages: number;
  currentPage: number;
  pageSize: number;
  paginateSimple: (order: "LAST" | "FIRST" | "NEXT" | "PREV") => void;
}

// paginateData: (page: number, pageSize: number) => void;
