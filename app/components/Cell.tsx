import type { CellProps } from "~/types/common.type";

const Cell = ({ cellData, variant, render, config, className }: CellProps) => {
  return variant === "HEADER" || "ROW_HEADER" ? (
    <th
      className={className}
      scope={`${variant === "HEADER" ? "col" : null} ${
        variant === "ROW_HEADER" ? "row" : null
      }`}
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
