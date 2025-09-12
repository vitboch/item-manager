import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";

// Mock the cn utility
vi.mock("@/shared/lib/utils", () => ({
  cn: (...args: (string | undefined)[]) => args.filter(Boolean).join(" "),
}));

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: "Test Modal",
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render when open", () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Modal {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByLabelText("Close modal");
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={true} />);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when escape key is pressed if closeOnEscape is false", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);

    await user.keyboard("{Escape}");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should call onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={true} />
    );

    // Click on the backdrop (the div with bg-black/50 class)
    const backdrop = screen
      .getByRole("dialog")
      .parentElement?.querySelector("div[class*='bg-black']");
    await user.click(backdrop!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when overlay is clicked if closeOnOverlayClick is false", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />
    );

    const overlay = screen.getByRole("dialog").parentElement;
    await user.click(overlay!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should not call onClose when modal content is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Modal {...defaultProps} onClose={onClose} />);

    const modalContent = screen.getByText("Modal content");
    await user.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should hide close button when showCloseButton is false", () => {
    render(<Modal {...defaultProps} showCloseButton={false} />);

    expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
  });

  it("should apply correct size classes", () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);
    const modalContent = screen
      .getByRole("dialog")
      .querySelector("div:last-child");
    expect(modalContent).toHaveClass("max-w-md");

    rerender(<Modal {...defaultProps} size="md" />);
    expect(modalContent).toHaveClass("max-w-lg");

    rerender(<Modal {...defaultProps} size="lg" />);
    expect(modalContent).toHaveClass("max-w-2xl");

    rerender(<Modal {...defaultProps} size="xl" />);
    expect(modalContent).toHaveClass("max-w-4xl");
  });

  it("should apply custom className", () => {
    render(<Modal {...defaultProps} className="custom-class" />);

    const modalContent = screen
      .getByRole("dialog")
      .querySelector("div:last-child");
    expect(modalContent).toHaveClass("custom-class");
  });

  it("should have proper accessibility attributes", () => {
    render(<Modal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");

    const title = screen.getByText("Test Modal");
    expect(title).toHaveAttribute("id", "modal-title");
  });
});
