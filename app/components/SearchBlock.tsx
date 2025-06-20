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
    <FlexBox
      responsive="NONE"
      className="justify-center items-center gap-2 bg-zinc-400/25 px-4 py-2 rounded-md"
    >
      <Input
        placeholder={"Search for a character by typing and clicking on enter"}
        value={value}
        aria-label="Search for a character by typing and clicking on enter"
        defaultValue={query || ""}
        onEnter={submitQuery}
        onValueChange={onSearchQuery}
        onFocus={onSearchFocus}
        className={
          "bg-zinc-50 px-4 py-1 sm:py-2 min-w-7/12 sm:min-w-md md:min-w-2xl lg:min-w-4xl border-2 border-zinc-400 transition-all rounded-xl outline-none focus:border-orange-400 focus-within:border-orange-400 focus-visible:border-orange-400"
        }
      />
      <Button
        iconConfig={{ icon: "eraser", label: ACCESIBILITY_TEXT.CLEAR_INPUT }}
        state={!value ? "DISABLED" : null}
        styles={{ variant: "ICON", size: "XS" }}
        className={value || query ? "text-orange-600" : "text-slate-500"}
        onButtonClick={() => clearInput()}
        iconWidth="NORMAL"
      />
      {query ? (
        <Button
          iconConfig={{
            icon: "x",
            label: ACCESIBILITY_TEXT.CLEAR_SEARCH,
          }}
          state={(value && !query) || (!value && !query) ? "DISABLED" : null}
          styles={{ variant: "ICON", size: "XS" }}
          className={query ? "text-orange-600" : "text-slate-500"}
          onButtonClick={handleClearSearch}
          iconWidth="NORMAL"
        />
      ) : null}
    </FlexBox>
  );
};

export default SearchBlock;
