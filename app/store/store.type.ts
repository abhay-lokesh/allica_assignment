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
  //   updateCharacter: () => void;
}
