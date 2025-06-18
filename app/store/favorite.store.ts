import type { StateCreator } from "zustand";
import type { FavoriteSlice, CharacterSlice } from "./store.type";

export const createFavoriteSlice: StateCreator<
  FavoriteSlice & CharacterSlice,
  [],
  [],
  FavoriteSlice
> = (set) => ({
  favorites: [],
  addRemoveFavorite: (key) =>
    set((state) => {
      console.log("ToggleFavorite", state?.favorites, key);
      let modifiedFavorites = state?.favorites ? [...state.favorites] : [];
      if (state.favorites.includes(key)) {
        modifiedFavorites = modifiedFavorites.filter((item) => item !== key);
      } else {
        modifiedFavorites = modifiedFavorites.concat(key);
      }
      return { favorites: [...modifiedFavorites] };
    }),
});
