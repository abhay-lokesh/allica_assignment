import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import type { AutoSuggestContainerProps } from "~/types/container.types";
import { arrayCheck } from "~/utils";

const AutoSuggestContainer = ({
  autoSuggestions,
  showSuggestions,
  onSingleSearch,
}: AutoSuggestContainerProps) => {
  return arrayCheck(autoSuggestions) && showSuggestions ? (
    <ol
      role="list"
      aria-expanded="true"
      aria-label={ACCESIBILITY_TEXT.AUTOSUGGEST}
      className="z-40 relative flex flex-col gap-2 bg-orange-50 shadow-xl mt-2 p-2 rounded-b-md max-h-32 overflow-y-auto"
    >
      {autoSuggestions.map((key) => (
        <li
          role="listitem"
          tabIndex={0}
          aria-label={`${ACCESIBILITY_TEXT.AUTOSUGGEST_ITEM} ${key}`}
          className="hover:bg-orange-100 px-2 py-1 cursor-pointer"
          onClick={() => onSingleSearch(key)}
        >
          {key}
        </li>
      ))}
    </ol>
  ) : null;
};

export default AutoSuggestContainer;
