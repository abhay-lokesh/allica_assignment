import type { StateCreator } from "zustand";
import type { FavoriteSlice, CharacterSlice } from "./store.type";

export const createCharacterSlice: StateCreator<
  FavoriteSlice & CharacterSlice,
  [],
  [],
  CharacterSlice
> = (set) => ({ recentSearches: [] });
