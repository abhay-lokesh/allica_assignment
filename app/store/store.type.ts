import type { CharacterDisplay } from "~/types/character.type";

export interface FavoriteSlice {
  favorites: string[];
  addRemoveFavorite: (key: string) => void;
}

export interface CharacterSlice {
  characters: CharacterDisplay[];
  characterNames: string[];
  characterMap: { [key: string]: CharacterDisplay };
  initData: (data: CharacterDisplay[], pageSize: number) => void;
  paginateData: (page: number, pageSize: number) => void;
  filterCharacters: (keys: string[]) => void;
  pages: number;
  currentPage: number;
  pageSize: number;
  paginateSimple: (order: "LAST" | "FIRST" | "NEXT" | "PREV") => void;
  //   updateCharacter: () => void;
}
