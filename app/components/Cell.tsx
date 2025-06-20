import type { CellProps } from "~/types/common.type";
import { nullCheck } from "~/utils";

const Cell = ({ cellData, variant, render, config, className }: CellProps) => {
  let modifiedCellData = "";
  if (typeof cellData === "boolean") {
    modifiedCellData = `${cellData}`;
  } else if (
    !nullCheck(cellData) &&
    !["object", "function"].includes(typeof cellData)
  ) {
    modifiedCellData = cellData;
  }
  return variant && ["HEADER", "ROW_HEADER"].includes(variant) ? (
    <th
      className={`${className} ${
        variant === "ROW_HEADER" ? "font-medium" : ""
      }`}
      scope={`${variant === "HEADER" ? "col" : "row"}`}
    >
      {render ? render(cellData, config) : modifiedCellData}
    </th>
  ) : (
    <td className={className}>
      {render ? render(cellData, config) : modifiedCellData}
    </td>
  );
};

export default Cell;
