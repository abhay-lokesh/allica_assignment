import { useQuery } from "@tanstack/react-query";
import type { QueryContainerProps } from "~/types/container.types";
import { fetchData } from "~/utils";

const QueryContainer = ({
  url,
  LoaderElement,
  keys,
  render,
}: QueryContainerProps) => {
  const { data, status, fetchStatus } = useQuery({
    queryKey: keys,
    queryFn: () => fetchData(url),
    staleTime: 5 * 60 * 1000,
  });
  let isLoading = status === "pending" && fetchStatus === "fetching";
  return isLoading
    ? LoaderElement || <p>Loading...</p>
    : render(data, isLoading);
};

export default QueryContainer;
