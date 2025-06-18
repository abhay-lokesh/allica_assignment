import type { StateCreator } from "zustand";
import type { CharacterDisplay } from "~/types/character.type";
import { nullCheck } from "~/utils";
import type { CharacterSlice, FavoriteSlice } from "./store.type";

export const createCharacterSlice: StateCreator<
  FavoriteSlice & CharacterSlice,
  [],
  [],
  CharacterSlice
> = (set) => ({
  characters: [],
  characterMap: {},
  characterNames: [],
  initData: (initialData: CharacterDisplay[], pageSize = 10) =>
    set(() => {
      console.log("INITIAL DATA", initialData);
      const modifiedObj = initialData.reduce(
        (acc, character) => {
          const { name } = character;
          if (!nullCheck(name) && name) {
            acc.characterMap[name] = character;
            acc.characterNames.push(name);
          }
          return acc;
        },
        {
          characterMap: {} as { [key: string]: CharacterDisplay },
          characterNames: [] as string[],
        }
      );
      console.log("MODIFIED", modifiedObj);
      return {
        characters: initialData.slice(0, pageSize),
        ...modifiedObj,
      };
    }),
  paginateData: (page: number, pageSize = 10) =>
    set((state) => {
      /**
       * This line ensures that we are maintaining the order
       */
      console.log("CHECKING", state.characterNames);
      const start = page * pageSize;
      const names = state.characterNames.slice(start, start + pageSize);
      let paginatedCharacters: CharacterDisplay[] = [];
      names.forEach((name) => {
        paginatedCharacters.push(state.characterMap[name]);
      });
      return {
        characters: [...paginatedCharacters],
      };
    }),

  //   updateCharacter: () => set(),
});
