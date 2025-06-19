import type { ComponentProps, ReactElement } from "react";

export interface SectionContainerProps extends ComponentProps<"section"> {
  header?: string;
  variant?: "SECTION" | "PAGE";
}

export type CellConfig = {
  key: string;
  type: "sync" | "async" | "query_async" | "button";
  format: "string" | "number" | "date" | "currency";
  header: string;
};
export interface TableContainerProps<DataType> extends ComponentProps<"table"> {
  data: DataType;
  description: string;
  cellRender: (args: any) => ReactElement;
  cellConfigs: CellConfig[];
  onRowClick: (arg: DataType) => void;
  variant: "STICKY" | "NORMAL";
}

export interface QueryContainerProps {
  url: string;
  keys: string[];
  LoaderElement?: ReactElement;
  render: (data: any, isLoading: boolean) => ReactElement;
}
export interface QueriesContainerProps {
  urls: string[];
  key: string;
  LoaderElement?: ReactElement;
  render: (data: any, isLoading: boolean) => ReactElement;
}
