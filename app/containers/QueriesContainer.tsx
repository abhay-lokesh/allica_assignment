import { useQueries } from "@tanstack/react-query";
import type { QueriesContainerProps } from "~/types/container.types";
import { fetchData } from "~/utils";

const QueriesContainer = ({
  urls,
  key,
  render,
  LoaderElement,
}: QueriesContainerProps) => {
  const results = useQueries({
    queries: urls.map((url: string) => {
      return {
        queryKey: [key, url],
        queryFn: () => fetchData(url),
        staleTime: 5 * 60 * 1000,
      };
    }),
  });

  let isLoading = results.some(
    (result) => result.status === "pending" && result.fetchStatus === "fetching"
  );

  return isLoading
    ? LoaderElement || <p>Loading...</p>
    : render(results, isLoading);
};

export default QueriesContainer;
