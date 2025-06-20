import { fetchData, reactQueriesExtractor } from "~/utils/httpClient";
import type { Route } from "../+types/root";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import { queryClient } from "~/root";
import { Fragment, useEffect } from "react";
import QueriesContainer from "~/containers/QueriesContainer";
import SectionContainer from "~/containers/SectionContainer";
import Text from "~/components/Text";
import {
  extractCharacterData,
  extractFilmsData,
  extractStarshipData,
} from "~/services/character.service";
import type {
  Character,
  FilmDisplay,
  StarshipDisplay,
} from "~/types/character.type";
import FlexBox from "~/components/FlexBox";
import { arrayCheck, creditsFormatter, nullCheck } from "~/utils/common";
import HomeWorldContainer from "~/containers/BusinessContainers/HomeWorldContainer";
import FavoriteContainer from "~/containers/BusinessContainers/FavoriteContainer";
import BackButton from "~/components/BackButton";
import CharacterUpdate from "~/components/BusinessComponents/CharacterUpdate";
import Combo from "~/components/BusinessComponents/Combo";
import { HTTP_URL } from "~/constants/http.constants";
import { LABEL } from "~/constants/label.constant";
import ErrorContainer from "~/containers/BusinessContainers/ErrorContainer";
import { useBoundStore } from "~/store/base.store";
import type { FetchResponse } from "~/types/http.type";

export async function clientLoader({ params }: Route.LoaderArgs) {
  try {
    const characterNames = useBoundStore.getState().characterNames;
    let res;
    if (params?.id) {
      try {
        const id = Number(params?.id);
        const name = params.id ? characterNames[id - 1] : "";
        const character = useBoundStore.getState().characterMap[name];
        if (!nullCheck(character)) {
          res = Promise.resolve({
            response: character,
            status: "SUCCESS",
          } as FetchResponse<unknown>);
        } else {
          res = queryClient.fetchQuery({
            queryKey: ["people", params.id],
            queryFn: () => fetchData(`${HTTP_URL.PEOPLE_URL}/${params.id}`),
          });
        }
      } catch (error) {
        res = queryClient.fetchQuery({
          queryKey: ["people", params.id],
          queryFn: () => fetchData(`${HTTP_URL.PEOPLE_URL}/${params.id}`),
        });
      }
    }
    return res;
  } catch (error) {
    throw new Response(
      JSON.stringify({
        type: "user_not_found",
        message: `Character with id:${params.id} Not Found`,
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
const Character = () => {
  const { response, status } = useLoaderData();
  const characterData = useBoundStore((state) => state.characterData);
  const clearCharacterData = useBoundStore((state) => state.clearCharacterData);
  const setCharacterData = useBoundStore((state) => state.setCharacterData);

  useEffect(() => {
    if (!nullCheck(response)) {
      const characterData = extractCharacterData(response);
      if (characterData) {
        setCharacterData(characterData);
      }
    }
  }, [response]);
  useEffect(() => {
    () => {
      clearCharacterData();
    };
  }, []);

  return (
    <Fragment>
      {status === "SUCCESS" &&
      !nullCheck(characterData) &&
      characterData &&
      Object.keys(characterData).length > 0 ? (
        <Fragment>
          <SectionContainer>
            <FlexBox responsive="NONE" className="items-center gap-2">
              <BackButton />
              <Text
                className="pb-1 font-extrabold text-5xl"
                variant="HEADER"
                value={characterData?.name || ""}
              />
            </FlexBox>
            <HomeWorldContainer
              prop={"homeworld"}
              value={characterData?.homeworld}
              textAttributes={{
                className: "font-light text-lg sm:text-2xl italic",
                variant: "SUBHEADER",
                prepend: "A Proud resident of ",
              }}
            />
            {characterData?.name ? (
              <FavoriteContainer
                name={characterData.name}
                variant="CONTAINER"
              />
            ) : null}
          </SectionContainer>
          <SectionContainer className="flex sm:flex-row flex-col gap-2 sm:gap-6">
            <SectionContainer className="flex-1/2" header="Physical Attributes">
              <FlexBox className="items-start md:items-center gap-5">
                {characterData?.mass?.toLocaleLowerCase() !== "unknown" ? (
                  <Combo
                    value={characterData?.mass}
                    label={LABEL.WEIGHT}
                    append="Kg"
                  />
                ) : null}
                <Combo
                  value={characterData?.hair_color}
                  label={LABEL.HAIR_COLOR}
                />
                <Combo
                  value={characterData?.eye_color}
                  label={LABEL.EYE_COLOR}
                />
              </FlexBox>
            </SectionContainer>
            <SectionContainer
              className="flex-1/2"
              header="Editable Physical Attributes"
            >
              <FlexBox className="gap-4 mt-2">
                {characterData?.height && characterData?.name ? (
                  <CharacterUpdate
                    append="cm"
                    format="number"
                    label={LABEL.HEIGHT}
                    data={characterData?.height}
                    prop={characterData?.name}
                    param="height"
                  />
                ) : null}
                {characterData?.gender && characterData?.name ? (
                  <CharacterUpdate
                    format="string"
                    label={LABEL.GENDER}
                    data={characterData?.gender}
                    prop={characterData?.name}
                    param="gender"
                  />
                ) : null}
              </FlexBox>
            </SectionContainer>
          </SectionContainer>
          {characterData?.starships && arrayCheck(characterData?.starships) ? (
            <QueriesContainer
              urls={response.starships}
              key="starships"
              render={(response: any) => {
                const starships = reactQueriesExtractor<StarshipDisplay>(
                  response,
                  extractStarshipData
                );
                return (
                  <SectionContainer header={LABEL.STARSHIPS}>
                    <ol>
                      {starships?.map((item, index) => (
                        <li className="flex pb-2">
                          <Text
                            className="text-md sm:text-lg"
                            value={index + 1}
                            append={". "}
                          />
                          <FlexBox
                            usage="STRUCTURED"
                            key={item?.url}
                            orientation="COLUMN"
                          >
                            <Text
                              className="text-md sm:text-lg"
                              value={item?.name}
                            />
                            <FlexBox className="gap-1 sm:gap-2 sm:text-md text-sm">
                              <Text
                                className="italic"
                                value={item?.manufacturer}
                                prepend={LABEL.MANUFACTURED_BY}
                              />
                              <span className="hidden sm:inline">&#9679;</span>
                              <Text
                                className="text-xs sm:text-sm"
                                value={creditsFormatter(
                                  item?.cost_in_credits || ""
                                )}
                              />
                            </FlexBox>
                          </FlexBox>
                        </li>
                      ))}
                    </ol>
                  </SectionContainer>
                );
              }}
            />
          ) : null}
          {characterData?.films && arrayCheck(characterData?.films) ? (
            <QueriesContainer
              urls={response.films}
              key="films"
              render={(response: any) => {
                const films = reactQueriesExtractor<FilmDisplay>(
                  response,
                  extractFilmsData
                );
                return (
                  <SectionContainer header={LABEL.FLIMS}>
                    <ol>
                      {films?.map((item, index) => (
                        <li key={item?.url} className="flex pb-2">
                          <Text
                            className="text-md sm:text-lg"
                            value={index + 1}
                            append={". "}
                          />
                          <FlexBox usage="STRUCTURED" orientation="COLUMN">
                            <Text
                              className="text-md sm:text-lg"
                              value={item?.title}
                            />
                            <Text
                              className="text-xs sm:text-sm italic"
                              prepend={LABEL.DIRECTOR}
                              value={item?.director}
                            />
                          </FlexBox>
                        </li>
                      ))}
                    </ol>
                  </SectionContainer>
                );
              }}
            />
          ) : null}
        </Fragment>
      ) : null}
      {status === "ERROR"}
    </Fragment>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let errorData: any = {};

    try {
      errorData = JSON.parse(error.data);
    } catch {
      errorData = { message: error.data };
    }
    return <ErrorContainer error={errorData?.message} />;
  }
}

export default Character;
