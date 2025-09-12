import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddItemForm } from "../ui/AddItemForm";

describe("AddItemForm", () => {
  const mockOnAddItem = vi.fn();

  beforeEach(() => {
    mockOnAddItem.mockClear();
  });

  it("should render form elements", () => {
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    expect(screen.getByLabelText("Item Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g., Jacket, Sneakers, Backpack")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Item" })
    ).toBeInTheDocument();
  });

  it("should call onAddItem when form is submitted with valid data", async () => {
    const user = userEvent.setup();
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    const input = screen.getByLabelText("Item Name");
    const submitButton = screen.getByRole("button", { name: "Add Item" });

    await user.type(input, "Test Item");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnAddItem).toHaveBeenCalledWith({ name: "Test Item" });
    });
  });

  it("should disable submit button when input is empty", () => {
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    const submitButton = screen.getByRole("button", { name: "Add Item" });
    expect(submitButton).toBeDisabled();
  });

  it("should show error for short input", async () => {
    const user = userEvent.setup();
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    const input = screen.getByLabelText("Item Name");
    const submitButton = screen.getByRole("button", { name: "Add Item" });

    await user.type(input, "A");
    await user.click(submitButton);

    expect(
      screen.getByText("Item name must be at least 2 characters")
    ).toBeInTheDocument();
    expect(mockOnAddItem).not.toHaveBeenCalled();
  });

  it("should show error for long input", async () => {
    const user = userEvent.setup();
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    const input = screen.getByLabelText("Item Name");
    const submitButton = screen.getByRole("button", { name: "Add Item" });

    const longName = "A".repeat(51);
    await user.type(input, longName);
    await user.click(submitButton);

    expect(
      screen.getByText("Item name must be less than 50 characters")
    ).toBeInTheDocument();
    expect(mockOnAddItem).not.toHaveBeenCalled();
  });

  it("should clear input after successful submission", async () => {
    const user = userEvent.setup();
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    const input = screen.getByLabelText("Item Name");
    const submitButton = screen.getByRole("button", { name: "Add Item" });

    await user.type(input, "Test Item");
    await user.click(submitButton);

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("should submit form on Enter key press", async () => {
    const user = userEvent.setup();
    render(<AddItemForm onAddItem={mockOnAddItem} />);

    const input = screen.getByLabelText("Item Name");
    await user.type(input, "Test Item{enter}");

    await waitFor(() => {
      expect(mockOnAddItem).toHaveBeenCalledWith({ name: "Test Item" });
    });
  });

  it("should show loading state when loading prop is true", () => {
    render(<AddItemForm onAddItem={mockOnAddItem} loading={true} />);

    const submitButton = screen.getByRole("button", { name: "Add Item" });
    expect(submitButton).toBeDisabled();
    expect(screen.getByLabelText("Item Name")).toBeDisabled();
  });
});
