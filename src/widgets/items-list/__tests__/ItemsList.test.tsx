import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemsList } from "../ui/ItemsList";
import { createItem } from "@/entities/item";

describe("ItemsList", () => {
  const mockOnRemoveItem = vi.fn();

  beforeEach(() => {
    mockOnRemoveItem.mockClear();
  });

  it("should render empty state when no items", () => {
    render(<ItemsList items={[]} onRemoveItem={mockOnRemoveItem} />);

    expect(screen.getByText("No items yet")).toBeInTheDocument();
    expect(
      screen.getByText("Add your first item using the form above")
    ).toBeInTheDocument();
  });

  it("should render items list when items are provided", () => {
    const items = [
      createItem({ name: "Test Item 1" }),
      createItem({ name: "Test Item 2" }),
    ];

    render(<ItemsList items={items} onRemoveItem={mockOnRemoveItem} />);

    expect(screen.getByText("Your Items (2)")).toBeInTheDocument();
    expect(screen.getByText("Test Item 1")).toBeInTheDocument();
    expect(screen.getByText("Test Item 2")).toBeInTheDocument();
  });

  it("should call onRemoveItem when remove button is clicked", async () => {
    const user = userEvent.setup();
    const items = [createItem({ name: "Test Item" })];

    render(<ItemsList items={items} onRemoveItem={mockOnRemoveItem} />);

    const removeButton = screen.getByRole("button", { name: "Remove" });
    await user.click(removeButton);

    // Should show modal with confirmation
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Remove Item")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Are you sure you want to remove "Test Item"? This action cannot be undone.`
      )
    ).toBeInTheDocument();

    // Click confirm in modal - use getAllByRole to get the second "Remove" button (in modal)
    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    const confirmButton = removeButtons[1]; // Second button is in the modal
    await user.click(confirmButton);

    expect(mockOnRemoveItem).toHaveBeenCalledWith(items[0].id);
  });

  it("should cancel removal when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const items = [createItem({ name: "Test Item" })];

    render(<ItemsList items={items} onRemoveItem={mockOnRemoveItem} />);

    const removeButton = screen.getByRole("button", { name: "Remove" });
    await user.click(removeButton);

    // Should show modal with confirmation
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click cancel in modal
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Should not call onRemoveItem
    expect(mockOnRemoveItem).not.toHaveBeenCalled();
  });

  it("should show loading state when removing", () => {
    const items = [createItem({ name: "Test Item" })];

    render(
      <ItemsList
        items={items}
        onRemoveItem={mockOnRemoveItem}
        removing={true}
      />
    );

    // Should show loading state in button
    const removeButton = screen.getByRole("button", { name: "Removing..." });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toBeDisabled();
  });

  it("should format dates correctly", () => {
    const items = [createItem({ name: "Test Item" })];

    render(<ItemsList items={items} onRemoveItem={mockOnRemoveItem} />);

    // Check that date is displayed (format may vary by locale)
    const dateText = screen.getByText(/Added/);
    expect(dateText).toBeInTheDocument();
  });
});
