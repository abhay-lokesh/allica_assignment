import { useState } from "react";
import Input from "./Input";
import FlexBox from "./FlexBox";
import Button from "./Button";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import type { SearchBlockProps } from "~/types/common.type";

const SearchBlock = ({
  query,
  toggleAutoSuggestion,
  onSearch,
  onAutoSuggest,
  clearSearch,
}: SearchBlockProps) => {
  const [value, setValue] = useState(query || "");

  const onSearchQuery = (val: string) => {
    setValue(val);
    onAutoSuggest(val);
  };

  const submitQuery = () => {
    if (value) {
      onSearch(value);
    }
  };

  const onSearchFocus = () => {
    toggleAutoSuggestion("FOCUS");
  };

  const clearInput = () => {
    setValue("");
    onAutoSuggest("");
  };

  const handleClearSearch = () => {
    clearInput();
    clearSearch();
  };

  return (
    <FlexBox className="justify-center items-center gap-2">
      <Input
        placeholder={"Search for a character by typing and clicking on enter"}
        value={value}
        aria-label="Search for a character by typing and clicking on enter"
        defaultValue={query || ""}
        onEnter={submitQuery}
        onValueChange={onSearchQuery}
        onFocus={onSearchFocus}
        className={
          "bg-orange-50 px-4 py-1 sm:py-2 min-w-full sm:min-w-3xl border-2 border-orange-200 transition-all rounded-full outline-none focus:border-orange-300 focus-within:border-orange-300 focus-visible:border-orange-300"
        }
      />
      <Button
        iconConfig={{ icon: "eraser", label: ACCESIBILITY_TEXT.CLEAR_INPUT }}
        state={!value ? "DISABLED" : null}
        styles={{ variant: "ICON", size: "XS" }}
        className={value || query ? "text-orange-600" : "text-slate-500"}
        onButtonClick={() => clearInput()}
        iconWidth="BOLD"
      />
      <Button
        iconConfig={{
          icon: "circle-x",
          label: ACCESIBILITY_TEXT.CLEAR_SEARCH,
        }}
        state={(value && !query) || (!value && !query) ? "DISABLED" : null}
        styles={{ variant: "ICON", size: "XS" }}
        className={query ? "text-orange-600" : "text-slate-500"}
        onButtonClick={handleClearSearch}
        iconWidth="BOLD"
      />
    </FlexBox>
  );
};

export default SearchBlock;
