import type { CellProps } from "~/types/common.type";

const Cell = ({ cellData, variant, render, config, className }: CellProps) => {
  return variant && ["HEADER", "ROW_HEADER"].includes(variant) ? (
    <th
      className={`${className} ${
        variant === "ROW_HEADER" ? "font-medium" : ""
      }`}
      scope={`${variant === "HEADER" ? "col" : "row"}`}
    >
      {render ? render(cellData, config) : cellData}
    </th>
  ) : (
    <td className={className}>
      {render ? render(cellData, config) : cellData}
    </td>
  );
};

export default Cell;
