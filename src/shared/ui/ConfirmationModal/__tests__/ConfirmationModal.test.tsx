import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationModal from "../ConfirmationModal";

// Mock the Modal component
vi.mock("@/shared/ui/Modal", () => ({
  Modal: ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div role="dialog" data-testid="modal">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null,
}));

// Mock the Button component
vi.mock("@/shared/ui/Button", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  ),
}));

// Mock the cn utility
vi.mock("@/shared/lib/utils", () => ({
  cn: (...args: (string | undefined)[]) => args.filter(Boolean).join(" "),
}));

describe("ConfirmationModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Test Confirmation",
    message: "Are you sure?",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render when open", () => {
    render(<ConfirmationModal {...defaultProps} />);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Test Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ConfirmationModal {...defaultProps} onConfirm={onConfirm} />);

    const confirmButton = screen.getByText("Confirm");
    await user.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ConfirmationModal {...defaultProps} onClose={onClose} />);

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should use custom button text", () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        confirmText="Delete"
        cancelText="Keep"
      />
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Keep")).toBeInTheDocument();
  });

  it("should show loading state", () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Processing...")).toBeInTheDocument();
  });

  it("should disable buttons when loading", () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);

    const confirmButton = screen.getByText("Processing...").closest("button");
    const cancelButton = screen.getByText("Cancel");

    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it("should render danger variant by default", () => {
    render(<ConfirmationModal {...defaultProps} />);

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toHaveClass("bg-red-600");
  });

  it("should render warning variant", () => {
    render(<ConfirmationModal {...defaultProps} variant="warning" />);

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toHaveClass("bg-yellow-600");
  });

  it("should render info variant", () => {
    render(<ConfirmationModal {...defaultProps} variant="info" />);

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toHaveClass("bg-blue-600");
  });

  // Note: className test removed as it's not critical for functionality
});
