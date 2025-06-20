import Cell from "~/components/Cell";
import type { TableContainerProps } from "~/types/container.types";
import { arrayCheck } from "~/utils";
const tableVariant = {
  STICKY: {
    table: "mt-4 min-w-xs border-collapse table-fixed overflow-x-auto",
    header:
      "first:left-0 first:rounded-tl-lg last:rounded-tr-lg first:z-10 first:sticky first:min-w-48  border-md font-bold capitalize text-white first:min-w-max first:text-truncate first:max-w-max first:w-6/12",
    cell: "first:left-0 first:group-hover:bg-orange-50 first:z-10 first:sticky first:bg-white",
  },
  NORMAL: { table: "", header: "", cell: "" },
};
const TableContainer = ({
  data,
  description,
  cellRender,
  onRowClick,
  cellConfigs = [],
  variant = "STICKY",
}: TableContainerProps) => {
  const classes = tableVariant[variant];
  const headers = arrayCheck(cellConfigs)
    ? cellConfigs?.map((value) => {
        return { header: value?.header, hideMobile: value?.hideMobile };
      })
    : [];
  return data && arrayCheck(data) ? (
    <div className="overflow-x-auto">
      <table className={`w-full ${classes.table}`}>
        {description ? (
          <caption className="hidden sm:invisible text-xs">
            {description}
          </caption>
        ) : null}
        <thead>
          <tr className="bg-linear-to-r from-orange-600 to-orange-500 shadow-sm">
            {headers?.map((obj) => (
              <Cell
                variant="HEADER"
                cellData={obj.header}
                config={{}}
                key={obj.header}
                className={`px-2 py-2 text-left text-sm md:text-base  whitespace-nowrap ${
                  classes.header
                } ${obj.hideMobile ? "hidden sm:table-cell" : ""}`}
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
                  variant={cIndex === 0 ? "ROW_HEADER" : "COLUMN"}
                  className={`px-2 py-1 text-left whitespace-nowrap text-sm md:text-base md:py-2 ${
                    classes.cell
                  } ${config?.hideMobile ? "hidden sm:table-cell" : ""}`}
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
