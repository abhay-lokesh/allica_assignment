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
  pages: 0,
  currentPage: 0,
  pageSize: 0,
  paginateSimple: (order) =>
    set((state) => {
      let page = 0;
      if (order === "LAST") {
        page = state.pages;
      } else if (order === "NEXT") {
        page =
          state.currentPage + 1 > state.pages
            ? state.pages
            : state.currentPage + 1;
      } else if (order === "PREV") {
        page = state.currentPage > 0 ? state.currentPage - 1 : 0;
      }
      const start = page ? page * state.pageSize : page;
      const names = state.characterNames.slice(start, start + state.pageSize);
      let paginatedCharacters: CharacterDisplay[] = [];
      names.forEach((name) => {
        paginatedCharacters.push(state.characterMap[name]);
      });
      console.log(state, order);
      return {
        characters: [...paginatedCharacters],
        currentPage: page,
      };
    }),
  initData: (initialData: CharacterDisplay[], pageSize = 10) =>
    set(() => {
      console.log("INITIAL DATA", initialData);
      let total = 0;
      const modifiedObj = initialData.reduce(
        (acc, character) => {
          const { name } = character;
          if (!nullCheck(name) && name) {
            const caseName = name?.toLowerCase();
            acc.characterMap[caseName] = character;
            acc.characterNames.push(caseName);
            total++;
          }
          return acc;
        },
        {
          characterMap: {} as { [key: string]: CharacterDisplay },
          characterNames: [] as string[],
        }
      );
      return {
        characters: initialData.slice(0, pageSize),
        ...modifiedObj,
        pageSize,
        pages: Math.floor(total / pageSize),
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
  filterCharacters: (keys: string[]) =>
    set((state) => {
      /**
       * This line ensures that we are maintaining the order
       */
      const names = keys;
      let filteredCharacters: CharacterDisplay[] = [];
      names.forEach((name) => {
        if (!nullCheck(name) && name) {
          const caseName = name?.toLowerCase();
          filteredCharacters.push(state.characterMap[caseName]);
        }
      });
      return {
        characters: [...filteredCharacters],
      };
    }),

  //   updateCharacter: () => set(),
});
