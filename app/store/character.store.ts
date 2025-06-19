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
  currentPage: 1,
  pageSize: 0,
  paginateSimple: (order) =>
    set((state) => {
      let page = 1;
      if (order === "LAST") {
        page = state.pages;
      } else if (order === "NEXT") {
        page =
          state.currentPage >= state.pages
            ? state.pages
            : state.currentPage + 1;
      } else if (order === "PREV") {
        page = state.currentPage > 1 ? state.currentPage - 1 : 1;
      }
      const start = page === 1 ? page - 1 : page * state.pageSize;
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
    set((state) => {
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
      console.log(state.currentPage, state.currentPage + pageSize);
      const start = state.currentPage !== 1 ? state.currentPage * pageSize : 0;
      return {
        characters: initialData.slice(start, start + pageSize),
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

  updateCharacter: (
    value: string,
    key: string,
    param: keyof CharacterDisplay
  ) =>
    set((state) => {
      let characterMap = { ...state.characterMap };
      if (characterMap[key]) {
        const character = { ...characterMap[key], [param]: value };
        characterMap = { ...characterMap, [key]: character };
      }
      return {
        characterMap: { ...characterMap },
      };
    }),
});
