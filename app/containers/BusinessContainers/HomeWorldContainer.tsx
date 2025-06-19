import { apiDataExtractor } from "~/utils/httpClient";
import QueryContainer from "../QueryContainer";
import type { HomeWorldDisplay } from "~/types/character.type";
import { extractHomeWorld } from "~/services/character.service";
import Text from "~/components/Text";
import type { TextProps } from "~/types/common.type";

interface HomeWorldContainerProps {
  prop: string;
  value?: string;
  textAttributes?: TextProps;
}

const HomeWorldContainer = ({
  prop,
  value,
  textAttributes = {},
}: HomeWorldContainerProps) => {
  return value ? (
    <QueryContainer
      url={value}
      keys={[prop, value]}
      render={(data) => {
        const homeworld = apiDataExtractor<HomeWorldDisplay>(
          data,
          extractHomeWorld
        );
        return homeworld ? (
          <Text {...textAttributes} value={homeworld?.name || ""} />
        ) : null;
      }}
    />
  ) : null;
};

export default HomeWorldContainer;
