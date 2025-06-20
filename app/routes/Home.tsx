import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useSearchParams,
} from "react-router";
import { fetchData } from "~/utils";
import { useBoundStore } from "~/store/base.store";
import { Fragment, useEffect } from "react";
import CharacterListContainer from "~/containers/BusinessContainers/CharacterListContainer";
import PageContainer from "~/containers/PageContainer";
import PaingationContainer from "~/containers/PaingationContainer";
import SearchContainer from "~/containers/SearchContainer";
import ErrorContainer from "~/containers/BusinessContainers/ErrorContainer";
import { HTTP_URL } from "~/constants/http.constants";
import type { CellConfig } from "~/types/container.types";
import type { Route } from "./+types/Home";
const CELL_CONFIGS: CellConfig[] = [
  { key: "name", type: "sync", format: "string", header: "name" },
  { key: "gender", type: "sync", format: "string", header: "gender" },
  { key: "homeworld", type: "query_async", format: "string", header: "home" },
];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Star Wars - May the force be with you" },
    {
      name: "description",
      content: "Listing for all the star wars characters",
    },
  ];
}
export async function clientLoader({}: Route.LoaderArgs) {
  try {
    const res = await fetchData(HTTP_URL.PEOPLE_URL);
    return res;
  } catch (error) {
    throw new Response(
      JSON.stringify({
        type: "api_down",
        message: `Starship is down.`,
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default function Home() {
  const { response, status } = useLoaderData();
  const [searchParams] = useSearchParams();

  const initData = useBoundStore((state) => state.initData);

  useEffect(() => {
    if (response && !(searchParams && searchParams.get("query"))) {
      initData(response, 10);
    }
  }, [response]);

  return (
    <>
      {status === "SUCCESS" ? (
        <Fragment>
          <SearchContainer />
          <PageContainer>
            {!(searchParams && searchParams.get("query")) ? (
              <PaingationContainer />
            ) : null}
            <CharacterListContainer configs={CELL_CONFIGS} />
          </PageContainer>
        </Fragment>
      ) : null}
    </>
  );
}
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
