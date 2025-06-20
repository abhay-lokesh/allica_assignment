import { useBoundStore } from "~/store/base.store";
import HomeWorldContainer from "./HomeWorldContainer";
import Text from "~/components/Text";
import { Fragment } from "react/jsx-runtime";
import { treeTraversal } from "~/utils/common";
import type { CharacterDisplay } from "~/types/character.type";
import TableContainer from "../TableContainer";
import { useCharacterNavigate } from "~/hooks/useCharacterNavigate.hook";
import type { CharacterListContainerProps } from "~/types/container.types";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";

const CharacterListContainer = ({ configs }: CharacterListContainerProps) => {
  const characterList = useBoundStore((state) => state.characters);
  const { onRowClick } = useCharacterNavigate();

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
