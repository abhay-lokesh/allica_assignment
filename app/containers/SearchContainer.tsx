import SectionContainer from "./SectionContainer";
import { useBoundStore } from "~/store/base.store";
import { searchService } from "~/services/search.service";
import { useEffect, useState } from "react";
import { arrayCheck } from "~/utils";
import { useCharacterNavigate } from "~/hooks/useCharacterNavigate.hook";
import { useSearchParams } from "react-router";
import SearchBlock from "~/components/SearchBlock";
import AutoSuggestContainer from "./AutoSuggestContainer";
import { LABEL } from "~/constants/label.constant";

const SearchContainer = () => {
  const { onRowClick } = useCharacterNavigate();

  const { characterMap } = useBoundStore();
  const characterNames = useBoundStore((state) => state.characterNames);
  const filterCharacters = useBoundStore((state) => state.filterCharacters);

  const [autoSuggestions, setAutoSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<
    "HIDE" | "SHOW" | "EMPTY"
  >("HIDE");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (arrayCheck(characterNames)) {
      searchService.initTrie(characterNames);
    }
  }, [characterNames]);

  const onSearch = (value: string) => {
    if (value) {
      setShowSuggestions("HIDE");
      const keys = searchService.searchKeyword(value);
      if (arrayCheck(keys)) {
        filterCharacters(keys);
        setSearchParams({ query: value });
      } else {
        setShowSuggestions("EMPTY");
      }
    }
  };

  const onSingleSearch = (key: string) => {
    const character = characterMap[key];
    onRowClick(character);
    setShowSuggestions("HIDE");
  };

  const toggleAutoSuggestion = (state: "FOCUS" | "BLUR") => {
    setShowSuggestions(state === "FOCUS" ? "SHOW" : "HIDE");
  };

  const onAutoSuggest = (value: string) => {
    let keys: string[] = [];
    if (value) {
      keys = searchService.searchKeyword(value);
    }
    let status: "HIDE" | "SHOW" | "EMPTY" = "HIDE";
    if (![null, undefined, ""].includes(value)) {
      status = arrayCheck(keys) ? "SHOW" : "EMPTY";
    }
    setShowSuggestions(status);
    setAutoSuggestions(keys);
  };

  const clearSearch = () => {
    if (searchParams.get("query")) {
      filterCharacters([]);
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <SectionContainer className="flex justify-center bg-orange-100 px-4 pt-4 w-full h-[20vh] sm:h-[25vh]">
      <div className="absolute">
        <SearchBlock
          query={searchParams.get("query") || ""}
          onSearch={onSearch}
          clearSearch={clearSearch}
          onAutoSuggest={onAutoSuggest}
          toggleAutoSuggestion={toggleAutoSuggestion}
        />
        {!arrayCheck(autoSuggestions) && showSuggestions === "EMPTY" ? (
          <p
            className="font-medium text-sm"
            aria-label={LABEL.NO_SEARCH_RESULTS}
          >
            {LABEL.NO_SEARCH_RESULTS}
          </p>
        ) : null}
        <AutoSuggestContainer
          autoSuggestions={autoSuggestions}
          showSuggestions={showSuggestions === "SHOW"}
          onSingleSearch={onSingleSearch}
        />
      </div>
    </SectionContainer>
  );
};

export default SearchContainer;
