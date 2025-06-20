import { HeartCrack } from "lucide-react";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import FlexBox from "~/components/FlexBox";
import Text from "~/components/Text";
import FavoriteContainer from "~/containers/BusinessContainers/FavoriteContainer";
import HomeWorldContainer from "~/containers/BusinessContainers/HomeWorldContainer";
import SectionContainer from "~/containers/SectionContainer";
import TableContainer from "~/containers/TableContainer";
import { useCharacterNavigate } from "~/hooks/useCharacterNavigate.hook";
import { useBoundStore } from "~/store/base.store";
import type { CharacterDisplay } from "~/types/character.type";
import type { CellConfig } from "~/types/container.types";
import { arrayCheck, treeTraversal } from "~/utils/common";
const CELL_CONFIGS: CellConfig[] = [
  { key: "name", type: "sync", format: "string", header: "name" },
  {
    key: "gender",
    type: "sync",
    format: "string",
    header: "gender",
    hideMobile: true,
  },
  {
    key: "height",
    type: "sync",
    format: "string",
    header: "height",
  },
  {
    key: "homeworld",
    type: "query_async",
    format: "string",
    header: "home",
    hideMobile: true,
  },
  {
    key: "name",
    type: "button",
    format: "string",
    header: "favorite",
  },
];
const Favorites = () => {
  const { characterMap } = useBoundStore();
  const favorites = useBoundStore((state) => state.favorites);
  const { onRowClick } = useCharacterNavigate();

  return arrayCheck(favorites) ? (
    <SectionContainer header="Favorites" variant="PAGE">
      <TableContainer
        cellConfigs={CELL_CONFIGS}
        onRowClick={onRowClick}
        data={favorites?.map((val) => characterMap[val?.toLowerCase()])}
        cellRender={(data: CharacterDisplay, config: any) => {
          const { key, type } = config || {};
          const value = treeTraversal(data, key);
          return value ? (
            <Fragment>
              {type === "query_async" && key === "homeworld" ? (
                <HomeWorldContainer prop={key} value={value} />
              ) : null}
              {type === "sync" ? <Text value={value} /> : null}
              {type === "button" ? (
                <Fragment>
                  <FavoriteContainer name={value} />
                </Fragment>
              ) : null}
            </Fragment>
          ) : null;
        }}
      />
    </SectionContainer>
  ) : (
    <Fragment>
      <FlexBox
        orientation="COLUMN"
        className="justify-center items-center h-dvh"
      >
        <HeartCrack />
        <FlexBox orientation="COLUMN" className="justify-center items-center">
          <p>Oops there are no favorites.</p>
          <Link to="/">Start favoriting</Link>
        </FlexBox>
      </FlexBox>
    </Fragment>
  );
};

export default Favorites;
