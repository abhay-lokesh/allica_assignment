import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Cell from "../../components/Cell";
import type { CellRender } from "~/types/common.type";
import type { CellConfig } from "~/types/container.types";

describe("Cell", () => {
  const mockRender = vi.fn();

  const mockConfig: CellConfig = {
    key: "name",
    type: "sync",
    format: "string",
    header: "Name",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render correct element types for all variants", () => {
    const { rerender } = render(
      <Cell cellData="Header" variant="HEADER" config={mockConfig} />
    );

    let element = screen.getByRole("columnheader");
    expect(element.tagName).toBe("TH");
    expect(element).toHaveAttribute("scope", "col");

    rerender(
      <Cell cellData="Row Header" variant="ROW_HEADER" config={mockConfig} />
    );
    element = screen.getByRole("rowheader");
    expect(element.tagName).toBe("TH");
    expect(element).toHaveAttribute("scope", "row");

    rerender(
      <Cell cellData="Cell Data" variant="COLUMN" config={mockConfig} />
    );
    element = screen.getByRole("cell");
    expect(element.tagName).toBe("TD");

    rerender(<Cell cellData="Default" config={mockConfig} />);
    element = screen.getByRole("cell");
    expect(element.tagName).toBe("TD");
  });

  it("should render cellData directly when no render function provided", () => {
    render(
      <Cell cellData="Simple Text" variant="COLUMN" config={mockConfig} />
    );

    expect(screen.getByText("Simple Text")).toBeInTheDocument();
  });

  it("should call render function with correct parameters and display result", () => {
    mockRender.mockReturnValue(<span>Custom Content</span>);

    const customData = { id: 1, name: "Luke" };
    render(
      <Cell
        cellData={customData}
        variant="COLUMN"
        config={mockConfig}
        render={mockRender as CellRender}
      />
    );

    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith(customData, mockConfig);
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  it("should handle render function returning null or complex elements", () => {
    mockRender.mockReturnValue(null);

    const { rerender } = render(
      <Cell
        cellData="data"
        variant="COLUMN"
        config={mockConfig}
        render={mockRender as CellRender}
      />
    );

    let element = screen.getByRole("cell");
    expect(element).toBeEmptyDOMElement();

    mockRender.mockReturnValue(
      <div>
        <span>Complex</span>
        <button>Button</button>
      </div>
    );

    rerender(
      <Cell
        cellData="data"
        variant="COLUMN"
        config={mockConfig}
        render={mockRender as CellRender}
      />
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Button");
  });

  it("should handle different data types correctly", () => {
    const { rerender } = render(
      <Cell cellData={42} variant="COLUMN" config={mockConfig} />
    );
    expect(screen.getByText("42")).toBeInTheDocument();

    rerender(<Cell cellData={true} variant="COLUMN" config={mockConfig} />);
    expect(screen.getByText("true")).toBeInTheDocument();

    rerender(<Cell cellData="" variant="COLUMN" config={mockConfig} />);
    const element = screen.getByRole("cell");
    expect(element).toHaveTextContent("");

    rerender(<Cell cellData={null} variant="COLUMN" config={mockConfig} />);
    expect(screen.getByRole("cell")).toBeInTheDocument();

    rerender(
      <Cell cellData={undefined} variant="COLUMN" config={mockConfig} />
    );
    expect(screen.getByRole("cell")).toBeInTheDocument();
  });

  it("should work with different CellConfig types and formats", () => {
    const asyncConfig: CellConfig = {
      key: "data",
      type: "async",
      format: "currency",
      header: "Price",
      hideMobile: true,
    };

    const buttonConfig: CellConfig = {
      key: "action",
      type: "button",
      format: "string",
      header: "Action",
    };

    mockRender.mockReturnValue(<span>$100.00</span>);

    const { rerender } = render(
      <Cell
        cellData={100}
        variant="COLUMN"
        config={asyncConfig}
        render={mockRender as CellRender}
      />
    );

    expect(mockRender).toHaveBeenCalledWith(100, asyncConfig);
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    mockRender.mockReturnValue(<button>Click Me</button>);

    rerender(
      <Cell
        cellData="action_data"
        variant="COLUMN"
        config={buttonConfig}
        render={mockRender as CellRender}
      />
    );

    expect(mockRender).toHaveBeenCalledWith("action_data", buttonConfig);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  it("should handle empty config and complex data objects", () => {
    const complexData = {
      id: 1,
      name: "Luke",
      details: { age: 23, planet: "Tatooine" },
    };

    const { rerender } = render(
      <Cell cellData="Test Data" variant="COLUMN" config={{}} />
    );

    expect(screen.getByText("Test Data")).toBeInTheDocument();

    rerender(<Cell cellData={complexData} variant="COLUMN" config={{}} />);

    const element = screen.getByRole("cell");
    expect(element).toBeInTheDocument();

    const arrayData = ["item1", "item2", "item3"];
    rerender(
      <Cell cellData={arrayData} variant="COLUMN" config={mockConfig} />
    );

    expect(screen.getByRole("cell")).toBeInTheDocument();
  });

  it("should maintain element type consistency with render functions across variants", () => {
    mockRender.mockReturnValue(<strong>Bold Content</strong>);

    const { rerender } = render(
      <Cell
        cellData="data"
        variant="HEADER"
        config={mockConfig}
        render={mockRender as CellRender}
      />
    );

    let element = screen.getByRole("columnheader");
    expect(element.tagName).toBe("TH");
    expect(screen.getByText("Bold Content")).toBeInTheDocument();

    rerender(
      <Cell
        cellData="data"
        variant="ROW_HEADER"
        config={mockConfig}
        render={mockRender as CellRender}
      />
    );

    element = screen.getByRole("rowheader");
    expect(element.tagName).toBe("TH");
    expect(screen.getByText("Bold Content")).toBeInTheDocument();

    rerender(
      <Cell
        cellData="data"
        variant="COLUMN"
        config={mockConfig}
        render={mockRender}
      />
    );

    element = screen.getByRole("cell");
    expect(element.tagName).toBe("TD");
    expect(screen.getByText("Bold Content")).toBeInTheDocument();
  });
});
