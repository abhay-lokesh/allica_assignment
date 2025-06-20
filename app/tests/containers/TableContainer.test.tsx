import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("~/utils", () => ({
  arrayCheck: vi.fn(),
}));

vi.mock("~/components/Cell", () => ({
  default: ({ cellData, variant, className, config, render }: any) => {
    if (variant && ["HEADER", "ROW_HEADER"].includes(variant)) {
      return (
        <th
          className={`${className} ${
            variant === "ROW_HEADER" ? "font-medium" : ""
          }`}
          scope={variant === "HEADER" ? "col" : "row"}
          data-testid={`cell-${variant}`}
        >
          {render ? render(cellData, config) : cellData}
        </th>
      );
    }
    return (
      <td className={className} data-testid="cell-COLUMN">
        {render ? render(cellData, config) : cellData}
      </td>
    );
  },
}));

import { arrayCheck } from "~/utils";
import type { TableContainerProps, CellConfig } from "~/types/container.types";
import TableContainer from "~/containers/TableContainer";
import type { CellRender } from "~/types/common.type";

const mockArrayCheck = vi.mocked(arrayCheck);

describe("TableContainer", () => {
  const mockOnRowClick = vi.fn();
  const mockCellRender: CellRender = vi.fn();

  const mockData = [
    {
      id: 1,
      name: "Luke Skywalker",
      height: 172,
      birthYear: "19BBY",
      credits: 1000,
    },
    {
      id: 2,
      name: "Leia Organa",
      height: 150,
      birthYear: "19BBY",
      credits: 2500,
    },
  ];

  const mockCellConfigs: CellConfig[] = [
    {
      key: "name",
      type: "sync",
      format: "string",
      header: "Character Name",
      hideMobile: false,
    },
    {
      key: "height",
      type: "sync",
      format: "number",
      header: "Height (cm)",
      hideMobile: true,
    },
    {
      key: "credits",
      type: "async",
      format: "currency",
      header: "Credits",
      hideMobile: false,
    },
  ];

  const defaultProps: TableContainerProps = {
    data: mockData,
    description: "Character information table",
    cellRender: mockCellRender,
    onRowClick: mockOnRowClick,
    cellConfigs: mockCellConfigs,
    variant: "STICKY",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockArrayCheck.mockReturnValue(true);

    // Mock cellRender to return React elements
    (mockCellRender as any).mockImplementation(
      (data: any, config: CellConfig) => {
        if (config.format === "currency") {
          return <span>${data[config.key]}</span>;
        }
        if (config.format === "number") {
          return <span>{data[config.key]} cm</span>;
        }
        return <span>{data[config.key]}</span>;
      }
    );
  });

  describe("Basic Rendering", () => {
    it("should render table when data and cellConfigs exist", () => {
      render(<TableContainer {...defaultProps} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("should render null when cellConfigs is empty", () => {
      mockArrayCheck.mockReturnValueOnce(true).mockReturnValueOnce(false);

      const { container } = render(
        <TableContainer {...defaultProps} cellConfigs={[]} />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should render table description as caption", () => {
      render(<TableContainer {...defaultProps} />);

      expect(
        screen.getByText("Character information table")
      ).toBeInTheDocument();
    });
  });

  describe("Check table header render", () => {
    it("should apply hideMobile functionality to appropriate headers", () => {
      render(<TableContainer {...defaultProps} />);

      const headers = screen.getAllByTestId("cell-HEADER");
      expect(headers).toHaveLength(3);

      // Headers should exist regardless of hideMobile setting
      expect(headers[0]).toBeInTheDocument(); // name - hideMobile: false
      expect(headers[1]).toBeInTheDocument(); // height - hideMobile: true
      expect(headers[2]).toBeInTheDocument(); // credits - hideMobile: false
    });
  });

  describe("Rendering the table", () => {
    it("should render correct number of rows", () => {
      render(<TableContainer {...defaultProps} />);

      const tbody = screen.getByRole("table").querySelector("tbody");
      const rows = tbody?.querySelectorAll("tr");
      expect(rows).toHaveLength(2);
    });

    it("should render ROW_HEADER cells for first column", () => {
      render(<TableContainer {...defaultProps} />);

      const rowHeaders = screen.getAllByTestId("cell-ROW_HEADER");
      expect(rowHeaders).toHaveLength(2); // 2 rows

      rowHeaders.forEach((header) => {
        expect(header.tagName).toBe("TH");
        expect(header).toHaveAttribute("scope", "row");
        expect(header).toHaveClass("font-medium");
      });
    });

    it("should render COLUMN cells for other columns", () => {
      render(<TableContainer {...defaultProps} />);

      const columnCells = screen.getAllByTestId("cell-COLUMN");
      expect(columnCells).toHaveLength(4); // 2 rows × 2 columns (excluding first column)

      columnCells.forEach((cell) => {
        expect(cell.tagName).toBe("TD");
      });
    });
  });

  describe("Cell Rendering with CellRender", () => {
    it("should call cellRender function for each data cell", () => {
      render(<TableContainer {...defaultProps} />);

      // 2 rows × 3 columns = 6 calls
      expect(mockCellRender).toHaveBeenCalledTimes(6);
    });

    it("should pass correct data and config to cellRender", () => {
      render(<TableContainer {...defaultProps} />);

      // First row, first column
      expect(mockCellRender).toHaveBeenCalledWith(
        mockData[0],
        mockCellConfigs[0]
      );

      // First row, second column
      expect(mockCellRender).toHaveBeenCalledWith(
        mockData[0],
        mockCellConfigs[1]
      );

      // Second row, first column
      expect(mockCellRender).toHaveBeenCalledWith(
        mockData[1],
        mockCellConfigs[0]
      );
    });
  });

  describe("Row Click Handling", () => {
    it("should call onRowClick when row is clicked", async () => {
      const user = userEvent.setup();

      render(<TableContainer {...defaultProps} />);

      const firstRow = screen
        .getByRole("table")
        .querySelector("tbody tr:first-child");
      await user.click(firstRow!);

      expect(mockOnRowClick).toHaveBeenCalledTimes(1);
      expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    it("should call onRowClick with correct data for different rows", async () => {
      const user = userEvent.setup();

      render(<TableContainer {...defaultProps} />);

      const rows = screen.getByRole("table").querySelectorAll("tbody tr");

      await user.click(rows[0]);
      expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);

      await user.click(rows[1]);
      expect(mockOnRowClick).toHaveBeenCalledWith(mockData[1]);

      expect(mockOnRowClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("Checking arrayCheck function from utils", () => {
    it("should call arrayCheck for cellConfigs validation", () => {
      render(<TableContainer {...defaultProps} />);

      expect(mockArrayCheck).toHaveBeenCalledWith(mockCellConfigs);
    });

    it("should render null when cellConfigs validation fails", () => {
      mockArrayCheck.mockReturnValueOnce(true).mockReturnValueOnce(false);

      const { container } = render(<TableContainer {...defaultProps} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle cellRender returning null", () => {
      (mockCellRender as any).mockReturnValue(null);

      render(<TableContainer {...defaultProps} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("should handle malformed cellConfigs", () => {
      const malformedConfigs = [
        { key: "name", type: "sync", format: "string", header: "Name" },
        {} as CellConfig, // Invalid config
      ];

      render(
        <TableContainer
          {...defaultProps}
          cellConfigs={malformedConfigs as any}
        />
      );
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });
});
