import Cell from "~/components/Cell";
import type { TableContainerProps } from "~/types/container.types";
import { arrayCheck } from "~/utils";
const tableVariant = {
  STICKY: {
    table: "mt-4 min-w-xs border-collapse table-fixed overflow-x-auto",
    header:
      "first:left-0 first:rounded-tl-lg last:rounded-tr-lg first:z-10 first:sticky first:min-w-48  border-md font-bold capitalize text-white first:min-w-max first:text-truncate first:max-w-max first:w-7/12",
    cell: "first:left-0 first:group-hover:bg-orange-50 first:z-10 first:sticky first:bg-white",
  },
  NORMAL: { table: "", header: "", cell: "" },
};
const TableContainer = <DataType extends any[]>({
  data,
  description,
  cellRender,
  cellConfigs,
  onRowClick,
  variant = "STICKY",
}: TableContainerProps<DataType>) => {
  const classes = tableVariant[variant];
  const headers = cellConfigs.map((value) => value?.header);
  return data && arrayCheck(data) ? (
    <div className="overflow-x-auto">
      <table className={`w-full ${classes.table}`}>
        {description ? <caption>{description}</caption> : null}
        <thead>
          <tr className="bg-linear-to-r from-orange-600 to-orange-500 shadow-sm">
            {headers?.map((header) => (
              <Cell
                variant={"HEADER"}
                cellData={header}
                key={header}
                className={`px-2 py-2 text-left text-sm md:text-base  whitespace-nowrap ${classes.header}`}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((cellData, index) => (
            <tr
              className="group hover:bg-orange-50 border-orange-100 border-b-2 last:border-b-0 hover:cursor-pointer"
              onClick={() => onRowClick(cellData)}
              key={index}
            >
              {cellConfigs?.map((config, cIndex) => (
                <Cell
                  cellData={cellData}
                  className={`px-2 py-1 text-left whitespace-nowrap text-sm md:text-base md:py-2 ${classes.cell}`}
                  key={`${index}_${cIndex}`}
                  config={config}
                  render={cellRender}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default TableContainer;
