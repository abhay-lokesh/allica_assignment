import type { ComponentProps, ReactElement } from "react";

export interface SectionContainerProps extends ComponentProps<"section"> {
  header?: string;
}

export type CellConfig = {
  key: string;
  type: "sync" | "async" | "quer_async" | "parent_fn";
  format: "string" | "number" | "date" | "currency";
  header: string;
};
export interface TableContainerProps<DataType> extends ComponentProps<"table"> {
  data: DataType;
  description: string;
  cellRender: (args: any) => ReactElement;
  cellConfigs: CellConfig[];
  onRowClick: (arg: CellConfig) => void;
  variant: "STICKY" | "NORMAL";
}

export interface QueryContainerProps {
  url: string;
  LoaderElement: ReactElement;
  keys: string[];
  render: (data: any, isLoading: boolean) => ReactElement;
}
export interface QueriesContainerProps {
  urls: string[];
  key: string;
  render: (data: any, isLoading: boolean) => ReactElement;
  LoaderElement: ReactElement;
}
