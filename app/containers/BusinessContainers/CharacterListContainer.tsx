import { useBoundStore } from "~/store/base.store";
import HomeWorldContainer from "./HomeWorldContainer";
import Text from "~/components/Text";
import { Fragment } from "react/jsx-runtime";
import { arrayCheck, treeTraversal } from "~/utils/common";
import type { CharacterDisplay } from "~/types/character.type";
import TableContainer from "../TableContainer";
import { useCharacterNavigate } from "~/hooks/useCharacterNavigate.hook";
import type { CharacterListContainerProps } from "~/types/container.types";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import { useEffect, useState } from "react";

const CharacterListContainer = ({ configs }: CharacterListContainerProps) => {
  const currentPage = useBoundStore((state) => state.currentPage);
  const pageSize = useBoundStore((state) => state.pageSize);

  const characterNames = useBoundStore((state) => state.characterNames);
  const characterMap = useBoundStore((state) => state.characterMap);
  const characters = useBoundStore((state) => state.characters);

  const { onRowClick } = useCharacterNavigate();
  const [characterList, setCharacterList] = useState<CharacterDisplay[]>([]);

  useEffect(() => {
    let names: string[] = [];
    if (arrayCheck(characters)) {
      names = characters;
    } else if (
      arrayCheck(characterNames) &&
      !(currentPage * pageSize > characterNames.length)
    ) {
      const start = currentPage * pageSize;
      names = characterNames.slice(start, start + pageSize);
    }
    if (characterMap) {
      const list = names.map((name) => characterMap[name]);
      setCharacterList(list);
    }
  }, [currentPage, characterNames, characters, characterMap]);

  return characterList ? (
    <TableContainer
      description={ACCESIBILITY_TEXT.CHARACTER_TABLE_DESCRIPTION}
      onRowClick={onRowClick}
      cellConfigs={configs}
      data={characterList}
      cellRender={(data: CharacterDisplay, config: any) => {
        const { key } = config || {};
        const value = treeTraversal(data, key);

        return value ? (
          <Fragment>
            {key === "homeworld" ? (
              <HomeWorldContainer prop={key} value={value} />
            ) : (
              <Text value={value} />
            )}
          </Fragment>
        ) : null;
      }}
    />
  ) : null;
};

export default CharacterListContainer;
