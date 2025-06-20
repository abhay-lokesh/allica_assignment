import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";

// Mock dependencies
vi.mock("lucide-react", () => ({
  HeartCrack: () => <div data-testid="heart-crack-icon">HeartCrack</div>,
}));

vi.mock("~/components/FlexBox", () => ({
  default: ({ children }: any) => <div data-testid="flex-box">{children}</div>,
}));

vi.mock("~/components/Text", () => ({
  default: ({ value }: any) => (
    <span data-testid="text-component">{value}</span>
  ),
}));

vi.mock("~/containers/BusinessContainers/FavoriteContainer", () => ({
  default: ({ name }: any) => (
    <div data-testid="favorite-container">{name}</div>
  ),
}));

vi.mock("~/containers/BusinessContainers/HomeWorldContainer", () => ({
  default: ({ prop, value }: any) => (
    <div data-testid="homeworld-container" data-prop={prop} data-value={value}>
      {prop}: {value}
    </div>
  ),
}));

vi.mock("~/containers/SectionContainer", () => ({
  default: ({ header, variant, children }: any) => (
    <section
      data-testid="section-container"
      data-header={header}
      data-variant={variant}
    >
      <h2>{header}</h2>
      {children}
    </section>
  ),
}));

vi.mock("~/containers/TableContainer", () => ({
  default: ({ cellConfigs, onRowClick, data, cellRender }: any) => (
    <div data-testid="table-container">
      {data?.map((item: any, index: number) => (
        <div key={index} data-testid={`table-row-${index}`}>
          {cellConfigs?.map((config: any, configIndex: number) => (
            <div
              key={configIndex}
              data-testid={`cell-${config.key}-${config.type}`}
            >
              {cellRender?.(item, config)}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("~/hooks/useCharacterNavigate.hook", () => ({
  useCharacterNavigate: () => ({
    onRowClick: vi.fn(),
  }),
}));

vi.mock("~/store/base.store", () => ({
  useBoundStore: vi.fn(),
}));

vi.mock("~/utils/common", () => ({
  arrayCheck: vi.fn(),
  treeTraversal: vi.fn(),
}));

import { useBoundStore } from "~/store/base.store";
import { arrayCheck, treeTraversal } from "~/utils/common";
import type { CharacterDisplay } from "~/types/character.type";
import Favorites from "~/routes/Favorites";

const mockUseBoundStore = vi.mocked(useBoundStore);
const mockArrayCheck = vi.mocked(arrayCheck);
const mockTreeTraversal = vi.mocked(treeTraversal);

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Favorites", () => {
  const mockCharacterData: CharacterDisplay = {
    name: "Luke Skywalker",
    gender: "male",
    height: "172",
    homeworld: "https://swapi.dev/api/planets/1/",
  };

  const mockCharacterMap = {
    "luke skywalker": mockCharacterData,
    "leia organa": {
      name: "Leia Organa",
      gender: "female",
      height: "150",
      homeworld: "https://swapi.dev/api/planets/2/",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock setup
    mockUseBoundStore.mockImplementation((selector?: any) => {
      if (selector) {
        return ["Luke Skywalker", "Leia Organa"]; // favorites
      }
      return { characterMap: mockCharacterMap }; // default call
    });

    mockTreeTraversal.mockImplementation(
      (data: any, keys: string | string[]) => {
        const key = Array.isArray(keys) ? keys[0] : keys;
        return data?.[key] || null;
      }
    );
  });

  it("should render favorites table when favorites exist", () => {
    mockArrayCheck.mockReturnValue(true);

    renderWithRouter(<Favorites />);

    expect(screen.getByTestId("section-container")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByTestId("table-container")).toBeInTheDocument();

    // Check that table rows are rendered
    expect(screen.getByTestId("table-row-0")).toBeInTheDocument();
    expect(screen.getByTestId("table-row-1")).toBeInTheDocument();
  });

  it("should render empty state when no favorites exist", () => {
    mockArrayCheck.mockReturnValue(false);

    renderWithRouter(<Favorites />);

    expect(screen.getByTestId("heart-crack-icon")).toBeInTheDocument();
    expect(
      screen.getByText("Oops there are no favorites.")
    ).toBeInTheDocument();
    expect(screen.getByText("Start favoriting")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
    expect(screen.queryByTestId("section-container")).not.toBeInTheDocument();
  });

  it("should handle cellRender logic and data mapping correctly", () => {
    mockArrayCheck.mockReturnValue(true);

    renderWithRouter(<Favorites />);

    // Verify treeTraversal is called for data extraction
    expect(mockTreeTraversal).toHaveBeenCalled();

    // Check HomeWorld containers have correct props
    const homeworldContainers = screen.getAllByTestId("homeworld-container");
    expect(homeworldContainers[0]).toHaveAttribute("data-prop", "homeworld");
    expect(homeworldContainers[0]).toHaveAttribute(
      "data-value",
      "https://swapi.dev/api/planets/1/"
    );

    // Check Favorite containers display character names
    const favoriteContainers = screen.getAllByTestId("favorite-container");
    expect(favoriteContainers[0]).toHaveTextContent("Luke Skywalker");
    expect(favoriteContainers[1]).toHaveTextContent("Leia Organa");
  });

  it("should handle null/undefined values and missing data gracefully", () => {
    mockArrayCheck.mockReturnValue(true);

    // Mock treeTraversal to return null for some values
    mockTreeTraversal.mockImplementation(
      (data: any, keys: string | string[]) => {
        const key = Array.isArray(keys) ? keys[0] : keys;
        if (key === "gender") return null; // Simulate missing gender data
        return data?.[key] || null;
      }
    );

    // Mock store with incomplete character data
    mockUseBoundStore.mockImplementation((selector?: any) => {
      if (selector) {
        return ["Luke Skywalker"];
      }
      return {
        characterMap: {
          "luke skywalker": {
            name: "Luke Skywalker",
            height: "172",
            // missing gender and homeworld
          },
        },
      };
    });

    renderWithRouter(<Favorites />);

    expect(screen.getByTestId("table-container")).toBeInTheDocument();
    expect(screen.getByTestId("table-row-0")).toBeInTheDocument();

    // Should still render available data
    expect(screen.getByTestId("favorite-container")).toHaveTextContent(
      "Luke Skywalker"
    );

    // Missing data should not break the component
    expect(mockTreeTraversal).toHaveBeenCalled();
  });
});
