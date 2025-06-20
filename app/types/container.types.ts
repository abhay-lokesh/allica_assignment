import type { ComponentProps, ReactElement } from "react";
import type { CellRender } from "./common.type";

type QueryRender = (data: any, isLoading: boolean) => ReactElement | null;
export interface SectionContainerProps extends ComponentProps<"section"> {
  header?: string;
  variant?: "SECTION" | "PAGE";
}

export type CellConfig = {
  key: string;
  type: "sync" | "async" | "query_async" | "button";
  format: "string" | "number" | "date" | "currency";
  header: string;
  hideMobile?: boolean;
};
export interface TableContainerProps extends ComponentProps<"table"> {
  data: any[];
  cellRender: CellRender;
  cellConfigs: CellConfig[];
  onRowClick: (arg: any) => void;
  description?: string;
  variant?: "STICKY" | "NORMAL";
}

export interface QueryContainerProps {
  url: string;
  keys: string[];
  LoaderElement?: ReactElement;
  render: QueryRender;
}
export interface QueriesContainerProps {
  urls: string[];
  key: string;
  LoaderElement?: ReactElement;
  render: QueryRender;
}

export interface AutoSuggestContainerProps {
  autoSuggestions: string[];
  showSuggestions: boolean;
  onSingleSearch: (arg: string) => void;
}

export interface CharacterListContainerProps {
  configs: CellConfig[];
}
