import Button from "~/components/Button";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import { useBoundStore } from "~/store/base.store";

const PaingationContainer = () => {
  const paginateSimple = useBoundStore((state) => state.paginateSimple);
  const currentPage = useBoundStore((state) => state.currentPage);
  const pages = useBoundStore((state) => state.pages);
  return pages > 1 ? (
    <div className="flex items-center gap-1 w-full">
      <Button
        iconConfig={{
          icon: "chevrons-left",
          label: ACCESIBILITY_TEXT.FIRST,
        }}
        className="hidden sm:inline"
        styles={{ variant: "ICON", size: "XS" }}
        state={currentPage === 1 ? "DISABLED" : null}
        onButtonClick={() => paginateSimple("FIRST")}
      />
      <Button
        iconConfig={{
          icon: "chevron-left",
          label: ACCESIBILITY_TEXT.PREV,
        }}
        className="hidden sm:inline"
        styles={{ variant: "ICON", size: "XS" }}
        state={currentPage === 1 ? "DISABLED" : null}
        onButtonClick={() => paginateSimple("PREV")}
      />

      <span className="text-sm">
        {currentPage} of {pages}
      </span>
      <Button
        iconConfig={{
          icon: "chevron-right",
          label: ACCESIBILITY_TEXT.NEXT,
        }}
        className="hidden sm:inline"
        styles={{ variant: "ICON", size: "XS" }}
        state={currentPage === pages ? "DISABLED" : null}
        onButtonClick={() => paginateSimple("NEXT")}
      />
      <Button
        iconConfig={{
          icon: "chevrons-right",
          label: ACCESIBILITY_TEXT.LAST,
        }}
        className="hidden sm:inline"
        state={currentPage === pages ? "DISABLED" : null}
        styles={{ variant: "ICON", size: "XS" }}
        onButtonClick={() => paginateSimple("LAST")}
      />
    </div>
  ) : null;
};

export default PaingationContainer;
