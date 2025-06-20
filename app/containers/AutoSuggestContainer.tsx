import { useEffect, useRef, useState } from "react";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import type { AutoSuggestContainerProps } from "~/types/container.types";
import { arrayCheck } from "~/utils";

const AutoSuggestContainer = ({
  autoSuggestions,
  showSuggestions,
  onSingleSearch,
}: AutoSuggestContainerProps) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Reset focused index when suggestions change
  useEffect(() => {
    setFocusedIndex(-1);
    itemRefs.current = [];
  }, [autoSuggestions]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions || !arrayCheck(autoSuggestions)) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev: number) => {
            const newIndex = prev < autoSuggestions.length - 1 ? prev + 1 : 0;
            // Scroll item into view
            setTimeout(() => {
              itemRefs.current[newIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
              });
            }, 0);
            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev: number) => {
            const newIndex = prev > 0 ? prev - 1 : autoSuggestions.length - 1;
            // Scroll item into view
            setTimeout(() => {
              itemRefs.current[newIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
              });
            }, 0);
            return newIndex;
          });
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) {
            onSingleSearch(autoSuggestions[focusedIndex]);
          }
          break;
        case "Escape":
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSuggestions, autoSuggestions, focusedIndex, onSingleSearch]);

  return arrayCheck(autoSuggestions) && showSuggestions ? (
    <div
      ref={containerRef}
      className="top-full right-0 left-0 z-50 absolute shadow-xl mt-2 border rounded-md overflow-hidden"
    >
      <ol
        role="list"
        aria-expanded="true"
        aria-label={ACCESIBILITY_TEXT.AUTOSUGGEST}
        className="z-40 relative flex flex-col gap-2 bg-stone-100 shadow-xl p-2 rounded-b-md max-h-32 overflow-y-auto"
      >
        {autoSuggestions.map((key, index) => (
          <li
            role="listitem"
            tabIndex={0}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            aria-label={`${ACCESIBILITY_TEXT.AUTOSUGGEST_ITEM} ${key}`}
            className="hover:bg-orange-100 px-2 py-1 cursor-pointer"
            onClick={() => onSingleSearch(key)}
          >
            {key}
          </li>
        ))}
      </ol>
    </div>
  ) : null;
};

export default AutoSuggestContainer;
