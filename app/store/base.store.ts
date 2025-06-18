import { create } from "zustand";
import { createCharacterSlice } from "./character.store";
import { createFavoriteSlice } from "./favorite.store";
import type { CharacterSlice, FavoriteSlice } from "./store.type";

export const useBoundStore = create<FavoriteSlice & CharacterSlice>()(
  (...a) => ({
    ...createFavoriteSlice(...a),
    ...createCharacterSlice(...a),
  })
);
