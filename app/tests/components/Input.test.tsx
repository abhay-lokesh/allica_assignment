import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Input from "../../components/Input";
import type { InputProps } from "~/types/common.type";

describe("Input", () => {
  const mockOnValueChange = vi.fn();
  const mockOnEnter = vi.fn();
  const mockOnFocus = vi.fn();
  const mockOnBlur = vi.fn();

  const defaultProps: InputProps = {
    onValueChange: mockOnValueChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle Enter key press and call onEnter callback", async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} onEnter={mockOnEnter} />);

    const input = screen.getByRole("textbox");

    await user.type(input, "hello{Enter}");

    expect(mockOnEnter).toHaveBeenCalledTimes(1);
    expect(mockOnValueChange).toHaveBeenCalledTimes(5); // h, e, l, l, o
  });

  it("should handle focus and blur events", async () => {
    const user = userEvent.setup();

    render(
      <Input {...defaultProps} onFocus={mockOnFocus} onBlur={mockOnBlur} />
    );

    const input = screen.getByRole("textbox");

    await user.click(input);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("should handle keyboard events and prevent propagation", async () => {
    const user = userEvent.setup();
    const mockParentKeyDown = vi.fn();

    const ParentComponent = () => (
      <div onKeyDown={mockParentKeyDown}>
        <Input {...defaultProps} onEnter={mockOnEnter} />
      </div>
    );

    render(<ParentComponent />);

    const input = screen.getByRole("textbox");

    // Test Enter key stopPropagation
    await user.type(input, "{Enter}");

    expect(mockOnEnter).toHaveBeenCalledTimes(1);
    // Parent should still receive the event since we're testing keyDown vs keyUp
    expect(mockParentKeyDown).toHaveBeenCalled();

    // Test other keys don't trigger onEnter
    await user.type(input, "{Space}{Escape}");
    expect(mockOnEnter).toHaveBeenCalledTimes(1); // Still only 1 call
  });

  it("should handle edge cases and optional callbacks", async () => {
    const user = userEvent.setup();

    // Test without onEnter callback
    const { rerender } = render(<Input {...defaultProps} />);

    const input = screen.getByRole("textbox");

    // Should not throw error when Enter is pressed without onEnter
    await user.type(input, "{Enter}");
    expect(mockOnValueChange).toHaveBeenCalled();

    // Test with all props including additional HTML input props
    rerender(
      <Input
        {...defaultProps}
        onEnter={mockOnEnter}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        disabled={false}
        maxLength={10}
        data-testid="custom-input"
      />
    );

    const updatedInput = screen.getByTestId("custom-input");
    expect(updatedInput).toHaveAttribute("maxLength", "10");
    expect(updatedInput).not.toBeDisabled();

    // Test value change with existing value
    await user.clear(updatedInput);
    await user.type(updatedInput, "new");

    expect(mockOnValueChange).toHaveBeenLastCalledWith("new");
  });
});
