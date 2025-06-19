import Button from "~/components/Button";
import { useBoundStore } from "~/store/base.store";

const PaingationContainer = () => {
  const paginateSimple = useBoundStore((state) => state.paginateSimple);
  const currentPage = useBoundStore((state) => state.currentPage);
  const pages = useBoundStore((state) => state.pages);
  return pages > 1 ? (
    <div className="flex items-end gap-1 w-full">
      <Button
        text="First"
        className="hidden sm:inline"
        styles={{ variant: "GHOST", size: "SM" }}
        state={currentPage === 0 ? "DISABLED" : null}
        onButtonClick={() => paginateSimple("FIRST")}
      />
      <Button
        text="Prev"
        styles={{ variant: "GHOST", size: "SM" }}
        onButtonClick={() => paginateSimple("PREV")}
        state={currentPage === 0 ? "DISABLED" : null}
      />
      <Button
        text="Next"
        styles={{ variant: "GHOST", size: "SM" }}
        state={currentPage === pages ? "DISABLED" : null}
        onButtonClick={() => paginateSimple("NEXT")}
      />
      <Button
        text="Last"
        styles={{ variant: "GHOST", size: "SM" }}
        className="hidden sm:inline"
        state={currentPage === pages ? "DISABLED" : null}
        onButtonClick={() => paginateSimple("LAST")}
      />
    </div>
  ) : null;
};

export default PaingationContainer;
