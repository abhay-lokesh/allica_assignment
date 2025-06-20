import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Mock the utils module
vi.mock("~/utils", () => ({
  arrayCheck: vi.fn(),
}));

// Mock the constants
vi.mock("~/constants/accessibility.constant", () => ({
  ACCESIBILITY_TEXT: {
    AUTOSUGGEST: "Auto suggestions list",
    AUTOSUGGEST_ITEM: "Suggestion item:",
  },
}));

import AutoSuggestContainer from "~/containers/AutoSuggestContainer";
import { arrayCheck } from "~/utils";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import type { AutoSuggestContainerProps } from "~/types/container.types";

// Get the mocked function once
const mockArrayCheck = vi.mocked(arrayCheck);

describe("AutoSuggestContainer", () => {
  const mockOnSingleSearch = vi.fn();

  const defaultProps: AutoSuggestContainerProps = {
    autoSuggestions: ["suggestion1", "suggestion2", "suggestion3"],
    showSuggestions: true,
    onSingleSearch: mockOnSingleSearch,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockArrayCheck.mockReturnValue(true);
  });

  describe("Rendering", () => {
    it("should render suggestions list when arrayCheck returns true and showSuggestions is true", () => {
      render(<AutoSuggestContainer {...defaultProps} />);

      const suggestionsList = screen.getByRole("list");
      expect(suggestionsList).toBeInTheDocument();
      expect(suggestionsList).toHaveAttribute("aria-expanded", "true");
      expect(suggestionsList).toHaveAttribute(
        "aria-label",
        ACCESIBILITY_TEXT.AUTOSUGGEST
      );
    });

    it("should render all suggestion items correctly", () => {
      render(<AutoSuggestContainer {...defaultProps} />);

      const suggestionItems = screen.getAllByRole("listitem");
      expect(suggestionItems).toHaveLength(3);

      expect(screen.getByText("suggestion1")).toBeInTheDocument();
      expect(screen.getByText("suggestion2")).toBeInTheDocument();
      expect(screen.getByText("suggestion3")).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering", () => {
    it("should not render when arrayCheck returns false", () => {
      mockArrayCheck.mockReturnValue(false);

      render(<AutoSuggestContainer {...defaultProps} />);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("should not render when showSuggestions is false", () => {
      render(
        <AutoSuggestContainer {...defaultProps} showSuggestions={false} />
      );

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onSingleSearch when a suggestion item is clicked", async () => {
      const user = userEvent.setup();

      render(<AutoSuggestContainer {...defaultProps} />);

      const firstSuggestion = screen.getByText("suggestion1");
      await user.click(firstSuggestion);

      expect(mockOnSingleSearch).toHaveBeenCalledTimes(1);
      expect(mockOnSingleSearch).toHaveBeenCalledWith("suggestion1");
    });
  });
});
