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
  characterData: null,
  pages: 0,
  currentPage: 1,
  pageSize: 0,

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
      const start = state.currentPage !== 1 ? state.currentPage * pageSize : 0;
      return {
        characters: initialData.slice(start, start + pageSize),
        ...modifiedObj,
        characterNames: [...modifiedObj.characterNames],
        // This is done so that if the user lands onto the character page first and then init happens
        characterMap: {
          ...modifiedObj?.characterMap,
          ...(state?.characterMap || {}),
        },
        pageSize,
        pages: Math.floor(total / pageSize),
      };
    }),
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

  updateCharacter: (value: string, param: keyof CharacterDisplay) =>
    set((state) => {
      let characterData = { ...state.characterData };
      let characterMap = { ...state.characterMap };
      const key = characterData?.name?.toLowerCase() as string;
      console.log(
        "UPDATE",
        key,
        value,
        param,
        state.characterMap,
        state.characterMap[key],
        characterData
      );
      if (characterData) {
        characterData = { ...characterData, [param]: value };
        characterMap = { ...characterMap, [key]: characterData };
      }
      return {
        characterMap,
        characterData,
      };
    }),

  clearCharacterData: () =>
    set(() => {
      return { characterData: null };
    }),

  setCharacterData: (data) =>
    set(() => {
      console.log("SETTING", data);
      return { characterData: { ...data } };
    }),
});
