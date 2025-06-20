import { useQuery } from "@tanstack/react-query";
import Loader from "~/components/Loader";
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
    ? LoaderElement || <Loader variant="SINGLE" />
    : render(data, isLoading);
};

export default QueryContainer;
