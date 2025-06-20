import type { StateCreator } from "zustand";
import type { CharacterDisplay } from "~/types/character.type";
import { arrayCheck, nullCheck } from "~/utils";
import type { CharacterSlice, FavoriteSlice } from "./store.type";

const listCreator = (
  list: string[],
  map: { [key: string]: CharacterDisplay }
) => {
  let arr: CharacterDisplay[] = [];
  list.forEach((name) => {
    if (name && map[name]) {
      arr.push(map[name]);
    }
  });
  return arr;
};

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
  currentPage: 0,
  pageSize: 0,

  initData: (initialData: CharacterDisplay[], pageSize = 10) =>
    set((state) => {
      let total = 0;
      const start = state.currentPage !== 1 ? state.currentPage * pageSize : 0;
      const last = start + pageSize;
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
      let page = 0;
      if (order === "LAST") {
        page = state.pages;
      } else if (order === "NEXT") {
        page =
          state.currentPage > state.pages ? state.pages : state.currentPage + 1;
      } else if (order === "PREV") {
        page = state.currentPage > 0 ? state.currentPage - 1 : 0;
      }

      return {
        currentPage: page,
      };
    }),
  filterCharacters: (keys: string[]) =>
    set(() => {
      return {
        characters: arrayCheck(keys) ? [...keys] : [],
      };
    }),

  updateCharacter: (value: string, param: keyof CharacterDisplay) =>
    set((state) => {
      let characterData = { ...state.characterData };
      let characterMap = { ...state.characterMap };
      const key = characterData?.name?.toLowerCase() as string;
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
      return { characterData: { ...data } };
    }),
});
