const Cell = ({ cellData, variant, render, config, className }: any) => {
  return variant === "HEADER" ? (
    <th className={className}>
      {render ? render(cellData, config) : cellData}
    </th>
  ) : (
    <td className={className}>
      {render ? render(cellData, config) : cellData}
    </td>
  );
};

export default Cell;
